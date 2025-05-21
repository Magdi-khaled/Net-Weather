# 🌦️ Net Weather

**Net Weather** is a responsive and modern weather application built with Vue 3, Pinia for state management, and TypeScript. It fetches real-time weather data from the OpenWeatherMap API, allowing users to search for any city and view current conditions along with a 7-day forecast.

---

## 🚀 Features

- 🔍 **City Search**: Search for weather information by entering a city name.
- 📍 **Geolocation Support**: Automatically fetch and display weather data for the user's current location using the Geolocation API.
- 🌡️ **Current Weather Display**: View current temperature, humidity, wind speed, and weather conditions.
- 📅 **7-Day Forecast**: Access a 7-day weather forecast with detailed information.
- 🌐 **Unit Conversion**: Toggle between Celsius (°C) and Fahrenheit (°F) temperature units.
- 🎨 **Responsive Design**: Optimized for both desktop and mobile browsers.
- ⚙️ **TypeScript Integration**: Ensures type safety and better code maintainability.
- 🗂️ **State Management with Pinia**: Efficient and scalable state management.

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📦 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Magdi-khaled/Weather-App.git
   cd Weather-App
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**

   Create a **.env** file in the root directory:

   ```bash

   VITE_OPENWEATHER_API_KEY=your_api_key_here

   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open **http://localhost:5173** to view it in the browser.
