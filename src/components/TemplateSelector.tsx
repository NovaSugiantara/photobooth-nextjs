import React from 'react';
import { cn } from "@/lib/utils";

export type TemplateType = 'default' | 'roll-film';
export type OrientationType = 'landscape' | 'portrait'; // ✅ Tambahkan tipe orientasi

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  selectedOrientation: OrientationType; // ✅ Tambahkan prop untuk orientasi
  onSelectTemplate: (template: TemplateType) => void;
  onSelectOrientation: (orientation: OrientationType) => void; // ✅ Tambahkan handler orientasi
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  selectedOrientation,
  onSelectTemplate,
  onSelectOrientation
}) => {
  const templates = [
    { id: 'default', name: 'Default', description: 'Clean white background' },
    { id: 'roll-film', name: 'Roll Film', description: 'Classic film roll style' }
  ];

  const orientations = [
    { id: 'landscape', name: 'Landscape', description: 'Wider layout (16:9)' },
    { id: 'portrait', name: 'Portrait', description: 'Taller layout (9:16)' }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Template Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Select Template</h3>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id as TemplateType)}
              className={cn(
                "py-3 px-4 border rounded-lg transition-all duration-200",
                selectedTemplate === template.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="font-medium text-sm">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orientation Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Select Orientation</h3>
        <div className="grid grid-cols-2 gap-3">
          {orientations.map((orientation) => (
            <button
              key={orientation.id}
              onClick={() => onSelectOrientation(orientation.id as OrientationType)}
              className={cn(
                "py-3 px-4 border rounded-lg transition-all duration-200",
                selectedOrientation === orientation.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <span className="font-medium text-sm">{orientation.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
