import { useState } from "react";

const EntryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: "",
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

  const handleInputChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="Occupational">Occupational Healthcare</option>
        </select>
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Specialist:</label>
        <input
          type="text"
          name="specialist"
          value={formData.specialist}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Diagnosis Codes:</label>
        <input
          type="text"
          name="diagnosisCodes"
          value={formData.diagnosisCodes}
          onChange={handleInputChange}
        />
      </div>
      {formData.type === "HealthCheck" && (
        <div>
          <label>Health Check Rating:</label>
          <input
            type="number"
            name="healthCheckRating"
            value={formData.healthCheckRating}
            onChange={handleInputChange}
          />
        </div>
      )}
      {formData.type === "Hospital" && (
        <div>
          <label>Discharge Date:</label>
          <input
            type="date"
            name="dischargeDate"
            value={formData.discharge.date}
            onChange={handleInputChange}
          />

          <label>Discharge Criteria:</label>
          <input
            type="text"
            name="dischargeCriteria"
            value={formData.discharge.criteria}
            onChange={handleInputChange}
          />
        </div>
      )}
      {formData.type === "Occupational" && (
        <div>
          <label>Employer Name:</label>
          <input
            type="text"
            name="employerName"
            value={formData.employerName || ""}
            onChange={handleInputChange}
          />

          <label>Sick Leave Start Date:</label>
          <input
            type="date"
            name="sickLeaveStartDate"
            value={formData.sickLeave.startDate || ""}
            onChange={handleInputChange}
          />

          <label>Sick Leave End Date:</label>
          <input
            type="date"
            name="sickLeaveEndDate"
            value={formData.sickLeave.endDate || ""}
            onChange={handleInputChange}
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntryForm;
