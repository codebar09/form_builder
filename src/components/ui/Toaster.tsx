import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}

interface ToasterContextType {
  toast: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToasterContext = React.createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

const ToastItem = ({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) => {
  const { id, title, description, type } = toast;
  
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: InfoIcon,
  }[type];
  
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }[type];
  
  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  }[type];
  
  return (
    <div
      className={cn(
        'w-full max-w-sm overflow-hidden rounded-lg border shadow-lg pointer-events-auto',
        'animate-in slide-in-from-right-full',
        colors
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={cn('h-5 w-5', iconColors)} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium">{title}</p>
            {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className={cn(
                'inline-flex rounded-md bg-transparent p-1 hover:bg-white hover:bg-opacity-20',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              )}
              onClick={onDismiss}
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const toast = (newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { ...newToast, id }]);
  };
  
  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  
  return (
    <ToasterContext.Provider value={{ toast, dismiss }}>
      <div 
        className="fixed top-4 right-4 z-50 flex flex-col gap-2"
        aria-live="assertive"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};