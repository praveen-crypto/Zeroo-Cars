select 
concat(%(image)s,name,'/') as image
,sort from {table} order by sort;