delete from suspension_steering_and_brakes where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO suspension_steering_and_brakes
(
  REGESTRATION_NUMBER,
  FRONT_SUSPENSION,
  REAR_SUSPENSION,
  SHOCK_ABSORBERS_TYPE,
  STEERING_TYPE,
  STEERING_COLUMN,
  STEERING_GEAR_TYPE,
  TURNING_RADIUS,
  FRONT_BRAKE_TYPE,
  REAR_BRAKE_TYPE
)
VALUES
(
  %(regestration_number)s,
%(front_suspension)s,
%(rear_suspension)s,
%(shock_absorbers_type)s,
%(steering_type)s,
%(steering_column)s,
%(steering_gear_type)s,
%(turning_radius)s,
%(front_brake_type)s,
%(rear_brake_type)s
);
