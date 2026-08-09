import type { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const entryBoxStyle = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "12px",
};

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div style={entryBoxStyle}>
      <p>
        {entry.date}, <WorkIcon />, {entry.employerName}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
