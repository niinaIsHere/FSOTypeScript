import type { HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const entryBoxStyle = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "12px",
};
const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={entryBoxStyle}>
      <p>
        {entry.date}, {entry.type} <LocalHospitalIcon />
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;
