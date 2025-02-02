import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "./ui/button"
  

export default function NavBar(){
    return(
        <>
            <nav className="bg-gray-100 flex justify-between items-center w-full h-16">
                <h1 className="mx-3">Administrador</h1>
                {/* <Button className="m-1"> */}
                <Sheet>
                <SheetTrigger className="mx-3 w-20 h-8 rounded-md bg-black p-0 text-gray-100">Menu</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                        {/* This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers. */}
                    </SheetDescription>
                    <Button>Cerrar sesion</Button>
                    </SheetHeader>
                </SheetContent>
                </Sheet>
                {/* </Button> */}
            </nav>
        </>
    )
}