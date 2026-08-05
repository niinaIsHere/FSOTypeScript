import { NewEntrySchema, type NewPatientEntry } from "./types.ts";

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

export default parseNewPatientEntry;
