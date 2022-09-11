#!/bin/bash
#
# init IndexData ubuntu deb repository

sources_list_d=/etc/apt/sources.list.d
indexdata_list=indexdata.list
apt_key=http://ftp.indexdata.dk/debian/indexdata.asc
deb_url=http://ftp.indexdata.dk

set -e

init_apt() {
    if [[ "$OSTYPE" == "linux-gnu" ]]; then
        file="$sources_list_d/$indexdata_list"
        os=ubuntu

        if [ ! -e $file ]; then 
        	codename=$(lsb_release -c -s)
            wget -O ramin.key $apt_key
		apt-key add ramin.key
            sh -c "echo deb $deb_url/${os} ${codename} main > $file.tmp"
            mv -f $file.tmp $file
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install yaz
    fi
}

init_apt