delete from features where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO features
(
  REGESTRATION_NUMBER,
  POWER_STEERING,
  ABS,
  DRIVER_AIRBAG,
  AUTOMATIC_CLIMATE_CONTROL,
  ALLOY_WHEELS,
  POWER_WINDOWS_FRONT,
  AIR_CONDITIONER,
  PASSENGER_AIRBAG,
  FOG_LIGHTS_FRONT
)
VALUES
(%(regestration_number)s,
%(power_steering)s,
%(abs)s,
%(driver_airbag)s,
%(automatic_climate_control)s,
%(alloy_wheels)s,
%(power_windows_front)s,
%(air_conditioner)s,
%(passenger_airbag)s,
%(fog_lights_front)s
);
