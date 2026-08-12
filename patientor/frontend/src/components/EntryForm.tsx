import { useState } from "react";

const EntryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "healthCheckRating" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, type: "HealthCheck" });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Health Check Rating:</label>
        <input
          type="number"
          name="healthCheckRating"
          value={formData.healthCheckRating}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EntryForm;
