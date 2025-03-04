import React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { TemplateType } from './TemplateSelector';
import OptimizedImage from './OptimizedImage';

export type OrientationType = 'landscape' | 'portrait';

interface PhotoGridProps {
  photos: string[];
  template: TemplateType;
  orientation?: OrientationType;
  onRemovePhoto: (index: number) => void;
  gridRef?: React.RefObject<HTMLDivElement>;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  template,
  orientation = 'landscape',
  onRemovePhoto,
  gridRef,
}) => {
  // For the default template (non filmstrip), use a simple background with a dashed border.
  const defaultClasses =
    template === 'roll-film'
      ? '' // Filmstrip template will use the filmstrip CSS class.
      : "bg-gray-50 border-2 border-dashed border-gray-200";

  // When the template is "roll-film", add the custom filmstrip class.
  const filmstripClass = template === 'roll-film' ? 'filmstrip' : '';

  // Adjust grid layout and image aspect ratio based on orientation.
  const gridLayout =
    orientation === 'landscape'
      ? "grid grid-cols-1 md:grid-cols-3 gap-4 p-6"
      : "grid grid-cols-1 md:grid-cols-2 gap-4 p-6";
  const imageAspect =
    orientation === 'landscape' ? "aspect-[4/3]" : "aspect-[3/4]";

  if (photos.length === 0) {
    return (
      <div
        ref={gridRef}
        className={cn(
          "w-full rounded-lg flex items-center justify-center transition-all duration-300 filmstrip-container",
          defaultClasses,
          filmstripClass
        )}
      >
        <p className="text-gray-500 text-center">
          Captured photos will appear here
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={cn(
        "w-full rounded-lg transition-all duration-300 filmstrip-container",
        defaultClasses,
        filmstripClass
      )}
    >
      <div className={gridLayout}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className={cn(
              "relative group overflow-hidden rounded-lg",
              template === 'roll-film' && 'shadow-xl'
            )}
          >
            <OptimizedImage
              src={photo}
              alt={`Captured photo ${index + 1}`}
              className={`w-full h-auto object-cover ${imageAspect}`}
              width={400}
              height={300}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
            <button
              onClick={() => onRemovePhoto(index)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-white"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
