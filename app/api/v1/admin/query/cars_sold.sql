UPDATE basic
   SET sold = TRUE,
       sold_price = %(price)s,
       sold_date = %(date)s,
       sold_notes = %(sold_notes)s
WHERE REGESTRATION_NUMBER = %(reg_no)s