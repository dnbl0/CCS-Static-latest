# One colour design: light only

The site is light whatever the browser or device asks for: Blacklight's `dark_mode_support` is off and `layouts/_light_theme`
sets `color-scheme: light` and pins `data-bs-theme="light"`. Only the light design is drawn and checked for
contrast, so a second theme would need its own design and checks first.
