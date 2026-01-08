class WeatherApp {
  constructor() {
    this.apiKey = '6bb44526f168d29ddfca5f09d07ccc9e';
    this.recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    this.init();
  }

  init() {
    this.cityInput = document.getElementById('cityInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.weatherCard = document.getElementById('weatherCard');
    this.errorMessage = document.getElementById('errorMessage');
    this.loadingMessage = document.getElementById('loadingMessage');

    // Check if elements exist
    if (!this.cityInput || !this.searchBtn) {
      console.error('Elements not found! Check HTML IDs');
      return;
    }

    this.searchBtn.addEventListener('click', () => this.searchWeather());
    this.cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.searchWeather();
    });

    this.renderRecentCities();
    
    // Test API key immediately
    console.log('Testing API Key...');
    this.testApiKey();
  }

  async testApiKey() {
    try {
      const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${this.apiKey}`;
      console.log('Test URL:', testUrl);
      
      const response = await fetch(testUrl);
      const data = await response.json();
      
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', data);
      
      if (response.ok) {
        console.log('✅ API Key is WORKING!');
        this.showError('✅ API Key Active! Try searching a city.');
      } else {
        console.log('❌ API Key Error:', data.message);
        if (response.status === 401) {
          this.showError('⚠️ API Key Invalid or Not Active Yet. Wait 10-15 minutes.');
        } else {
          this.showError(`❌ API Error: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Network Error:', error);
      this.showError('❌ Network Error. Check internet connection.');
    }
  }

  async searchWeather() {
    const city = this.cityInput.value.trim();
    
    console.log('Searching for city:', city);
    
    if (city === '') {
      this.showError('Please enter a city name');
      return;
    }
    
    await this.getWeather(city);
  }

  async getWeather(city) {
    this.showLoading();
    this.hideError();

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
      console.log('Weather URL:', weatherUrl);
      
      const weatherResponse = await fetch(weatherUrl);
      console.log('Weather Response Status:', weatherResponse.status);
      
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        console.log('Error Data:', errorData);
        throw new Error(errorData.message || 'City not found');
      }

      const weatherData = await weatherResponse.json();
      console.log('Weather Data:', weatherData);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`;
      const forecastResponse = await fetch(forecastUrl);
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available');
      }

      const forecastData = await forecastResponse.json();
      console.log('Forecast Data:', forecastData);

      this.displayWeather(weatherData, forecastData);
      this.addToRecentCities(city);
      this.hideLoading();
      
      console.log('✅ Weather displayed successfully!');
      
    } catch (error) {
      this.hideLoading();
      console.error('Weather Error:', error);
      
      if (error.message.includes('401')) {
        this.showError('⚠️ API Key not activated yet. Wait 10-15 minutes and try again.');
      } else if (error.message.includes('404')) {
        this.showError('❌ City not found. Try: London, Tokyo, New York, Paris, Mumbai');
      } else {
        this.showError(`❌ Error: ${error.message}`);
      }
    }
  }

  displayWeather(current, forecast) {
    document.getElementById('weatherIcon').textContent = this.getWeatherIcon(current.weather[0].main);
    document.getElementById('temperature').textContent = `${Math.round(current.main.temp)}°C`;
    document.getElementById('cityName').textContent = current.name;
    document.getElementById('weatherDescription').textContent = current.weather[0].description;
    document.getElementById('windSpeed').textContent = `${current.wind.speed} km/h`;
    document.getElementById('humidity').textContent = `${current.main.humidity}%`;
    document.getElementById('feelsLike').textContent = `${Math.round(current.main.feels_like)}°C`;
    document.getElementById('pressure').textContent = `${current.main.pressure} hPa`;

    this.displayForecast(forecast);
    this.weatherCard.style.display = 'block';
  }

  displayForecast(forecast) {
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    const dailyForecasts = forecast.list.filter(item => 
      item.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      const forecastItem = document.createElement('div');
      forecastItem.className = 'forecast-item';
      forecastItem.innerHTML = `
        <div class="forecast-day">${dayName}</div>
        <div class="forecast-icon">${this.getWeatherIcon(day.weather[0].main)}</div>
        <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
      `;

      forecastGrid.appendChild(forecastItem);
    });
  }

  getWeatherIcon(weather) {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '💨',
      Haze: '🌫️',
      Dust: '🌪️',
      Fog: '🌫️'
    };

    return icons[weather] || '🌤️';
  }

  addToRecentCities(city) {
    this.recentCities = this.recentCities.filter(c => 
      c.toLowerCase() !== city.toLowerCase()
    );

    this.recentCities.unshift(city);
    this.recentCities = this.recentCities.slice(0, 5);

    localStorage.setItem('recentCities', JSON.stringify(this.recentCities));
    this.renderRecentCities();
  }

  renderRecentCities() {
    const container = document.getElementById('recentCities');
    if (!container) return;
    
    container.innerHTML = '';

    if (this.recentCities.length === 0) {
      container.innerHTML = '<div class="empty-recent">No recent searches yet</div>';
      return;
    }

    this.recentCities.forEach(city => {
      const cityBtn = document.createElement('div');
      cityBtn.className = 'recent-city';
      cityBtn.textContent = city;
      cityBtn.addEventListener('click', () => this.getWeather(city));
      container.appendChild(cityBtn);
    });
  }

  showLoading() {
    this.loadingMessage.style.display = 'block';
    this.weatherCard.style.display = 'none';
  }

  hideLoading() {
    this.loadingMessage.style.display = 'none';
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = 'block';
    setTimeout(() => this.hideError(), 5000);
  }

  hideError() {
    this.errorMessage.style.display = 'none';
  }
}

// Initialize app
console.log('Starting Weather App...');
new WeatherApp();