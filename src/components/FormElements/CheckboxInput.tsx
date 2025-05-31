import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface CheckboxInputProps {
  field: FormField;
  value: boolean;
  error?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

const CheckboxInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: CheckboxInputProps) => {
  return (
    <FormFieldWrapper field={field} error={error} labelFirst={false}>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className={`
            h-4 w-4 rounded 
            ${error 
              ? 'border-red-300 focus:ring-red-500 text-red-600' 
              : 'border-gray-300 focus:ring-blue-500 text-blue-600'}
          `}
          required={field.required}
          disabled={disabled}
        />
        <label 
          htmlFor={field.id} 
          className="ml-2 block text-sm text-gray-700"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    </FormFieldWrapper>
  );
};

export default CheckboxInput;