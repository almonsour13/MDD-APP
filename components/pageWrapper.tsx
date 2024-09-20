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
        className="flex-1 border bg-white dark:bg-background gap-4 flex flex-col p-4 overflow-y-auto rounded-tl-3xl rounded-tr-3xl lg:rounded-tr-none"
        >
        {children}
        </section>

    )
}
export default PageWrapper;