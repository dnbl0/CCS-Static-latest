// infra/azure/vm/site-watch.json is the watcher that emails Dean when the live site is down. These checks guard the rules that must not
// drift: the test-only switches default to OFF (a left-on switch would make it alert at any hour, or label real alerts as tests), it checks
// every 5 minutes, it only starts caring at 06:15 Melbourne time (the VM is off 00:00-06:00), it re-checks before alerting, it signs in with a
// managed identity (no keys in the file), and it needs the whole search to answer (HTTP 200 and more than 10,000 records).
const { ROOT, fail, ok, finish, path, fs } = require('./lib');

const file = path.join(ROOT, 'infra', 'azure', 'vm', 'site-watch.json');
const text = fs.readFileSync(file, 'utf8');
const t = JSON.parse(text);
const check = (name, cond, detail) => (cond ? ok(name) : fail(name + (detail ? ' -> ' + detail : '')));

const p = t.parameters;
check('the testing-only switches default to off', p.skipGates.defaultValue === false && p.subjectPrefix.defaultValue === '');
check('the default check path is the record search', /catalog\.json/.test(p.checkPath.defaultValue) && /any_assets=1/.test(p.checkPath.defaultValue));

const wf = t.resources.find(r => r.type === 'Microsoft.Logic/workflows');
const def = wf.properties.definition;
const a = def.actions;
check('it checks every 5 minutes', def.triggers.Every_5_minutes.recurrence.frequency === 'Minute' && def.triggers.Every_5_minutes.recurrence.interval === 5);
check('it uses a managed identity (no keys)', wf.identity.type === 'SystemAssigned' && !/(accesskey|ACS_KEY|connectionString|api[-_]?key)/i.test(text));
check('it counts the site as up only for 200 with more than 10,000 records', /Succeeded/.test(a.Site_is_up.inputs) && /10000/.test(a.Site_is_up.inputs) && /total_count/.test(a.Site_is_up.inputs));
check('it stays quiet before 06:15 Melbourne time', /AUS Eastern Standard Time/.test(a.Time_to_tell_someone.inputs) && /'06:15'/.test(a.Time_to_tell_someone.inputs));
check('it emails at most twice an hour (minutes 15-19 and 45-49)', /15/.test(a.Time_to_tell_someone.inputs) && /45/.test(a.Time_to_tell_someone.inputs) && /less\(.*20\)/.test(a.Time_to_tell_someone.inputs) && /less\(.*50\)/.test(a.Time_to_tell_someone.inputs));
const down = a.If_down_and_it_is_time.actions;
check('it waits and checks again before alerting', down.Wait_3_minutes && down.Check_again && down.If_still_down.actions.Send_the_alert_email);
const mail = down.If_still_down.actions.Send_the_alert_email.inputs;
check('the alert email goes out through Azure email with the identity', /emails:send/.test(mail.uri) && mail.authentication.type === 'ManagedServiceIdentity' && mail.authentication.audience === 'https://communication.azure.com/');
const role = t.resources.find(r => r.type === 'Microsoft.Authorization/roleAssignments');
check('its only permission is "Communication and Email Service Owner", on the email resource only',
  t.variables.emailOwnerRole.includes('09976791-48a7-449e-bb21-39d1a415f350') && role.properties.roleDefinitionId === "[variables('emailOwnerRole')]" && /concat\('Microsoft\.Communication\/communicationServices\/'/.test(role.scope),
  JSON.stringify({ variable: t.variables.emailOwnerRole, roleDefinitionId: role.properties.roleDefinitionId, scope: role.scope }));
check('there is exactly one permission, nothing broader', t.resources.filter(r => r.type === 'Microsoft.Authorization/roleAssignments').length === 1);
finish('vm-site-watch');
