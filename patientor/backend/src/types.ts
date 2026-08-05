import { z } from "zod";

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
