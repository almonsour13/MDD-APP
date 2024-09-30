"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Camera, Image as LucideImage, Plus, Check, Upload,Crop } from "lucide-react";
import Image from "next/image";
import { ScanResultProvider, useScanResult, ScanResult } from "@/context/scan-result-context"
import ImageCropper from "./crop-image";

const CameraField = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const startCamera = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            //facingMode: "user"
            facingMode: { exact: "environment" }
          }
        })
        videoRef.current.srcObject = stream
        setCameraActive(true)
      } catch (error) {
        console.error("Error accessing the camera:", error)
        setCameraActive(false)
      }
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  useEffect(() => {
    if (!uploadedImage) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [uploadedImage])

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setIsScanning(false);
  }

  const handleCapture = async () => {
    setLoading(true);
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
      setUploadedImage(imageData);
      stopCamera();
    }
    setLoading(false);
  };
  
  
  const handleCropComplete = useCallback((croppedImage: string) => {
    setUploadedImage(croppedImage)
    setIsCropping(false)
  }, [])
  return (
    <>
      <Card className="p-0 md:p-4 border-0 md:border flex flex-col gap-4 shadow-none">
      <CardContent className={`h-80 lg:h-80 p-0 lg:p-4 flex rounded-xl border-none border-0`}>
        <div className="flex-1 flex justify-center items-center h-full relative">
          <div className="h-80 w-full md:w-80 overflow-hidden rounded-lg flex items-center justify-center relative bg-black text-primary-foreground">
            {uploadedImage ? (
              <div className="relative w-full h-full">
                {isCropping?(
                  <>
                    <ImageCropper
                      image={uploadedImage!}
                      onCropComplete={handleCropComplete}
                      onCropCancel={() => setIsCropping(false)}
                    />
                  </>
                ):(
                  <>
                    <Image src={uploadedImage} alt="Uploaded" className="h-80 w-full md:w-80 rounded-md object-cover" width={256} height={256} />
                    {isScanning && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/80 to-transparent animate-scan" />
                    )}
                  </>
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  {!isScanning && !isCropping && (
                    <Button
                      onClick={() => setIsCropping(true)}
                      size="icon"
                      variant="secondary"
                      className="rounded-full opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <Crop className="h-4 w-4" />
                      <span className="sr-only">Crop image</span>
                    </Button>
                  )}
                  <Button
                    onClick={handleRemoveImage}
                    size="icon"
                    variant="secondary"
                    className="rounded-full opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>  
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-80 w-full md:w-80 object-cover"
                />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                    <span className="">Loading...</span>
                  </div>
                )}
                {!cameraActive && !loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="">Camera not available</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex-1 p-0'>
        <FooterContent uploadedImage={uploadedImage} handleCapture={handleCapture} isScanning={isScanning} setIsScanning={setIsScanning} cameraActive={cameraActive}/>
      </CardFooter>
      <canvas ref={canvasRef} className="hidden" />
      </Card>
      {/* <ResultDisplay/> */}
    </>
    
  );
};
interface FooterProps{
  uploadedImage: string | null;
  handleCapture: () => void;
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
  cameraActive:boolean;
}
const FooterContent:React.FC<FooterProps> = ({ uploadedImage,handleCapture, isScanning, setIsScanning,cameraActive}) => {
  const [treeCodeInput, setTreeCodeInput] = useState("")
  const [treeCode, setTreeCode] = useState("")
  const [isInputTreeCode, setInputTreeCode] = useState(false)
  const { scanResult, setScanResult } = useScanResult()

  
  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setScanResult({
        imageUrl: uploadedImage!,
        treeCode:treeCode,
        disease: "Anthracnose",
        confidence: 85,
        severity: "Moderate",
        affectedArea: "30%",
        recommendations: [
          "Apply fungicide treatment",
          "Improve air circulation around trees",
          "Remove infected leaves and fruits"
        ],
        additionalInfo: "Anthracnose is caused by fungi of the genus Colletotrichum."
      })
    }, 2000)
  }
  const toggleCustomTreeType = () => {
    setInputTreeCode(!isInputTreeCode)
    if (!isInputTreeCode) {
      setTreeCode("")
    }
  }
  return(
    
    <div className="flex flex-col gap-2 w-full">      
      <div className="flex-1 flex items-center w-full gap-2">
        {isInputTreeCode ? (
          <>
            <Input
              type="text"
              placeholder="Enter tree code"
              value={treeCodeInput}
              onChange={(e) => setTreeCodeInput(e.target.value)}
              className="h-10"
            />
                <Button
                  onClick={toggleCustomTreeType}
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0 h-10 w-10"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">
                    {isInputTreeCode ? "Use predefined types" : "Enter custom type"}
                  </span>
                </Button>
          </>
        ) : (
          <>
            <Select value={treeCode} onValueChange={setTreeCode}>
              <SelectTrigger className='h-10'>
                <SelectValue placeholder="Select tree code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T001">T001</SelectItem>
                <SelectItem value="T002">T002</SelectItem>
                <SelectItem value="T003">T003</SelectItem>
                <SelectItem value="T004">T004</SelectItem>
                <SelectItem value="T005">T005</SelectItem>
                <SelectItem value="T006">T006</SelectItem>
                <SelectItem value="T007">T007</SelectItem>
                <SelectItem value="T008">T008</SelectItem>
                <SelectItem value="T009">T009</SelectItem>
                <SelectItem value="T010">T010</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={toggleCustomTreeType}
              variant="outline"
              size="icon"
              className="flex-shrink-0 h-10 w-10"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">
                {isInputTreeCode ? "Use predefined types" : "Enter custom type"}
              </span>
            </Button>
          </>
        )}
      </div>
      {!uploadedImage?(     
          <Button 
            className="w-full bg-primary text-white" 
            onClick={handleCapture}
            disabled={!cameraActive}
          >
            Capture Image
          </Button>
      ):(
        <Button 
          className={`w-full text-white ${!uploadedImage || !treeCode || isScanning?"bg-primary/50":"bg-primary"}`}
          onClick={handleScan}
          disabled={!uploadedImage || !treeCode || isScanning}
        >
          {isScanning?"Scanning":"Scan Image"}
          
        </Button>
      )}
  </div>
  )
}
export default CameraField;
