SELECT JSON_OBJECT('regestration_number','number_plate',number_plate,basic.regestration_number,'car_name',car_name,'history',history,'kilometer',kilometer,'model',model,'brand',brand,'manufacture_year',manufacture_year,'color',color,'price',price) AS basic,
       JSON_OBJECT('power_steering',comfort_and_convenience.POWER_STEERING,'power_windowsfront',comfort_and_convenience.POWER_WINDOWSFRONT,'power_windows_rear',comfort_and_convenience.POWER_WINDOWS_REAR,'power_boot',comfort_and_convenience.POWER_BOOT,'air_conditioner',comfort_and_convenience.AIR_CONDITIONER,'heater',comfort_and_convenience.HEATER,'adjustable_steering',comfort_and_convenience.ADJUSTABLE_STEERING,'automatic_climate_control',comfort_and_convenience.AUTOMATIC_CLIMATE_CONTROL,'air_quality_control',comfort_and_convenience.AIR_QUALITY_CONTROL,'remote_trunk_opener',comfort_and_convenience.REMOTE_TRUNK_OPENER,'remote_fuel_lid_opener',comfort_and_convenience.REMOTE_FUEL_LID_OPENER,'remote_engine_start_stop',comfort_and_convenience.REMOTE_ENGINE_START_STOP,'low_fuel_warning_light',comfort_and_convenience.LOW_FUEL_WARNING_LIGHT,'accessory_power_outlet',comfort_and_convenience.ACCESSORY_POWER_OUTLET,'trunk_light',comfort_and_convenience.TRUNK_LIGHT,'remote_horn_and_light_control',comfort_and_convenience.REMOTE_HORN_AND_LIGHT_CONTROL,'vanity_mirror',comfort_and_convenience.VANITY_MIRROR,'rear_reading_lamp',comfort_and_convenience.REAR_READING_LAMP,'rear_seat_headrest',comfort_and_convenience.REAR_SEAT_HEADREST,'adjustable_headrest',comfort_and_convenience.ADJUSTABLE_HEADREST,'rear_seat_centre_arm_rest',comfort_and_convenience.REAR_SEAT_CENTRE_ARM_REST,'height_adjustable_front_seat_belts',comfort_and_convenience.HEIGHT_ADJUSTABLE_FRONT_SEAT_BELTS,'cup_holders_front',comfort_and_convenience.CUP_HOLDERS_FRONT,'cup_holders_rear',comfort_and_convenience.CUP_HOLDERS_REAR,'rear_ac_vents',comfort_and_convenience.REAR_AC_VENTS,'heated_seats_front',comfort_and_convenience.HEATED_SEATS_FRONT,'heated_seats_rear',comfort_and_convenience.HEATED_SEATS_REAR,'seat_lumbar_support',comfort_and_convenience.SEAT_LUMBAR_SUPPORT,'active_noise_cancellation',comfort_and_convenience.ACTIVE_NOISE_CANCELLATION,'cruise_control',comfort_and_convenience.CRUISE_CONTROL,'parking_sensors',comfort_and_convenience.PARKING_SENSORS,'navigation_system',comfort_and_convenience.NAVIGATION_SYSTEM,'find_my_car_location',comfort_and_convenience.FIND_MY_CAR_LOCATION,'real_time_vehicle_tracking',comfort_and_convenience.REAL_TIME_VEHICLE_TRACKING,'foldable_rear_seat',comfort_and_convenience.FOLDABLE_REAR_SEAT,'smart_access_card_entry',comfort_and_convenience.SMART_ACCESS_CARD_ENTRY,'keyless_entry',comfort_and_convenience.KEYLESS_ENTRY,'engine_start_stop_button',comfort_and_convenience.ENGINE_START_STOP_BUTTON,'glove_box_cooling',comfort_and_convenience.GLOVE_BOX_COOLING,'voice_control',comfort_and_convenience.VOICE_CONTROL,'steering_wheel_gearshift_paddles',comfort_and_convenience.STEERING_WHEEL_GEARSHIFT_PADDLES,'usb_charger',comfort_and_convenience.USB_CHARGER,'central_console_armrest',comfort_and_convenience.CENTRAL_CONSOLE_ARMREST,'tailgate_ajar',comfort_and_convenience.TAILGATE_AJAR,'gear_shift_indicator',comfort_and_convenience.GEAR_SHIFT_INDICATOR,'rear_curtain',comfort_and_convenience.REAR_CURTAIN,'luggage_hook_and_net',comfort_and_convenience.LUGGAGE_HOOK_AND_NET,'battery_saver',comfort_and_convenience.BATTERY_SAVER,'lane_change_indicator',comfort_and_convenience.LANE_CHANGE_INDICATOR,'drive_modes',comfort_and_convenience.DRIVE_MODES) AS comfort_and_convenience,
       JSON_OBJECT('length',dimensions_and_capacity.LENGTH,'width',dimensions_and_capacity.WIDTH,'height',dimensions_and_capacity.HEIGHT,'seating_capacity',dimensions_and_capacity.SEATING_CAPACITY,'wheel_base',dimensions_and_capacity.WHEEL_BASE,'front_tread',dimensions_and_capacity.FRONT_TREAD,'rear_tread',dimensions_and_capacity.REAR_TREAD,'kerb_weight',dimensions_and_capacity.KERB_WEIGHT,'gross_weight',dimensions_and_capacity.GROSS_WEIGHT,'no_of_doors',dimensions_and_capacity.NO_OF_DOORS,'body_type',dimensions_and_capacity.body_type) AS dimensions_and_capacity,
       JSON_OBJECT('engine_type',engine_and_transmission.ENGINE_TYPE,'cubic_capacity',engine_and_transmission.CUBIC_CAPACITY,'max_power',engine_and_transmission.MAX_POWER,'max_torque',engine_and_transmission.MAX_TORQUE,'number_of_cylinder',engine_and_transmission.NUMBER_OF_CYLINDER,'valves_per_cylinder',engine_and_transmission.VALVES_PER_CYLINDER,'valve_configration',engine_and_transmission.VALVE_CONFIGRATION,'turbo_charger',engine_and_transmission.TURBO_CHARGER,'super_charger',engine_and_transmission.SUPER_CHARGER,'transmission_type',engine_and_transmission.TRANSMISSION_TYPE,'gear_box',engine_and_transmission.GEAR_BOX,'mild_hybrid',engine_and_transmission.MILD_HYBRID,'drive_type',engine_and_transmission.DRIVE_TYPE) AS engine_and_transmission,
       JSON_OBJECT('cd_player',entertainment_and_communication.CD_PLAYER,'cd_changer',entertainment_and_communication.CD_CHANGER,'dvd_player',entertainment_and_communication.DVD_PLAYER,'radio',entertainment_and_communication.RADIO,'audio_system_remote_control',entertainment_and_communication.AUDIO_SYSTEM_REMOTE_CONTROL,'speakers_front',entertainment_and_communication.SPEAKERS_FRONT,'speakers_rear',entertainment_and_communication.SPEAKERS_REAR,'integrated_2din_audio',entertainment_and_communication.INTEGRATED_2DIN_AUDIO,'usb_and_auxiliary_input',entertainment_and_communication.USB_AND_AUXILIARY_INPUT,'bluetooth_connectivity',entertainment_and_communication.BLUETOOTH_CONNECTIVITY,'wifi_connectivity',entertainment_and_communication.WIFI_CONNECTIVITY,'touch_screen',entertainment_and_communication.TOUCH_SCREEN,'touch_screen_size',entertainment_and_communication.TOUCH_SCREEN_SIZE,'connectivity',entertainment_and_communication.CONNECTIVITY,'android_auto',entertainment_and_communication.ANDROID_AUTO,'apple_carplay',entertainment_and_communication.APPLE_CARPLAY,'internal_storage',entertainment_and_communication.INTERNAL_STORAGE,'number_of_speakers',entertainment_and_communication.NUMBER_OF_SPEAKERS,'rear_entertainment_system',entertainment_and_communication.REAR_ENTERTAINMENT_SYSTEM) AS entertainment_and_communication,
       JSON_OBJECT('adjustable_headlights',exterior.ADJUSTABLE_HEADLIGHTS,'fog_lights_front',exterior.FOG_LIGHTS_FRONT,'fog_lights_rear',exterior.FOG_LIGHTS_REAR,'power_adjustable_exterior_rear_view_mirror',exterior.POWER_ADJUSTABLE_EXTERIOR_REAR_VIEW_MIRROR,'manually_adjustable_exterior_rear_view_mirror',exterior.MANUALLY_ADJUSTABLE_EXTERIOR_REAR_VIEW_MIRROR,'electric_folding_rear_view_mirror',exterior.ELECTRIC_FOLDING_REAR_VIEW_MIRROR,'rain_sensing_wiper',exterior.RAIN_SENSING_WIPER,'rear_window_wiper',exterior.REAR_WINDOW_WIPER,'rear_window_washer',exterior.REAR_WINDOW_WASHER,'rear_window_defogger',exterior.REAR_WINDOW_DEFOGGER,'wheel_covers',exterior.WHEEL_COVERS,'alloy_wheels',exterior.ALLOY_WHEELS,'power_antenna',exterior.POWER_ANTENNA,'tinted_glass',exterior.TINTED_GLASS,'rear_spoiler',exterior.REAR_SPOILER,'removable_convertible_top',exterior.REMOVABLE_CONVERTIBLE_TOP,'roof_carrier',exterior.ROOF_CARRIER,'sun_roof',exterior.SUN_ROOF,'moon_roof',exterior.MOON_ROOF,'side_stepper',exterior.SIDE_STEPPER,'outside_rear_view_mirror_turn_indicators',exterior.OUTSIDE_REAR_VIEW_MIRROR_TURN_INDICATORS,'integrated_antenna',exterior.INTEGRATED_ANTENNA,'chrome_grille',exterior.CHROME_GRILLE,'chrome_garnish',exterior.CHROME_GARNISH,'smoke_headlamps',exterior.SMOKE_HEADLAMPS,'halogen_headlamps',exterior.HALOGEN_HEADLAMPS,'roof_rail',exterior.ROOF_RAIL,'lighting',exterior.LIGHTING,'trunk_opener',exterior.TRUNK_OPENER,'alloy_wheels_size',exterior.ALLOY_WHEELS_SIZE,'tyre_size',exterior.TYRE_SIZE,'tyre_type',exterior.TYRE_TYPE,'led_drls',exterior.LED_DRLS,'led_headlights',exterior.LED_HEADLIGHTS,'led_taillights',exterior.LED_TAILLIGHTS,'led_fog_lamps',exterior.LED_FOG_LAMPS) AS exterior,
       JSON_OBJECT('front_bonnet',exteriors_report.FRONT_BONNET,'license_plate',exteriors_report.LICENSE_PLATE,'ffront_bumper',exteriors_report.FFRONT_BUMPER,'rh_side_fender',exteriors_report.RH_SIDE_FENDER,'rh_side_rear_door',exteriors_report.RH_SIDE_REAR_DOOR,'rh_quarter_panel',exteriors_report.RH_QUARTER_PANEL,'boot',exteriors_report.BOOT,'rear_bumper',exteriors_report.REAR_BUMPER,'lh_side_quarter_panel',exteriors_report.LH_SIDE_QUARTER_PANEL,'lh_side_rear_door',exteriors_report.LH_SIDE_REAR_DOOR,'lh_side_front_door',exteriors_report.LH_SIDE_FRONT_DOOR,'lh_side_fender',exteriors_report.LH_SIDE_FENDER,'windsheld_front',exteriors_report.WINDSHELD_FRONT,'rear_glass',exteriors_report.REAR_GLASS,'roof',exteriors_report.ROOF,'pillars',exteriors_report.PILLARS,'side_view_mirrors',exteriors_report.SIDE_VIEW_MIRRORS,'fuel_lid',exteriors_report.FUEL_LID,'paint_overspray',exteriors_report.PAINT_OVERSPRAY,'paint_peel_off',exteriors_report.PAINT_PEEL_OFF,'paint_condition',exteriors_report.PAINT_CONDITION,'running_board',exteriors_report.RUNNING_BOARD,'exteriors_remark',exteriors_report.EXTERIORS_REMARK) AS exteriors_report,
       JSON_OBJECT('power_steering',features.POWER_STEERING,'abs',features.ABS,'driver_airbag',features.DRIVER_AIRBAG,'automatic_climate_control',features.AUTOMATIC_CLIMATE_CONTROL,'alloy_wheels',features.ALLOY_WHEELS,'power_windows_front',features.POWER_WINDOWS_FRONT,'air_conditioner',features.AIR_CONDITIONER,'passenger_airbag',features.PASSENGER_AIRBAG,'fog_lights_front',features.FOG_LIGHTS_FRONT) AS features,
       JSON_OBJECT('fule_type',fuel_and_performance.FULE_TYPE,'mileage_arai',fuel_and_performance.MILEAGE_ARAI,'city_mileage',fuel_and_performance.CITY_MILEAGE,'fuel_tank_capacity',fuel_and_performance.FUEL_TANK_CAPACITY,'emission_norm_compliance',fuel_and_performance.EMISSION_NORM_COMPLIANCE) AS fuel_and_performance,
       JSON_OBJECT('rh_side_apron',hood_and_bonnet.RH_SIDE_APRON,'radiator',hood_and_bonnet.RADIATOR,'wiring',hood_and_bonnet.WIRING,'brake_fluid_level',hood_and_bonnet.BRAKE_FLUID_LEVEL,'engine_oil',hood_and_bonnet.ENGINE_OIL,'oil_and_fluid_leakage',hood_and_bonnet.OIL_AND_FLUID_LEAKAGE,'coolant_level',hood_and_bonnet.COOLANT_LEVEL,'brake_and_coolant_hose_pipe',hood_and_bonnet.BRAKE_AND_COOLANT_HOSE_PIPE,'undercarriage',hood_and_bonnet.UNDERCARRIAGE,'chassis_and_vehicle_frame',hood_and_bonnet.CHASSIS_AND_VEHICLE_FRAME,'exhaust_system',hood_and_bonnet.EXHAUST_SYSTEM,'hood_and_bonnet_remark',hood_and_bonnet.HOOD_AND_BONNET_REMARK) AS hood_and_bonnet,
       JSON_OBJECT('tachometer',interior.TACHOMETER,'electronic_multi_tripmeter',interior.ELECTRONIC_MULTI_TRIPMETER,'leather_seats',interior.LEATHER_SEATS,'fabric_upholstery',interior.FABRIC_UPHOLSTERY,'leather_steering_wheel',interior.LEATHER_STEERING_WHEEL,'leather_wrap_gear_shift_selector',interior.LEATHER_WRAP_GEAR_SHIFT_SELECTOR,'glove_compartment',interior.GLOVE_COMPARTMENT,'digital_clock',interior.DIGITAL_CLOCK,'outside__temperature_display',interior.OUTSIDE__TEMPERATURE_DISPLAY,'cigarette_lighter',interior.CIGARETTE_LIGHTER,'digital_odameter',interior.DIGITAL_ODAMETER,'electric_adjustable_seats',interior.ELECTRIC_ADJUSTABLE_SEATS,'driving_experience_control_eco',interior.DRIVING_EXPERIENCE_CONTROL_ECO,'folding_table_in_the_rear',interior.FOLDING_TABLE_IN_THE_REAR,'height_adjustable_driver_seat',interior.HEIGHT_ADJUSTABLE_DRIVER_SEAT,'ventilated_seats',interior.VENTILATED_SEATS,'dual_tone_dashboard',interior.DUAL_TONE_DASHBOARD,'lighting',interior.LIGHTING) AS interior,
       JSON_OBJECT('steering',interiors_report.STEERING,'door_pannel_and_hinges',interiors_report.DOOR_PANNEL_AND_HINGES,'dash_board',interiors_report.DASH_BOARD,'interior_trims',interiors_report.INTERIOR_TRIMS,'combination_switch_assembly',interiors_report.COMBINATION_SWITCH_ASSEMBLY,'seat_and_seat_belt_condition',interiors_report.SEAT_AND_SEAT_BELT_CONDITION,'accessorie_audio_and_covers',interiors_report.ACCESSORIE_AUDIO_AND_COVERS,'hand_brake',interiors_report.HAND_BRAKE,'pedals',interiors_report.PEDALS,'horns',interiors_report.HORNS,'carpet_and_floormat',interiors_report.CARPET_AND_FLOORMAT,'odometer_assembly',interiors_report.ODOMETER_ASSEMBLY,'hazard_lights',interiors_report.HAZARD_LIGHTS,'centeal_lock_keyless_entry',interiors_report.CENTEAL_LOCK_KEYLESS_ENTRY,'cruise_control',interiors_report.CRUISE_CONTROL,'boot_condition',interiors_report.BOOT_CONDITION,'jack_and_tommy_available',interiors_report.JACK_AND_TOMMY_AVAILABLE,'wheel_spanner_available',interiors_report.WHEEL_SPANNER_AVAILABLE,'rear_view_camera',interiors_report.REAR_VIEW_CAMERA,'upholstery',interiors_report.UPHOLSTERY,'interior_remark',interiors_report.INTERIOR_REMARK) AS interiors_report,
       JSON_OBJECT('zeroo_rating',over_all_rating.ZEROO_RATING,'exterior_condition',over_all_rating.EXTERIOR_CONDITION,'interior_condition',over_all_rating.INTERIOR_CONDITION,'checkpoints_fulfilled',over_all_rating.CHECKPOINTS_FULFILLED) AS over_all_rating,
       JSON_OBJECT('anti_lock_braking_system',safety.ANTI_LOCK_BRAKING_SYSTEM,'brake_assist',safety.BRAKE_ASSIST,'central_locking',safety.CENTRAL_LOCKING,'power_door_locks',safety.POWER_DOOR_LOCKS,'child_safety_locks',safety.CHILD_SAFETY_LOCKS,'anti_theft_alarm',safety.ANTI_THEFT_ALARM,'number_of_airbag',safety.NUMBER_OF_AIRBAG,'driver_airbag',safety.DRIVER_AIRBAG,'passenger_airbag',safety.PASSENGER_AIRBAG,'side_airbag_front',safety.SIDE_AIRBAG_FRONT,'side_airbag_rear',safety.SIDE_AIRBAG_REAR,'day_and_night_rear_view_mirror',safety.DAY_AND_NIGHT_REAR_VIEW_MIRROR,'passenger_side_rear_view_mirror',safety.PASSENGER_SIDE_REAR_VIEW_MIRROR,'xenon_headlamps',safety.XENON_HEADLAMPS,'rear_seat_belts',safety.REAR_SEAT_BELTS,'seat_belt_warning',safety.SEAT_BELT_WARNING,'door_ajar_warning',safety.DOOR_AJAR_WARNING,'side_impact_beams',safety.SIDE_IMPACT_BEAMS,'front_impact_beams',safety.FRONT_IMPACT_BEAMS,'traction_control',safety.TRACTION_CONTROL,'adjustable_seats',safety.ADJUSTABLE_SEATS,'tyre_pressure_monitor',safety.TYRE_PRESSURE_MONITOR,'vehicle_stability_control_system',safety.VEHICLE_STABILITY_CONTROL_SYSTEM,'engine_immobilizer',safety.ENGINE_IMMOBILIZER,'crash_sensor',safety.CRASH_SENSOR,'centrally_mounted_fuel_tank',safety.CENTRALLY_MOUNTED_FUEL_TANK,'engine_check_warning',safety.ENGINE_CHECK_WARNING,'automatic_headlamps',safety.AUTOMATIC_HEADLAMPS,'clutch_lock',safety.CLUTCH_LOCK,'ebd',safety.EBD,'electronic__stability_control',safety.ELECTRONIC__STABILITY_CONTROL,'follow_me_home_headlamps',safety.FOLLOW_ME_HOME_HEADLAMPS,'rear_camera',safety.REAR_CAMERA,'anti_theft_device',safety.ANTI_THEFT_DEVICE,'speed_sensing_auto_door__lock',safety.SPEED_SENSING_AUTO_DOOR__LOCK,'knee_airbags',safety.KNEE_AIRBAGS,'isofix_child_seat_mounts',safety.ISOFIX_CHILD_SEAT_MOUNTS,'head_up_display',safety.HEAD_UP_DISPLAY,'pretensioners_and_force_limiter_seatbelts',safety.PRETENSIONERS_AND_FORCE_LIMITER_SEATBELTS,'blind_spot_monitor',safety.BLIND_SPOT_MONITOR,'geo_fence_alert',safety.GEO_FENCE_ALERT,'hill_descent_control',safety.HILL_DESCENT_CONTROL,'hill_assist',safety.HILL_ASSIST,'impact_sensing_auto_door_unlock',safety.IMPACT_SENSING_AUTO_DOOR_UNLOCK,'view_camera_360',safety.VIEW_CAMERA_360) AS safety,
       JSON_OBJECT('front_strut_assembly',suspension_and_brakes.FRONT_STRUT_ASSEMBLY,'steering_box_assembly',suspension_and_brakes.STEERING_BOX_ASSEMBLY,'power_steering_assembly',suspension_and_brakes.POWER_STEERING_ASSEMBLY,'rear_shock_assembly',suspension_and_brakes.REAR_SHOCK_ASSEMBLY,'front_disc_and_pads',suspension_and_brakes.FRONT_DISC_AND_PADS,'rear_drum_and_shoes',suspension_and_brakes.REAR_DRUM_AND_SHOES,'suspension_and_brakes_remark',suspension_and_brakes.SUSPENSION_AND_BRAKES_REMARK) AS suspension_and_brakes,
       JSON_OBJECT('accessories_audio_covers',system_and_functions.ACCESSORIES_AUDIO_COVERS,'transmission_control',system_and_functions.TRANSMISSION_CONTROL,'ac_blower',system_and_functions.AC_BLOWER,'cooling',system_and_functions.COOLING,'heater',system_and_functions.HEATER,'abs',system_and_functions.ABS,'airbags',system_and_functions.AIRBAGS,'esp',system_and_functions.ESP,'reverse_parking__assist',system_and_functions.REVERSE_PARKING__ASSIST,'starter_motor',system_and_functions.STARTER_MOTOR,'alterrnator',system_and_functions.ALTERRNATOR,'ac_compressor',system_and_functions.AC_COMPRESSOR,'wiper_assembly_and_blades',system_and_functions.WIPER_ASSEMBLY_AND_BLADES,'battery_condition',system_and_functions.BATTERY_CONDITION,'ignition_and_fuel_system',system_and_functions.IGNITION_AND_FUEL_SYSTEM,'head_and_tail_lamp',system_and_functions.HEAD_AND_TAIL_LAMP,'fog_lamp',system_and_functions.FOG_LAMP,'remote_lock',system_and_functions.REMOTE_LOCK,'interior_light_check',system_and_functions.INTERIOR_LIGHT_CHECK,'power_window',system_and_functions.POWER_WINDOW,'music_system',system_and_functions.MUSIC_SYSTEM,'system_and_functions_remark',system_and_functions.SYSTEM_AND_FUNCTIONS_REMARK) AS system_and_functions,
       JSON_OBJECT('insurance',vehicle_documents.INSURANCE,'rc_status',vehicle_documents.RC_STATUS,'number_of_owner',vehicle_documents.NUMBER_OF_OWNER,'fc_validity',vehicle_documents.FC_VALIDITY,'vehicle_service_log',vehicle_documents.VEHICLE_SERVICE_LOG,'vehicle_documents_remarks',vehicle_documents.VEHICLE_DOCUMENTS_REMARKS) AS vehicle_documents,
       JSON_OBJECT('number_of_tyres',wheels.NUMBER_OF_TYRES,'tyre_condition',wheels.TYRE_CONDITION,'spare_tyre_condition',wheels.SPARE_TYRE_CONDITION,'alloy_wheels',wheels.ALLOY_WHEELS,'wheels_remark',wheels.WHEELS_REMARK) AS wheels
FROM basic
  LEFT JOIN comfort_and_convenience ON (basic.regestration_number = comfort_and_convenience.regestration_number)
  LEFT JOIN dimensions_and_capacity ON (basic.regestration_number = dimensions_and_capacity.regestration_number)
  LEFT JOIN engine_and_transmission ON (basic.regestration_number = engine_and_transmission.regestration_number)
  LEFT JOIN entertainment_and_communication ON (basic.regestration_number = entertainment_and_communication.regestration_number)
  LEFT JOIN exterior ON (basic.regestration_number = exterior.regestration_number)
  LEFT JOIN exteriors_report ON (basic.regestration_number = exteriors_report.regestration_number)
  LEFT JOIN features ON (basic.regestration_number = features.regestration_number)
  LEFT JOIN fuel_and_performance ON (basic.regestration_number = fuel_and_performance.regestration_number)
  LEFT JOIN hood_and_bonnet ON (basic.regestration_number = hood_and_bonnet.regestration_number)
  LEFT JOIN interior ON (basic.regestration_number = interior.regestration_number)
  LEFT JOIN interiors_report ON (basic.regestration_number = interiors_report.regestration_number)
  LEFT JOIN over_all_rating ON (basic.regestration_number = over_all_rating.regestration_number)
  LEFT JOIN safety ON (basic.regestration_number = safety.regestration_number)
  LEFT JOIN suspension_and_brakes ON (basic.regestration_number = suspension_and_brakes.regestration_number)
  LEFT JOIN system_and_functions ON (basic.regestration_number = system_and_functions.regestration_number)
  LEFT JOIN vehicle_documents ON (basic.regestration_number = vehicle_documents.regestration_number)
  LEFT JOIN wheels ON (basic.regestration_number = wheels.regestration_number)
WHERE basic.regestration_number = %(id)s AND   sold = FALSE -- and viewable