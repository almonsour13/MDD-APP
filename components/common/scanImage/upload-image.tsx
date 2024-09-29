"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {  Image as LucideImage, Plus, Crop,Check} from "lucide-react";
import useIsMobile from '@/hooks/use-mobile';
import Image from 'next/image'
import { ScanResultProvider, useScanResult, ScanResult } from "@/context/scan-result-context"
import ImageCropper from "./crop-image";
import ReactCrop, { Crop as CropType, PixelCrop } from 'react-image-crop'

const UploadField = () =>{
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isScanning, setIsScanning] = useState(false)
    return(
        <Card className="p-0 md:p-4 border-0 md:border flex flex-col gap-4 shadow-none">
          <CardContent className={`h-80 lg:h-80 p-0 flex border-none border-muted-foreground/40 ${uploadedImage?"border-0":"border"} border-dashed border-spacing-10 rounded-lg`}>
            <UploadImage uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} isScanning={isScanning} setIsScanning={setIsScanning} />
          </CardContent>
          <CardFooter className='flex-1 p-0'>
            <FooterContent uploadedImage={uploadedImage} isScanning={isScanning} setIsScanning={setIsScanning}/>
          </CardFooter>
        </Card>
    )
}
interface UploadImageProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
}
const UploadImage: React.FC<UploadImageProps> = ({ uploadedImage, setUploadedImage, isScanning, setIsScanning}) => {
  const [dragActive, setDragActive] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  
  const isMobile = useIsMobile()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }
  const handleRemoveImage = () => {
    setUploadedImage(null)
    setIsScanning(false)
  }
  const handleCropComplete = useCallback((croppedImage: string) => {
    setUploadedImage(croppedImage)
    setIsCropping(false)
  }, [])
  return (
    <>
      {uploadedImage ? (
        <div className="flex-1 flex justify-center items-center h-full relative">
          <div className="h-80 w-auto overflow-hidden rounded-lg flex item-center justify-center relative">
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
                <Image src={uploadedImage} alt="Uploaded" className="h-80 w-auto rounded-md object-cover" width={256} height={256} />
                {isScanning && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/80 to-transparent animate-scan" />
                )}
                <Button
                  onClick={handleRemoveImage}
                  className="absolute z-20 top-0 right-0 m-2 rounded-full h-8 w-8 p-0"
                  variant="secondary"
                >
                  <X className="h-5 w-5" />
                </Button>
              </>
            )}  
            {!isScanning && !isCropping && (
              <Button
                onClick={() => setIsCropping(true)}
                className="absolute z-20 bottom-0 right-0 m-2 rounded-full h-8 w-8 p-0"
                variant="secondary"
              >
                <Crop className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex-1 flex flex-col items-center justify-center relative h-full w-full rounded-lg ${
            dragActive ? 'bg-secondary' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
          {!dragActive && (
            <div className="flex flex-col gap-2 text-center">
              <div className="flex justify-center text-gray-300">
                <LucideImage className="h-12 w-12 lg:h-16 lg:w-16" />
              </div>
              <div className="space-y-0">
                {!isMobile && (
                  <>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
                      Drag and drop an image here
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">or</p>
                  </>
                )}
                <div>
                  <label
                    htmlFor="image"
                    className="cursor-pointer text-sm sm:text-base text-primary hover:underline"
                  >
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
          )}
        </div>
      )}
    </>
  )
}
interface FooterProps{
  uploadedImage: string | null;
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
}
const FooterContent:React.FC<FooterProps> = ({ uploadedImage, isScanning, setIsScanning  }) => {
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
                  className="flex-shrink-0 h-10 w-10 bg-primary"
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
      <Button 
        className={`w-full ${!uploadedImage || !treeCode || isScanning?" bg-primary/50":" bg-primary"}`}
        onClick={handleScan}
        disabled={!uploadedImage || !treeCode || isScanning}
      >
        {isScanning?"Scanning":"Scan Image"}
      </Button>
  </div>
  )
}

export default UploadField;