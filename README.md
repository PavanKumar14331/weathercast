# Weather Dashboard 🌤️

A beautiful and responsive weather application that provides real-time weather information and 5-day forecasts using the OpenWeatherMap API.

## Features
- ✅ Real-time current weather display
- ✅ 5-day weather forecast
- ✅ Wind speed, humidity, pressure, and "feels like" temperature
- ✅ Recent searches saved locally
- ✅ Weather condition icons
- ✅ Responsive design (works on all devices)
- ✅ Beautiful gradient UI with animations
- ✅ City search with autocomplete suggestions
- ✅ LocalStorage persistence

## How to Use

### 1. Get Free API Key
**IMPORTANT**: You need a free API key to use this app.

1. Go to [OpenWeatherMap.org](https://openweathermap.org/api)
2. Click "Sign Up" (it's FREE!)
3. Verify your email
4. Go to "API Keys" section
5. Copy your API key

### 2. Setup API Key
1. Open `script.js` file
2. Find this line at the top:
   ```javascript
   this.apiKey = 'YOUR_API_KEY_HERE';

Replace YOUR_API_KEY_HERE with your actual API key:
this.apiKey = 'abc123xyz456youractualkey';
Save the file
3. Use the App
Open index.html in your web browser
Type a city name (e.g., "London", "Tokyo", "New York")
Click Search or press Enter
View current weather and 5-day forecast
4. Recent Searches
Previously searched cities appear at the bottom
Click any city name to quickly check its weather again
Last 5 searches are saved
Example Cities to Try
London
Tokyo
New York
Paris
Sydney
Mumbai
Dubai
Singapore
Installation
Download all files:
index.html
style.css
script.js
README.md
Keep all files in the same folder
Get your API key (see above)
Update script.js with your API key
Open index.html in your web browser
File Structure
weather-dashboard/
├── index.html
├── style.css
├── script.js
└── README.md

Weather Information Displayed
Current Weather
🌡️ Temperature (°C)
🌤️ Weather condition with icon
💨 Wind speed (km/h)
💧 Humidity (%)
🌡️ "Feels like" temperature
🔽 Atmospheric pressure (hPa)
5-Day Forecast
Day name (Mon, Tue, etc.)
Weather icon
Temperature
Technologies Used
HTML5: Structure and semantic markup
CSS3: Styling, gradients, animations, responsive design
JavaScript (ES6): Classes, async/await, fetch API
OpenWeatherMap API: Weather data
LocalStorage API: Save recent searches
Browser Support
✅ Chrome (recommended)
✅ Firefox
✅ Safari
✅ Edge
✅ Opera
Troubleshooting
"City not found" error
Check spelling of city name
Try using English name of the city
Some small cities might not be in the database
Weather data not loading
Check your internet connection
Verify API key is correct
Make sure you didn't exceed free tier limit (60 calls/minute)
API key not working
Wait 10-15 minutes after creating account (activation time)
Check if you copied the entire key
Regenerate a new key if needed
API Limitations (Free Tier)
✅ 60 calls per minute
✅ 1,000,000 calls per month
✅ Current weather data
✅ 5-day forecast
This is more than enough for personal use!

Live Demo
https://pavankumar14331.github.io/weather-dashboard/

Screenshots
Beautiful gradient background
Clean, modern card design
Responsive mobile layout
Smooth animations
Future Enhancements
Hourly forecast
Weather maps
Multiple location comparison
Temperature unit toggle (°C / °F)
Dark/Light theme toggle
Author
Pavan Kumar

License
Free to use for personal and educational purposes.

Credits
Weather data provided by https://openweathermap.org/

