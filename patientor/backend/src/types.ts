import { z } from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

type Discharge = {
  date: string;
  criteria: string;
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HospitalEntry {
  discharge: Discharge;
}

interface OccupationalHealthcareEntry {
  employerName: string;
  sickLeave: SickLeave;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  gender: z.enum(Gender),
  ssn: z.string(),
  occupation: z.string(),
});

export type Gender = (typeof Gender)[keyof typeof Gender];

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: number;
}

export type PatientPreview = Omit<Patient, "ssn">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
