select 
concat(%(image)s,id,'/') as image
from photos where tag = %(tag)s;