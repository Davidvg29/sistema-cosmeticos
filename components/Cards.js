import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Trash2 } from 'lucide-react';
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useState } from "react";

export default function Cards({product, refreshProducts}){
    const [message, setMessage] = useState("")

    const actionDelete = async()=>{
        try {
            const response = await fetch("/api/deleteProduct",{
                method: "POST",
                headers: {"Content-type": "application/json",},
                body: JSON.stringify({ name: product.name })
            })
            const data = await response.json()
            // console.log(data)
            setMessage(data.message)
            if(data){
                refreshProducts()
            }
        } catch (error) {
            // console.log(error)
            setMessage("Ocurrio un error en el servidor al eliminar el producto" + error.message)
        }
    }

    return(
        <>
            <div className="w-64 m-2">
                <Card className="h-auto">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle>{product.name}</CardTitle>
                            {/* <Trash2 className="cursor-pointer"/> */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    {/* <Button variant="outline">Show Dialog</Button> */}
                                    <Trash2 className="cursor-pointer"/>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Eliminar el producto?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Vas a eliminar el producto con el nombre: {product.name}
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={actionDelete}>Acceptar</AlertDialogAction>
                                    </AlertDialogFooter>
                                    <p>{message}</p>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={product.image} alt={product.name} className="w-full h-64 object-contain"/>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p>Lista: ${product.priceList}</p>
                        <p>Público: ${product.pricePublic}</p>
                    </CardFooter>
                </Card>
            </div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {/* <Button variant="outline">Show Dialog</Button> */}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}