delete from wheels where REGESTRATION_NUMBER=%(regestration_number)s;


INSERT INTO wheels
(
  REGESTRATION_NUMBER,
  NUMBER_OF_TYRES,
  TYRE_CONDITION,
  SPARE_TYRE_CONDITION,
  ALLOY_WHEELS,
  WHEELS_REMARK
)
VALUES
(
  %(regestration_number)s,
%(number_of_tyres)s,
%(tyre_condition)s,
%(spare_tyre_condition)s,
%(alloy_wheels)s,
%(wheels_remark)s
);
