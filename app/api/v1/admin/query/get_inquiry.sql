SELECT 
    id,
    regestration_number,    
    inquiry_type,
    name,
    phone,
    email,
    message,
    car_brand,
    car_model,
    registration_year,
    notes,
    CAST(created AS CHAR) AS created
FROM inquiry 
where inquiry_type = %(inquiry_type)s
order by created desc
limit %(offset)s,%(limit)s;