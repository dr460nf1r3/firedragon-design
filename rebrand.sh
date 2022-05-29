#!/usr/bin/env sh
rebrand() {
    find ./* -type f -exec sed -i "s/$1/$2/g" {} +
}

rebrand "\/io\/gitlab\/" "\/org\/garudalinux\/"
rebrand "io.gitlab." "org.garudalinux."
rebrand LibreWolf FireDragon
rebrand Librewolf FireDragon
rebrand librewolf firedragon
rebrand "fredragon\.net" "librewolf.net"
rebrand "#why-is-firedragon-forcing-light-theme" "#why-is-librewolf-forcing-light-theme"
rebrand kmozillahelper kfiredragonhelper