import diagnosisData from "../data/diagnoses.json" with { type: "json" };

const getEntries = () => {
  return diagnosisData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
