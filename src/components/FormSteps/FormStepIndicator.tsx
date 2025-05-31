import React from 'react';
import { cn } from '../../utils/cn';

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const FormStepIndicator = ({ 
  currentStep, 
  totalSteps,
  className = ''
}: FormStepIndicatorProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                index === currentStep 
                  ? "bg-blue-600 text-white" 
                  : index < currentStep 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-500"
              )}
            >
              {index + 1}
              {index < currentStep && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={cn(
                  "h-1 flex-1 mx-2 transition-colors",
                  index < currentStep ? "bg-blue-600" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        <p className="text-sm text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default FormStepIndicator;