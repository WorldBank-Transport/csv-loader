#!/bin/sh

#parallel --dry-run -j 1 ./wrap-parse.sh 2016_03_03 ::: `seq -w 3 8`

set -x
folder=$1
day=$1
output=output-$day
mkdir -p $output
if [ -z `find $folder -iname $day*00.gz` ]; then
    echo "empty"
    exit 0
fi
parallel  "gunzip -dc {} > {/.}" ::: `find $folder -iname $day*00.gz`
parallel --ungroup node parse.js {/} $output ::: `find . -iname "$day*00"`

#parallel -v sort -t ',' {} -k1  -o {.}-sorted.csv ::: `find output-$day -name "*.csv"`

#parallel -v "gzip -c {} > {}.gz" ::: `find $output -name "*-sorted.csv"`
#parallel -v "gzip -c {} > {}.gz" ::: `find $output -name "*.json"`
#gzout=$output-gz
#mkdir -p $gzout
#mv $output/*.gz $gzout
#rm -r $output
rm $day*
rm $folder/$day*
