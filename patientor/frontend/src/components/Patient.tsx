import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { Patient, Entry, Diagnosis } from "../types";
import EntryDetails from "./entries/EntryDetails";
import EntryForm from "./EntryForm";
import axios from "axios";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (!patient) return <p>loading...</p>;

  const handleAddEntry = async (entry) => {
    try {
      const newEntry = await patientService.addEntry(id, entry);

      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry),
      });
    } catch (error) {
      setError("Failed to add entry");
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Entry: Invalid input";
        setError(msg);
      } else {
        setError("Unexpected error");
      }
    }
  };

  return (
    <div>
      <p>{error}</p>
      <h2>{patient.name}</h2>
      <p>{patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}

      <EntryForm onSubmit={handleAddEntry} />
    </div>
  );
};

export default PatientPage;
