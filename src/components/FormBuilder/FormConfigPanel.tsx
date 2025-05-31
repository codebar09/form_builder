import React from 'react';
import { FormField } from '../../types/form';
import { Trash2 } from 'lucide-react';
import Button from '../ui/Button';

interface FormConfigPanelProps {
  selectedField: FormField | null;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
}

const FormConfigPanel = ({ 
  selectedField, 
  onUpdateField, 
  onRemoveField 
}: FormConfigPanelProps) => {
  if (!selectedField) {
    return (
      <div className="col-span-3 bg-white rounded-lg shadow-sm p-6 h-full">
        <div className="h-full flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 mb-2">No field selected</p>
          <p className="text-sm text-gray-400">Select a field to configure its properties</p>
        </div>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    onUpdateField(selectedField.id, { [key]: value });
  };

  const handleOptionsChange = (optionsText: string) => {
    const options = optionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    onUpdateField(selectedField.id, { options });
  };

  return (
    <div className="col-span-3 bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">Field Properties</h2>
        <button
          onClick={() => onRemoveField(selectedField.id)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedField.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {selectedField.type !== 'heading' && selectedField.type !== 'paragraph' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={selectedField.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        {selectedField.type === 'paragraph' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={selectedField.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </div>
        )}

        {(selectedField.type === 'select' || selectedField.type === 'radio') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options (one per line)
            </label>
            <textarea
              value={(selectedField.options || []).join('\n')}
              onChange={(e) => handleOptionsChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              placeholder="Option 1&#10;Option 2&#10;Option 3"
            />
          </div>
        )}

        {selectedField.type !== 'heading' && selectedField.type !== 'paragraph' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="required"
              checked={selectedField.required || false}
              onChange={(e) => handleChange('required', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
              Required field
            </label>
          </div>
        )}

        {(selectedField.type === 'text' || selectedField.type === 'textarea') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Length
              </label>
              <input
                type="number"
                value={selectedField.minLength || ''}
                onChange={(e) => handleChange('minLength', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Length
              </label>
              <input
                type="number"
                value={selectedField.maxLength || ''}
                onChange={(e) => handleChange('maxLength', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>
          </>
        )}

        {selectedField.type !== 'heading' && selectedField.type !== 'paragraph' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Help Text
            </label>
            <input
              type="text"
              value={selectedField.helpText || ''}
              onChange={(e) => handleChange('helpText', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Form Step
          </label>
          <select
            value={selectedField.step || 0}
            onChange={(e) => handleChange('step', parseInt(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={0}>Step 1</option>
            <option value={1}>Step 2</option>
            <option value={2}>Step 3</option>
            <option value={3}>Step 4</option>
            <option value={4}>Step 5</option>
          </select>
        </div>

        {(selectedField.type === 'number') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Value
              </label>
              <input
                type="number"
                value={selectedField.min || ''}
                onChange={(e) => handleChange('min', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Value
              </label>
              <input
                type="number"
                value={selectedField.max || ''}
                onChange={(e) => handleChange('max', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {selectedField.type === 'email' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="validate-email"
              checked={selectedField.validatePattern !== false}
              onChange={(e) => handleChange('validatePattern', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="validate-email" className="ml-2 block text-sm text-gray-700">
              Validate email format
            </label>
          </div>
        )}

        {selectedField.type === 'phone' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="validate-phone"
              checked={selectedField.validatePattern !== false}
              onChange={(e) => handleChange('validatePattern', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="validate-phone" className="ml-2 block text-sm text-gray-700">
              Validate phone number format
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormConfigPanel;