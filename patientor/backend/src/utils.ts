import {
  NewEntrySchema,
  NewHospitalSchema,
  NewOccupationalSchema,
  NewHealthCheckSchema,
  type NewPatientEntry,
  type NewHospitalEntry,
  type NewOccupationalEntry,
  type NewHealthCheckEntry,
} from "./types.ts";

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    return NewEntrySchema.parse(object);
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const parseNewEntry = (
  object: unknown,
): NewHospitalEntry | NewOccupationalEntry | NewHealthCheckEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("type" in object)) {
    throw new Error("Missing type");
  }

  switch (object.type) {
    case "Hospital":
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "discharge" in object
      ) {
        return NewHospitalSchema.parse(object);
      }
      throw new Error("Missing fields for Hospital entry");

    case "Occupational":
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "employerName" in object
      ) {
        return NewOccupationalSchema.parse(object);
      }
      throw new Error("Missing fields for OccupationalHealthcare entry");

    case "HealthCheck":
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "healthCheckRating" in object
      ) {
        return NewHealthCheckSchema.parse(object);
      }
      throw new Error("Missing fields for HealthCheck entry");

    default:
      throw new Error(`Unknown entry type: ${object.type}`);
  }
};

export default parseNewPatientEntry;
