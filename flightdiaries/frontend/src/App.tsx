import axios from "axios";
import { useEffect, useState } from "react";
import type { Diary } from "./types";
import "./App.css";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get<Diary[]>("http://localhost:3000/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
    };

    axios
      .post("http://localhost:3000/api/diaries", newDiary)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
        setWeather("");
        setVisibility("");
        setDate("");
      });
  };

  return (
    <div>
      <h2>Diaries</h2>

      <form onSubmit={onSubmit}>
        <input value={date} onChange={(event) => setDate(event.target.value)} />
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />

        <button type="submit">add</button>
      </form>

      {diaries.map((d) => (
        <p key={d.id}>
          {d.date}, {d.weather}, {d.visibility}
        </p>
      ))}
    </div>
  );
};

export default App;
