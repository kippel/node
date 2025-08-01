import { Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Sidebar } from "@/components/sidebar/sidebar"

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                 <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

