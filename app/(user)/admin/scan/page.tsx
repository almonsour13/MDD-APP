import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UploadField from "@/components/common/scan/upload-image";
import CameraField from "@/components/common/scan/capture-image";
import PageWrapper from "@/components/pageWrapper";
import ResultDisplay from "@/components/common/scan/scan-result";
import ImageScannerScreen from "@/components/common/scan/mobile-capture-image";
export default function UploadImage(){
    return(
        // <PageWrapper>
        //     <Tabs defaultValue="upload" className="flex flex-col p-0">
        //       <TabsList className='flex'>
        //         <TabsTrigger className='flex-1' value="upload">
        //           Upload
        //         </TabsTrigger>
        //         {/* <div className="mx-2">or</div> */}
        //         <TabsTrigger className='flex-1' value="camera">
        //           Camera
        //         </TabsTrigger>
        //       </TabsList>
        //       <TabsContent value="upload">
        //           <UploadField/>
        //       </TabsContent>
        //       <TabsContent value="camera">
        //           <CameraField/>
        //       </TabsContent>
        //     </Tabs>
        // </PageWrapper>
        <ImageScannerScreen/>
    )
}