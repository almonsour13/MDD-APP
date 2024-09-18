"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Image as LucideImage, X } from "lucide-react";
import Image from 'next/image';

const Upload = () => {
  return (
    <Card className="p-4">
      <CardContent className="h-80 flex border-dashed border-spacing-2 p-0 border-2 dark:border-secondary rounded-xl">
        <UploadImage />
      </CardContent>
    </Card>
  )
}

const UploadImage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  return (
    <>
      {uploadedImage ? (
        <div className="flex-1 flex justify-center items-center h-full relative">
            <Image src={uploadedImage} alt="Uploaded" className="max-h-64 rounded-md" />
            <button onClick={handleRemoveImage} className='absolute z-20 top-4 right-4 rounded-full h-10 w-10 text-2xl'>
                <X className='h-6 w-6'/>
            </button>
        </div>
      ) : (
        <div
          className={`flex-1 flex flex-col items-center justify-center relative h-full w-full rounded-lg ${dragActive ? 'bg-secondary' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
            {!dragActive ? (
            <div className="flex flex-col gap-2">
                <div className="flex justify-center dark:text-secondary">
                    <LucideImage className="h-16 w-16" />
                </div>
                <div className="text-center">
                {!isMobile?
                (
                    <>
                        <span className="text-2xl">Drag and drop an image here</span>
                        <br />
                        <p className="text-gray-500">or</p>
                    </>
                ):(
                    ""
                )
                }
                <div>
                    <label htmlFor="image" className="cursor-pointer text-primary">
                    click here to select an image
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    className="hidden"
                    onChange={handleFileChange}
                    />
                </div>
                </div>
            </div>
            ) : (""
            )}
        </div>
      )}
    </>
  );
};
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const userAgent = typeof window === "undefined" ? "" : navigator.userAgent;
      const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    }, []);
  
    return isMobile;
  };
export default Upload;
