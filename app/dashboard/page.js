"use client";
import NavBar from "@/components/NavBar";
import Products from "@/components/Products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            router.push("/");
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    if (!isAuthenticated) {
        return null; // Evita renderizar contenido mientras se redirige
    }

    return (
        <>
            <NavBar />
            <Products />
        </>
    );
}
