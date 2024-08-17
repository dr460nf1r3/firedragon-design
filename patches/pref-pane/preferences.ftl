## FireDragon preferences

# Sidebar
pane-firedragon-title = FireDragon
category-firedragon =
    .tooltiptext = about:config changes, logically grouped and easily accessible

# Main content
firedragon-header = FireDragon Preferences
firedragon-warning-title = Heads up!
firedragon-warning-description = We carefully choose default settings to focus on privacy and security. When changing these settings, read the descriptions to understand the implications of those changes.

# Page Layout
firedragon-general-heading = Browser Behavior
firedragon-extension-update-checkbox =
    .label = Update add-ons automatically
firedragon-sync-checkbox =
    .label = Enable Firefox Sync
firedragon-autocopy-checkbox =
    .label = Enable middle click paste
firedragon-styling-checkbox = 
    .label = Allow userChrome.css customization

firedragon-network-heading = Networking
firedragon-ipv6-checkbox =
    .label = Enable IPv6

firedragon-privacy-heading = Privacy
firedragon-xorigin-ref-checkbox =
    .label = Limit cross-origin referrers

firedragon-broken-heading = Fingerprinting
firedragon-webgl-checkbox =
    .label = Enable WebGL
firedragon-rfp-checkbox =
    .label = Enable ResistFingerprinting
firedragon-auto-decline-canvas-checkbox =
    .label = Silently block canvas access requests
firedragon-letterboxing-checkbox =
    .label = Enable letterboxing

firedragon-security-heading = Security
firedragon-ocsp-checkbox =
    .label = Enforce OCSP hard-fail
firedragon-goog-safe-checkbox =
    .label = Enable Google Safe Browsing
firedragon-goog-safe-download-checkbox =
    .label = Scan downloads

# In-depth descriptions
firedragon-extension-update-description = Keep extensions up to date without manual intervention. A good choice for your security.
firedragon-extension-update-warning1 = If you don't review the code of your extensions before every update, you should enable this option.

firedragon-ipv6-description = Allow { -brand-short-name } to connect using IPv6.
firedragon-ipv6-warning1 = Instead of blocking IPv6 in the browser, we suggest enabling the IPv6 privacy extension in your OS.
firedragon-ocsp-description = Prevent connecting to a website if the OCSP check cannot be performed.
firedragon-ocsp-warning1 = This increases security, but it will cause breakage when an OCSP server is down.
firedragon-sync-description = Sync your data with other browsers. Requires restart.
firedragon-sync-warning1 = Firefox Sync encrypts data locally before transmitting it to the server.

firedragon-autocopy-description = Select some text to copy it, then paste it with a middle-mouse click.

firedragon-styling-description = Enable this if you want to customize the UI with a manually loaded theme.
firedragon-styling-warning1 = Make sure you trust the provider of the theme.

firedragon-xorigin-ref-description = Send a referrer only on same-origin.
firedragon-xorigin-ref-warning1 = This may cause breakage. Additionally, even when sent referrers will still be trimmed.

firedragon-webgl-description = WebGL is a strong fingerprinting vector.
firedragon-webgl-warning1 = If you need to enable it, consider using an extension like Canvas Blocker.

firedragon-rfp-description = ResistFingerprinting is the best in class anti-fingerprinting tool.
firedragon-rfp-warning1 = If you need to disable it, consider using an extension like Canvas Blocker.

firedragon-auto-decline-canvas-description = Automatically deny canvas access to websites, without prompting the user.
firedragon-auto-decline-canvas-warning1 = It is still possible to allow canvas access from the urlbar.

firedragon-letterboxing-description = Letterboxing applies margins around your windows, in order to return a limited set of rounded resolutions.

firedragon-goog-safe-description = If you are worried about malware and phishing, consider enabling it.
firedragon-goog-safe-warning1 = Disabled over censorship concerns but recommended for less advanced users. All the checks happen locally.

firedragon-goog-safe-download-description = Allow Safe Browsing to scan your downloads to identify suspicious files.
firedragon-goog-safe-download-warning1 = All the checks happen locally.

# Footer
firedragon-footer = Useful links
firedragon-config-link = All advanced settings (about:config)
firedragon-open-profile = Open user profile directory
