delete from safety where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO safety
(
  REGESTRATION_NUMBER,
  ANTI_LOCK_BRAKING_SYSTEM,
  BRAKE_ASSIST,
  CENTRAL_LOCKING,
  POWER_DOOR_LOCKS,
  CHILD_SAFETY_LOCKS,
  ANTI_THEFT_ALARM,
  NUMBER_OF_AIRBAG,
  DRIVER_AIRBAG,
  PASSENGER_AIRBAG,
  SIDE_AIRBAG_FRONT,
  SIDE_AIRBAG_REAR,
  DAY_AND_NIGHT_REAR_VIEW_MIRROR,
  PASSENGER_SIDE_REAR_VIEW_MIRROR,
  XENON_HEADLAMPS,
  REAR_SEAT_BELTS,
  SEAT_BELT_WARNING,
  DOOR_AJAR_WARNING,
  SIDE_IMPACT_BEAMS,
  FRONT_IMPACT_BEAMS,
  TRACTION_CONTROL,
  ADJUSTABLE_SEATS,
  TYRE_PRESSURE_MONITOR,
  VEHICLE_STABILITY_CONTROL_SYSTEM,
  ENGINE_IMMOBILIZER,
  CRASH_SENSOR,
  CENTRALLY_MOUNTED_FUEL_TANK,
  ENGINE_CHECK_WARNING,
  AUTOMATIC_HEADLAMPS,
  CLUTCH_LOCK,
  EBD,
  ELECTRONIC__STABILITY_CONTROL,
  FOLLOW_ME_HOME_HEADLAMPS,
  REAR_CAMERA,
  ANTI_THEFT_DEVICE,
  SPEED_SENSING_AUTO_DOOR__LOCK,
  KNEE_AIRBAGS,
  ISOFIX_CHILD_SEAT_MOUNTS,
  HEAD_UP_DISPLAY,
  PRETENSIONERS_AND_FORCE_LIMITER_SEATBELTS,
  BLIND_SPOT_MONITOR,
  GEO_FENCE_ALERT,
  HILL_DESCENT_CONTROL,
  HILL_ASSIST,
  IMPACT_SENSING_AUTO_DOOR_UNLOCK,
  VIEW_CAMERA_360
)
VALUES
(
  %(regestration_number)s,
%(anti_lock_braking_system)s,
%(brake_assist)s,
%(central_locking)s,
%(power_door_locks)s,
%(child_safety_locks)s,
%(anti_theft_alarm)s,
%(number_of_airbag)s,
%(driver_airbag)s,
%(passenger_airbag)s,
%(side_airbag_front)s,
%(side_airbag_rear)s,
%(day_and_night_rear_view_mirror)s,
%(passenger_side_rear_view_mirror)s,
%(xenon_headlamps)s,
%(rear_seat_belts)s,
%(seat_belt_warning)s,
%(door_ajar_warning)s,
%(side_impact_beams)s,
%(front_impact_beams)s,
%(traction_control)s,
%(adjustable_seats)s,
%(tyre_pressure_monitor)s,
%(vehicle_stability_control_system)s,
%(engine_immobilizer)s,
%(crash_sensor)s,
%(centrally_mounted_fuel_tank)s,
%(engine_check_warning)s,
%(automatic_headlamps)s,
%(clutch_lock)s,
%(ebd)s,
%(electronic__stability_control)s,
%(follow_me_home_headlamps)s,
%(rear_camera)s,
%(anti_theft_device)s,
%(speed_sensing_auto_door__lock)s,
%(knee_airbags)s,
%(isofix_child_seat_mounts)s,
%(head_up_display)s,
%(pretensioners_and_force_limiter_seatbelts)s,
%(blind_spot_monitor)s,
%(geo_fence_alert)s,
%(hill_descent_control)s,
%(hill_assist)s,
%(impact_sensing_auto_door_unlock)s,
%(view_camera_360)s
);
