import axios from "axios";
import { useEffect, useState } from "react";
import type { Diary } from "./types";
import "./App.css";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [date, setDate] = useState("");
  const [errormessage, setErrormessage] = useState("");

  useEffect(() => {
    axios.get<Diary[]>("http://localhost:3000/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/diaries",
        newDiary,
      );
      setDiaries(diaries.concat(response.data));
      setWeather("");
      setVisibility("");
      setDate("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrormessage(error.response?.data.error[0].message);
        console.log(error.response?.data.error[0].message);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Diaries</h2>

      <h3>Add a new diary</h3>

      <p>
        <em>{errormessage}</em>
      </p>

      <form onSubmit={onSubmit}>
        date:
        <input value={date} onChange={(event) => setDate(event.target.value)} />
        weather:
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        visibility:
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
