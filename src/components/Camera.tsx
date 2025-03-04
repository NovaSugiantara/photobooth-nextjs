import React, { useRef, useEffect, useState } from 'react';
import { Camera as CameraIcon } from 'lucide-react';
import ActionButton from './ActionButton';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setError(null);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions and try again.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !stream) return;

    // Create flash effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 750);

    // Create a canvas to capture image
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      // Draw the video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert to data URL and pass to parent
      const imageDataUrl = canvas.toDataURL('image/png');
      onCapture(imageDataUrl);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {isFlashing && (
        <div className="animate-camera-flash camera-flash absolute inset-0 bg-white opacity-50 z-10"></div>
      )}

      <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black animate-fade-in">
        {error ? (
          <div className="flex items-center justify-center h-[400px] bg-gray-100 text-red-500 p-4 text-center">
            <div>
              <p className="mb-4">{error}</p>
              <ActionButton onClick={startCamera}>Try Again</ActionButton>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 mb-4 flex justify-center">
          <ActionButton
            variant="primary"
            onClick={capturePhoto}
            className="rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            disabled={!!error}
          >
            <CameraIcon size={24} />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default Camera;
