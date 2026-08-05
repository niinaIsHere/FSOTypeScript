export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type PatientEntry = {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
  occupation: string;
};

export type PatientPreview = Omit<Patient, "ssn">;
export type NewPatientEntry = Omit<PatientEntry, "id">;
