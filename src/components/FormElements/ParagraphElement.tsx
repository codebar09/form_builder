import React from 'react';
import { FormField } from '../../types/form';

interface ParagraphElementProps {
  field: FormField;
}

const ParagraphElement = ({ field }: ParagraphElementProps) => {
  return (
    <div className="mb-4">
      {field.label && (
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          {field.label}
        </h3>
      )}
      <p className="text-gray-600">
        {field.content}
      </p>
    </div>
  );
};

export default ParagraphElement;