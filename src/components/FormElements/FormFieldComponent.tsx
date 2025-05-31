import React from 'react';
import { FormField } from '../../types/form';
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
} from './';

interface FormFieldComponentProps {
  field: FormField;
}

const FormFieldComponent = ({ field }: FormFieldComponentProps) => {
  // Create placeholder data for preview purposes
  const placeholderValue = (() => {
    switch (field.type) {
      case 'checkbox':
        return false;
      case 'select':
      case 'radio':
        return field.options && field.options.length > 0 ? field.options[0] : '';
      case 'number':
        return 0;
      case 'file':
        return null;
      default:
        return '';
    }
  })();

  const commonProps = {
    field,
    value: placeholderValue,
    onChange: () => {},
    disabled: true
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

export default FormFieldComponent;