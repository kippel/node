"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";


type Props = {
    label: string,
   
    href: string,
    children: React.ReactNode;
};

export const SidebarItem = ({
    label,
    href,
    children
}: Props) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button variant={active ? "sidebarOutline" : "sidebar"} className="justify-start h-[52px">
            {children}
            {/*
                    <Image src={iconSrc} 
            alt={label}
            className="mr-5"
            height={32}
            width={32}
            /> */
            }
            
            <Link href={href}>{label}</Link>
            
        </Button>
    );
};