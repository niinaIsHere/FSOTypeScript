import { Gender, type NewPatientEntry } from "./types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseValue = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing value");
  }
  return value;
};

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
      name: parseValue(object.name),
      dateOfBirth: parseValue(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseValue(object.ssn),
      occupation: parseValue(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default parseNewPatientEntry;
