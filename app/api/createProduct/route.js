import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request) {
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    try {
        let data = await request.json();

      if(data.name === "" || data.description === "" || data.priceList === "" || data.pricePublic ===""){
         return NextResponse.json({ message: "Ningun campo de texto puede estar vacio" }, { status: 400 });
      }

        // Leer productos actuales y manejar JSON vacío
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        let products = [];
        try {
            const fileContents = await fs.readFile(filePath, 'utf-8');
            products = fileContents ? JSON.parse(fileContents) : [];
        } catch (error) {
            if (error.code !== 'ENOENT') throw error; // Si el archivo no existe, se inicializa con un array vacío
        }

        // Verificar si el producto ya existe
        const productExists = products.some(product => product.name === data.name);
        if (productExists) {
            return NextResponse.json({ message: "Producto ya existe con este nombre, intente con otro" }, { status: 400 });
        }

        try {
         // Upload an image
         const imagePath = path.join(process.cwd(), 'public', 'imagen.jpg');
         const uploadResult  = await cloudinary.uploader.upload(imagePath, {public_id: data.name,})
         if(uploadResult){
            data = {...data, image: uploadResult.secure_url}
         }
        } catch (error) {
         console.log('Error al subir la imagen:', error);
         return NextResponse.json({ message: 'Ocurrió un error al subir la imagen, producto no creado' }, { status: 500 });
        }

        // Agregar el nuevo producto y escribir en el archivo JSON
        const updatedProducts = [...products, data];
        await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2), 'utf-8');

        return NextResponse.json({ message: "Producto agregado correctamente" }, { status: 200 });

    } catch (error) {
      // console.log(error)
      return NextResponse.json({ message: "Error al crear un nuevo producto: " + error.message }, { status: 500 });
    }
}
