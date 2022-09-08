delete from vehicle_documents where REGESTRATION_NUMBER=%(regestration_number)s;

INSERT INTO vehicle_documents
(
  REGESTRATION_NUMBER,
  INSURANCE,
  RC_STATUS,
  NUMBER_OF_OWNER,
  FC_VALIDITY,
  VEHICLE_SERVICE_LOG,
  VEHICLE_DOCUMENTS_REMARKS
)
VALUES
(
  %(regestration_number)s,
%(insurance)s,
%(rc_status)s,
%(number_of_owner)s,
%(fc_validity)s,
%(vehicle_service_log)s,
%(vehicle_documents_remarks)s
);
