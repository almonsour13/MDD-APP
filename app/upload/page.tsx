"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CameraField from '@/components/common/scanImage/captureImage'
import UploadField from '@/components/common/scanImage/uploadImage'

const ScanImage = () => {
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