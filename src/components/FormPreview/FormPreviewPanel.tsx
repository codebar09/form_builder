import React from 'react';
import { useFormBuilder } from '../../contexts/FormBuilderContext';
import FormRenderer from './FormRenderer';
import { FormValues } from '../../types/form';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface FormPreviewPanelProps {
  device: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

const FormPreviewPanel = ({ device, onDeviceChange }: FormPreviewPanelProps) => {
  const { activeForm } = useFormBuilder();
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [currentStep, setCurrentStep] = React.useState(0);

  if (!activeForm) {
    return (
      <div className="col-span-12 bg-white rounded-lg shadow-sm flex items-center justify-center h-full">
        Loading form...
      </div>
    );
  }

  // Get total steps in the form
  const totalSteps = activeForm.fields.reduce((max, field) => 
    Math.max(max, field.step || 0), 0) + 1;

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getDeviceClass = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'max-w-[1024px]';
    }
  };

  return (
    <div className="col-span-12 h-full">
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => onDeviceChange('mobile')}
            className={`
              px-4 py-2 text-sm font-medium rounded-l-lg 
              ${device === 'mobile' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}
              focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-white
            `}
          >
            <Smartphone size={16} className="inline-block mr-1" />
            Mobile
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange('tablet')}
            className={`
              px-4 py-2 text-sm font-medium border-t border-b 
              ${device === 'tablet' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}
              focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-white
            `}
          >
            <Tablet size={16} className="inline-block mr-1" />
            Tablet
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange('desktop')}
            className={`
              px-4 py-2 text-sm font-medium rounded-r-lg 
              ${device === 'desktop' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}
              focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-white
            `}
          >
            <Monitor size={16} className="inline-block mr-1" />
            Desktop
          </button>
        </div>
      </div>

      <div className={`mx-auto ${getDeviceClass()} h-[calc(100%-3rem)] overflow-y-auto bg-gray-100 rounded-lg p-4`}>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            {activeForm.name || "Untitled Form"}
          </h1>
          
          {activeForm.description && (
            <p className="text-gray-600 mb-6">{activeForm.description}</p>
          )}
          
          {totalSteps > 1 && (
            <div className="mb-6">
              <div className="flex items-center">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div 
                      className={`
                        flex items-center justify-center w-8 h-8 rounded-full 
                        ${i === currentStep 
                          ? 'bg-blue-600 text-white' 
                          : i < currentStep 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-500'}
                        text-sm font-medium
                      `}
                    >
                      {i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div 
                        className={`
                          h-1 flex-1 mx-2 
                          ${i < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
                        `}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>
          )}
          
          <FormRenderer
            fields={activeForm.fields.filter(field => field.step === currentStep)}
            values={formValues}
            errors={{}}
            onChange={handleFieldChange}
            readOnly={false}
          />
          
          {totalSteps > 1 && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium
                  ${currentStep === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}
                `}
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === totalSteps - 1}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium
                  ${currentStep === totalSteps - 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'}
                `}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreviewPanel;