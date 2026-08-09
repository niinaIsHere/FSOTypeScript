import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient, Entry } from "../types";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const fetched = await patientService.getPatient(id);
      setPatient(fetched);
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>loading...</p>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>{patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => {
        return (
          <div>
            <p>
              {entry.date} <em>{entry.description}</em>
            </p>
            <ul>
              {entry.diagnosisCodes.map((code) => {
                return <li>{code}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
