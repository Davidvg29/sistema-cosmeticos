import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request){
    const getProductsUrl = "https://res.cloudinary.com/djkld6wmk/raw/upload/sistema%20cosmeticos/data/nbycn2va6xg87wcos3cj.json"
    try {
        // esto trae productos de directorio
        // const filePath = path.join(process.cwd(), 'data', 'products.json');
        // const fileContents = await fs.readFile(filePath, 'utf-8');
        // const products = JSON.parse(fileContents);

        // lo de abajo trae el archivo de cloudinary
        const response = await fetch(getProductsUrl)
        const data = await response.json()
        return Response.json(data, {status: 200});
    } catch (error) {
        return Response.json({ error: "Error en el servidor al obtener productos " + error.message }, { status: 500 });
    }
}