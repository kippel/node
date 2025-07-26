"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "./AuthContext";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children} : Props ) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user){
            router.push('/login');
        } 
    }, [user, router]);

    return user ? children : null;

}

export default ProtectedRoute;