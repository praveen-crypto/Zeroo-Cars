UPDATE basic 
SET 
owner_name = %(owner_name)s,
owner_phone_number = %(owner_phone_number)s,
car_name = %(car_name)s,
chassis_number = %(chassis_number)s,
history =%(history)s,
kilometer = %(kilometer)s,
model = %(model)s,
brand =  %(brand)s,
manufacture_year = %(manufacture_year)s,
color = %(color)s,
number_plate = %(number_plate)s,
price = %(price)s
WHERE REGESTRATION_NUMBER = %(regestration_number)s;