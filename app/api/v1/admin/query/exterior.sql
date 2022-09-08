delete from exterior where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO exterior
(
  REGESTRATION_NUMBER,
  ADJUSTABLE_HEADLIGHTS,
  FOG_LIGHTS_FRONT,
  FOG_LIGHTS_REAR,
  POWER_ADJUSTABLE_EXTERIOR_REAR_VIEW_MIRROR,
  MANUALLY_ADJUSTABLE_EXTERIOR_REAR_VIEW_MIRROR,
  ELECTRIC_FOLDING_REAR_VIEW_MIRROR,
  RAIN_SENSING_WIPER,
  REAR_WINDOW_WIPER,
  REAR_WINDOW_WASHER,
  REAR_WINDOW_DEFOGGER,
  WHEEL_COVERS,
  ALLOY_WHEELS,
  POWER_ANTENNA,
  TINTED_GLASS,
  REAR_SPOILER,
  REMOVABLE_CONVERTIBLE_TOP,
  ROOF_CARRIER,
  SUN_ROOF,
  MOON_ROOF,
  SIDE_STEPPER,
  OUTSIDE_REAR_VIEW_MIRROR_TURN_INDICATORS,
  INTEGRATED_ANTENNA,
  CHROME_GRILLE,
  CHROME_GARNISH,
  SMOKE_HEADLAMPS,
  HALOGEN_HEADLAMPS,
  ROOF_RAIL,
  LIGHTING,
  TRUNK_OPENER,
  ALLOY_WHEELS_SIZE,
  TYRE_SIZE,
  TYRE_TYPE,
  LED_DRLS,
  LED_HEADLIGHTS,
  LED_TAILLIGHTS,
  LED_FOG_LAMPS
)
VALUES
(%(regestration_number)s,
%(adjustable_headlights)s,
%(fog_lights_front)s,
%(fog_lights_rear)s,
%(power_adjustable_exterior_rear_view_mirror)s,
%(manually_adjustable_exterior_rear_view_mirror)s,
%(electric_folding_rear_view_mirror)s,
%(rain_sensing_wiper)s,
%(rear_window_wiper)s,
%(rear_window_washer)s,
%(rear_window_defogger)s,
%(wheel_covers)s,
%(alloy_wheels)s,
%(power_antenna)s,
%(tinted_glass)s,
%(rear_spoiler)s,
%(removable_convertible_top)s,
%(roof_carrier)s,
%(sun_roof)s,
%(moon_roof)s,
%(side_stepper)s,
%(outside_rear_view_mirror_turn_indicators)s,
%(integrated_antenna)s,
%(chrome_grille)s,
%(chrome_garnish)s,
%(smoke_headlamps)s,
%(halogen_headlamps)s,
%(roof_rail)s,
%(lighting)s,
%(trunk_opener)s,
%(alloy_wheels_size)s,
%(tyre_size)s,
%(tyre_type)s,
%(led_drls)s,
%(led_headlights)s,
%(led_taillights)s,
%(led_fog_lamps)s
);
