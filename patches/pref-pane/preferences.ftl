## Firedragon preferences

# Sidebar
pane-firedragon-title = Firedragon
category-firedragon =
    .tooltiptext = about:config changes, logically grouped and easily accessible

# Main content
firedragon-header = Firedragon Preferences


firedragon-general-heading = Browser Behavior

firedragon-extension-update-checkbox =
    .label = Update add-ons automatically
firedragon-extension-update-description = Keep extensions up to date without manual intervention. A good choice for your security. If you don't review the code of your extensions before every update, you should enable this option.

firedragon-sync-checkbox =
    .label = Enable Firefox Sync
firedragon-sync-description = Sync your data with other browsers. Firefox Sync encrypts data locally before transmitting it to the server. Requires restart.

firedragon-autocopy-checkbox =
    .label = Enable middle click paste
firedragon-autocopy-description = Select some text to copy it, then paste it with a middle-mouse click.

firedragon-styling-checkbox =
    .label = Allow userChrome.css customization
firedragon-styling-description = Enable this if you want to customize the UI with a manually loaded theme. Make sure you trust the provider of the theme.


firedragon-network-heading = Networking

firedragon-ipv6-checkbox =
    .label = Enable IPv6
firedragon-ipv6-description = Allow { -brand-short-name } to connect using IPv6. Instead of blocking IPv6 in the browser, we suggest enabling the IPv6 privacy extension in your OS.


firedragon-privacy-heading = Privacy

firedragon-xorigin-ref-checkbox =
    .label = Limit cross-origin referrers
firedragon-xorigin-ref-description = Send a referrer only on same-origin. This causes breakage. Additionally, even when sent referrers will still be trimmed.


firedragon-broken-heading = Fingerprinting

firedragon-rfp-checkbox =
    .label = Enable ResistFingerprinting
firedragon-rfp-description = ResistFingerprinting is the best in class anti-fingerprinting tool. If you need to disable it, consider using an extension like Canvas Blocker.

firedragon-letterboxing-checkbox =
    .label = Enable letterboxing
firedragon-letterboxing-description = Letterboxing applies margins around your windows, in order to return a limited set of rounded resolutions.

firedragon-auto-decline-canvas-checkbox =
    .label = Silently block canvas access requests
firedragon-auto-decline-canvas-description = Automatically deny canvas access to websites, without prompting the user. It is still possible to allow canvas access from the urlbar.

firedragon-webgl-checkbox =
    .label = Enable WebGL
firedragon-webgl-description = WebGL is a strong fingerprinting vector. If you need to enable it, consider using an extension like Canvas Blocker.


firedragon-security-heading = Security

firedragon-ocsp-checkbox =
    .label = Enforce OCSP hard-fail
firedragon-ocsp-description = Prevent connecting to a website if the OCSP check cannot be performed. This increases security, but it will cause breakage when an OCSP server is down.

firedragon-goog-safe-checkbox =
    .label = Enable Google Safe Browsing
firedragon-goog-safe-description = If you are worried about malware and phishing, consider enabling it. Disabled over censorship concerns but recommended for less advanced users. All the checks happen locally.

firedragon-goog-safe-download-checkbox =
    .label = Scan downloads
firedragon-goog-safe-download-description = Allow Safe Browsing to scan your downloads to identify suspicious files. All the checks happen locally.

# Footer
firedragon-footer = Useful links
firedragon-config-link =
    .label = All advanced settings (about:config)
firedragon-open-profile =
    .label = Open user profile directory
