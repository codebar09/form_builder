import React, { useState } from 'react';
import { FormField } from '../../types/form';
import FormFieldWrapper from './FormFieldWrapper';
import { Upload, X, FileText } from 'lucide-react';

interface FileInputProps {
  field: FormField;
  value: File | null | string;
  error?: string;
  onChange: (value: File | null) => void;
  disabled?: boolean;
}

const FileInput = ({ 
  field, 
  value, 
  error, 
  onChange,
  disabled = false 
}: FileInputProps) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  const clearFile = () => {
    setFileName('');
    onChange(null);
  };

  return (
    <FormFieldWrapper field={field} error={error}>
      {!fileName ? (
        <div 
          className={`
            border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center
            ${error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
            transition-colors cursor-pointer
          `}
        >
          <input
            type="file"
            id={field.id}
            className="hidden"
            onChange={handleFileChange}
            required={field.required}
            disabled={disabled}
            accept={field.accept}
          />
          <label htmlFor={field.id} className="cursor-pointer w-full text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-700">
              {field.placeholder || 'Click to upload a file'}
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              {field.helpText || 'PNG, JPG, PDF up to 10MB'}
            </span>
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-md bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
              {fileName}
            </span>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            disabled={disabled}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
    </FormFieldWrapper>
  );
};

export default FileInput;