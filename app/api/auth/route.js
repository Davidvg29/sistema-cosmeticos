import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const {user, password} = await request.json()
        const filePath = path.join(process.cwd(), 'data', 'user.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const user_db = JSON.parse(fileContents);
    
        if(user === user_db.user && password === user_db.password){
            return Response.json({ success: true, message: "Autenticacion exitosa" }, {status:200});
        }else{
            return Response.json({ sucess: false, message: "Autenticacion fallida" }, { status: 401 });
        }
        
    } catch (error) {
        return Response.json({ error: "Error en el servidor al obtener datos de usuario" }, { status: 500 });
    }
  }