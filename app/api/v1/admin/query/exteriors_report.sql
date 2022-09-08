delete from exteriors_report where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO exteriors_report
(
  REGESTRATION_NUMBER,
  FRONT_BONNET,
  LICENSE_PLATE,
  FFRONT_BUMPER,
  RH_SIDE_FENDER,
  RH_SIDE_REAR_DOOR,
  RH_QUARTER_PANEL,
  BOOT,
  REAR_BUMPER,
  LH_SIDE_QUARTER_PANEL,
  LH_SIDE_REAR_DOOR,
  LH_SIDE_FRONT_DOOR,
  LH_SIDE_FENDER,
  WINDSHELD_FRONT,
  REAR_GLASS,
  ROOF,
  PILLARS,
  SIDE_VIEW_MIRRORS,
  FUEL_LID,
  PAINT_OVERSPRAY,
  PAINT_PEEL_OFF,
  PAINT_CONDITION,
  RUNNING_BOARD,
  EXTERIORS_REMARK
)
VALUES
(
  %(regestration_number)s,
%(front_bonnet)s,
%(license_plate)s,
%(ffront_bumper)s,
%(rh_side_fender)s,
%(rh_side_rear_door)s,
%(rh_quarter_panel)s,
%(boot)s,
%(rear_bumper)s,
%(lh_side_quarter_panel)s,
%(lh_side_rear_door)s,
%(lh_side_front_door)s,
%(lh_side_fender)s,
%(windsheld_front)s,
%(rear_glass)s,
%(roof)s,
%(pillars)s,
%(side_view_mirrors)s,
%(fuel_lid)s,
%(paint_overspray)s,
%(paint_peel_off)s,
%(paint_condition)s,
%(running_board)s,
%(exteriors_remark)s
);