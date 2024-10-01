"use client"

import React, { useEffect, useState } from "react"
import { AlertCircle, Info, X, Save, Trash2, Trees, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useScanResult } from "@/context/scan-result-context"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"

export default function ResultDisplay() {
  const { scanResult, setScanResult } = useScanResult()
  const [isVisible, setIsVisible] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)

  useEffect(() => {
    if (scanResult) {
      setTimeout(() => setIsVisible(true), 50)
    } else {
      setIsVisible(false)
    }
  }, [scanResult])

  if (!scanResult) return null

  const { disease, confidence, severity, affectedArea, recommendations, additionalInfo, imageUrl, treeCode } = scanResult

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "text-green-500"
      case "moderate":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const handleSave = () => {
    toast({
      title: "Result Saved",
      description: "The scan result has been saved successfully.",
    })
    setIsVisible(false)
    setTimeout(() => setScanResult(null), 300)
  }

  const handleDiscard = () => {
    setIsVisible(false)
    setTimeout(() => {
      setScanResult(null)
      toast({
        title: "Result Discarded",
        description: "The scan result has been discarded.",
        variant: "destructive",
      })
    }, 300)
  }

  const handleClose = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmDiscard = () => {
    setShowConfirmDialog(false)
    handleDiscard()
  }

  const handleCancelClose = () => {
    setShowConfirmDialog(false)
  }

  return (
    <>
      <div
        className={`fixed inset-0 top-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? 'bg-opacity-60' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <Card 
      //md:left-4 right-0 md:right-4
        className={`absolute bottom-0 left-0 right-0 z-50 rounded-lg rounded-b-none rounded-t border-0 max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between top-0 z-10">
          <CardTitle className="text-xl font-semibold ">Scan Result</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="h-64 md:h-72 md:w-72 relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={imageUrl || ""}
              alt="Scanned mango leaf"
              layout="fill"
              objectFit="cover"
              className="aspect-square cursor-pointer"
              onClick={() => setShowImageDialog(true)}
            />
            <div className="absolute bottom-2 right-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="secondary" onClick={() => setShowImageDialog(true)}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to zoom</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {affectedArea} affected
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 border p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Trees className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-medium">Tree Code:</span>
              <span className="text-base font-semibold">{treeCode}</span>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Disease Detected</AlertTitle>
              <AlertDescription>
                <span className="font-semibold">{disease}</span> with{" "}
                <span className="font-semibold">{confidence}%</span> confidence
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Confidence Level</span>
                <span className="text-sm font-semibold">{confidence}%</span>
              </div>
              <Progress value={confidence} className="w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Severity</span>
                <p className={`font-semibold ${getSeverityColor(severity)}`}>{severity}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Affected Area</span>
                <p className="font-semibold">{affectedArea}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-1">
                {recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="text-sm">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
            <Alert variant="default">
              <Info className="h-4 w-4" />
              <AlertTitle>Additional Information</AlertTitle>
              <AlertDescription>{additionalInfo}</AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleClose}>
            <Trash2 className="mr-2 h-4 w-4" />
            Discard
          </Button>
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Result
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to discard the scan result? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDiscard}>
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detailed View</DialogTitle>
          </DialogHeader>
          <div className="relative h-[60vh]">
            <Image
              src={imageUrl || ""}
              alt="Detailed view of scanned mango leaf"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </DialogContent>
      </Dialog> */}
      <ShowImage imageUrl={imageUrl || ''} showImageDialog={showImageDialog} setShowImageDialog={setShowImageDialog}/>
    </>
  )
}
interface ShowImageProps {
  showImageDialog: boolean; 
  setShowImageDialog: (value: boolean) => void;
  imageUrl: string;
}

const ShowImage = ({ imageUrl = "/placeholder.svg?height=600&width=800", showImageDialog,setShowImageDialog }:ShowImageProps) =>{
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleZoomChange = (value: number[]) => setZoom(value[0])
  const handleRotate = () => setRotation(prev => (prev + 90) % 360)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
      <DialogContent className="w-full">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-semibold">Detailed View</DialogTitle>
        </DialogHeader>
        <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
            <Image
              src={imageUrl || ''}
              alt="Detailed view of scanned mango leaf"
              layout="fill"
              objectFit="contain"
              className="transition-all duration-300 ease-in-out w-auto h-auto max-h-96 rounded-md object-contain"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
        </div>
        <DialogFooter>
            <Button variant="outline" size="icon" onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.1))} disabled={zoom==1}>
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom out</span>
            </Button>
            <Slider
              min={1}
              max={5}
              step={0.1}
              value={[zoom]}
              onValueChange={handleZoomChange}
              className="w-64"
            />
            <Button variant="outline" size="icon" onClick={() => setZoom(prev => Math.min(prev + 0.1, 3))} disabled={zoom==3}>
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom in</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
              <span className="sr-only">Rotate image</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download image</span>
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}