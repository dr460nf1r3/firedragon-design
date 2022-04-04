#!/usr/bin/env sh
rebrand() {
    find ./* -type f -exec sed -i "s/$1/$2/g" {} +
}

rebrand LibreWolf FireDragon
rebrand kmozillahelper kfiredragonhelper