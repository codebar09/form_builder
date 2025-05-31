export interface FormField {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  defaultValue?: any;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number;
  validatePattern?: boolean;
  content?: string;
  accept?: string;
}

export interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

export interface FormValues {
  [key: string]: any;
}

export interface ValidationErrors {
  [key: string]: string;
}