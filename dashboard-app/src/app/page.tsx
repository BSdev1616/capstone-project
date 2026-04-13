import React from 'react';
import { getTaskSuggestion } from '../utils/getTaskSuggestion';

/**
 * Maps WMO weather codes to a human-readable string and corresponding emoji.
 * @param {number} code - The WMO weather code provided by the current_weather API.
 * @returns {{ condition: string; icon: string }} The weather condition string and a representative emoji.
 */
function getWeatherCondition(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'Clear Sky', icon: '☀️' };
  if (code === 1 || code === 2 || code === 3) return { condition: 'Partly Cloudy', icon: '⛅' };
  if (code >= 45 && code <= 48) return { condition: 'Fog', icon: '🌫️' };
  if (code >= 51 && code <= 67) return { condition: 'Rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { condition: 'Snow', icon: '❄️' };
  if (code >= 80 && code <= 82) return { condition: 'Showers', icon: '🌦️' };
  if (code >= 95 && code <= 99) return { condition: 'Thunderstorm', icon: '⛈️' };
  return { condition: 'Unknown Condition', icon: '🌍' };
}

/**
 * Fetches the current weather for a specified location (Berlin default for demonstration).
 * Includes Next.js data caching and revalidation logic.
 * @returns {Promise<{ temperature: number; weathercode: number } | null>} The weather data or null if the request fails.
 */
async function fetchWeather(): Promise<{ temperature: number; weathercode: number } | null> {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    return data.current_weather;
  } catch (error) {
    console.error('Error fetching real-time weather:', error);
    return null;
  }
}

/**
 * Dashboard root page component.
 * Evaluates the current weather and renders a modern, responsive dashboard view
 * which dynamically suggests an optimal productivity task based on the functional constraints.
 * @returns {JSX.Element} The rendered Next.js Dashboard page.
 */
export default async function DashboardPage() {
  const weather = await fetchWeather();

  // Fallback data in case the weather API request fails
  const temperature = weather?.temperature ?? 22; 
  const weathercode = weather?.weathercode ?? 0;
  
  const { condition, icon } = getWeatherCondition(weathercode);
  const taskSuggestion = getTaskSuggestion(temperature);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center p-4 antialiased font-sans">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-purple-500/20">
        
        {/* Decorative background blurs for glassmorphism effect */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-500 rounded-full mix-blend-screen filter blur-[4rem] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-indigo-500 rounded-full mix-blend-screen filter blur-[4rem] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 text-center">
            Daily Dashboard
          </h1>
          <p className="text-purple-200 mb-8 text-center text-sm font-medium opacity-80">
            Real-time condition-based productivity
          </p>
          
          <div className="w-full bg-black/20 rounded-3xl p-6 mb-8 flex flex-col items-center border border-white/10 backdrop-blur-md shadow-inner">
            <span className="text-7xl mb-4 drop-shadow-lg">{icon}</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-6xl font-black text-white tracking-tighter drop-shadow-sm">
                {Math.round(temperature)}
              </span>
              <span className="text-3xl text-purple-200 font-bold">°C</span>
            </div>
            <span className="text-lg text-white/90 font-semibold mt-2 uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full">
              {condition}
            </span>
          </div>

          <div className="w-full flex flex-col animate-fade-in-up">
            <h2 className="text-xs uppercase font-bold text-purple-200 tracking-[0.2em] mb-3 ml-2">
              Recommended Task
            </h2>
            <div className="w-full bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:-translate-y-1 hover:bg-white/10 duration-300 cursor-default group">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-2 h-12 rounded-full bg-gradient-to-b from-green-400 to-emerald-500 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-all"></div>
                <p className="text-white font-semibold text-xl leading-tight">
                  {taskSuggestion}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
