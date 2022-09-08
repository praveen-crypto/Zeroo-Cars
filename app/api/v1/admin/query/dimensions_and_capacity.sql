delete from dimensions_and_capacity where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO dimensions_and_capacity
(
  REGESTRATION_NUMBER,
  LENGTH,
  WIDTH,
  HEIGHT,
  SEATING_CAPACITY,
  WHEEL_BASE,
  FRONT_TREAD,
  REAR_TREAD,
  KERB_WEIGHT,
  GROSS_WEIGHT,
  NO_OF_DOORS,
  body_type
)
VALUES
(
  %(regestration_number)s,
%(length)s,
%(width)s,
%(height)s,
%(seating_capacity)s,
%(wheel_base)s,
%(front_tread)s,
%(rear_tread)s,
%(kerb_weight)s,
%(gross_weight)s,
%(no_of_doors)s,
%(body_type)s
);
