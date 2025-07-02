import Link from "next/link";
import React from "react";
import SingInButton from "./SignInButton";

const AppBar = () => {
    return (
        <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
            <Link className="transition-colors hover:text-blue-500" href={"/"}>
                home page
            </Link>
            <Link className="transition-colors hover:text-blue-400" href={"/dashboard"}>
            DashBoard
            </Link>
            <SingInButton />
        </header>
    )
};

export default AppBar;