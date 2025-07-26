"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "./AuthContext";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children} : Props ) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    console.log("ProtectedRoute user:", user);
    useEffect(() => {
        if (!user){
            router.push('/');
        } 
    }, [user, router]);

    return user ? children : null;

}

export default ProtectedRoute;