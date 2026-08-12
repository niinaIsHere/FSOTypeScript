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

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

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

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "Occupational";
  employerName: string;
  sickLeave?: SickLeave;
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

export const NewHospitalSchema = z.object({
  type: z.literal("Hospital"),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: DischargeSchema,
});

export const NewHealthCheckSchema = z.object({
  type: z.literal("HealthCheck"),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

export const NewOccupationalSchema = z.object({
  type: z.literal("Occupational"),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export type Gender = (typeof Gender)[keyof typeof Gender];

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export type NewHospitalEntry = z.infer<typeof NewHospitalSchema>;
export type NewHealthCheckEntry = z.infer<typeof NewHealthCheckSchema>;
export type NewOccupationalEntry = z.infer<typeof NewOccupationalSchema>;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalEntry
  | NewHealthCheckEntry;

export interface PatientEntry extends NewPatientEntry {
  id: number;
}

export type PatientPreview = Omit<Patient, "ssn">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
