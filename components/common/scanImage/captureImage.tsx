"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface UploadImageProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
}

const CameraField: React.FC<UploadImageProps> = ({ uploadedImage, setUploadedImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    startCamera();

    return () => {
      // Stop all video streams when the component unmounts
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const startCamera = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: "environment" } // Use the back camera
          }
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    }
  };
  const startCameraAgain = async () => {
    setLoading(false); // Ensure loading is false before restarting the camera
    await startCamera(); // Restart the camera
  };

  const handleCancel = () => {
    setUploadedImage(null); // Clear the uploaded image
    startCameraAgain(); // Restart the camera
  };

  const handleCapture = async () => {
    setLoading(true); // Set loading state
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/png");
      setUploadedImage(imageData); // Set the captured image
    }

    setLoading(false); // Reset loading state after processing
  };

  return (
    <Card className="p-4 flex flex-col gap-4">
      <CardContent className={`h-72 lg:h-80 p-0 lg:p-4 flex rounded-xl`}>
        <div className="flex-1 flex justify-center items-center h-full relative">
          <div className="h-72 w-72 overflow-hidden rounded-lg flex items-center justify-center relative bg-black">
            {uploadedImage ? (
              <div className="relative w-full h-full">
                <img src={uploadedImage} alt="Captured" className="w-full h-full object-cover" />
                <Button 
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2" 
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white">Loading...</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex-1 p-0'>
        <div className="flex-1 flex">
          <Button 
            className="w-full text-white" 
            onClick={handleCapture}
          >
            Capture Image
          </Button>
        </div>
      </CardFooter>
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
};

export default CameraField;
