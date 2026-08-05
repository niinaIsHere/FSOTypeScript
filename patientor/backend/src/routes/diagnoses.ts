import express from "express";
import diagnosesService from "../../services/diagnosesService.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: Diagnosis[] = diagnosesService.getEntries();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
