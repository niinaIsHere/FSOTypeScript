import express from "express";
import patientsService from "../../services/patientsService.ts";
import type { PatientPreview } from "../types.ts";
import parseNewPatientEntry from "../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: PatientPreview[] = patientsService.getEntries();
  res.send(data);
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

export default router;
