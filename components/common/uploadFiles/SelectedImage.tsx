import { Card,CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
const SelectedImage = () => {
    return(
        <Card className="border rounded-lg bg-transparent p-4  shadow-none w-full">
            <CardContent className="w-full h-full p-0">
                <div className="h-8 flex">
                    <div className="h-8 flex-1 flex items-center gap-4">
                        <div className="h-8 w-8 bg-green-600">

                        </div>
                        <div className="h-full flex items-center">
                            asdas
                        </div>
                    </div>
                    <div className="h-8 w-8 flex justify-center items-center">
                        <button>
                            <X className="h-6 w-6"/>
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}
export default SelectedImage;