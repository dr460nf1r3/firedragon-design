#!/bin/bash

git clone https://github.com/CachyOS/CachyOS-Browser-Common.git gentoo && cd gentoo/patches

move gentoo/* gentoo

cd ../../
rm -rf gentoo
