import type { NewPatientEntry } from "./types.ts";

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: object.name as string,
      dateOfBirth: object.dateOfBirth as string,
      gender: object.gender as string,
      ssn: object.ssn as string,
      occupation: object.occupation as string,
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default parseNewPatientEntry;
