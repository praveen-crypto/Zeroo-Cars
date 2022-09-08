delete from over_all_rating where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO over_all_rating
(
  REGESTRATION_NUMBER,
  ZEROO_RATING,
  EXTERIOR_CONDITION,
  INTERIOR_CONDITION,
  CHECKPOINTS_FULFILLED
)
VALUES
(
  %(regestration_number)s,
%(zeroo_rating)s,
%(exterior_condition)s,
%(interior_condition)s,
%(checkpoints_fulfilled)s
);
