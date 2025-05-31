import React from 'react';
import { FormField } from '../../types/form';

interface HeadingElementProps {
  field: FormField;
}

const HeadingElement = ({ field }: HeadingElementProps) => {
  return (
    <h2 className="text-xl font-bold text-gray-800 mb-2">
      {field.label}
    </h2>
  );
};

export default HeadingElement;