import { useState } from "react";
import { Entry } from "../types";

const EntryForm = ({
  onSubmit,
}: {
  onSubmit: (entry: Omit<Entry, "id">) => void;
}) => {
  const [formData, setFormData] = useState({
    type: "HealthCheck" as "HealthCheck" | "Hospital" | "Occupational",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [] as string[],
    healthCheckRating: 0,
    discharge: {
      date: "",
      criteria: "",
    },
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "diagnosisCodes") {
      setFormData({
        ...formData,
        diagnosisCodes: value.split(","),
      });
      return;
    }
    if (name === "dischargeDate" || name === "dischargeCriteria") {
      setFormData({
        ...formData,
        discharge: {
          ...formData.discharge,
          [name === "dischargeDate" ? "date" : "criteria"]: value,
        },
      });
      return;
    }
    if (name === "sickLeaveStartDate" || name === "sickLeaveEndDate") {
      setFormData({
        ...formData,
        sickLeave: {
          ...formData.sickLeave,
          [name === "sickLeaveStartDate" ? "startDate" : "endDate"]: value,
        },
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: name === "healthCheckRating" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="Occupational">Occupational Healthcare</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="specialist">Specialist</label>
        <input
          id="specialist"
          type="text"
          name="specialist"
          value={formData.specialist}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
        <input
          id="diagnosisCodes"
          type="text"
          name="diagnosisCodes"
          value={formData.diagnosisCodes}
          onChange={handleInputChange}
        />
      </div>
      {formData.type === "HealthCheck" && (
        <div>
          <label htmlFor="healthCheckRating">Health Check Rating</label>
          <input
            id="healthCheckRating"
            type="number"
            name="healthCheckRating"
            value={formData.healthCheckRating}
            onChange={handleInputChange}
          />
        </div>
      )}
      {formData.type === "Hospital" && (
        <div>
          <label htmlFor="dischargeDate">Discharge Date</label>
          <input
            id="dischargeDate"
            type="date"
            name="dischargeDate"
            value={formData.discharge.date}
            onChange={handleInputChange}
          />

          <label htmlFor="dischargeCriteria">Discharge Criteria</label>
          <input
            id="dischargeCriteria"
            type="text"
            name="dischargeCriteria"
            value={formData.discharge.criteria}
            onChange={handleInputChange}
          />
        </div>
      )}
      {formData.type === "Occupational" && (
        <div>
          <label htmlFor="employerName">Employer Name</label>
          <input
            id="employerName"
            type="text"
            name="employerName"
            value={formData.employerName || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="sickLeaveStartDate">Sick Leave Start Date</label>
          <input
            id="sickLeaveStartDate"
            type="date"
            name="sickLeaveStartDate"
            value={formData.sickLeave.startDate || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="sickLeaveEndDate">Sick Leave End Date</label>
          <input
            id="sickLeaveEndDate"
            type="date"
            name="sickLeaveEndDate"
            value={formData.sickLeave.endDate || ""}
            onChange={handleInputChange}
          />
        </div>
      )}
      <button name="Add" type="submit">
        Add
      </button>
    </form>
  );
};

export default EntryForm;
