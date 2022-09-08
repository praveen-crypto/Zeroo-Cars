from pydantic import BaseModel
from typing import Optional, List, Dict
from fastapi.param_functions import Body, Query, Form
from fastapi import File, UploadFile
import random
from datetime import datetime
import time
import hashlib
from pydantic import BaseModel

from app.constants import PHONE_VALIDATION


async def AdminSigninValidate(
    password: str = Form(...),
    phone: str = Form(..., regex=PHONE_VALIDATION),
    remember_me: bool = Form(False),
):
    return {
        "phone": phone,
        "password": password,
        "remember_me": remember_me,
    }


async def AddCar(
    number_plate: str = Form(...),
    owner_name: str = Form(...),
    owner_phone_number: str = Form(...),
    chassis_number: str = Form(...),
    history: str = Form(""),
    kilometer: str = Form(...),
    model: str = Form(...),
    brand: str = Form(...),
    manufacture_year: str = Form(...),
    color: str = Form(...),
    price: int = Form(...),
    regestration_number: str = Form(""),
):
    return {
        "regestration_number": regestration_number if regestration_number!="" else hashlib.sha256(number_plate.encode()).hexdigest(),
        "owner_name": owner_name,
        "owner_phone_number": owner_phone_number,
        "car_name": manufacture_year + " " + brand.lower() + " " + model.lower(),
        "chassis_number": chassis_number,
        "history": history,
        "kilometer": kilometer,
        "model": model.lower(),
        "brand": brand.lower(),
        "manufacture_year": manufacture_year,
        "color": color,
        "number_plate": number_plate.upper().replace(" ", ""),
        "price": price,
    }


async def ComfortAndConvenience(
    regestration_number: str = Form(...),
    power_steering: bool = Form(...),
    power_windowsfront: bool = Form(...),
    power_windows_rear: bool = Form(...),
    power_boot: bool = Form(...),
    air_conditioner: bool = Form(...),
    heater: bool = Form(...),
    adjustable_steering: bool = Form(...),
    automatic_climate_control: bool = Form(...),
    air_quality_control: bool = Form(...),
    remote_trunk_opener: bool = Form(...),
    remote_fuel_lid_opener: bool = Form(...),
    remote_engine_start_stop: bool = Form(...),
    low_fuel_warning_light: bool = Form(...),
    accessory_power_outlet: bool = Form(...),
    trunk_light: bool = Form(...),
    remote_horn_and_light_control: bool = Form(...),
    vanity_mirror: bool = Form(...),
    rear_reading_lamp: bool = Form(...),
    rear_seat_headrest: bool = Form(...),
    adjustable_headrest: bool = Form(...),
    rear_seat_centre_arm_rest: bool = Form(...),
    height_adjustable_front_seat_belts: bool = Form(...),
    cup_holders_front: bool = Form(...),
    cup_holders_rear: bool = Form(...),
    rear_ac_vents: bool = Form(...),
    heated_seats_front: bool = Form(...),
    heated_seats_rear: bool = Form(...),
    seat_lumbar_support: bool = Form(...),
    active_noise_cancellation: bool = Form(...),
    cruise_control: bool = Form(...),
    parking_sensors: bool = Form(...),
    navigation_system: bool = Form(...),
    find_my_car_location: bool = Form(...),
    real_time_vehicle_tracking: bool = Form(...),
    foldable_rear_seat: bool = Form(...),
    smart_access_card_entry: bool = Form(...),
    keyless_entry: bool = Form(...),
    engine_start_stop_button: bool = Form(...),
    glove_box_cooling: bool = Form(...),
    voice_control: bool = Form(...),
    steering_wheel_gearshift_paddles: bool = Form(...),
    usb_charger: bool = Form(...),
    central_console_armrest: bool = Form(...),
    tailgate_ajar: bool = Form(...),
    gear_shift_indicator: bool = Form(...),
    rear_curtain: bool = Form(...),
    luggage_hook_and_net: bool = Form(...),
    battery_saver: bool = Form(...),
    lane_change_indicator: bool = Form(...),
    drive_modes: int = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "power_steering": power_steering,
        "power_windowsfront": power_windowsfront,
        "power_windows_rear": power_windows_rear,
        "power_boot": power_boot,
        "air_conditioner": air_conditioner,
        "heater": heater,
        "adjustable_steering": adjustable_steering,
        "automatic_climate_control": automatic_climate_control,
        "air_quality_control": air_quality_control,
        "remote_trunk_opener": remote_trunk_opener,
        "remote_fuel_lid_opener": remote_fuel_lid_opener,
        "remote_engine_start_stop": remote_engine_start_stop,
        "low_fuel_warning_light": low_fuel_warning_light,
        "accessory_power_outlet": accessory_power_outlet,
        "trunk_light": trunk_light,
        "remote_horn_and_light_control": remote_horn_and_light_control,
        "vanity_mirror": vanity_mirror,
        "rear_reading_lamp": rear_reading_lamp,
        "rear_seat_headrest": rear_seat_headrest,
        "adjustable_headrest": adjustable_headrest,
        "rear_seat_centre_arm_rest": rear_seat_centre_arm_rest,
        "height_adjustable_front_seat_belts": height_adjustable_front_seat_belts,
        "cup_holders_front": cup_holders_front,
        "cup_holders_rear": cup_holders_rear,
        "rear_ac_vents": rear_ac_vents,
        "heated_seats_front": heated_seats_front,
        "heated_seats_rear": heated_seats_rear,
        "seat_lumbar_support": seat_lumbar_support,
        "active_noise_cancellation": active_noise_cancellation,
        "cruise_control": cruise_control,
        "parking_sensors": parking_sensors,
        "navigation_system": navigation_system,
        "find_my_car_location": find_my_car_location,
        "real_time_vehicle_tracking": real_time_vehicle_tracking,
        "foldable_rear_seat": foldable_rear_seat,
        "smart_access_card_entry": smart_access_card_entry,
        "keyless_entry": keyless_entry,
        "engine_start_stop_button": engine_start_stop_button,
        "glove_box_cooling": glove_box_cooling,
        "voice_control": voice_control,
        "steering_wheel_gearshift_paddles": steering_wheel_gearshift_paddles,
        "usb_charger": usb_charger,
        "central_console_armrest": central_console_armrest,
        "tailgate_ajar": tailgate_ajar,
        "gear_shift_indicator": gear_shift_indicator,
        "rear_curtain": rear_curtain,
        "luggage_hook_and_net": luggage_hook_and_net,
        "battery_saver": battery_saver,
        "lane_change_indicator": lane_change_indicator,
        "drive_modes": drive_modes,
    }


async def DimensionsAndCapacity(
    regestration_number: str = Form(...),
    length: float = Form(...),
    width: float = Form(...),
    height: float = Form(...),
    seating_capacity: int = Form(...),
    wheel_base: float = Form(...),
    front_tread: float = Form(...),
    rear_tread: float = Form(...),
    kerb_weight: float = Form(...),
    gross_weight: float = Form(...),
    no_of_doors: int = Form(...),
    body_type: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "length": length,
        "width": width,
        "height": height,
        "seating_capacity": seating_capacity,
        "wheel_base": wheel_base,
        "front_tread": front_tread,
        "rear_tread": rear_tread,
        "kerb_weight": kerb_weight,
        "gross_weight": gross_weight,
        "no_of_doors": no_of_doors,
        "body_type": body_type,
    }


async def EngineAndTransmission(
    regestration_number: str = Form(...),
    engine_type: str = Form(...),
    cubic_capacity: float = Form(...),
    max_power: str = Form(...),
    max_torque: str = Form(...),
    number_of_cylinder: int = Form(...),
    valves_per_cylinder: int = Form(...),
    valve_configration: str = Form(...),
    turbo_charger: bool = Form(...),
    super_charger: bool = Form(...),
    transmission_type: str = Form(...),
    gear_box: str = Form(...),
    mild_hybrid: bool = Form(...),
    drive_type: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "engine_type": engine_type,
        "cubic_capacity": cubic_capacity,
        "max_power": max_power,
        "max_torque": max_torque,
        "number_of_cylinder": number_of_cylinder,
        "valves_per_cylinder": valves_per_cylinder,
        "valve_configration": valve_configration,
        "turbo_charger": turbo_charger,
        "super_charger": super_charger,
        "transmission_type": transmission_type,
        "gear_box": gear_box,
        "mild_hybrid": mild_hybrid,
        "drive_type": drive_type,
    }


async def EntertainmentAndCommunication(
    regestration_number: str = Form(...),
    cd_player: bool = Form(...),
    cd_changer: bool = Form(...),
    dvd_player: bool = Form(...),
    radio: bool = Form(...),
    audio_system_remote_control: bool = Form(...),
    speakers_front: bool = Form(...),
    speakers_rear: bool = Form(...),
    integrated_2din_audio: bool = Form(...),
    usb_and_auxiliary_input: bool = Form(...),
    bluetooth_connectivity: bool = Form(...),
    wifi_connectivity: bool = Form(...),
    touch_screen: bool = Form(...),
    touch_screen_size: float = Form(...),
    connectivity: str = Form(...),
    android_auto: bool = Form(...),
    apple_carplay: bool = Form(...),
    internal_storage: bool = Form(...),
    number_of_speakers: int = Form(...),
    rear_entertainment_system: bool = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "cd_player": cd_player,
        "cd_changer": cd_changer,
        "dvd_player": dvd_player,
        "radio": radio,
        "audio_system_remote_control": audio_system_remote_control,
        "speakers_front": speakers_front,
        "speakers_rear": speakers_rear,
        "integrated_2din_audio": integrated_2din_audio,
        "usb_and_auxiliary_input": usb_and_auxiliary_input,
        "bluetooth_connectivity": bluetooth_connectivity,
        "wifi_connectivity": wifi_connectivity,
        "touch_screen": touch_screen,
        "touch_screen_size": touch_screen_size,
        "connectivity": connectivity,
        "android_auto": android_auto,
        "apple_carplay": apple_carplay,
        "internal_storage": internal_storage,
        "number_of_speakers": number_of_speakers,
        "rear_entertainment_system": rear_entertainment_system,
    }


async def Exterior(
    regestration_number: str = Form(...),
    adjustable_headlights: bool = Form(...),
    fog_lights_front: bool = Form(...),
    fog_lights_rear: bool = Form(...),
    power_adjustable_exterior_rear_view_mirror: bool = Form(...),
    manually_adjustable_exterior_rear_view_mirror: bool = Form(...),
    electric_folding_rear_view_mirror: bool = Form(...),
    rain_sensing_wiper: bool = Form(...),
    rear_window_wiper: bool = Form(...),
    rear_window_washer: bool = Form(...),
    rear_window_defogger: bool = Form(...),
    wheel_covers: bool = Form(...),
    alloy_wheels: bool = Form(...),
    power_antenna: bool = Form(...),
    tinted_glass: bool = Form(...),
    rear_spoiler: bool = Form(...),
    removable_convertible_top: bool = Form(...),
    roof_carrier: bool = Form(...),
    sun_roof: bool = Form(...),
    moon_roof: bool = Form(...),
    side_stepper: bool = Form(...),
    outside_rear_view_mirror_turn_indicators: bool = Form(...),
    integrated_antenna: bool = Form(...),
    chrome_grille: bool = Form(...),
    chrome_garnish: bool = Form(...),
    smoke_headlamps: bool = Form(...),
    halogen_headlamps: bool = Form(...),
    roof_rail: bool = Form(...),
    lighting: bool = Form(...),
    trunk_opener: bool = Form(...),
    alloy_wheels_size: float = Form(...),
    tyre_size: float = Form(...),
    tyre_type: str = Form(...),
    led_drls: bool = Form(...),
    led_headlights: bool = Form(...),
    led_taillights: bool = Form(...),
    led_fog_lamps: bool = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "adjustable_headlights": adjustable_headlights,
        "fog_lights_front": fog_lights_front,
        "fog_lights_rear": fog_lights_rear,
        "power_adjustable_exterior_rear_view_mirror": power_adjustable_exterior_rear_view_mirror,
        "manually_adjustable_exterior_rear_view_mirror": manually_adjustable_exterior_rear_view_mirror,
        "electric_folding_rear_view_mirror": electric_folding_rear_view_mirror,
        "rain_sensing_wiper": rain_sensing_wiper,
        "rear_window_wiper": rear_window_wiper,
        "rear_window_washer": rear_window_washer,
        "rear_window_defogger": rear_window_defogger,
        "wheel_covers": wheel_covers,
        "alloy_wheels": alloy_wheels,
        "power_antenna": power_antenna,
        "tinted_glass": tinted_glass,
        "rear_spoiler": rear_spoiler,
        "removable_convertible_top": removable_convertible_top,
        "roof_carrier": roof_carrier,
        "sun_roof": sun_roof,
        "moon_roof": moon_roof,
        "side_stepper": side_stepper,
        "outside_rear_view_mirror_turn_indicators": outside_rear_view_mirror_turn_indicators,
        "integrated_antenna": integrated_antenna,
        "chrome_grille": chrome_grille,
        "chrome_garnish": chrome_garnish,
        "smoke_headlamps": smoke_headlamps,
        "halogen_headlamps": halogen_headlamps,
        "roof_rail": roof_rail,
        "lighting": lighting,
        "trunk_opener": trunk_opener,
        "alloy_wheels_size": alloy_wheels_size,
        "tyre_size": tyre_size,
        "tyre_type": tyre_type,
        "led_drls": led_drls,
        "led_headlights": led_headlights,
        "led_taillights": led_taillights,
        "led_fog_lamps": led_fog_lamps,
    }


async def ExteriorsReport(
    regestration_number: str = Form(...),
    front_bonnet: int = Form(...),
    license_plate: int = Form(...),
    ffront_bumper: int = Form(...),
    rh_side_fender: int = Form(...),
    rh_side_rear_door: int = Form(...),
    rh_quarter_panel: int = Form(...),
    boot: int = Form(...),
    rear_bumper: int = Form(...),
    lh_side_quarter_panel: int = Form(...),
    lh_side_rear_door: int = Form(...),
    lh_side_front_door: int = Form(...),
    lh_side_fender: int = Form(...),
    windsheld_front: int = Form(...),
    rear_glass: int = Form(...),
    roof: int = Form(...),
    pillars: int = Form(...),
    side_view_mirrors: int = Form(...),
    fuel_lid: int = Form(...),
    paint_overspray: int = Form(...),
    paint_peel_off: int = Form(...),
    paint_condition: int = Form(...),
    running_board: int = Form(...),
    exteriors_remark: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "front_bonnet": front_bonnet,
        "license_plate": license_plate,
        "ffront_bumper": ffront_bumper,
        "rh_side_fender": rh_side_fender,
        "rh_side_rear_door": rh_side_rear_door,
        "rh_quarter_panel": rh_quarter_panel,
        "boot": boot,
        "rear_bumper": rear_bumper,
        "lh_side_quarter_panel": lh_side_quarter_panel,
        "lh_side_rear_door": lh_side_rear_door,
        "lh_side_front_door": lh_side_front_door,
        "lh_side_fender": lh_side_fender,
        "windsheld_front": windsheld_front,
        "rear_glass": rear_glass,
        "roof": roof,
        "pillars": pillars,
        "side_view_mirrors": side_view_mirrors,
        "fuel_lid": fuel_lid,
        "paint_overspray": paint_overspray,
        "paint_peel_off": paint_peel_off,
        "paint_condition": paint_condition,
        "running_board": running_board,
        "exteriors_remark": exteriors_remark,
    }


async def Features(
    regestration_number: str = Form(...),
    power_steering: bool = Form(...),
    abs: bool = Form(...),
    driver_airbag: bool = Form(...),
    automatic_climate_control: bool = Form(...),
    alloy_wheels: bool = Form(...),
    power_windows_front: bool = Form(...),
    air_conditioner: bool = Form(...),
    passenger_airbag: bool = Form(...),
    fog_lights_front: bool = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "power_steering": power_steering,
        "abs": abs,
        "driver_airbag": driver_airbag,
        "automatic_climate_control": automatic_climate_control,
        "alloy_wheels": alloy_wheels,
        "power_windows_front": power_windows_front,
        "air_conditioner": air_conditioner,
        "passenger_airbag": passenger_airbag,
        "fog_lights_front": fog_lights_front,
    }


async def FuelAndPerformance(
    regestration_number: str = Form(...),
    fule_type: str = Form(...),
    mileage_arai: float = Form(...),
    city_mileage: float = Form(...),
    fuel_tank_capacity: float = Form(...),
    emission_norm_compliance: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "fule_type": fule_type,
        "mileage_arai": mileage_arai,
        "city_mileage": city_mileage,
        "fuel_tank_capacity": fuel_tank_capacity,
        "emission_norm_compliance": emission_norm_compliance,
    }


async def HoodAndBonnet(
    regestration_number: str = Form(...),
    rh_side_apron: int = Form(...),
    radiator: int = Form(...),
    wiring: int = Form(...),
    brake_fluid_level: int = Form(...),
    engine_oil: int = Form(...),
    oil_and_fluid_leakage: int = Form(...),
    coolant_level: int = Form(...),
    brake_and_coolant_hose_pipe: int = Form(...),
    undercarriage: int = Form(...),
    chassis_and_vehicle_frame: int = Form(...),
    exhaust_system: int = Form(...),
    hood_and_bonnet_remark: int = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "rh_side_apron": rh_side_apron,
        "radiator": radiator,
        "wiring": wiring,
        "brake_fluid_level": brake_fluid_level,
        "engine_oil": engine_oil,
        "oil_and_fluid_leakage": oil_and_fluid_leakage,
        "coolant_level": coolant_level,
        "brake_and_coolant_hose_pipe": brake_and_coolant_hose_pipe,
        "undercarriage": undercarriage,
        "chassis_and_vehicle_frame": chassis_and_vehicle_frame,
        "exhaust_system": exhaust_system,
        "hood_and_bonnet_remark": hood_and_bonnet_remark,
    }


async def Interior(
    regestration_number: str = Form(...),
    tachometer: bool = Form(...),
    electronic_multi_tripmeter: bool = Form(...),
    leather_seats: bool = Form(...),
    fabric_upholstery: bool = Form(...),
    leather_steering_wheel: bool = Form(...),
    leather_wrap_gear_shift_selector: bool = Form(...),
    glove_compartment: bool = Form(...),
    digital_clock: bool = Form(...),
    outside__temperature_display: bool = Form(...),
    cigarette_lighter: bool = Form(...),
    digital_odameter: bool = Form(...),
    electric_adjustable_seats: bool = Form(...),
    driving_experience_control_eco: bool = Form(...),
    folding_table_in_the_rear: bool = Form(...),
    height_adjustable_driver_seat: bool = Form(...),
    ventilated_seats: bool = Form(...),
    dual_tone_dashboard: bool = Form(...),
    lighting: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "tachometer": tachometer,
        "electronic_multi_tripmeter": electronic_multi_tripmeter,
        "leather_seats": leather_seats,
        "fabric_upholstery": fabric_upholstery,
        "leather_steering_wheel": leather_steering_wheel,
        "leather_wrap_gear_shift_selector": leather_wrap_gear_shift_selector,
        "glove_compartment": glove_compartment,
        "digital_clock": digital_clock,
        "outside__temperature_display": outside__temperature_display,
        "cigarette_lighter": cigarette_lighter,
        "digital_odameter": digital_odameter,
        "electric_adjustable_seats": electric_adjustable_seats,
        "driving_experience_control_eco": driving_experience_control_eco,
        "folding_table_in_the_rear": folding_table_in_the_rear,
        "height_adjustable_driver_seat": height_adjustable_driver_seat,
        "ventilated_seats": ventilated_seats,
        "dual_tone_dashboard": dual_tone_dashboard,
        "lighting": lighting,
    }


async def InteriorsReport(
    regestration_number: str = Form(...),
    steering: int = Form(...),
    door_pannel_and_hinges: int = Form(...),
    dash_board: int = Form(...),
    interior_trims: int = Form(...),
    combination_switch_assembly: int = Form(...),
    seat_and_seat_belt_condition: int = Form(...),
    accessorie_audio_and_covers: int = Form(...),
    hand_brake: int = Form(...),
    pedals: int = Form(...),
    horns: int = Form(...),
    carpet_and_floormat: int = Form(...),
    odometer_assembly: int = Form(...),
    hazard_lights: int = Form(...),
    centeal_lock_keyless_entry: int = Form(...),
    cruise_control: bool = Form(...),
    boot_condition: int = Form(...),
    jack_and_tommy_available: bool = Form(...),
    wheel_spanner_available: bool = Form(...),
    rear_view_camera: int = Form(...),
    upholstery: int = Form(...),
    interior_remark: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "steering": steering,
        "door_pannel_and_hinges": door_pannel_and_hinges,
        "dash_board": dash_board,
        "interior_trims": interior_trims,
        "combination_switch_assembly": combination_switch_assembly,
        "seat_and_seat_belt_condition": seat_and_seat_belt_condition,
        "accessorie_audio_and_covers": accessorie_audio_and_covers,
        "hand_brake": hand_brake,
        "pedals": pedals,
        "horns": horns,
        "carpet_and_floormat": carpet_and_floormat,
        "odometer_assembly": odometer_assembly,
        "hazard_lights": hazard_lights,
        "centeal_lock_keyless_entry": centeal_lock_keyless_entry,
        "cruise_control": cruise_control,
        "boot_condition": boot_condition,
        "jack_and_tommy_available": jack_and_tommy_available,
        "wheel_spanner_available": wheel_spanner_available,
        "rear_view_camera": rear_view_camera,
        "upholstery": upholstery,
        "interior_remark": interior_remark,
    }


async def OverAllRating(
    regestration_number: str = Form(...),
    zeroo_rating: float = Form(...),
    exterior_condition: str = Form(...),
    interior_condition: str = Form(...),
    checkpoints_fulfilled: int = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "zeroo_rating": zeroo_rating,
        "exterior_condition": exterior_condition,
        "interior_condition": interior_condition,
        "checkpoints_fulfilled": checkpoints_fulfilled,
    }


async def Safety(
    regestration_number: str = Form(...),
    anti_lock_braking_system: bool = Form(...),
    brake_assist: bool = Form(...),
    central_locking: bool = Form(...),
    power_door_locks: bool = Form(...),
    child_safety_locks: bool = Form(...),
    anti_theft_alarm: bool = Form(...),
    number_of_airbag: bool = Form(...),
    driver_airbag: bool = Form(...),
    passenger_airbag: bool = Form(...),
    side_airbag_front: bool = Form(...),
    side_airbag_rear: bool = Form(...),
    day_and_night_rear_view_mirror: bool = Form(...),
    passenger_side_rear_view_mirror: bool = Form(...),
    xenon_headlamps: bool = Form(...),
    rear_seat_belts: bool = Form(...),
    seat_belt_warning: bool = Form(...),
    door_ajar_warning: bool = Form(...),
    side_impact_beams: bool = Form(...),
    front_impact_beams: bool = Form(...),
    traction_control: bool = Form(...),
    adjustable_seats: bool = Form(...),
    tyre_pressure_monitor: bool = Form(...),
    vehicle_stability_control_system: bool = Form(...),
    engine_immobilizer: bool = Form(...),
    crash_sensor: bool = Form(...),
    centrally_mounted_fuel_tank: bool = Form(...),
    engine_check_warning: bool = Form(...),
    automatic_headlamps: bool = Form(...),
    clutch_lock: bool = Form(...),
    ebd: bool = Form(...),
    electronic__stability_control: bool = Form(...),
    follow_me_home_headlamps: bool = Form(...),
    rear_camera: bool = Form(...),
    anti_theft_device: bool = Form(...),
    speed_sensing_auto_door__lock: bool = Form(...),
    knee_airbags: bool = Form(...),
    isofix_child_seat_mounts: bool = Form(...),
    head_up_display: bool = Form(...),
    pretensioners_and_force_limiter_seatbelts: bool = Form(...),
    blind_spot_monitor: bool = Form(...),
    geo_fence_alert: bool = Form(...),
    hill_descent_control: bool = Form(...),
    hill_assist: bool = Form(...),
    impact_sensing_auto_door_unlock: bool = Form(...),
    view_camera_360: bool = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "anti_lock_braking_system": anti_lock_braking_system,
        "brake_assist": brake_assist,
        "central_locking": central_locking,
        "power_door_locks": power_door_locks,
        "child_safety_locks": child_safety_locks,
        "anti_theft_alarm": anti_theft_alarm,
        "number_of_airbag": number_of_airbag,
        "driver_airbag": driver_airbag,
        "passenger_airbag": passenger_airbag,
        "side_airbag_front": side_airbag_front,
        "side_airbag_rear": side_airbag_rear,
        "day_and_night_rear_view_mirror": day_and_night_rear_view_mirror,
        "passenger_side_rear_view_mirror": passenger_side_rear_view_mirror,
        "xenon_headlamps": xenon_headlamps,
        "rear_seat_belts": rear_seat_belts,
        "seat_belt_warning": seat_belt_warning,
        "door_ajar_warning": door_ajar_warning,
        "side_impact_beams": side_impact_beams,
        "front_impact_beams": front_impact_beams,
        "traction_control": traction_control,
        "adjustable_seats": adjustable_seats,
        "tyre_pressure_monitor": tyre_pressure_monitor,
        "vehicle_stability_control_system": vehicle_stability_control_system,
        "engine_immobilizer": engine_immobilizer,
        "crash_sensor": crash_sensor,
        "centrally_mounted_fuel_tank": centrally_mounted_fuel_tank,
        "engine_check_warning": engine_check_warning,
        "automatic_headlamps": automatic_headlamps,
        "clutch_lock": clutch_lock,
        "ebd": ebd,
        "electronic__stability_control": electronic__stability_control,
        "follow_me_home_headlamps": follow_me_home_headlamps,
        "rear_camera": rear_camera,
        "anti_theft_device": anti_theft_device,
        "speed_sensing_auto_door__lock": speed_sensing_auto_door__lock,
        "knee_airbags": knee_airbags,
        "isofix_child_seat_mounts": isofix_child_seat_mounts,
        "head_up_display": head_up_display,
        "pretensioners_and_force_limiter_seatbelts": pretensioners_and_force_limiter_seatbelts,
        "blind_spot_monitor": blind_spot_monitor,
        "geo_fence_alert": geo_fence_alert,
        "hill_descent_control": hill_descent_control,
        "hill_assist": hill_assist,
        "impact_sensing_auto_door_unlock": impact_sensing_auto_door_unlock,
        "view_camera_360": view_camera_360,
    }


async def SuspensionAndBrakes(
    regestration_number: str = Form(...),
    front_strut_assembly: int = Form(...),
    steering_box_assembly: int = Form(...),
    power_steering_assembly: int = Form(...),
    rear_shock_assembly: int = Form(...),
    front_disc_and_pads: int = Form(...),
    rear_drum_and_shoes: int = Form(...),
    suspension_and_brakes_remark: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "front_strut_assembly": front_strut_assembly,
        "steering_box_assembly": steering_box_assembly,
        "power_steering_assembly": power_steering_assembly,
        "rear_shock_assembly": rear_shock_assembly,
        "front_disc_and_pads": front_disc_and_pads,
        "rear_drum_and_shoes": rear_drum_and_shoes,
        "suspension_and_brakes_remark": suspension_and_brakes_remark,
    }


async def SuspensionSteeringAndBrakes(
    regestration_number: str = Form(...),
    front_suspension: str = Form(...),
    rear_suspension: str = Form(...),
    shock_absorbers_type: str = Form(...),
    steering_type: str = Form(...),
    steering_column: str = Form(...),
    steering_gear_type: str = Form(...),
    turning_radius: str = Form(...),
    front_brake_type: str = Form(...),
    rear_brake_type: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "front_suspension": front_suspension,
        "rear_suspension": rear_suspension,
        "shock_absorbers_type": shock_absorbers_type,
        "steering_type": steering_type,
        "steering_column": steering_column,
        "steering_gear_type": steering_gear_type,
        "turning_radius": turning_radius,
        "front_brake_type": front_brake_type,
        "rear_brake_type": rear_brake_type,
    }


async def SystemAndFunctions(
    regestration_number: str = Form(...),
    accessories_audio_covers: int = Form(...),
    transmission_control: int = Form(...),
    ac_blower: int = Form(...),
    cooling: int = Form(...),
    heater: bool = Form(...),
    abs: bool = Form(...),
    airbags: bool = Form(...),
    esp: bool = Form(...),
    reverse_parking__assist: int = Form(...),
    starter_motor: int = Form(...),
    alterrnator: int = Form(...),
    ac_compressor: int = Form(...),
    wiper_assembly_and_blades: int = Form(...),
    battery_condition: int = Form(...),
    ignition_and_fuel_system: int = Form(...),
    head_and_tail_lamp: int = Form(...),
    fog_lamp: int = Form(...),
    remote_lock: int = Form(...),
    interior_light_check: int = Form(...),
    power_window: int = Form(...),
    music_system: int = Form(...),
    system_and_functions_remark: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "accessories_audio_covers": accessories_audio_covers,
        "transmission_control": transmission_control,
        "ac_blower": ac_blower,
        "cooling": cooling,
        "heater": heater,
        "abs": abs,
        "airbags": airbags,
        "esp": esp,
        "reverse_parking__assist": reverse_parking__assist,
        "starter_motor": starter_motor,
        "alterrnator": alterrnator,
        "ac_compressor": ac_compressor,
        "wiper_assembly_and_blades": wiper_assembly_and_blades,
        "battery_condition": battery_condition,
        "ignition_and_fuel_system": ignition_and_fuel_system,
        "head_and_tail_lamp": head_and_tail_lamp,
        "fog_lamp": fog_lamp,
        "remote_lock": remote_lock,
        "interior_light_check": interior_light_check,
        "power_window": power_window,
        "music_system": music_system,
        "system_and_functions_remark": system_and_functions_remark,
    }


async def VehicleDocuments(
    regestration_number: str = Form(...),
    insurance: bool = Form(...),
    rc_status: bool = Form(...),
    number_of_owner: int = Form(...),
    fc_validity: bool = Form(...),
    vehicle_service_log: bool = Form(...),
    vehicle_documents_remarks: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "insurance": insurance,
        "rc_status": rc_status,
        "number_of_owner": number_of_owner,
        "fc_validity": fc_validity,
        "vehicle_service_log": vehicle_service_log,
        "vehicle_documents_remarks": vehicle_documents_remarks,
    }


async def Wheels(
    regestration_number: str = Form(...),
    number_of_tyres: int = Form(...),
    tyre_condition: int = Form(...),
    spare_tyre_condition: int = Form(...),
    alloy_wheels: bool = Form(...),
    wheels_remark: str = Form(...),
):
    return {
        "regestration_number": regestration_number,
        "number_of_tyres": number_of_tyres,
        "tyre_condition": tyre_condition,
        "spare_tyre_condition": spare_tyre_condition,
        "alloy_wheels": alloy_wheels,
        "wheels_remark": wheels_remark,
    }


async def Photos(
    photos: UploadFile = File(..., media_type="image/jpeg"),
    regestration_number: str = Form(...),
):
    d = {}
    s = 0
    d["photo"] = await photos.read()
    name = photos.filename
    t = (
        str(regestration_number)
        + "__"
        + str(random.randint(0, 999999))
        + "__"
        + str(datetime.utcnow())
        + "__"
        + name
    )
    d["name"] = hashlib.sha256(t.encode()).hexdigest()
    s += 1
    d["sort"] = time.time()
    d["regestration_number"] = regestration_number

    return {"regestration_number": regestration_number, **d}


async def HomePhotos(
    photos: UploadFile = File(..., media_type="image/jpeg"),
):
    d = {}
    s = 0
    d["photo"] = await photos.read()
    name = photos.filename
    t = (
        "__"
        + str(random.randint(0, 999999))
        + "__"
        + str(datetime.utcnow())
        + "__"
        + name
    )
    d["name"] = hashlib.sha256(t.encode()).hexdigest()
    s += 1
    d["sort"] = time.time()

    return {**d}


async def PhotosSort(
    data: List[str] = Form(
        ...,
        description="sort:name => 28:asd34sdfa8793rsdsr238ds7d8f32d283d7c8d238re2d7",
    ),
):
    if data[0].count(","):
        data = data[0].split(",")
    d = [{"sort": i.split(":")[0], "name": i.split(":")[-1]} for i in data]
    return d


async def Inquiry(
    regestration_number: str = Form(None),
    inquiry_type : str = Form(''),    
    name: str = Form(''),
    phone: str = Form(''),
    email: str = Form(''),
    message: str = Form(''),
    car_brand: str = Form(''),
    car_model: str = Form(''),
    registration_year: str = Form(''),
):
    t = (
        str(phone)
        + "__"
        + str(random.randint(0, 999999))
        + "__"
        + str(datetime.utcnow())
        + "__"
        + name
    )
    id = hashlib.sha256(t.encode()).hexdigest()
    notes = ""
    return {
        "id": id,
        "regestration_number": regestration_number,
        "inquiry_type":inquiry_type,
        "name": name,
        "phone": phone,
        "email": email,
        "message": message,
        "car_brand": car_brand,
        "car_model": car_model,
        "registration_year": registration_year,     
        "notes":notes,
    }
