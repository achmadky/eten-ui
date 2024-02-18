import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [food, setFood] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/api/foodInfo";

  const searchFood = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?name=${food}`);
      setInfo({ food: response.data.food });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 className="title">Food Info?</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter food name"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          
        />
        <button onClick={searchFood}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : info.food ? (
        <div className="info-container">
          <h2>{info.food.name}</h2>
          <p>
            Cholesterol: {info.food.cholesterol} mg
          </p>
          <p>
            Calories: {info.food.calories} kcal
          </p>
        </div>
      ) : (
        <p>No information found.</p>
        
      )}
    </div>
  );
};

export default App;