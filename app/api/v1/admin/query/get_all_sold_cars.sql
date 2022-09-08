select 
  basic.regestration_number,
        
  number_plate,
  owner_name,
  owner_phone_number,
  car_name,
  chassis_number,
  history,
  kilometer,
  model,
  brand,
  manufacture_year,
  color,
  cast(created as char) as created,
  cast(sold_date as char) as sold_date,
  sold_price,
  sold_notes,
  CASE
    WHEN thumbnail_photo.REGESTRATION_NUMBER IS NULL THEN NULL
    ELSE CAST(CONCAT('[',GROUP_CONCAT(JSON_OBJECT ('sort',thumbnail_photo.sort,'image',concat(%(image)s,thumbnail_photo.name, '/'))),']') AS JSON)
  END thumbnail

from basic
LEFT JOIN thumbnail_photo ON (thumbnail_photo.REGESTRATION_NUMBER = basic.REGESTRATION_NUMBER)
where sold = True
group by basic.REGESTRATION_NUMBER
order by created limit %(offset)s,%(limit)s;