import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface NumberInputProps {
  field: FormField;
  value: number | string;
  error?: string;
  onChange: (value: number | string) => void;
  disabled?: boolean;
}

const NumberInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: NumberInputProps) => {
  return (
    <FormFieldWrapper field={field} error={error}>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === '' ? '' : Number(val));
        }}
        placeholder={field.placeholder}
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

export default NumberInput;