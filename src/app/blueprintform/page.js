"use client";

import ProgressMap from "@/components/ProgressMap";
import BlueprintForm from "@/components/BlueprintForm";
import { useState } from "react";

export default function BlueprintFormPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  return (
    <>
      <ProgressMap currentStep={currentStep} onStepClick={handleStepClick} />
      <BlueprintForm />
    </>
  );
}