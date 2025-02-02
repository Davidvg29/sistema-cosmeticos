import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export default function Cards({product}){
    return(
        <>
            <div className="w-64 m-2">
                <Card className="h-86">
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover"/>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p>Lista ${product.priceList}</p>
                        <p>Público ${product.pricePublic}</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}