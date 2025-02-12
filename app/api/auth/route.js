import bcrypt from "bcrypt";
import { NextResponse } from 'next/server';

export async function POST(request) {
    const urlAuth = process.env.CLOUDINARY_AUTH
    try {
        const {user, password} = await request.json()
        const response = await fetch(urlAuth)
        const user_db = await response.json()

        const isMatchUser = await bcrypt.compare(user, user_db.user);
        const isMatchPassword = await bcrypt.compare(password, user_db.password);

        if(isMatchUser && isMatchPassword){
            return NextResponse.json({ success: true, message: "Autenticacion exitosa", token: user_db.password }, {status:200});
        }else{
            return NextResponse.json({ sucess: false, message: "Autenticacion fallida" }, { status: 401 });
        }
        
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor al obtener datos de usuario" }, { status: 500 });
    }
  }