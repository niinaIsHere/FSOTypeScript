import patientData from "../data/patients.json" with { type: "json" };
import type { NewPatientEntry } from "../src/types.ts";
import { v1 as uuid } from "uuid";
const id = uuid();
const patients = patientData;

const getEntries = () => {
  return patientData.map(({ ssn, ...rest }) => rest);
};

const addPatient = (entry: NewPatientEntry): NewPatientEntry => {
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
};
