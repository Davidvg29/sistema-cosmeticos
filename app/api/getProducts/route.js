import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request){
    try {
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(fileContents);
        return Response.json(products, {status: 200});
    } catch (error) {
        return Response.json({ error: "Error en el servidor al obtener productos " + error.message }, { status: 500 });
    }
}