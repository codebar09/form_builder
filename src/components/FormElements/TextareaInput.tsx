import React from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';

interface TextareaInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TextareaInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: TextareaInputProps) => {
  return (
    <FormFieldWrapper field={field} error={error}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`
          w-full rounded-md shadow-sm
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
        `}
        rows={4}
        minLength={field.minLength}
        maxLength={field.maxLength}
        required={field.required}
        disabled={disabled}
      />
    </FormFieldWrapper>
  );
};

export default TextareaInput;