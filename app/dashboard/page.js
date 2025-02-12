"use client"
import NavBar from "@/components/NavBar";
import Products from "@/components/Products";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const router = useRouter()
    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            router.push("/")
        }else{
            return(
                <>
                    <NavBar/>
                    <Products/>
                </>
            )
        }
    }, [])
}