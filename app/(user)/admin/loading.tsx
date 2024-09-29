import PageWrapper from "@/components/pageWrapper";

export default function Loading(){
    return(
        <PageWrapper>
             <div className="w-full h-full flex-1 flex items-center justify-center animate-pulse">loading</div>
        </PageWrapper>
    )
}