export async function POST(request) {
    try {
      const { origin } = new URL(request.url); 
      const data = await request.json()
      const response = await fetch(`${origin}/api/getProducts`)
      const products = await response.json()

      const productExists = products.some(produc => produc.name === data.name)
      if(productExists){
        return Response.json({message: "Producto ya existe con este nombre, intente con otro"})
      }else{
         
      }

       return Response.json(products, { status: 200 })
    } catch (error) {
       return Response.json({ error: "Error al procesar la solicitud "+error.message }, { status: 500 });
    }
 }
 