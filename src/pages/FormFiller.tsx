import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormBuilder } from '../contexts/FormBuilderContext';
import { FormTemplate, FormValues, ValidationErrors } from '../types/form';
import FormStepIndicator from '../components/FormSteps/FormStepIndicator';
import FormRenderer from '../components/FormPreview/FormRenderer';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { validateForm } from '../utils/validation';

const FormFiller = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { loadForm } = useFormBuilder();
  
  const [form, setForm] = useState<FormTemplate | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (formId) {
      const loadedForm = loadForm(formId);
      if (loadedForm) {
        setForm(loadedForm);
        
        // Initialize form values
        const initialValues: FormValues = {};
        loadedForm.fields.forEach(field => {
          if (field.id) {
            initialValues[field.id] = field.defaultValue || '';
          }
        });
        setFormValues(initialValues);
      } else {
        navigate('/');
      }
    }
  }, [formId, loadForm, navigate]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error for this field when user changes it
    if (errors[fieldId]) {
      const newErrors = { ...errors };
      delete newErrors[fieldId];
      setErrors(newErrors);
    }
  };

  const handleNextStep = () => {
    if (!form) return;
    
    // Get fields for current step
    const stepFields = form.fields.filter(field => field.step === currentStep);
    
    // Validate current step
    const stepErrors = validateForm(stepFields, formValues);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    // Clear errors and move to next step
    setErrors({});
    setCurrentStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = () => {
    if (!form) return;
    
    // Validate all fields one last time
    const finalStepFields = form.fields.filter(field => field.step === currentStep);
    const stepErrors = validateForm(finalStepFields, formValues);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    // Here you would handle form submission, such as:
    // - Sending data to an API
    // - Storing in local storage
    // - Displaying a success message
    
    // For now, we'll just mark as submitted and show a success message
    setIsSubmitted(true);
    
    // In a real application, you would submit the form data:
    // submitFormData(form.id, formValues);
  };

  if (!form) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <div className="animate-pulse text-gray-600 font-medium">Loading form...</div>
      </div>
    );
  }

  // Calculate total steps
  const totalSteps = form.fields.reduce((max, field) => 
    Math.max(max, field.step || 0), 0) + 1;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8 text-lg">Your form has been submitted successfully.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transform transition-transform duration-200 hover:scale-105"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {form.name || "Untitled Form"}
        </h1>
        {form.description && (
          <p className="text-blue-100 text-lg">
            {form.description}
          </p>
        )}
      </div>
      
      {totalSteps > 1 && (
        <FormStepIndicator 
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="mb-8"
        />
      )}
      
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition-all duration-300 hover:shadow-xl">
        <FormRenderer
          fields={form.fields.filter(field => field.step === currentStep)}
          values={formValues}
          errors={errors}
          onChange={handleFieldChange}
          readOnly={false}
        />
      </div>
      
      <div className="flex justify-between items-center">
        {currentStep > 0 ? (
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            className="flex items-center gap-2 px-6 py-3 text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Previous Step
          </Button>
        ) : (
          <div>{/* Empty div to maintain layout */}</div>
        )}
        
        {currentStep < totalSteps - 1 ? (
          <Button 
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transform transition-all duration-200 hover:scale-105"
          >
            Next Step
            <ArrowRight size={20} />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transform transition-all duration-200 hover:scale-105"
          >
            Submit Form
            <Check size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormFiller;