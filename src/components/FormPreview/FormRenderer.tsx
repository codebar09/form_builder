import React from 'react';
import { FormField, FormValues, ValidationErrors } from '../../types/form';
import { 
  TextInput, 
  TextareaInput, 
  SelectInput, 
  CheckboxInput, 
  DateInput, 
  EmailInput, 
  PhoneInput, 
  NumberInput, 
  RadioInput,
  FileInput,
  HeadingElement,
  ParagraphElement
} from '../FormElements';

interface FormRendererProps {
  fields: FormField[];
  values: FormValues;
  errors: ValidationErrors;
  onChange: (fieldId: string, value: any) => void;
  readOnly?: boolean;
}

const FormRenderer = ({ 
  fields, 
  values, 
  errors, 
  onChange,
  readOnly = false
}: FormRendererProps) => {
  const renderField = (field: FormField) => {
    const commonProps = {
      field,
      value: values[field.id] || field.defaultValue || '',
      error: errors[field.id],
      onChange: (value: any) => onChange(field.id, value),
      disabled: readOnly
    };

    switch (field.type) {
      case 'text':
        return <TextInput {...commonProps} />;
      case 'textarea':
        return <TextareaInput {...commonProps} />;
      case 'select':
        return <SelectInput {...commonProps} />;
      case 'checkbox':
        return <CheckboxInput {...commonProps} />;
      case 'date':
        return <DateInput {...commonProps} />;
      case 'email':
        return <EmailInput {...commonProps} />;
      case 'phone':
        return <PhoneInput {...commonProps} />;
      case 'number':
        return <NumberInput {...commonProps} />;
      case 'radio':
        return <RadioInput {...commonProps} />;
      case 'file':
        return <FileInput {...commonProps} />;
      case 'heading':
        return <HeadingElement field={field} />;
      case 'paragraph':
        return <ParagraphElement field={field} />;
      default:
        return <p>Unknown field type: {field.type}</p>;
    }
  };

  return (
    <div className="space-y-6">
      {fields.map(field => (
        <div key={field.id}>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default FormRenderer;