delete from engine_and_transmission where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO engine_and_transmission
(
  REGESTRATION_NUMBER,
  ENGINE_TYPE,
  CUBIC_CAPACITY,
  MAX_POWER,
  MAX_TORQUE,
  NUMBER_OF_CYLINDER,
  VALVES_PER_CYLINDER,
  VALVE_CONFIGRATION,
  TURBO_CHARGER,
  SUPER_CHARGER,
  TRANSMISSION_TYPE,
  GEAR_BOX,
  MILD_HYBRID,
  DRIVE_TYPE
)
VALUES
(
  %(regestration_number)s,
%(engine_type)s,
%(cubic_capacity)s,
%(max_power)s,
%(max_torque)s,
%(number_of_cylinder)s,
%(valves_per_cylinder)s,
%(valve_configration)s,
%(turbo_charger)s,
%(super_charger)s,
%(transmission_type)s,
%(gear_box)s,
%(mild_hybrid)s,
%(drive_type)s
);
