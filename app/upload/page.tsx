"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Camera, Image as LucideImage, X, Plus, Check, Upload } from "lucide-react"
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useIsMobile from '@/hooks/use-mobile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CameraField from '@/components/common/scanImage/captureImage'
import UploadField from '@/components/common/scanImage/uploadImage'

const ScanImage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  return (
    <Tabs defaultValue="upload" className="flex flex-col p-0 gap-2">
      <TabsList className='flex'>
        <TabsTrigger className='flex-1' value="upload">
          Upload
        </TabsTrigger>
        {/* <div className="mx-2">or</div> */}
        <TabsTrigger className='flex-1' value="camera">
          Camera
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <UploadField/>
      </TabsContent>
      <TabsContent value="camera">
          <CameraField/>
      </TabsContent>
    </Tabs>
  )
}
export default ScanImage;