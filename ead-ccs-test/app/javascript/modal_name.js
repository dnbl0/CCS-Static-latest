// Names Blacklight's modal (#blacklight-modal: the facet "Show more" lists, the Filters dialog) after its visible heading
// (WCAG 4.1.2). The gem's <dialog> has no label of its own, so a screen reader says only "dialog" and the title is read
// as ordinary content. The content is replaced on every load, so the name is set each time the dialog is about to show;
// the gem sends show.blacklight.blacklight-modal after the new content is in place and before showModal().
document.addEventListener("show.blacklight.blacklight-modal", (event) => {
  const dialog = event.target.closest?.("dialog") || document.getElementById("blacklight-modal")
  const title = dialog?.querySelector(".modal-title")
  if (!dialog || !title) return

  title.id ||= "blacklight-modal-title"
  dialog.setAttribute("aria-labelledby", title.id)
})
