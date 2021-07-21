#! /usr/bin/env bash

# Description: Converts a Plant UML file to a given format
# Note that the output file is named according to the title embedded in the puml file

if [[ "$#" -ne 3 ]] ; then echo "error: Incorrect parameters [Output directory] [Format] [Diagram]" && exit -1 ; fi

if [[ -z "${PLANT_UML_JAR}" ]] ; then echo "error: You must set PLANT_UML_JAR to use this script. It is the full path to your plantuml.jar file" && exit -1 ; fi

echo "$(date +%Y:%m:%dT%H:%M:%SZ) Converting $3 to $2. Output directory: $1"
java -Djava.awt.headless=true -jar $PLANT_UML_JAR -t$2 $3 -o $1
