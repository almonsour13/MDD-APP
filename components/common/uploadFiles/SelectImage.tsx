import { Card, CardContent } from "../../ui/card";
import { Image } from "lucide-react";
const SelectImage = () => {
    return(
        <Card className="bordered rounded-lg bg-transparent  shadow-none p-4 w-full h-72">
            <CardContent className="w-full h-full p-4">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className="text-2xl font-semibold">Drag and drop your image here, or click to select</p>
                </div>
            </CardContent>
        </Card>
    )
}
export default SelectImage;