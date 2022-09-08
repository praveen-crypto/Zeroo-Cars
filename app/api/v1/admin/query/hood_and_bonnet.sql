delete from hood_and_bonnet where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO hood_and_bonnet
(
  REGESTRATION_NUMBER,
  RH_SIDE_APRON,
  RADIATOR,
  WIRING,
  BRAKE_FLUID_LEVEL,
  ENGINE_OIL,
  OIL_AND_FLUID_LEAKAGE,
  COOLANT_LEVEL,
  BRAKE_AND_COOLANT_HOSE_PIPE,
  UNDERCARRIAGE,
  CHASSIS_AND_VEHICLE_FRAME,
  EXHAUST_SYSTEM,
  HOOD_AND_BONNET_REMARK
)
VALUES
(
  %(regestration_number)s,
%(rh_side_apron)s,
%(radiator)s,
%(wiring)s,
%(brake_fluid_level)s,
%(engine_oil)s,
%(oil_and_fluid_leakage)s,
%(coolant_level)s,
%(brake_and_coolant_hose_pipe)s,
%(undercarriage)s,
%(chassis_and_vehicle_frame)s,
%(exhaust_system)s,
%(hood_and_bonnet_remark)s
);
