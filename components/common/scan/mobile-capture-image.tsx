'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, Check, Image as ImageIcon, Scan, SwitchCamera, X, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCameraContext } from '@/context/user-camera-context'
import { useCaptureImageContext } from '@/context/capture-image-context'
export default function ImageScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const streamRef = useRef<MediaStream | null>(null)
  const router = useRouter()
  const { isCameraOpen, toggleCamera } = useCameraContext();
  const {capturedImage, setCapturedImage} = useCaptureImageContext();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
      }
    } catch (err) {
      setHasPermission(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(async () => {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (!capturedImage) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [capturedImage, facingMode])


  const handleCapture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");

      const size = Math.min(video.videoWidth, video.videoHeight);
      canvas.width = size;
      canvas.height = size;

      const xOffset = (video.videoWidth - size) / 2;
      const yOffset = (video.videoHeight - size) / 2;

      context?.drawImage(video, xOffset, yOffset, size, size, 0, 0, size, size);

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCapturedImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const handleSwitchCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user')
    stopCamera().then(() => {
      startCamera();
    });
  };
  const handleCheck = () =>{
      stopCamera()
      toggleCamera()
  }
  const handleBack = () => {
      stopCamera()
      toggleCamera()
      setCapturedImage('');
  }
  //   if (hasPermission === null) {
  //     return null
  //   }
  //   if (hasPermission === false) {
  //     return (
  //       <div className="flex items-center justify-center h-screen w-full bg-background">
  //         <p>No access to camera</p>
  //       </div>
  //     )
  //   }

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <div className="w-full md:max-w-md h-full mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between p-4 h-16">
          <Button variant="ghost" size="icon" className='rounded-full' onClick={handleBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold">Scan Leaf</h1>
          <div className="w-6 h-6" />
        </header>
        {/* Main */}
        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-black">
            {!capturedImage && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  onCanPlay={() => setIsCameraReady(true)}
                />
                <div className="flex-1 m-4">
                  <div className="zoom-border absolute top-4 left-4 w-20 h-20 border-8 rounded-tl-md border-green-600 border-r-0 border-b-0" />
                  <div className="zoom-border absolute top-4 right-4 w-20 h-20 border-8 rounded-tr-md border-green-600 border-l-0 border-b-0" />
                  <div className="zoom-border absolute bottom-4 left-4 w-20 h-20 border-8 rounded-bl-md border-green-600 border-r-0 border-t-0" />
                  <div className="zoom-border absolute bottom-4 right-4 w-20 h-20 border-8 rounded-br-md border-green-600 border-l-0 border-t-0" />
                </div>
              </>
            )}
            {capturedImage && (
              <Image src={capturedImage} alt="Uploaded" className="h-full w-full rounded-md object-cover" width={256} height={256} />
            )}
            <canvas ref={canvasRef} className="hidden" width={1280} height={720} />
          </div>
        </main>
        {/* Footer */}
        {
          !capturedImage ? (
            <footer className="h-28 flex justify-between items-center px-12">
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-full" onClick={() => document.getElementById('image-input')?.click()}>
                <ImageIcon className="h-6 w-6" />
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </Button>
              <Button variant="default" size="icon" className="w-20 h-20 rounded-full bg-green-700 hover:bg-green-600" onClick={handleCapture}>
                <Scan className="h-8 w-8" />
              </Button>
              <Button variant="outline" size="icon" className={`w-14 h-14 rounded-full`} onClick={handleSwitchCamera}>
                <SwitchCamera className={`h-6 w-6 `} />
              </Button>
            </footer>
          ) : (
            <footer className="h-28 flex justify-between items-center px-12">
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-full" onClick={() => { setCapturedImage('') }}>
                <X className='h-6 w-6' />
              </Button>
              <Button variant="outline" size="icon" className={`w-14 h-14 rounded-full`} onClick={handleCheck}>
                <Check className='h-6 w-6' />
              </Button>
            </footer>
          )
        }
      </div>
    </div>
  )
}
