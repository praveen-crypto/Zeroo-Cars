delete from suspension_and_brakes where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO suspension_and_brakes
(
  REGESTRATION_NUMBER,
  FRONT_STRUT_ASSEMBLY,
  STEERING_BOX_ASSEMBLY,
  POWER_STEERING_ASSEMBLY,
  REAR_SHOCK_ASSEMBLY,
  FRONT_DISC_AND_PADS,
  REAR_DRUM_AND_SHOES,
  SUSPENSION_AND_BRAKES_REMARK
)
VALUES
(
  %(regestration_number)s,
%(front_strut_assembly)s,
%(steering_box_assembly)s,
%(power_steering_assembly)s,
%(rear_shock_assembly)s,
%(front_disc_and_pads)s,
%(rear_drum_and_shoes)s,
%(suspension_and_brakes_remark)s
);
