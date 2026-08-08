import axios from "axios";
import { useEffect, useState } from "react";
import type { Diary } from "./types";
import "./App.css";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>("http://localhost:3000/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Diaries</h2>
      {diaries.map((d) => (
        <p key={d.id}>
          {d.date}, {d.weather}, {d.visibility}
        </p>
      ))}
    </div>
  );
};

export default App;
