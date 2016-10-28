
sort -t ',' -k1 -o bangkok-sorted.csv -T /var/data/tmp bangkok.csv 
sort -t ',' -k1 -o cebu-sorted.csv -T /var/data/tmp  cebu.csv   
sort -t ',' -k1 -o hanoi-sorted.csv -T /var/data/tmp hanoi.csv      
sort -t ',' -k1 -o iloilo-sorted.csv -T /var/data/tmp iloilo.csv   
sort -t ',' -k1 -o kualalumpur-sorted.csv -T /var/data/tmp kualalumpur.csv  
sort -t ',' -k1 -o other-sorted.csv -T /var/data/tmp other.csv
sort -t ',' -k1 -o butterworth-sorted.csv -T /var/data/tmp butterworth.csv  
sort -t ',' -k1 -o davao-sorted.csv -T /var/data/tmp davao.csv  
sort -t ',' -k1 -o hochiminh-sorted.csv -T /var/data/tmp hochiminh.csv  
sort -t ',' -k1 -o jakarta-sorted.csv -T /var/data/tmp jakarta.csv  
sort -t ',' -k1 -o manila-sorted.csv -T /var/data/tmp manila.csv       
sort -t ',' -k1 -o singapore-sorted.csv -T /var/data/tmp singapore.csv

gzip -c bangkok-sorted.csv > bangkok-sorted.csv.gz
gzip -c davao-sorted.csv > davao-sorted.csv.gz
gzip -c iloilo-sorted.csv > iloilo-sorted.csv.gz
gzip -c manila-sorted.csv > manila-sorted.csv.gz
gzip -c butterworth-sorted.csv > butterworth-sorted.csv.gz
gzip -c hanoi-sorted.csv > hanoi-sorted.csv.gz
gzip -c jakarta-sorted.csv > jakarta-sorted.csv.gz
gzip -c other-sorted.csv > other-sorted.csv.gz
gzip -c cebu-sorted.csv  > cebu-sorted.csv.gz
gzip -c hochiminh-sorted.csv > hochiminh-sorted.csv.gz
gzip -c kualalumpur-sorted.csv > kualalumpur-sorted.csv.gz
gzip -c singapore-sorted.csv > singapore-sorted.csv.gz




