import type { HealthCheckEntry } from "../../types";

const entryBoxStyle = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "12px",
};
const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={entryBoxStyle}>
      <p>
        {entry.date}, {entry.type}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>
        <b>State of health: {entry.healthCheckRating}</b>
      </p>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;
