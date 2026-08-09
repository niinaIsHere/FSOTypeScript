import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { Patient, Entry, Diagnosis } from "../types";
import EntryDetails from "./entries/EntryDetails";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const fetched = await patientService.getPatient(id);
      setPatient(fetched);
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetched = await diagnosisService.getAll();
      setDiagnoses(fetched);
    };

    fetchDiagnoses();
  }, []);

  const findDiagnosis = (code) => diagnoses.find((d) => d.code === code);

  if (!patient) return <p>loading...</p>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>{patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
