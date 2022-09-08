select 
concat(%(image)s,name,'/') as image
,sort from {table} where regestration_number = %(regestration_number)s order by sort;