SELECT *
FROM admin
WHERE phone = %(phone)s
LIMIT 1;