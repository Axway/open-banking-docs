#! /usr/bin/env bash

scripts_dir=$(dirname $0)

if [[ "$#" -ne "3" ]] ; then echo "error: Incorrect parameters [monitor directory] [target directory] [format]" ; fi

fswatch -0 $1 | xargs -0 -n 1 -I {} $scripts_dir/convert-plantuml.sh $2 $3 {}
