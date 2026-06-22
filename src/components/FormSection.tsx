import React from 'react';

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  accentColor?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  accentColor = '#1e40af'
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm mb-6"
      style={{ border: '1px solid #e2e8f0', background: '#fff' }}>
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: '2px solid #e2e8f0', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        {icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${accentColor}15`, border: `1.5px solid ${accentColor}30` }}>
            <span style={{ color: accentColor }}>{icon}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: accentColor }} />
          <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase"
            style={{ letterSpacing: '0.05em' }}>
            {title}
          </h2>
        </div>
      </div>
      {/* Section Content */}
      <div className="px-6 py-6 space-y-5">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
