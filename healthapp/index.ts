import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const mass = req.query.weight;

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

app.post("/exercises", (req, res) => {
  const data = req.body;

  const diary = data["daily_exercises"];
  const target = data["target"];

  if (!diary || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    !Array.isArray(diary) ||
    diary.some((n) => isNaN(Number(n))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  const result = calculateExercises(diary, target);
  return res.json(result);
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
