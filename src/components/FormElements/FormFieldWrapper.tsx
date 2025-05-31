import React from 'react';
import { FormField } from '../../types/form';

interface FormFieldWrapperProps {
  field: FormField;
  error?: string;
  children: React.ReactNode;
  labelFirst?: boolean;
}

const FormFieldWrapper = ({ 
  field, 
  error, 
  children,
  labelFirst = true
}: FormFieldWrapperProps) => {
  // Skip label rendering for checkbox (handled in the component itself)
  const renderLabel = field.type !== 'checkbox' && labelFirst;
  
  return (
    <div>
      {renderLabel && (
        <label 
          htmlFor={field.id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {field.helpText && !error && (
        <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormFieldWrapper;