"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";


function DashboardPage(){

    const {  data : session} = useSession()
    console.log(session)
    return (
        <div>Dashboard
            <Link href={"/api/auth/signout"} className="flex gap-4 ml-auto text-red-600">
                    Sign Out
                </Link>
            
        </div>
    )
}

export default DashboardPage;