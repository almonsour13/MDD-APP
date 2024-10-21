import PageWrapper from "@/components/pageWrapper";
import Image from "next/image";

export default function Loading(){
    return(
        <PageWrapper>
             <div className="w-full h-full flex-1 flex items-center justify-center animate-pulse">
                <Image src="/assets/gif/loading.gif" width={200} height={200} alt="My GIF" className="h-56" unoptimized />
             </div>
        </PageWrapper>
    )
}