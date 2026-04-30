// "use client";

// import { useState } from "react";
// import SplashScreenOld from "../components/SplashScreenOld";
// import SplashScreen from "../components/SplashScreen";
// import MainPage from "../components/MainPage";
// import Navbar from "@/components/Navbar";
// import ProgressMap from "@/components/ProgressMap";
// import BlueprintForm from "@/components/BlueprintForm";

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [navbarVisible, setNavbarVisible] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleStepClick = (stepId) => {
//     if (stepId <= currentStep) {
//       setCurrentStep(stepId);
//     }
//   };

//   return (
//     <>
//       {loading && (
//         <SplashScreenOld onFinish={() => setLoading(false)} />
//       )}

//       {!loading && (
//         <>
//           {/* NAVBAR MUST BE OUTSIDE ANY TRANSFORMED WRAPPERS */}
//           <Navbar visible={navbarVisible} />

//           <MainPage setNavbarVisible={setNavbarVisible} />
//         </>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import SplashScreenOld from "../components/SplashScreenOld";
import MainPage from "../components/MainPage";
import Navbar from "@/components/Navbar";
import ProgressMap from "@/components/ProgressMap";
import BlueprintForm from "@/components/BlueprintForm";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBlueprintForm, setShowBlueprintForm] = useState(false);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleStartPlanning = () => {
    setShowBlueprintForm(true);
  };

  return (
    <>
      {loading && <SplashScreenOld onFinish={() => setLoading(false)} />}

      {!loading && !showBlueprintForm && (
        <>
          {/* NAVBAR MUST BE OUTSIDE ANY TRANSFORMED WRAPPERS */}
          <Navbar visible={navbarVisible} />

          <MainPage
            setNavbarVisible={setNavbarVisible}
            onStartPlanning={handleStartPlanning} // Pass the handler to MainPage
          />
        </>
      )}

      {!loading && showBlueprintForm && (
        <>
          {/* <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} /> */}
          <BlueprintForm />
        </>
      )}
    </>
  );
}