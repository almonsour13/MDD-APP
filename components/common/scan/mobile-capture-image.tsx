'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Image as ImageIcon, Scan, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'

export default function ImageScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [flashMode, setFlashMode] = useState(false)
  const [capturedImage, setCapturedImage] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
        }
      } catch (err) {
        setHasPermission(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (scanResult === null) {
      setCapturedImage('')
    }
  }, [scanResult])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setCapturedImage(imageDataUrl)
      }
    }
  }

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

  const toggleFlash = () => {
    setFlashMode(!flashMode)
    // Note: Web API doesn't support flash control. This is just for UI demonstration.
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
          <Button variant="ghost" size="icon" className='rounded-full' onClick={() => router.back()}>
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
                  <div className="absolute top-4 left-4 w-20 h-20 border-8 rounded-tl-md border-green-600 border-r-0 border-b-0" />
                  <div className="absolute top-4 right-4 w-20 h-20 border-8 rounded-tr-md border-green-600 border-l-0 border-b-0" />
                  <div className="absolute bottom-4 left-4 w-20 h-20 border-8 rounded-bl-md border-green-600 border-r-0 border-t-0" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 border-8 rounded-br-md border-green-600 border-l-0 border-t-0" />
                </div>
              </>
            )}
            <canvas ref={canvasRef} className="hidden" width={1280} height={720} />
          </div>
        </main>

        {/* Footer */}
        <footer className="h-28 flex justify-center items-center space-x-12">
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
          <Button variant="outline" size="icon" className={`w-14 h-14 rounded-full ${flashMode ? 'bg-yellow-200' : ''}`} onClick={toggleFlash}>
            <Zap className={`h-6 w-6 ${flashMode ? 'text-yellow-500' : ''}`} />
          </Button>
        </footer>
      </div>
    </div>
  )
}