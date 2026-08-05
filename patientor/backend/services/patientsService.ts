import patientData from "../data/patients.json" with { type: "json" };

const getEntries = () => {
  return patientData.map(({ ssn, ...rest }) => rest);
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
};
