import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useFormBuilder } from '../../contexts/FormBuilderContext';
import { FormField } from '../../types/form';
import FormFieldComponent from '../FormElements/FormFieldComponent';
import { Grip, Settings } from 'lucide-react';

interface FormBuilderCanvasProps {
  onFieldSelect: (field: FormField) => void;
}

const FormBuilderCanvas = ({ onFieldSelect }: FormBuilderCanvasProps) => {
  const { activeForm } = useFormBuilder();
  
  if (!activeForm) {
    return (
      <div className="col-span-6 bg-white rounded-lg shadow-sm flex items-center justify-center h-full">
        Loading form...
      </div>
    );
  }

  return (
    <div className="col-span-6 bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Form Title"
          className="w-full text-2xl font-bold border-0 border-b-2 border-transparent focus:border-blue-500 focus:ring-0 pb-2 focus:outline-none"
          defaultValue={activeForm.name || ""}
        />
        <textarea
          placeholder="Form Description (optional)"
          className="w-full mt-2 border-0 border-b border-gray-200 focus:ring-0 focus:border-blue-500 resize-none text-gray-600"
          defaultValue={activeForm.description || ""}
          rows={2}
        />
      </div>
      
      <Droppable droppableId="form-canvas">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-[calc(100%-5rem)] rounded-md p-4
              ${snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-dashed border-blue-200' : 'bg-gray-50 border-2 border-dashed border-gray-200'}
              transition-colors duration-200
              ${activeForm.fields.length === 0 ? 'flex items-center justify-center' : ''}
            `}
          >
            {activeForm.fields.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-gray-500 mb-2">Drag and drop elements here</p>
                <p className="text-sm text-gray-400">or choose a template from the sidebar</p>
              </div>
            ) : (
              activeForm.fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`
                        relative group mb-4 bg-white border rounded-md
                        ${snapshot.isDragging ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-gray-300'}
                        transition-all duration-150
                      `}
                    >
                      <div className="flex items-center p-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mr-3 p-1 rounded hover:bg-gray-100 cursor-grab"
                        >
                          <Grip size={16} className="text-gray-400" />
                        </div>
                        
                        <div className="flex-1">
                          <FormFieldComponent field={field} />
                        </div>
                        
                        <button
                          onClick={() => onFieldSelect(field)}
                          className="ml-2 p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Settings size={16} />
                        </button>
                      </div>
                      
                      {field.step > 0 && (
                        <div className="absolute right-0 top-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-bl-md rounded-tr-md">
                          Step {field.step + 1}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default FormBuilderCanvas;