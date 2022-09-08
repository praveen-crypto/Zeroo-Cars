delete from fuel_and_performance where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO fuel_and_performance
(
  REGESTRATION_NUMBER,
  FULE_TYPE,
  MILEAGE_ARAI,
  CITY_MILEAGE,
  FUEL_TANK_CAPACITY,
  EMISSION_NORM_COMPLIANCE
)
VALUES
(
  %(regestration_number)s,
%(fule_type)s,
%(mileage_arai)s,
%(city_mileage)s,
%(fuel_tank_capacity)s,
%(emission_norm_compliance)s
);
