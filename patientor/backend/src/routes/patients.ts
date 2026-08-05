import express from "express";
import patientsService from "../../services/patientsService.ts";
import type { PatientPreview } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: PatientPreview[] = patientsService.getEntries();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
