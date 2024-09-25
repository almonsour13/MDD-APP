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
        className="flex-1 bg-white dark:bg-background gap-4 flex flex-col p-4 overflow-y-auto pb-20 md:pb-0"
        >
        {children}
        </section>

    )
}
export default PageWrapper;