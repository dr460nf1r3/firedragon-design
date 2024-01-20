/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/* import-globals-from extensionControlled.js */
/* import-globals-from preferences.js */

var { AppConstants } = ChromeUtils.import( "resource://gre/modules/AppConstants.jsm");
XPCOMUtils.defineLazyGetter(this, "L10n", () => {
  return new Localization([
    "branding/brand.ftl",
    "browser/preferences/preferences.ftl",
  ]);
});

Preferences.addAll([
  // Automatically Update Extensions
  { id: "extensions.update.enabled", type: "bool" },
  { id: "extensions.update.autoUpdateDefault", type: "bool" },
  // Enable firefox sync
  { id: "identity.fxaccounts.enabled", type: "bool" },
  // Clipboard autocopy/paste
  { id: "clipboard.autocopy", type: "bool" },
  { id: "middlemouse.paste", type: "bool" },
  // Allow userChrome.css customization
  { id: "toolkit.legacyUserProfileCustomizations.stylesheets", type: "bool" },
  // IPv6
  { id: "network.dns.disableIPv6", type: "bool" },
  // XOrigin referrers
  { id: "network.http.referer.XOriginPolicy", type: "int" },
  // Resist fingerprinting
  //{ id: "privacy.resistFingerprinting", type: "bool" },
  { id: "privacy.resistFingerprinting.letterboxing", type: "bool" },
  //{ id: "privacy.resistFingerprinting.autoDeclineNoUserInputCanvasPrompts", type: "bool" },
  // WebGL
  //{ id: "webgl.disabled", type: "bool" },
  // ocsp hard-fail
  { id: "security.OCSP.require", type: "bool" },
  // Google Safe Browsing
  //{ id: "browser.safebrowsing.malware.enabled", type: "bool" },
  //{ id: "browser.safebrowsing.phishing.enabled", type: "bool" },
  { id: "browser.safebrowsing.blockedURIs.enabled", type: "bool" },
  { id: "browser.safebrowsing.provider.google4.gethashURL", type: "string" },
  { id: "browser.safebrowsing.provider.google4.updateURL", type: "string" },
  { id: "browser.safebrowsing.provider.google.gethashURL", type: "string" },
  { id: "browser.safebrowsing.provider.google.updateURL", type: "string" },
  // Google safe browsing check downloads
  //{ id: "browser.safebrowsing.downloads.enabled", type: "bool" },
]);

var gFiredragonPane = {
  _pane: null,

  // called when the document is first parsed
  init() {
    this._pane = document.getElementById("paneFiredragon");

    // Set all event listeners on checkboxes
    setBoolSyncListeners(
      "firedragon-extension-update-checkbox",
      ["extensions.update.autoUpdateDefault", "extensions.update.enabled"],
      [true,                                  true],
    );
    setBoolSyncListeners(
      "firedragon-sync-checkbox",
      ["identity.fxaccounts.enabled"],
      [true],
    );
    setBoolSyncListeners(
      "firedragon-autocopy-checkbox",
      ["clipboard.autocopy", "middlemouse.paste"],
      [true,                 true],
    );
    setBoolSyncListeners(
      "firedragon-styling-checkbox",
      ["toolkit.legacyUserProfileCustomizations.stylesheets"],
      [true],
    );
    setBoolSyncListeners(
      "firedragon-ipv6-checkbox",
      ["network.dns.disableIPv6"],
      [false],
    );
    setXOriginPolicySyncListeners(
      "firedragon-xorigin-ref-checkbox",
      "network.http.referer.XOriginPolicy",
      [1, 2],
      [0]
    );
    setBoolSyncListeners(
      "firedragon-rfp-checkbox",
      ["privacy.resistFingerprinting"],
      [true],
    );
    setBoolSyncListeners(
      "firedragon-letterboxing-checkbox",
      ["privacy.resistFingerprinting.letterboxing"],
      [true],
    );
    setBoolSyncListeners(
      "firedragon-auto-decline-canvas-checkbox",
      ["privacy.resistFingerprinting.autoDeclineNoUserInputCanvasPrompts"],
      [true],
    );
    setBoolSyncListeners(
      "firedragon-webgl-checkbox",
      ["webgl.disabled"],
      [false],
    );
    setBoolSyncListeners(
      "firedragon-ocsp-checkbox",
      ["security.OCSP.require"],
      [true],
    );
    setSyncListeners(
      "firedragon-goog-safe-checkbox",
      [
        "browser.safebrowsing.malware.enabled",
        "browser.safebrowsing.phishing.enabled",
        "browser.safebrowsing.blockedURIs.enabled",
        "browser.safebrowsing.provider.google4.gethashURL",
        "browser.safebrowsing.provider.google4.updateURL",
        "browser.safebrowsing.provider.google.gethashURL",
        "browser.safebrowsing.provider.google.updateURL",
      ],
      [
        true,
        true,
        true,
        "https://safebrowsing.googleapis.com/v4/fullHashes:find?$ct=application/x-protobuf&key=%GOOGLE_SAFEBROWSING_API_KEY%&$httpMethod=POST",
        "https://safebrowsing.googleapis.com/v4/threatListUpdates:fetch?$ct=application/x-protobuf&key=%GOOGLE_SAFEBROWSING_API_KEY%&$httpMethod=POST",
        "https://safebrowsing.google.com/safebrowsing/gethash?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2",
        "https://safebrowsing.google.com/safebrowsing/downloads?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2&key=%GOOGLE_SAFEBROWSING_API_KEY%",
      ],
      [
        false,
        false,
        false,
        "",
        "",
        "",
        "",
      ],
    );
    setBoolSyncListeners(
      "firedragon-goog-safe-download-checkbox",
      ["browser.safebrowsing.downloads.enabled"],
      [true],
    );

    // Set event listener on open profile directory button
    setEventListener("firedragon-open-profile", "command", openProfileDirectory);
    // Set event listener on open about:config button
    setEventListener("firedragon-config-link", "command", openAboutConfig);

    // Notify observers that the UI is now ready
    Services.obs.notifyObservers(window, "firedragon-pane-loaded");
  },
};

Preferences.get("identity.fxaccounts.enabled").on("change", () => {
  confirmRestartPrompt(
    Services.prefs.getBoolPref("identity.fxaccounts.enabled"), // Restart is required to *enable* / *disable* the pref
    1, // Default Button Index
    true, // Cancel instead of Revert Button
    false // No Restart Later button
  ).then(buttonIndex => {
    if (buttonIndex == CONFIRM_RESTART_PROMPT_RESTART_NOW) {
      Services.startup.quit(
        Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart
      );
      return;
    }
  });
});

function openProfileDirectory() {
  // Get the profile directory.
  let currProfD = Services.dirsvc.get("ProfD", Ci.nsIFile);
  let profileDir = currProfD.path;

  // Show the profile directory.
  let nsLocalFile = Components.Constructor(
    "@mozilla.org/file/local;1",
    "nsIFile",
    "initWithPath"
  );
  new nsLocalFile(profileDir).reveal();
}

function openAboutConfig() {
  window.open("about:config", "_blank");
}

function setXOriginPolicySyncListeners(checkboxid, pref, onVals, offVals) {
  setSyncFromPrefListener(checkboxid, () => onVals.includes(getPref(pref)));
  setSyncToPrefListener(checkboxid, () =>
    writeGenericPrefs([pref], [2], [0], document.getElementById(checkboxid).checked)
  );
  Preferences.get(pref).on("change", () =>
    makeMasterCheckboxesReactive(checkboxid, () =>
      onVals.includes(getPref(pref))
    )
  );
}

function setBoolSyncListeners(checkboxid, opts, vals) {
  setSyncFromPrefListener(checkboxid, () => readGenericBoolPrefs(opts, vals));
  setSyncToPrefListener(checkboxid, () => writeGenericBoolPrefs(opts, vals, document.getElementById(checkboxid).checked));
  for (let i = 1; i < opts.length; i++) {
    Preferences.get(opts[i]).on("change", () => makeMasterCheckboxesReactive(checkboxid, () => readGenericBoolPrefs(opts, vals)));
  }
}
function setSyncListeners(checkboxid, opts, onVals, offVals) {
  setSyncFromPrefListener(checkboxid, () => readGenericPrefs(opts, onVals, offVals));
  setSyncToPrefListener(checkboxid, () => writeGenericPrefs(opts, onVals, offVals, document.getElementById(checkboxid).checked));
  for (let i = 1; i < opts.length; i++) {
    Preferences.get(opts[i]).on("change", () => makeMasterCheckboxesReactive(checkboxid, () => readGenericPrefs(opts, onVals, offVals)));
  }
}

function makeMasterCheckboxesReactive(checkboxid, func) {
  const shouldBeChecked = func();
  document.getElementById(checkboxid).checked = shouldBeChecked;
}

// Wrapper function in case something more is required (as I suspected in the first iteration of this)
function getPref(pref) {
  const retval = Preferences.get(pref);
/*  if (retval === undefined) {
    return defaultValue;
  } */
  return retval._value;
}
// Returns true if all the preferences in prefs are equal to onVals, false otherwise TODO may need a third array for their default values because mozilla is dumb, after testing though pretty sure this was misinformation being spread by comments in default FF code that has long since been fixed
function readGenericBoolPrefs(prefs, onVals) {
  for (let i = 0; i < prefs.length; i++) {
    if (getPref(prefs[i]) != onVals[i]) {
      return false;
    }
  }
  return true;
}
function writeGenericBoolPrefs(opts, vals, changeToOn) {
  valsCopy = [...vals];
  if (!changeToOn) {
    for (let i = 0; i < vals.length; i++) {
      valsCopy[i] = !vals[i];
    }
  }
  // Start at 1 because returning sets the last one
  for (let i = 1; i < vals.length; i++) {
    Services.prefs.setBoolPref(opts[i], valsCopy[i]);
  }
  return valsCopy[0];
}

// Returns true if all the preferences in prefs are equal to onVals, false otherwise... currently the same as for Bool as offVals is ignored
function readGenericPrefs(prefs, onVals, offVals) {
  for (let i = 0; i < prefs.length; i ++) {
    let temp = getPref(prefs[i]);
    if (getPref(prefs[i]) != onVals[i]) {
      return false;
    }
  }
  return true;
}
function writeGenericPrefs(opts, onVals, offVals, changeToOn) {
  let writeArr = (changeToOn) ? onVals : offVals;
  for (let i = 1; i < opts.length; i++) {
    let type = typeof(writeArr[i]);
    if (type == "number") {
      Services.prefs.setIntPref(opts[i], writeArr[i]);
    } else if (type == "boolean") {
      Services.prefs.setBoolPref(opts[i], writeArr[i]);
    } else if (type == "string") {
      Services.prefs.setCharPref(opts[i], writeArr[i]);
    } else {
      console.log("BADNESS 10000");
    }
  }
  return writeArr[0];
}
