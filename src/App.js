import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Autosuggest from "react-autosuggest";

const App = () => {
  const [food, setFood] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [foodName, setFoodName] = useState([]);
  
  const API_URL = "http://eten-api.vercel.app/api/";

  useEffect(() => {
    fetch('http://eten-api.vercel.app/api/foodList')
      .then(response => response.json())
      .then(data => {
        setFoodName(data);
      })
      .catch(error => {
        console.error('Error fetching food list:', error);
      });
  }, []); 

  const getSuggestions = (value) => {

    const foodNames = foodName;
    return foodNames.filter((food) => food.toLowerCase().startsWith(value.toLowerCase()));
  };
  
  const renderSuggestion = (suggestion) => {
    return (
      <div className="suggestion-item">
        <span className="suggestion-text">{suggestion}</span>
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
      .get(`${API_URL}foodInfo?name=${food}`)
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
          styles={{
            suggestionsList: {
              listStyleType: "none",
              
            },
          }}
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