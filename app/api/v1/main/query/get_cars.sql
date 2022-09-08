SELECT basic.regestration_number,
  number_plate,
  car_name,
  history,
  kilometer,
  model,
  brand,
  manufacture_year,
  color,
  viewable,
  price,
  engine_type,
  cubic_capacity,
  transmission_type,
  fule_type,
  number_of_owner,
  CASE
    WHEN thumbnail_photo.REGESTRATION_NUMBER IS NULL THEN NULL
    ELSE CAST(CONCAT('[',GROUP_CONCAT(JSON_OBJECT ('sort',thumbnail_photo.sort,'image',concat(%(image)s,thumbnail_photo.name,'/'))),']') AS JSON)
  END thumbnail
  FROM basic
  LEFT JOIN engine_and_transmission ON (engine_and_transmission.REGESTRATION_NUMBER = basic.REGESTRATION_NUMBER)
  LEFT JOIN vehicle_documents ON (vehicle_documents.REGESTRATION_NUMBER = basic.REGESTRATION_NUMBER)
  LEFT JOIN fuel_and_performance ON (fuel_and_performance.REGESTRATION_NUMBER = basic.REGESTRATION_NUMBER)
  LEFT JOIN thumbnail_photo ON (thumbnail_photo.REGESTRATION_NUMBER = basic.REGESTRATION_NUMBER)
  where viewable AND   sold = FALSE and price>= %(min_price)s and price<= %(max_price)s and IFNULL(NUMBER_OF_OWNER, 1)<=%(number_of_owners)s and kilometer<=%(kilometer)s {} 
  group by basic.REGESTRATION_NUMBER
  limit %(offset)s,%(limit)s