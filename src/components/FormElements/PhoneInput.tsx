import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface PhoneInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PhoneInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: PhoneInputProps) => {
  return (
    <FormFieldWrapper field={field} error={error}>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`
          w-full rounded-md shadow-sm
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
        `}
        required={field.required}
        disabled={disabled}
        pattern={field.validatePattern !== false ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : undefined}
      />
    </FormFieldWrapper>
  );
};

export default PhoneInput;