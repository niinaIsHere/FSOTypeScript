import patientData from "../data/patients.json" with { type: "json" };
import type {
  NewPatientEntry,
  Patient,
  NewEntry,
  Entry,
} from "../src/types.ts";
import { v1 as uuid } from "uuid";
const id = uuid();
const patients = patientData;

const getEntries = () => {
  return patientData.map(({ ssn, ...rest }) => rest);
};

const getPatient = (id: string) => {
  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

const addPatient = (entry: NewPatientEntry): NewPatientEntry => {
  const newPatientEntry = {
    id,
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getPatient,
  addPatient,
  addEntry,
};
