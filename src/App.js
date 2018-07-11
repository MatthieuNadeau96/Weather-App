import React, { Component } from 'react';
import './App.css';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY = "109fc051af1ab9681cf5cade41dc33d7";

class App extends Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: null
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=' + API_KEY);
    const data = await api_call.json();
    if(city && country ) {
      console.log(data);
      this.setState({
        temperature: Math.round(data.main.temp * (9/5) - 459.67),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        error: "Please enter the values."
      });
    }
  }

  // T(°F) = T(K) × 9/5 - 459.67

  render() {
    return (
      <div>

        <div className="wrapper">
          <div className="main">
            <div className="container">

              <div className="row">
                <div className="col title-container">
                  <Titles />
                </div>

                <div className="col-md-auto form-container">
                  <Form className="form" getWeather={this.getWeather}/>
                  <Weather
                    className="weatherOutput"
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
