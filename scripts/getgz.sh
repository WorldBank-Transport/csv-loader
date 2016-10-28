#!/bin/bash
set -x
dir=$1
#day=$2
file=${dir}_*

mkdir -p $dir
aws s3 cp s3://analytics-redshift/driver_locations/${dir}/ ./${dir}/ --exclude "*" --include ${file} --recursive


parseday=${dir}
sh script-parse.sh ${parseday} ${dir}
