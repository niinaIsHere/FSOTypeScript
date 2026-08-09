import axios from "axios";
import { useEffect, useState } from "react";
import type { Diary } from "./types";
import "./App.css";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
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
      comment: comment,
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
      setComment("");
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
      <h3>Add a new diary</h3>

      <p>
        <em>{errormessage}</em>
      </p>

      <form onSubmit={onSubmit}>
        <div>
          date:
          <input
            type="date"
            id="date"
            name="diary-date"
            value={date}
            min="2026-07-07"
            max="2026-09-09"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        weather:
        <div>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            checked={weather === "sunny"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label for="sunny">Sunny</label>
        </div>
        <div>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            checked={weather === "rainy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label for="rainy">Rainy</label>
        </div>
        <div>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label for="cloudy">Cloudy</label>
        </div>
        <div>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            checked={weather === "stormy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label for="stormy">Stormy</label>
        </div>
        <div>
          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            checked={weather === "windy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label for="windy">Windy</label>
        </div>
        visibility:
        <div>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            checked={visibility === "poor"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label for="poor">Poor</label>
        </div>
        <div>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            checked={visibility === "great"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label for="great">great</label>
        </div>
        <div>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            checked={visibility === "good"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label for="good">good</label>
        </div>
        <div>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            checked={visibility === "ok"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label for="ok">ok</label>
        </div>
        <div>
          Comment:
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diaries</h2>

      {diaries.map((d) => (
        <p key={d.id}>
          <b>{d.date}</b>: weather: {d.weather}, visibility: {d.visibility}
        </p>
      ))}
    </div>
  );
};

export default App;
