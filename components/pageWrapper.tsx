import React from "react";
interface PageWrapper {
    children: React.ReactNode;
    className?:string;
}
const PageWrapper: React.FC<PageWrapper> = ({
    children,
    className
    }) => {
    return(
        <section 
        style={{ minHeight: 'calc(100vh - 64px)' }}
        className="flex-1 bg-white dark:bg-background rounded-t-2xl md:rounded-tr-none gap-4 flex flex-col p-4 md:p-8 overflow-y-auto pb-20 md:pb-8 mt-14 md:mt-0"
        >
        {children}
        </section>

    )
}
export default PageWrapper;