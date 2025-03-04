import React, { useState, useRef } from 'react';
import { Camera as CameraIcon, Download, Trash } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { useToast } from '@/hooks/use-toast';
import Camera from './Camera';
import PhotoGrid from './PhotoGrid';
import TemplateSelector, { TemplateType, OrientationType } from './TemplateSelector';
import ActionButton from './ActionButton';

type ExportFormat = 'png' | 'jpg' | 'jpeg';

const PhotoBooth: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [template, setTemplate] = useState<TemplateType>('default');
  const [selectedOrientation, setSelectedOrientation] = useState<OrientationType>('landscape');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const photoGridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleCapture = (imageSrc: string) => {
    setPhotos(prev => [...prev, imageSrc]);
    toast({
      title: "Photo captured",
      description: `${photos.length + 1} photos in your collection`,
      duration: 3000,
    });
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearPhotos = () => {
    if (photos.length === 0) return;
    
    setPhotos([]);
    toast({
      title: "Photos cleared",
      description: "All photos have been removed",
      duration: 3000,
    });
  };

  const handleExport = async (format: ExportFormat) => {
    if (photos.length === 0) {
      toast({
        title: "No photos to export",
        description: "Capture some photos first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!photoGridRef.current) return;
    
    toast({
      title: "Preparing export",
      description: "Please wait...",
      duration: 2000,
    });
    
    try {
      const canvas = await html2canvas(photoGridRef.current);
      const dataUrl = canvas.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `photobooth-${new Date().toISOString().slice(0, 10)}.${format}`;
      link.click();
      toast({
        title: `${format.toUpperCase()} exported successfully`,
        description: "Your photos have been downloaded",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      
      toast({
        title: "Export failed",
        description: "There was an error exporting your photos",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Photo Booth</h1>
          <p className="text-muted-foreground">Capture memories with elegance and simplicity</p>
        </div>
        
        {/* Camera Section */}
        <Camera onCapture={handleCapture} />
        
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <TemplateSelector 
            selectedTemplate={template} 
            onSelectTemplate={setTemplate} 
            selectedOrientation={selectedOrientation}
            onSelectOrientation={setSelectedOrientation}
          />

          <div className="flex items-center gap-3 relative">
            <ActionButton 
              variant="destructive" 
              onClick={handleClearPhotos}
              disabled={photos.length === 0}
            >
              <Trash size={16} />
              <span>Clear All</span>
            </ActionButton>
            
            {/* Export Button dengan Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Download size={16} />
                <span>Export {exportFormat.toUpperCase()}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                  {(['png', 'jpg', 'jpeg'] as ExportFormat[]).map((formatOption) => (
                    <button
                      key={formatOption}
                      onClick={() => {
                        setDropdownOpen(false);
                        setExportFormat(formatOption);
                        handleExport(formatOption);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {formatOption.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Photos Grid */}
        <div className="mt-6">
          <PhotoGrid 
            photos={photos} 
            template={template} 
            orientation={selectedOrientation}
            onRemovePhoto={handleRemovePhoto}
            gridRef={photoGridRef}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoBooth;
