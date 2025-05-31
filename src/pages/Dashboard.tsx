import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clipboard, Trash2 } from 'lucide-react';
import { useFormBuilder } from '../contexts/FormBuilderContext';
import { FormTemplate } from '../types/form';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const { loadSavedForms, createNewForm, deleteForm } = useFormBuilder();
  const [forms, setForms] = useState<FormTemplate[]>([]);

  useEffect(() => {
    const savedForms = loadSavedForms();
    setForms(savedForms);
  }, [loadSavedForms]);

  const handleCreateForm = () => {
    const newFormId = createNewForm();
    window.location.href = `/builder/${newFormId}`;
  };

  const handleDeleteForm = (formId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm('Are you sure you want to delete this form?')) {
      deleteForm(formId);
      setForms(forms.filter(form => form.id !== formId));
    }
  };

  const copyShareLink = (formId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Forms</h1>
        <Button 
          onClick={handleCreateForm} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transform transition-all duration-200 hover:scale-105"
        >
          <Plus size={20} />
          Create Form
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center">
          <div className="mb-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Plus size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">No Forms Yet</h2>
          <p className="text-gray-600 mb-8 text-lg">Create your first form to get started</p>
          <Button 
            onClick={handleCreateForm}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transform transition-all duration-200 hover:scale-105"
          >
            Create New Form
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Link
              to={`/builder/${form.id}`}
              key={form.id}
              className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:scale-102"
            >
              <div className="p-6 border-b border-blue-50">
                <h3 className="font-semibold text-xl text-gray-800 truncate">
                  {form.name || "Untitled Form"}
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  {form.fields.length} fields • Last edited {new Date(form.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 flex justify-between">
                <button
                  onClick={(e) => copyShareLink(form.id, e)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors duration-200"
                >
                  <Clipboard size={16} />
                  Share
                </button>
                <button
                  onClick={(e) => handleDeleteForm(form.id, e)}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;