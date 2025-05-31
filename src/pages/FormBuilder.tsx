import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useFormBuilder } from '../contexts/FormBuilderContext';
import FormBuilderSidebar from '../components/FormBuilder/FormBuilderSidebar';
import FormBuilderCanvas from '../components/FormBuilder/FormBuilderCanvas';
import FormConfigPanel from '../components/FormBuilder/FormConfigPanel';
import FormPreviewPanel from '../components/FormPreview/FormPreviewPanel';
import { FormField } from '../types/form';
import { Save, Eye, Settings, ArrowLeft, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';

const FormBuilder = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { 
    loadForm, 
    saveForm, 
    updateFormField, 
    addFormField, 
    removeFormField, 
    reorderFormFields, 
    setActiveForm 
  } = useFormBuilder();
  
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (formId) {
      const form = loadForm(formId);
      if (form) {
        setActiveForm(form);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [formId, loadForm, navigate, setActiveForm]);

  const handleFieldSelect = (field: FormField) => {
    setSelectedField(field);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // Moving from sidebar to canvas
    if (source.droppableId === 'field-types' && destination.droppableId === 'form-canvas') {
      const fieldType = result.draggableId;
      addFormField(fieldType);
    } 
    // Reordering within canvas
    else if (source.droppableId === 'form-canvas' && destination.droppableId === 'form-canvas') {
      reorderFormFields(source.index, destination.index);
    }
  };

  const handleSave = () => {
    saveForm();
    // Show toast notification
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="h-[calc(100vh-5rem)]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackToDashboard}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Form Builder</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 flex items-center gap-1 text-sm ${
                activeTab === 'edit' 
                  ? 'bg-blue-50 text-blue-600 border-r border-gray-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-200'
              }`}
            >
              <Settings size={16} />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 flex items-center gap-1 text-sm ${
                activeTab === 'preview' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Eye size={16} />
              Preview
            </button>
          </div>
          
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center gap-1"
          >
            <Share2 size={16} />
            Share
          </Button>
          
          <Button 
            onClick={handleSave}
            className="flex items-center gap-1"
          >
            <Save size={16} />
            Save
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
          {activeTab === 'edit' ? (
            <>
              <FormBuilderSidebar />
              <FormBuilderCanvas 
                onFieldSelect={handleFieldSelect} 
              />
              <FormConfigPanel 
                selectedField={selectedField}
                onUpdateField={updateFormField}
                onRemoveField={removeFormField}
              />
            </>
          ) : (
            <FormPreviewPanel 
              device={previewDevice}
              onDeviceChange={setPreviewDevice}
            />
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default FormBuilder;