// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import ProgressMap from "@/components/ProgressMap";
// import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { useEventStore } from "@/store/useEventStore";
// import { ArrowRight } from "lucide-react";

// import { getNextRoute } from "@/lib/eventFlow";
// import { useRouter, usePathname } from "next/navigation";

// export default function WeatherPage() {
//   const router = useRouter();
//   const pathname = usePathname();
// const eventDetails = useEventStore((s) => s.eventDetails);

//   // Get store functions
//   const weather = useEventStore((state) => state.weather);
//   const setWeather = useEventStore((state) => state.setWeather);
//   const currentStep = useEventStore((state) => state.currentStep);
//   const completeStep = useEventStore((state) => state.completeStep);
//   const setStep = useEventStore((state) => state.setStep);
//   const setActiveStep = useEventStore((state) => state.setActiveStep);

//   const handleStepClick = (stepId) => {
//     if (stepId <= currentStep) {
//       console.log(`Navigating to step ${stepId}`);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save weather settings to store
//     setWeather({
//       temperatureUnit,
//       sliderValue,
//       backgroundColor,
//       sunPosition,
//     });
//     completeStep(currentStep);
//     //setStep(currentStep + 1);
//     setStep("vendors"); // or nextStepName
// setActiveStep("vendors");
//     const nextRoute = getNextRoute(eventDetails, pathname);
//   router.push(nextRoute);
//     //router.push("/vendors");
//   };

//   // Pre-fill from store
//   const [temperatureUnit, setTemperatureUnit] = useState(weather.temperatureUnit || "C");
//   const [sliderValue, setSliderValue] = useState(weather.sliderValue || 12);
//   const [backgroundColor, setBackgroundColor] = useState(weather.backgroundColor || "#e7e7df");
//   const [sunPosition, setSunPosition] = useState(weather.sunPosition || 50);

//   const hourlyForecast = [
//     { time: "00:00", temp: 22, precipitation: 10, icon: "🌙" },
//     { time: "03:00", temp: 20, precipitation: 15, icon: "🌙" },
//     { time: "06:00", temp: 18, precipitation: 5, icon: "🌅" },
//     { time: "09:00", temp: 24, precipitation: 0, icon: "☀️" },
//     { time: "12:00", temp: 30, precipitation: 0, icon: "☀️" },
//     { time: "15:00", temp: 32, precipitation: 5, icon: "☀️" },
//     { time: "18:00", temp: 28, precipitation: 10, icon: "🌇" },
//     { time: "21:00", temp: 24, precipitation: 20, icon: "🌙" },
//   ];

//   const weatherDetails = [
//     { title: "Humidity", value: "82%", label: "Good", type: "progress", progress: 82 },
//     { title: "Wind", value: "8 km/h", type: "gauge", gaugeValue: 8 },
//     { title: "Precipitation", value: "1.4 cm", type: "scale", scaleValue: 1.4 },
//     { title: "UV Index", value: "5 (Moderate)", type: "bar", barValue: 5 },
//     { title: "Feels Like", value: "30°", type: "range", rangeValue: 30 },
//     { title: "Chance of Rain", value: "40%", type: "progress", progress: 40 },
//   ];

//   // Update background and sun/moon position based on slider value
//   useEffect(() => {
//     if (sliderValue >= 6 && sliderValue < 12) {
//       setBackgroundColor("#FFFAE3"); // Morning
//       setSunPosition((sliderValue - 6) * (100 / 6)); // Move sun across the sky
//     } else if (sliderValue >= 12 && sliderValue < 18) {
//       setBackgroundColor("#FFF8D6"); // Noon
//       setSunPosition((sliderValue - 12) * (100 / 6) + 50);
//     } else if (sliderValue >= 18 && sliderValue < 21) {
//       setBackgroundColor("#FFD1A1"); // Evening
//       setSunPosition((sliderValue - 18) * (100 / 3) + 75);
//     } else {
//       setBackgroundColor("#2D2A5A"); // Night
//       setSunPosition(sliderValue < 6 ? sliderValue * (100 / 6) : 100);
//     }
//     // Save to store in real-time
//     setWeather({ sliderValue, backgroundColor, sunPosition });
//   }, [sliderValue]);

//   const toggleTemperatureUnit = () => {
//     const newUnit = temperatureUnit === "C" ? "F" : "C";
//     setTemperatureUnit(newUnit);
//     setWeather({ temperatureUnit: newUnit });
//   };

//   useEffect(() => {
//   async function loadWeather() {
//     const res = await fetch("/api/weather?lat=12.9716&lon=77.5946");
//     const data = await res.json();

//     console.log("Weather:", data);
//   }

//   loadWeather();
// }, []);
//   return (
//     <div className="min-h-screen dark:bg-black">
//         {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick}/> */}
//         <div className="flex pt-32 pb-20 min-h-screen">
//       {/* LEFT SIDEBAR */}
//       <motion.div
//         className="w-1/4 p-6 flex flex-col justify-between"
//         style={{
//           background: `linear-gradient(180deg, ${backgroundColor}, #e7e7df)`,
//           backdropFilter: "blur(10px)",
//         }}
//         animate={{ backgroundColor }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Weather Hero Panel */}
//         <div>
//           <h2 className="text-2xl font-bold">Bengaluru, India</h2>
//           <p className="text-sm opacity-70">Sunrise: 6:15 AM | Sunset: 6:45 PM</p>
//           <div className="mt-6">
//             <h1 className="text-6xl font-bold">
//               {temperatureUnit === "C" ? "27°" : "80°"}
//             </h1>
//             <p className="text-lg opacity-70">Sunny</p>
//           </div>
//           <button
//             onClick={toggleTemperatureUnit}
//             className="mt-4 px-4 py-2 bg-[#58644B] text-white rounded-full"
//           >
//             Toggle to {temperatureUnit === "C" ? "Fahrenheit" : "Celsius"}
//           </button>
//         </div>

//         {/* Time Slider */}
//         <div className="mt-8">
//           <input
//             type="range"
//             min="0"
//             max="23"
//             value={sliderValue}
//             onChange={(e) => setSliderValue(Number(e.target.value))}
//             className="w-full"
//           />
//           <p className="text-center mt-2">{`${sliderValue}:00`}</p>
//           <motion.div
//             className="absolute top-0 left-0 w-8 h-8 bg-yellow-400 rounded-full"
//             style={{
//               transform: `translateX(${sunPosition}%)`,
//             }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="w-3/4 p-6">
//         {/* Upcoming Hours Graph */}
//         <div className="mb-12">
//           <h2 className="text-xl font-bold mb-4">Upcoming Hours</h2>
//           <div className="flex overflow-x-auto hide-scrollbar">
//             {hourlyForecast.map((hour, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-lg shadow-md mx-2"
//               >
//                 <p className="text-sm">{hour.time}</p>
//                 <p className="text-2xl">{hour.icon}</p>
//                 <p className="text-lg">{hour.temp}°</p>
//               </div>
//             ))}
//           </div>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={hourlyForecast}>
//               <XAxis dataKey="time" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="precipitation"
//                 stroke="#58644B"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Weather Detail Cards */}
//         <div className="grid grid-cols-3 gap-6">
//           {weatherDetails.map((detail, index) => (
//             <motion.div
//               key={index}
//               className="p-4 bg-white/20 rounded-lg shadow-md"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h3 className="text-lg font-bold">{detail.title}</h3>
//               <p className="text-xl font-semibold">{detail.value}</p>
//               {detail.type === "progress" && (
//                 <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
//                   <div
//                     className="bg-[#58644B] h-2 rounded-full"
//                     style={{ width: `${detail.progress}%` }}
//                   ></div>
//                 </div>
//               )}
//               {detail.type === "gauge" && (
//                 <div className="w-16 h-16 border-4 border-gray-300 rounded-full flex items-center justify-center">
//                   <p>{detail.gaugeValue}</p>
//                 </div>
//               )}
//               {detail.type === "scale" && (
//                 <div className="flex justify-between mt-2">
//                   <span>0</span>
//                   <span>{detail.scaleValue}</span>
//                   <span>10</span>
//                 </div>
//               )}
//               {detail.type === "bar" && (
//                 <div className="flex mt-2">
//                   {[...Array(10)].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`w-2 h-4 mx-1 ${
//                         i < detail.barValue ? "bg-[#58644B]" : "bg-gray-300"
//                       }`}
//                     ></div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
        
//       </div>
      
//     </div>
//     {/* Continue */}
//         <motion.button
//           onClick={handleSubmit}
//           className="w-full py-5 rounded-full flex justify-center gap-2 disabled:opacity-40"
//           style={{
//             backgroundColor: "var(--color-dark)",
//             color: "var(--color-bg)",
//           }}
//         >
//           Continue <ArrowRight size={18} />
//         </motion.button>

//     </div>
    
//   );
// }

//=============================================================================

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter, usePathname } from "next/navigation";
// import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { ArrowRight, CloudRain, Sun, AlertTriangle, Home } from "lucide-react";

// import { useEventStore } from "@/store/useEventStore";
// import { getNextRoute } from "@/lib/eventFlow";

// export default function WeatherPage() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const eventDetails = useEventStore((s) => s.eventDetails);
//   const setWeather = useEventStore((s) => s.setWeather);
//   const completeStep = useEventStore((s) => s.completeStep);
//   const setStep = useEventStore((s) => s.setStep);
//   const setActiveStep = useEventStore((s) => s.setActiveStep);

//   const [weatherData, setWeatherData] = useState(null);

//   const eventDate = useMemo(() => {
//     if (!eventDetails?.date) return null;
//     return new Date(eventDetails.date);
//   }, [eventDetails]);

//   const today = new Date();

//   // days until event
//   const daysUntilEvent = useMemo(() => {
//     if (!eventDate) return null;
//     const diff = eventDate.getTime() - today.getTime();
//     return Math.ceil(diff / (1000 * 60 * 60 * 24));
//   }, [eventDate]);

//   const isWithinForecast = daysUntilEvent >= 0 && daysUntilEvent <= 16;

//   // fetch weather
//   useEffect(() => {
//     async function loadWeather() {
//       const res = await fetch("/api/weather?lat=12.9716&lon=77.5946");
//       const data = await res.json();
//       setWeatherData(data);
//     }

//     loadWeather();
//   }, []);

//   const handleContinue = () => {
//     completeStep("weather");
//     setStep("vendors");
//     setActiveStep("vendors");

//     const nextRoute = getNextRoute(eventDetails, pathname);
//     router.push(nextRoute);
//   };

//   if (!isWithinForecast) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center p-10">
//         <div>
//           <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={40} />
//           <h1 className="text-2xl font-bold mb-2">
//             Weather preview not available
//           </h1>
//           <p className="opacity-70">
//             Your event is beyond 16-day forecast range.
//           </p>

//           <button
//             onClick={handleContinue}
//             className="mt-6 px-6 py-3 rounded-full bg-[#58644B] text-white"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!weatherData) {
//     return <div className="p-10">Loading weather...</div>;
//   }

//   // transform API → chart data
//   const chartData = weatherData.time.map((t, i) => ({
//     date: new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
//     max: weatherData.maxTemp[i],
//     min: weatherData.minTemp[i],
//     rain: weatherData.precipitation[i],
//   }));

//   const eventDayWeather = chartData[daysUntilEvent] || chartData[0];

//   const isRainy = eventDayWeather?.rain > 5;
//   const isHot = eventDayWeather?.max > 32;

//   return (
//     <div className="min-h-screen px-10 pt-32 pb-20 bg-[#faf9f6]">

//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-serif italic">Weather Insights</h1>
//         <p className="opacity-60 mt-2">
//           {daysUntilEvent} days until your event
//         </p>
//       </div>

//       {/* ALERTS */}
//       <div className="max-w-4xl mx-auto mb-8 space-y-3">

//         {isRainy && (
//           <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 text-blue-700">
//             <CloudRain />
//             Rain expected on event day — consider backup indoor setup.
//           </div>
//         )}

//         {eventDetails?.venueType === "Open Air" && (
//           <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700">
//             <Home />
//             Suggested: Add indoor decor fallback option.
//           </div>
//         )}

//         {isHot && (
//           <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 text-orange-700">
//             <Sun />
//             High temperature expected — ensure cooling & hydration.
//           </div>
//         )}
//       </div>

//       {/* CHART */}
//       <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm mb-10">
//         <h2 className="font-semibold mb-4">16-Day Forecast</h2>

//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={chartData}>
//             <XAxis dataKey="date" />
//             <Tooltip />
//             <Line type="monotone" dataKey="max" stroke="#ff6b6b" />
//             <Line type="monotone" dataKey="min" stroke="#4e9cff" />
//             <Line type="monotone" dataKey="rain" stroke="#58644B" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* EVENT DAY SUMMARY */}
//       <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 mb-10">

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Max Temp</p>
//           <p className="text-xl font-bold">{eventDayWeather.max}°C</p>
//         </div>

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Min Temp</p>
//           <p className="text-xl font-bold">{eventDayWeather.min}°C</p>
//         </div>

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Rain Chance</p>
//           <p className="text-xl font-bold">{eventDayWeather.rain} mm</p>
//         </div>
//       </div>

//       {/* CONTINUE */}
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={handleContinue}
//           className="w-full py-4 rounded-full bg-[#58644B] text-white flex items-center justify-center gap-2"
//         >
//           Continue <ArrowRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";
// import { ArrowRight, CloudRain, Sun, Moon, Home } from "lucide-react";

// import { useEventStore } from "@/store/useEventStore";
// import { useRouter, usePathname } from "next/navigation";
// import { getNextRoute } from "@/lib/eventFlow";

// export default function WeatherPage() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const eventDetails = useEventStore((s) => s.eventDetails);
//   const completeStep = useEventStore((s) => s.completeStep);
//   const setStep = useEventStore((s) => s.setStep);
//   const setActiveStep = useEventStore((s) => s.setActiveStep);

//   const [weatherData, setWeatherData] = useState(null);

//   const eventDate = new Date(eventDetails?.date);
//   const eventTime = eventDetails?.time || "18:00";

//   const today = new Date();
//   const daysUntilEvent = Math.ceil(
//     (eventDate - today) / (1000 * 60 * 60 * 24)
//   );

//   const isWithinForecast = daysUntilEvent >= 0 && daysUntilEvent <= 16;
//   const WEATHER_CODE_MAP = {
//     0: "Clear sky",

//     1: "Mainly clear",
//     2: "Partly cloudy",
//     3: "Overcast",

//     45: "Fog",
//     48: "Rime fog",

//     51: "Light drizzle",
//     53: "Moderate drizzle",
//     55: "Heavy drizzle",

//     56: "Freezing drizzle (light)",
//     57: "Freezing drizzle (dense)",

//     61: "Light rain",
//     63: "Moderate rain",
//     65: "Heavy rain",

//     66: "Freezing rain (light)",
//     67: "Freezing rain (heavy)",

//     71: "Light snow",
//     73: "Moderate snow",
//     75: "Heavy snow",

//     77: "Snow grains",

//     80: "Light rain showers",
//     81: "Moderate rain showers",
//     82: "Violent rain showers",

//     85: "Light snow showers",
//     86: "Heavy snow showers",

//     95: "Thunderstorm",
//     96: "Thunderstorm with hail",
//     99: "Severe thunderstorm with hail",
//   };

//   // parse hour
//   const getHour = () => {
//     const [time, modifier] = eventTime.split(" ");
//     let [h] = time.split(":").map(Number);

//     if (modifier === "PM" && h !== 12) h += 12;
//     if (modifier === "AM" && h === 12) h = 0;

//     return h;
//   };

//   const eventHour = getHour();

//   // background logic
//   const getBackground = () => {
//     // if (eventHour >= 6 && eventHour < 12) return "#FFE8A3"; // morning
//     // if (eventHour >= 12 && eventHour < 16) return "#FFE8A3"; // day
//     // if (eventHour >= 16 && eventHour < 18) return "linear-gradient(to bottom, #2F3E66, #5F7FA3, #C9D6E3, #F2B36A, #FFE08A)"; // sunset
//     // return "#2D2A5A"; // night
//     if (eventHour >= 6 && eventHour < 10)
//       return "linear-gradient(to bottom, #FFE6A6, #FFD07A, #F7B267)"; // sunrise

//     if (eventHour >= 10 && eventHour < 12)
//       return "linear-gradient(to bottom, #FFF1C1, #FFD98A, #FFBE76)"; // late morning

//     if (eventHour >= 12 && eventHour < 16)
//       return "linear-gradient(to bottom, #87CEEB, #FFD36E, #FFA94D)"; // midday

//     if (eventHour >= 16 && eventHour < 18)
//       return "linear-gradient(to bottom, #2F3E66, #5F7FA3, #C9D6E3, #F2B36A, #FFE08A)"; // sunset

//     if (eventHour >= 18 && eventHour < 20)
//       return "linear-gradient(to bottom, #1E2A4A, #3B4F7A, #6C86A8, #E29578)"; // dusk

//     return "linear-gradient(to bottom, #0B1026, #1C1B3A, #2D2A5A, #3B2F63)"; // night
//   };

//   const isNight = eventHour >= 19 || eventHour < 6;
//   const isDark = eventHour >= 16 || eventHour < 6;

//   useEffect(() => {
//     async function loadWeather() {
//       const res = await fetch("/api/weather?lat=12.9716&lon=77.5946");
//       const data = await res.json();
//       setWeatherData(data);
//     }
//     loadWeather();
//   }, []);

//   if (!isWithinForecast) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Event beyond forecast range
//       </div>
//     );
//   }

//   if (!weatherData) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="flex flex-col items-center text-center px-6"
//       >
//         {/* soft glowing orb */}
//         <motion.div
//           animate={{
//             scale: [1, 1.15, 1],
//             opacity: [0.6, 0.9, 0.6],
//           }}
//           transition={{
//             duration: 2.2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="w-20 h-20 rounded-full blur-xl"
//           style={{
//             background:
//               "radial-gradient(circle, var(--color-primary), transparent 70%)",
//           }}
//         />

//         {/* spinner ring */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{
//             repeat: Infinity,
//             duration: 1.2,
//             ease: "linear",
//           }}
//           className="absolute w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
//         />

//         {/* text */}
//         <div className="mt-10 space-y-2">
//           <h2
//             className="text-lg font-semibold"
//             style={{ color: "var(--color-dark)" }}
//           >
//             Fetching weather insights
//           </h2>

//           <p
//             className="text-sm opacity-70"
//             style={{ color: "var(--color-dark)" }}
//           >
//             Preparing forecast for your event day...
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

//   // transform data
//   const chartData = weatherData.time.map((t, i) => ({
//     date: new Date(t).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//     }),
//     max: Number(weatherData.maxTemp[i].toFixed(2)),
//     min: Number(weatherData.minTemp[i].toFixed(2)),
//     rain: Number(weatherData.precipitation[i].toFixed(2)),
//   }));

//   const eventDay = chartData[daysUntilEvent];
//   const rainChance = weatherData.precipitationProbability[daysUntilEvent];
//   //const weatherCode = weatherData.weatherCode[daysUntilEvent];
//   const weatherCodeRaw = weatherData.weatherCode?.[daysUntilEvent];
//   const weatherLabel =
//     WEATHER_CODE_MAP[weatherCodeRaw] || "Unknown conditions";

//   // const chartData = weatherData.time.map((t, i) => ({
//   //   date: new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
//   //   max: weatherData.maxTemp[i],
//   //   min: weatherData.minTemp[i],
//   //   rain: weatherData.precipitation[i],
//   // }));

//   const eventDayWeather = chartData[daysUntilEvent] || chartData[0];

//   const isRainy = eventDayWeather?.rain > 5;
//   const isHot = eventDayWeather?.max > 32;

//   // convert precipitation → "chance"
//   const rainMM = Number(eventDay.rain).toFixed(2);

//   const eventTemp = Math.round(
//     (eventDay.max + eventDay.min) / 2
//   );

//   const handleContinue = () => {
//     completeStep("weather");
//     setStep("vendors");
//     setActiveStep("vendors");
//     router.push(getNextRoute(eventDetails, pathname));
//   };

//   return (
//     <div className="flex min-h-screen pt-20">

//       {/* LEFT PANEL */}
//       <motion.div
//         className={`w-1/4 p-6 flex flex-col justify-between ${
//           isDark ? 'text-white' : 'text-gray-800'
//         }`}
//         style={{ background: getBackground() }}
//       >
//         <div>
//           <h2 className="text-xl font-bold mb-2">Event Weather</h2>
//           <p className="text-sm opacity-70">
//             {eventDate.toDateString()}
//           </p>

//           <div className="text-5xl font-bold">
//             {eventTemp}°C
//           </div>

//           <p className="opacity-80 mt-2">
//             {eventHour}:00 hrs
//           </p>

//           <div className="mt-4">
//             {isNight ? <Moon size={32} /> : <Sun size={32} />}
//           </div>
//         </div>
//       </motion.div>

//       {/* RIGHT CONTENT */}
//       <div className="flex flex-col w-full">
//       {/* HEADER */}
//        <div className="text-center mb-10">
//          <h1 className="text-4xl font-serif italic font-medium">Weather Insights</h1>
//          <p className="opacity-60 mt-2">
//            {daysUntilEvent} days until your event
//          </p>
//        </div>

//        {/* ALERTS */}
//       <div className="max-w-4xl mx-auto mb-8 space-y-3">

//          {isRainy && (
//           <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 text-blue-700">
//             <CloudRain />
//             Rain expected on event day — consider backup indoor setup.
//           </div>
//         )}

//         {eventDetails?.venueType === "Open Air" && (
//           <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700">
//             <Home />
//             Suggested: Add indoor decor fallback option.
//           </div>
//         )}

//         {isHot && (
//           <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 text-orange-700">
//             <Sun />
//             High temperature expected — ensure cooling & hydration.
//           </div>
//         )}
//       </div>

//       <div className="p-6">

//       {/* CHART */}
//       <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm mb-10">
//         <h2 className="font-semibold mb-4">16-Day Forecast</h2>

//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={chartData}>
//             <XAxis dataKey="date" />
//             <Tooltip />
//             <Line type="monotone" dataKey="max" stroke="#ff6b6b" />
//             <Line type="monotone" dataKey="min" stroke="#4e9cff" />
//             <Line type="monotone" dataKey="rain" stroke="#58644B" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* EVENT DAY SUMMARY */}
//       <div className="w-full mx-auto grid grid-cols-3 gap-4 mb-10">

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Max Temp</p>
//           <p className="text-xl font-bold">{eventDayWeather.max}°C</p>
//         </div>

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Min Temp</p>
//           <p className="text-xl font-bold">{eventDayWeather.min}°C</p>
//         </div>

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Precipitation</p>
//           <p className="text-xl font-bold">{rainMM} mm</p>
//         </div>
//       </div>

//       <div className="w-full mx-auto grid grid-cols-2 gap-4 mb-10">

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Chance of Rain</p>
//           <p className="text-xl font-bold">{rainChance}%</p>
//         </div>

//         <div className="p-4 bg-white rounded-xl">
//           <p className="text-sm opacity-60">Weather Forecast</p>
//           <p className="text-xl font-bold">{weatherLabel}</p>
//         </div>
//       </div>

//       {/* CONTINUE */}
//       <div className="w-[30%] mx-auto">
//         <button
//           onClick={handleContinue}
//           className="w-full py-4 rounded-full bg-[var(--color-dark)] text-white flex items-center justify-center gap-2"
//         >
//           Continue <ArrowRight size={18} />
//         </button>
//       </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export function isWithinForecastRange(eventDateStr, forecastDays = 16) {
//   if (!eventDateStr) return false;

//   const eventDate = new Date(eventDateStr);
//   const today = new Date();

//   const maxDate = new Date();
//   maxDate.setDate(today.getDate() + forecastDays);

//   return eventDate >= today && eventDate <= maxDate;
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ArrowRight, CloudRain, Sun, Moon, Home } from "lucide-react";

import { useEventStore } from "@/store/useEventStore";
import { useRouter, usePathname } from "next/navigation";
import { getNextRoute } from "@/lib/eventFlow";

export default function WeatherPage() {
  const router = useRouter();
  const pathname = usePathname();

  const eventDetails = useEventStore((s) => s.eventDetails);
  const completeStep = useEventStore((s) => s.completeStep);
  const setStep = useEventStore((s) => s.setStep);
  const setActiveStep = useEventStore((s) => s.setActiveStep);

  const [weatherData, setWeatherData] = useState(null);

  const eventDate = new Date(eventDetails?.date);
  const eventTime = eventDetails?.time || "18:00";

  const today = new Date();
  const daysUntilEvent = Math.ceil(
    (eventDate - today) / (1000 * 60 * 60 * 24)
  );

  const isWithinForecast = daysUntilEvent >= 0 && daysUntilEvent <= 16;

  const WEATHER_CODE_MAP = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle (light)",
    57: "Freezing drizzle (dense)",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing rain (light)",
    67: "Freezing rain (heavy)",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  };

  // parse hour
  const getHour = () => {
    const [time, modifier] = eventTime.split(" ");
    let [h] = time.split(":").map(Number);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    return h;
  };

  const eventHour = getHour();

  // background logic
  const getBackground = () => {
    if (eventHour >= 6 && eventHour < 10)
      return "linear-gradient(to bottom, #FFE6A6, #FFD07A, #F7B267)";
    if (eventHour >= 10 && eventHour < 12)
      return "linear-gradient(to bottom, #FFF1C1, #FFD98A, #FFBE76)";
    if (eventHour >= 12 && eventHour < 16)
      return "linear-gradient(to bottom, #87CEEB, #FFD36E, #FFA94D)";
    if (eventHour >= 16 && eventHour < 18)
      return "linear-gradient(to bottom, #2F3E66, #5F7FA3, #C9D6E3, #F2B36A, #FFE08A)";
    if (eventHour >= 18 && eventHour < 20)
      return "linear-gradient(to bottom, #1E2A4A, #3B4F7A, #6C86A8, #E29578)";
    return "linear-gradient(to bottom, #0B1026, #1C1B3A, #2D2A5A, #3B2F63)";
  };

  const isNight = eventHour >= 19 || eventHour < 6;
  const isDark = eventHour >= 16 || eventHour < 6;

  useEffect(() => {
    async function loadWeather() {
      const res = await fetch("/api/weather?lat=12.9716&lon=77.5946");
      const data = await res.json();
      setWeatherData(data);
    }
    loadWeather();
  }, []);

  if (!isWithinForecast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Event beyond forecast range
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center px-6"
        >
          {/* soft glowing orb */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 rounded-full blur-xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-primary), transparent 70%)",
            }}
          />

          {/* spinner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
            className="absolute w-16 h-16 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"
          />

          {/* text */}
          <div className="mt-10 space-y-2">
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--color-dark)" }}
            >
              Fetching weather insights
            </h2>
            <p
              className="text-sm opacity-70"
              style={{ color: "var(--color-dark)" }}
            >
              Preparing forecast for your event day...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // transform data
  const chartData = weatherData.time.map((t, i) => ({
    date: new Date(t).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    max: Number(weatherData.maxTemp[i].toFixed(2)),
    min: Number(weatherData.minTemp[i].toFixed(2)),
    rain: Number(weatherData.precipitation[i].toFixed(2)),
  }));

  const eventDay = chartData[daysUntilEvent];
  const rainChance = weatherData.precipitationProbability[daysUntilEvent];
  const weatherCodeRaw = weatherData.weatherCode?.[daysUntilEvent];
  const weatherLabel =
    WEATHER_CODE_MAP[weatherCodeRaw] || "Unknown conditions";

  const eventDayWeather = chartData[daysUntilEvent] || chartData[0];

  const isRainy = eventDayWeather?.rain > 5;
  const isHot = eventDayWeather?.max > 32;

  const rainMM = Number(eventDay.rain).toFixed(2);

  const eventTemp = Math.round(
    (eventDay.max + eventDay.min) / 2
  );

  const handleContinue = () => {
    completeStep("weather");
    setStep("vendors");
    setActiveStep("vendors");
    router.push(getNextRoute(eventDetails, pathname));
  };

  return (
    <div className="min-h-screen pt-20 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif italic font-medium">Weather Insights</h1>
          <p className="opacity-60 mt-2">
            {daysUntilEvent} days until your event
          </p>
        </div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl p-8 mb-5 grid grid-cols-[1fr_auto] items-end gap-4 w-[70%] mx-auto"
          style={{ background: getBackground() }}
        >
          <div className={isDark ? "text-white" : "text-gray-800"}>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
              Event weather
            </p>
            <p className="text-sm opacity-70 mb-3">
              {eventDate.toDateString()}
            </p>
            <div className="text-6xl font-medium leading-none tracking-tight">
              {eventTemp}°
              <span className="text-3xl opacity-60">C</span>
            </div>
            <p className="opacity-75 mt-2">{weatherLabel}</p>
          </div>

          <div className={`text-right ${isDark ? "text-white" : "text-gray-800"}`}>
            <p className="text-sm opacity-50 mb-3">{eventHour}:00 hrs</p>
            {isNight ? <Moon size={52} className="opacity-80 ml-auto" /> : <Sun size={52} className="opacity-80 ml-auto" />}
          </div>
        </motion.div>

        {/* ALERTS */}
        {(isRainy || isHot || eventDetails?.venueType === "Open Air") && (
          <div className="mb-5 space-y-2 w-fit mx-auto">
            {isRainy && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 text-blue-700">
                <CloudRain size={18} />
                Rain expected on event day — consider backup indoor setup.
              </div>
            )}
            {eventDetails?.venueType === "Open Air" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700">
                <Home size={18} />
                Suggested: Add indoor decor fallback option.
              </div>
            )}
            {isHot && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 text-orange-700">
                <Sun size={18} />
                High temperature expected — ensure cooling & hydration.
              </div>
            )}
          </div>
        )}

        {/* STATS GRID */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-xs text-gray-400 mb-1">Max temp</p>
            <p className="text-2xl font-medium">
              {eventDayWeather.max}
              <span className="text-base font-normal text-gray-400">°C</span>
            </p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-xs text-gray-400 mb-1">Min temp</p>
            <p className="text-2xl font-medium">
              {eventDayWeather.min}
              <span className="text-base font-normal text-gray-400">°C</span>
            </p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-xs text-gray-400 mb-1">Rain chance</p>
            <p className="text-2xl font-medium">
              {rainChance}
              <span className="text-base font-normal text-gray-400">%</span>
            </p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-xs text-gray-400 mb-1">Precipitation</p>
            <p className="text-2xl font-medium">
              {rainMM}
              <span className="text-base font-normal text-gray-400">mm</span>
            </p>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="font-semibold mb-4">16-Day Forecast</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Line type="monotone" dataKey="max" stroke="#ff6b6b" />
              <Line type="monotone" dataKey="min" stroke="#4e9cff" />
              <Line type="monotone" dataKey="rain" stroke="#58644B" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CONTINUE */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="w-[25%] py-5 px-8 rounded-full bg-[var(--color-dark)] text-white flex items-center justify-center gap-2"
          >
            Continue <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

export function isWithinForecastRange(eventDateStr, forecastDays = 16) {
  if (!eventDateStr) return false;

  const eventDate = new Date(eventDateStr);
  const today = new Date();

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + forecastDays);

  return eventDate >= today && eventDate <= maxDate;
}
