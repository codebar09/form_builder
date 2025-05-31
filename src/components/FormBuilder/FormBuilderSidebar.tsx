import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Type, 
  AlignLeft, 
  List, 
  CheckSquare, 
  Calendar, 
  Mail, 
  Phone, 
  Hash, 
  Radio, 
  Upload, 
  FileText,
  Heading
} from 'lucide-react';

interface FieldTypeItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

const fieldTypes: FieldTypeItem[] = [
  { 
    id: 'text', 
    icon: <Type size={18} />, 
    label: 'Text Input', 
    description: 'Single line text input'
  },
  { 
    id: 'textarea', 
    icon: <AlignLeft size={18} />, 
    label: 'Textarea', 
    description: 'Multi-line text input' 
  },
  { 
    id: 'select', 
    icon: <List size={18} />, 
    label: 'Dropdown', 
    description: 'Select from options' 
  },
  { 
    id: 'checkbox', 
    icon: <CheckSquare size={18} />, 
    label: 'Checkbox', 
    description: 'Yes/No selection' 
  },
  { 
    id: 'date', 
    icon: <Calendar size={18} />, 
    label: 'Date', 
    description: 'Date picker' 
  },
  { 
    id: 'email', 
    icon: <Mail size={18} />, 
    label: 'Email', 
    description: 'Email address input' 
  },
  { 
    id: 'phone', 
    icon: <Phone size={18} />, 
    label: 'Phone', 
    description: 'Phone number input' 
  },
  { 
    id: 'number', 
    icon: <Hash size={18} />, 
    label: 'Number', 
    description: 'Numeric input' 
  },
  { 
    id: 'radio', 
    icon: <Radio size={18} />, 
    label: 'Radio Group', 
    description: 'Single selection from options' 
  },
  { 
    id: 'file', 
    icon: <Upload size={18} />, 
    label: 'File Upload', 
    description: 'File attachment field' 
  },
  { 
    id: 'heading', 
    icon: <Heading size={18} />, 
    label: 'Heading', 
    description: 'Section title' 
  },
  { 
    id: 'paragraph', 
    icon: <FileText size={18} />, 
    label: 'Paragraph', 
    description: 'Informational text' 
  }
];

const FormBuilderSidebar = () => {
  return (
    <div className="col-span-3 bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto">
      <h2 className="font-semibold text-gray-800 mb-4">Form Elements</h2>
      
      <Droppable droppableId="field-types" isDropDisabled={true}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {fieldTypes.map((field, index) => (
              <Draggable
                key={field.id}
                draggableId={field.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                      flex items-center p-3 border rounded-md cursor-grab
                      ${snapshot.isDragging ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}
                      transition-colors duration-150
                    `}
                  >
                    <div className="mr-3 text-gray-600">
                      {field.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{field.label}</p>
                      <p className="text-xs text-gray-500">{field.description}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-8 border-t pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Templates</h3>
        <div className="space-y-2">
          <button 
            className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors"
          >
            <p className="text-sm font-medium">Contact Form</p>
            <p className="text-xs text-gray-500">Name, Email, Message</p>
          </button>
          <button 
            className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors"
          >
            <p className="text-sm font-medium">Feedback Survey</p>
            <p className="text-xs text-gray-500">Multiple choice questions</p>
          </button>
          <button 
            className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors"
          >
            <p className="text-sm font-medium">Registration Form</p>
            <p className="text-xs text-gray-500">Account details with validation</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderSidebar;