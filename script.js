document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const cityInput = document.getElementById('cityInput');
  const hourInput = document.getElementById('hourInput');
  const getRecommendationBtn = document.getElementById('getRecommendationBtn');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const resultSection = document.getElementById('resultSection');
  const weatherInfo = document.getElementById('weatherInfo');
  const outfitSuggestion = document.getElementById('outfitSuggestion');
  const feedbackColdBtn = document.getElementById('feedbackColdBtn');
  const feedbackHotBtn = document.getElementById('feedbackHotBtn');
  const feedbackMessage = document.getElementById('feedbackMessage');

  // State Variables
  let currentOutfitLayers = 0;
  let lastTemperature = null;
  let currentOutfitText = '';

  // Simulated Weather API Function
  const simulateFetchWeather = async (city, hour) => {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    const cityLower = city.toLowerCase();
    let temperature;

    if (cityLower.includes('london') || cityLower.includes('paris')) {
      // Colder simulation
      if (hour >= 22 || hour < 6) temperature = Math.floor(Math.random() * 3) + 3; // 3–7°C
      else if (hour >= 6 && hour < 12) temperature = Math.floor(Math.random() * 4) + 7; // 7–11°C
      else temperature = Math.floor(Math.random() * 6) + 10; // 10–16°C
    } else {
      // Warmer simulation
      temperature = Math.floor(Math.random() * 11) + 15; // 15–25°C
    }

    return temperature;
  };

  // Outfit Generator
  const generateOutfit = (temperature) => {
    let outfit = '';
    if (temperature < 10) {
      outfit = 'Heavy coat, sweater, boots';
      currentOutfitLayers = 3;
    } else if (temperature <= 20) {
      outfit = 'Jacket, hoodie, jeans';
      currentOutfitLayers = 2;
    } else {
      outfit = 'T-shirt, light jacket, sneakers';
      currentOutfitLayers = 1;
    }
    return outfit;
  };

  // Adjust Outfit Based on Feedback
  const adjustOutfit = (feedback) => {
    if (feedback === 'cold' && currentOutfitLayers < 4) {
      currentOutfitLayers++;
      currentOutfitText += ' + Add extra layer (scarf or thermal)';
    } else if (feedback === 'hot' && currentOutfitLayers > 1) {
      currentOutfitLayers--;
      currentOutfitText += ' - Remove one layer';
    }
    outfitSuggestion.textContent = currentOutfitText;
    feedbackMessage.textContent = `Thanks! Feedback received: "${feedback}". Outfit adjusted.`;
  };

  // Main Function
  getRecommendationBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    const hour = parseInt(hourInput.value.trim());

    if (!city || isNaN(hour)) {
      alert('Please enter both a valid city and hour.');
      return;
    }

    loadingIndicator.style.display = 'block';
    resultSection.style.display = 'none';

    const temperature = await simulateFetchWeather(city, hour);
    lastTemperature = temperature;
    currentOutfitText = generateOutfit(temperature);

    weatherInfo.textContent = `Temperature at ${hour}:00 in ${city}: ${temperature}°C`;
    outfitSuggestion.textContent = currentOutfitText;

    loadingIndicator.style.display = 'none';
    resultSection.style.display = 'block';
  });

  // Feedback buttons
  feedbackColdBtn.addEventListener('click', () => adjustOutfit('cold'));
  feedbackHotBtn.addEventListener('click', () => adjustOutfit('hot'));
});