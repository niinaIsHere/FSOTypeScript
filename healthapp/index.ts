import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const mass = req.query.mass;

  if (!height || !mass) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  if (!isNaN(Number(height)) && !isNaN(Number(mass))) {
    const num_height = Number(height);
    const num_mass = Number(mass);
    return res.send({
      height: num_height,
      weight: num_mass,
      bmi: calculateBmi(num_height, num_mass),
    });
  } else {
    return res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
