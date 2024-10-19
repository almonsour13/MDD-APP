import React from "react";
import { ScrollArea } from "./ui/scroll-area";
interface PageWrapper {
    children: React.ReactNode;
    className?:string;
}
const PageWrapper: React.FC<PageWrapper> = ({
    children,
    className
    }) => {
    return(
        //bg-white dark:bg-background
        //rounded-lg rounded-b-none md:rounded-tr-none
            <section 
                style={{ minHeight: 'calc(100vh - 64px)' }}
                className="flex-1 gap-4 flex flex-col p-4 md:p-6 pb-20 md:pb-8 mt-14 relative"
                >
                {children}
            </section>

    )
}
export default PageWrapper;