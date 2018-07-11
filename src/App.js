import React, { Component } from 'react';
import './App.css';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = "109fc051af1ab9681cf5cade41dc33d7";

class App extends Component {
  getWeather = async (e) => {
    e.preventDefault();
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=' + API_KEY);
    const data = await api_call.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <Titles/>
        <Form getWeather={this.getWeather}/>
        <Weather/>
      </div>
    );
  }
}

export default App;
