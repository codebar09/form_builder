import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface RadioInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: RadioInputProps) => {
  const options = field.options || [];

  return (
    <FormFieldWrapper field={field} error={error}>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              id={`${field.id}-${index}`}
              type="radio"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className={`
                h-4 w-4 
                ${error 
                  ? 'border-red-300 focus:ring-red-500 text-red-600' 
                  : 'border-gray-300 focus:ring-blue-500 text-blue-600'}
              `}
              required={field.required}
              disabled={disabled}
            />
            <label 
              htmlFor={`${field.id}-${index}`} 
              className="ml-2 block text-sm text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default RadioInput;