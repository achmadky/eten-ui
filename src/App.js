import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Autosuggest from "react-autosuggest";

const App = () => {
  const [food, setFood] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/api/foodInfo";

  const getSuggestions = (value) => {
    // Update this with new food list api
    const foodNames = ["apple", "banana", "carrot", "donut", "egg", "fig"];
    return foodNames.filter((food) => food.toLowerCase().includes(value.toLowerCase()));
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div>
        {suggestion}
      </div>
    );
  };

  const inputProps = {
    placeholder: "Enter food name",
    value: food,
    onChange: (event, { newValue }) => {
      setFood(newValue);
    },
  };

  const handleSearchFood = () => {
    setLoading(true);
    axios
      .get(`${API_URL}?name=${food}`)
      .then((response) => {
        setInfo({ food: response.data.food });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1 className="title">Food Info?</h1>
      <div className="search-container">
        <div className-="suggestion-container">
        <Autosuggest
          suggestions={getSuggestions(food)}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {}}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        </div>
        <button onClick={handleSearchFood}>Search</button>
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