import SelectedImage from "@/components/common/uploadFiles/SelectedImage";
import SelectImage from "@/components/common/uploadFiles/SelectImage";
import { Button } from "@/components/ui/button";
const Upload = () => {
    return(
        <div className="h-full w-full">
            <div className="h-16 w-full border-b"></div>
            <div className="w-full flex justify-center items-center h-auto p-5 ">
                <div className="flex flex-col space-y-4 lg:w-4/5">
                    <SelectImage/>
                    <SelectedImage/>
                    <div className="w-full">
                        <div className="flex gap-4">
                            <Button className="bg-green-700">Send</Button>
                            <Button className="bg-white border text-red-700 shadow-none">Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Upload;