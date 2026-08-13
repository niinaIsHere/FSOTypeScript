import express from "express";
import patientsService from "../../services/patientsService.ts";
import type { Patient } from "../types.ts";
import parseNewPatientEntry, { parseNewEntry } from "../utils.ts";
import { z } from "zod";
import patientData from "../../data/patients.json" with { type: "json" };

const patients = patientData as Patient[];

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientsService.getEntries();
  if (!data) {
    return res.status(404).send("Data not found");
  }
  return res.send(data);
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (!patient) {
    return res.status(404).send("Patient not found");
  }
  return res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

  if (!patient) {
    return res.status(404).send("Patient not found");
  }

  const newEntry = parseNewEntry(req.body);
  const addedEntry = patientsService.addEntry(patient, newEntry);
  return res.json(addedEntry);
});

export default router;
