import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface SelectInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: SelectInputProps) => {
  const options = field.options || [];

  return (
    <FormFieldWrapper field={field} error={error}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full rounded-md shadow-sm
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
        `}
        required={field.required}
        disabled={disabled}
      >
        <option value="">{field.placeholder || 'Select an option'}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  );
};

export default SelectInput;