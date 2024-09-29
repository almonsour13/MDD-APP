"use client"

import { AlertCircle, Info, X, Save, Trash2, Trees } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useScanResult } from "@/context/scan-result-context"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ResultDisplay() {
  const { scanResult, setScanResult } = useScanResult()
  const [isVisible, setIsVisible] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

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
        className={`absolute border-b bottom-0 m-0 left-0 right-0 z-50 rounded-b-none rounded-t-xl border-0 max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between top-0 z-10">
          <CardTitle className="text-xl font-semibold ">Scan Result</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 gap-y-4">
          <div className="h-80 md:h-96  md:w-96 relative rounded-lg overflow-hidden">
              <Image
                src={imageUrl || ""}
                alt="Scanned mango leaf"
                layout="fill"
                objectFit="cover"
                className="aspect-square"
              />
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
        <CardFooter className="flex justify-end space-x-2 bottom-0 z-10">
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
    </>
  )
}