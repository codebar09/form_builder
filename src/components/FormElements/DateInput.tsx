import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface DateInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const DateInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: DateInputProps) => {
  return (
    <FormFieldWrapper field={field} error={error}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full rounded-md shadow-sm
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
        `}
        min={field.min}
        max={field.max}
        required={field.required}
        disabled={disabled}
      />
    </FormFieldWrapper>
  );
};

export default DateInput;