import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request){
    cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    try {
        const {name} = await request.json()
        const getProductsUrl = "https://res.cloudinary.com/djkld6wmk/raw/upload/sistema%20cosmeticos/data/nbycn2va6xg87wcos3cj.json"
        const response = await fetch(getProductsUrl)
        const data = await response.json()
        const filteredDelete = data.filter(product => product.name !== name)

        const jsonString = JSON.stringify(filteredDelete, null, 2);
        const buffer2 = Buffer.from(jsonString, "utf-8");
        
        // Subir el JSON modificado a Cloudinary
        // das
        await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { 
              resource_type: "raw", 
              public_id: "sistema cosmeticos/data/nbycn2va6xg87wcos3cj.json", 
              overwrite: true, 
              invalidate: true,
            }, 
            (err, result) => {
              if (err) reject(err);
              console.log(result)
              resolve(result);
            }
          ).end(buffer2);
        });


        // console.log(name)
        return NextResponse.json({ message: "Producto eliminado correctamente" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Error en el servidor al eliminar el producto " + error.message }, { status: 500 });

    }
}