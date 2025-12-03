import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { SidebarContent } from "./sidebar-content";

export default function MenuSidebar() {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="fixed top-4 left-4 z-50 bg-gray-800 text-white"
                    >
                        <Menu size={24} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-gray-900 text-white w-64 p-0">
                    <SheetTitle className="hidden">Menu lateral</SheetTitle>

                    <div className="h-full overflow-y-auto p-6">
                        <SidebarContent handleLogout={signOut} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden md:flex md:flex-col bg-gray-900 text-white w-64 p-6 min-h-screen">
                <SidebarContent handleLogout={signOut} />
            </aside>
        </>
    );
}