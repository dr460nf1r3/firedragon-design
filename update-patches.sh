#!/bin/bash

function move {
    mv "$1.patch" "../../patches/$2"
}

UPPER=$(pwd)

git clone https://gitlab.com/librewolf-community/browser/source.git librewolf
cd librewolf/patches

move sed-patches/allow-searchengines-non-esr sed-patches
move sed-patches/stop-undesired-requests sed-patches

move ui-patches/* librewolf-ui

move custom-ubo-assets-bootstrap-location librewolf
move dbus_name librewolf
move disable-data-reporting-at-compile-time librewolf
move librewolf-pref-pane librewolf
move mozilla-kde librewolf
move mozilla-kde_after_unity librewolf
move mozilla-vpn-ad2 librewolf
move remove_addons librewolf
move unity-menubar librewolf

cd $UPPER
git clone https://github.com/CachyOS/CachyOS-Browser-Common.git gentoo
cd gentoo/patches

move gentoo/* gentoo

cd ../../
rm -rf {librewolf,gentoo}
