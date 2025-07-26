"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthContext from "@/components/AuthContext";
import { useContext } from "react";


export const LoginUser = () => {

    const router = useRouter()

     const { logout } = useContext(AuthContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
                <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                    <User className="h-4 w-4" /> 
                    <button onClick={() => router.push('/dash/user')}>Profile</button>
                </DropdownMenuItem>
                

                
                <DropdownMenuItem>
                    <Languages className="h-4 w-4" /> 
                    
                    <button onClick={() => router.push('/dash/languages')}>Idiomas</button>
                </DropdownMenuItem>
                

                { /*
                <DropdownMenuItem>
                    <Settings className="h-4 w-4" /> Settings
                </DropdownMenuItem>
                */ }
                <DropdownMenuItem className="text-destructive">
                    <LogOut className="h-4 w-4" /> <button onClick={() => logout() }>Logout</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

};