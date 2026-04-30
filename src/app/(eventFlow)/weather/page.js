"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProgressMap from "@/components/ProgressMap";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEventStore } from "@/store/useEventStore";
import { ArrowRight } from "lucide-react";

import { getNextRoute } from "@/lib/eventFlow";
import { useRouter, usePathname } from "next/navigation";

export default function WeatherPage() {
  const router = useRouter();
  const pathname = usePathname();
const eventDetails = useEventStore((s) => s.eventDetails);

  // Get store functions
  const weather = useEventStore((state) => state.weather);
  const setWeather = useEventStore((state) => state.setWeather);
  const currentStep = useEventStore((state) => state.currentStep);
  const completeStep = useEventStore((state) => state.completeStep);
  const setStep = useEventStore((state) => state.setStep);
  const setActiveStep = useEventStore((state) => state.setActiveStep);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      console.log(`Navigating to step ${stepId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save weather settings to store
    setWeather({
      temperatureUnit,
      sliderValue,
      backgroundColor,
      sunPosition,
    });
    completeStep(currentStep);
    //setStep(currentStep + 1);
    setStep("vendors"); // or nextStepName
setActiveStep("vendors");
    const nextRoute = getNextRoute(eventDetails, pathname);
  router.push(nextRoute);
    //router.push("/vendors");
  };

  // Pre-fill from store
  const [temperatureUnit, setTemperatureUnit] = useState(weather.temperatureUnit || "C");
  const [sliderValue, setSliderValue] = useState(weather.sliderValue || 12);
  const [backgroundColor, setBackgroundColor] = useState(weather.backgroundColor || "#fdfdf8");
  const [sunPosition, setSunPosition] = useState(weather.sunPosition || 50);

  const hourlyForecast = [
    { time: "00:00", temp: 22, precipitation: 10, icon: "🌙" },
    { time: "03:00", temp: 20, precipitation: 15, icon: "🌙" },
    { time: "06:00", temp: 18, precipitation: 5, icon: "🌅" },
    { time: "09:00", temp: 24, precipitation: 0, icon: "☀️" },
    { time: "12:00", temp: 30, precipitation: 0, icon: "☀️" },
    { time: "15:00", temp: 32, precipitation: 5, icon: "☀️" },
    { time: "18:00", temp: 28, precipitation: 10, icon: "🌇" },
    { time: "21:00", temp: 24, precipitation: 20, icon: "🌙" },
  ];

  const weatherDetails = [
    { title: "Humidity", value: "82%", label: "Good", type: "progress", progress: 82 },
    { title: "Wind", value: "8 km/h", type: "gauge", gaugeValue: 8 },
    { title: "Precipitation", value: "1.4 cm", type: "scale", scaleValue: 1.4 },
    { title: "UV Index", value: "5 (Moderate)", type: "bar", barValue: 5 },
    { title: "Feels Like", value: "30°", type: "range", rangeValue: 30 },
    { title: "Chance of Rain", value: "40%", type: "progress", progress: 40 },
  ];

  // Update background and sun/moon position based on slider value
  useEffect(() => {
    if (sliderValue >= 6 && sliderValue < 12) {
      setBackgroundColor("#FFFAE3"); // Morning
      setSunPosition((sliderValue - 6) * (100 / 6)); // Move sun across the sky
    } else if (sliderValue >= 12 && sliderValue < 18) {
      setBackgroundColor("#FFF8D6"); // Noon
      setSunPosition((sliderValue - 12) * (100 / 6) + 50);
    } else if (sliderValue >= 18 && sliderValue < 21) {
      setBackgroundColor("#FFD1A1"); // Evening
      setSunPosition((sliderValue - 18) * (100 / 3) + 75);
    } else {
      setBackgroundColor("#2D2A5A"); // Night
      setSunPosition(sliderValue < 6 ? sliderValue * (100 / 6) : 100);
    }
    // Save to store in real-time
    setWeather({ sliderValue, backgroundColor, sunPosition });
  }, [sliderValue]);

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === "C" ? "F" : "C";
    setTemperatureUnit(newUnit);
    setWeather({ temperatureUnit: newUnit });
  };

  return (
    <div className="min-h-screen dark:bg-black">
        {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick}/> */}
        <div className="flex pt-32 pb-20 min-h-screen">
      {/* LEFT SIDEBAR */}
      <motion.div
        className="w-1/4 p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(180deg, ${backgroundColor}, #fdfdf8)`,
          backdropFilter: "blur(10px)",
        }}
        animate={{ backgroundColor }}
        transition={{ duration: 0.5 }}
      >
        {/* Weather Hero Panel */}
        <div>
          <h2 className="text-2xl font-bold">Bengaluru, India</h2>
          <p className="text-sm opacity-70">Sunrise: 6:15 AM | Sunset: 6:45 PM</p>
          <div className="mt-6">
            <h1 className="text-6xl font-bold">
              {temperatureUnit === "C" ? "27°" : "80°"}
            </h1>
            <p className="text-lg opacity-70">Sunny</p>
          </div>
          <button
            onClick={toggleTemperatureUnit}
            className="mt-4 px-4 py-2 bg-[#62754c] text-white rounded-full"
          >
            Toggle to {temperatureUnit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>

        {/* Time Slider */}
        <div className="mt-8">
          <input
            type="range"
            min="0"
            max="23"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center mt-2">{`${sliderValue}:00`}</p>
          <motion.div
            className="absolute top-0 left-0 w-8 h-8 bg-yellow-400 rounded-full"
            style={{
              transform: `translateX(${sunPosition}%)`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="w-3/4 p-6">
        {/* Upcoming Hours Graph */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upcoming Hours</h2>
          <div className="flex overflow-x-auto hide-scrollbar">
            {hourlyForecast.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-lg shadow-md mx-2"
              >
                <p className="text-sm">{hour.time}</p>
                <p className="text-2xl">{hour.icon}</p>
                <p className="text-lg">{hour.temp}°</p>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyForecast}>
              <XAxis dataKey="time" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="precipitation"
                stroke="#62754c"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weather Detail Cards */}
        <div className="grid grid-cols-3 gap-6">
          {weatherDetails.map((detail, index) => (
            <motion.div
              key={index}
              className="p-4 bg-white/20 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold">{detail.title}</h3>
              <p className="text-xl font-semibold">{detail.value}</p>
              {detail.type === "progress" && (
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#62754c] h-2 rounded-full"
                    style={{ width: `${detail.progress}%` }}
                  ></div>
                </div>
              )}
              {detail.type === "gauge" && (
                <div className="w-16 h-16 border-4 border-gray-300 rounded-full flex items-center justify-center">
                  <p>{detail.gaugeValue}</p>
                </div>
              )}
              {detail.type === "scale" && (
                <div className="flex justify-between mt-2">
                  <span>0</span>
                  <span>{detail.scaleValue}</span>
                  <span>10</span>
                </div>
              )}
              {detail.type === "bar" && (
                <div className="flex mt-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-4 mx-1 ${
                        i < detail.barValue ? "bg-[#62754c]" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
      </div>
      
    </div>
    {/* Continue */}
        <motion.button
          onClick={handleSubmit}
          className="w-full py-5 rounded-full flex justify-center gap-2 disabled:opacity-40"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "var(--color-bg)",
          }}
        >
          Continue <ArrowRight size={18} />
        </motion.button>

    </div>
    
  );
}