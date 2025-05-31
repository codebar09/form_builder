import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormTemplate, FormField } from '../types/form';

interface FormBuilderContextType {
  activeForm: FormTemplate | null;
  setActiveForm: (form: FormTemplate | null) => void;
  loadForm: (formId: string) => FormTemplate | null;
  loadSavedForms: () => FormTemplate[];
  saveForm: () => void;
  createNewForm: () => string;
  deleteForm: (formId: string) => void;
  updateFormField: (fieldId: string, updates: Partial<FormField>) => void;
  addFormField: (fieldType: string) => void;
  removeFormField: (fieldId: string) => void;
  reorderFormFields: (sourceIndex: number, destinationIndex: number) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeForm, setActiveForm] = useState<FormTemplate | null>(null);

  // Load all saved forms
  const loadSavedForms = useCallback((): FormTemplate[] => {
    try {
      const savedFormsJson = localStorage.getItem('formbuilder_forms');
      if (savedFormsJson) {
        return JSON.parse(savedFormsJson);
      }
    } catch (error) {
      console.error('Error loading saved forms:', error);
    }
    return [];
  }, []);

  // Load a specific form by ID
  const loadForm = useCallback((formId: string): FormTemplate | null => {
    try {
      const savedForms = loadSavedForms();
      return savedForms.find(form => form.id === formId) || null;
    } catch (error) {
      console.error('Error loading form:', error);
      return null;
    }
  }, [loadSavedForms]);

  // Create a new form
  const createNewForm = useCallback((): string => {
    const newFormId = uuidv4();
    const newForm: FormTemplate = {
      id: newFormId,
      name: 'Untitled Form',
      description: '',
      fields: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const savedForms = loadSavedForms();
      localStorage.setItem('formbuilder_forms', JSON.stringify([...savedForms, newForm]));
      setActiveForm(newForm);
    } catch (error) {
      console.error('Error creating new form:', error);
    }

    return newFormId;
  }, [loadSavedForms]);

  // Save the current form
  const saveForm = useCallback(() => {
    if (!activeForm) return;

    try {
      const updatedForm = {
        ...activeForm,
        updatedAt: new Date().toISOString(),
      };

      const savedForms = loadSavedForms();
      const updatedForms = savedForms.map(form => 
        form.id === updatedForm.id ? updatedForm : form
      );

      // If form doesn't exist yet, add it
      if (!savedForms.some(form => form.id === updatedForm.id)) {
        updatedForms.push(updatedForm);
      }

      localStorage.setItem('formbuilder_forms', JSON.stringify(updatedForms));
      setActiveForm(updatedForm);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  }, [activeForm, loadSavedForms]);

  // Delete a form
  const deleteForm = useCallback((formId: string) => {
    try {
      const savedForms = loadSavedForms();
      const updatedForms = savedForms.filter(form => form.id !== formId);
      localStorage.setItem('formbuilder_forms', JSON.stringify(updatedForms));

      // If the active form is being deleted, clear it
      if (activeForm?.id === formId) {
        setActiveForm(null);
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  }, [activeForm, loadSavedForms]);

  // Update a field in the current form
  const updateFormField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    if (!activeForm) return;

    setActiveForm(prevForm => {
      if (!prevForm) return null;

      const updatedFields = prevForm.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      );

      return {
        ...prevForm,
        fields: updatedFields,
      };
    });
  }, [activeForm]);

  // Add a new field to the current form
  const addFormField = useCallback((fieldType: string) => {
    if (!activeForm) return;

    const newField: FormField = {
      id: uuidv4(),
      type: fieldType,
      label: `New ${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`,
      required: false,
      step: 0,
    };

    // Add default options for select and radio fields
    if (fieldType === 'select' || fieldType === 'radio') {
      newField.options = ['Option 1', 'Option 2', 'Option 3'];
    }

    // Add default content for paragraph
    if (fieldType === 'paragraph') {
      newField.content = 'Enter informational text here.';
    }

    setActiveForm(prevForm => {
      if (!prevForm) return null;

      return {
        ...prevForm,
        fields: [...prevForm.fields, newField],
      };
    });
  }, [activeForm]);

  // Remove a field from the current form
  const removeFormField = useCallback((fieldId: string) => {
    if (!activeForm) return;

    setActiveForm(prevForm => {
      if (!prevForm) return null;

      return {
        ...prevForm,
        fields: prevForm.fields.filter(field => field.id !== fieldId),
      };
    });
  }, [activeForm]);

  // Reorder fields in the current form
  const reorderFormFields = useCallback((sourceIndex: number, destinationIndex: number) => {
    if (!activeForm) return;

    setActiveForm(prevForm => {
      if (!prevForm) return null;

      const newFields = Array.from(prevForm.fields);
      const [removed] = newFields.splice(sourceIndex, 1);
      newFields.splice(destinationIndex, 0, removed);

      return {
        ...prevForm,
        fields: newFields,
      };
    });
  }, [activeForm]);

  const value = {
    activeForm,
    setActiveForm,
    loadForm,
    loadSavedForms,
    saveForm,
    createNewForm,
    deleteForm,
    updateFormField,
    addFormField,
    removeFormField,
    reorderFormFields,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};