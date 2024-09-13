import React from "react";
import { PropsWithChildren, useEffect } from "react"


const NotificationProvider = ({children}: PropsWithChildren) => {
    useEffect(() => {
        console.warn("Provider init");
    }, [])
    
    return <>{children}</>;
};

export default NotificationProvider;