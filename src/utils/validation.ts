import { FormField, FormValues, ValidationErrors } from '../types/form';

export const validateForm = (
  fields: FormField[],
  values: FormValues
): ValidationErrors => {
  const errors: ValidationErrors = {};

  fields.forEach(field => {
    const value = values[field.id];

    // Skip validation for non-input elements
    if (field.type === 'heading' || field.type === 'paragraph') {
      return;
    }

    // Required field validation
    if (field.required && 
        (value === undefined || value === null || value === '')) {
      errors[field.id] = 'This field is required';
      return;
    }

    // Skip further validation if field is empty and not required
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Text and textarea length validation
    if ((field.type === 'text' || field.type === 'textarea') && typeof value === 'string') {
      if (field.minLength && value.length < field.minLength) {
        errors[field.id] = `Minimum length is ${field.minLength} characters`;
      } else if (field.maxLength && value.length > field.maxLength) {
        errors[field.id] = `Maximum length is ${field.maxLength} characters`;
      }
    }

    // Number validation
    if (field.type === 'number' && !isNaN(Number(value))) {
      const numValue = Number(value);
      if (field.min !== undefined && numValue < Number(field.min)) {
        errors[field.id] = `Minimum value is ${field.min}`;
      } else if (field.max !== undefined && numValue > Number(field.max)) {
        errors[field.id] = `Maximum value is ${field.max}`;
      }
    }

    // Email validation
    if (field.type === 'email' && field.validatePattern !== false && typeof value === 'string') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        errors[field.id] = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'phone' && field.validatePattern !== false && typeof value === 'string') {
      // Simple pattern for demonstration - this would need to be adjusted for real-world use
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (!phonePattern.test(value)) {
        errors[field.id] = 'Please enter a valid phone number (e.g., 123-456-7890)';
      }
    }
  });

  return errors;
};