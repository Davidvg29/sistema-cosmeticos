'use client'

import { Search, CirclePlus, RefreshCw  } from 'lucide-react';
import { Input } from './ui/input';
import Cards from './Cards';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from './ui/label';


export default function Products() {
    const [products, setProducts] = useState([])
    const [productsSearch, setProductsSearch] = useState("")
    const filteredProducts = products.length > 0 && products.filter((product) =>
      (product.name && product.name.toLowerCase().includes(productsSearch.toLowerCase())) || 
      (product.description && product.description.toLowerCase().includes(productsSearch.toLowerCase()))
    );
    const [data, setData] = useState({
      name: "",
      image: "",
      description: "",
      priceList: "",
      pricePublic: ""
    })
    const [message, setMessage] = useState("")
    const getProducts = async () => {
        try {
          const response = await fetch('/api/getProducts');
          const data = await response.json();
          setProducts([...data]);
        } catch (error) {
            console.log('Ocurrio un error al obtener productos', error)
        }
    }

    useEffect(() => {getProducts()}, []);

    const handleData = (e) => {
      if (e.target.name === "image") {
        setData((prevData) => ({ ...prevData, image: e.target.files[0] }));
      } else {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
      }
    };
    
    const sendData = async(e)=>{
      e.preventDefault()
      const formData = new FormData()
      // Agregar cada campo del estado `data` al FormData
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("priceList", data.priceList);
      formData.append("pricePublic", data.pricePublic);
      
      // Agregar la imagen (debe ser un archivo, no una URL)
      if (data.image) {
        formData.append("image", data.image);
      }

      try {
        const response = await fetch("/api/createProduct", {
          method: "POST",
          // headers: {"Content-type": "multipart/form-data",},
          body: formData
        })
        const result = await response.json()
        // console.log(result)
        if(result){
          setMessage(result.message)
          // console.log("antes getProducts")
          await getProducts()
          // console.log("paso getProducts")
          setData({
            name: "",
            image: "",
            description: "",
            priceList: "",
            pricePublic: ""
          });
        }else {
          console.error('Error al crear el producto:', result.message || result.error);
          setMessage(result.error)
        }
      } catch (error) {
        // console.log(error)
        setMessage(error.message)
      }
    }
    // console.log(data)
    const refreshProducts = ()=>{
      getProducts()
    }

  return (
    <>
      <div className=' w-full flex flex-wrap justify-center sm:justify-end items-center'>
      <div className='flex justify-center cursor-pointer'>
        <Button onClick={refreshProducts}>
          Actualizar
          <RefreshCw/>
        </Button>
      </div>
          <AlertDialog>
            <AlertDialogTrigger className='flex justify-center items-center text-gray-50 bg-black m-3 w-48 h-10 rounded-md'>Crear producto <CirclePlus className='mx-2'/></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Completa el formulario para crear un nuevo producto</AlertDialogTitle>
                <AlertDialogDescription>
                  {/* This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers. */}
                  <Label>Nombre del producto</Label>
                  <Input className="mb-5" placeholder="Nombre producto" name="name" value={data.name} onChange={handleData}/>
                  <Label>Cargar imagen</Label>
                  <Input className="mb-5" id="picture" type="file" name="image" onChange={handleData}/>
                  <Label>Descripcion del producto</Label>
                  <Input className="mb-5" placeholder="Descripcion producto" name="description" value={data.description} onChange={handleData}/>
                  <label className='flex justify-between'>
                    <label className='mx-1 sm:mx-0'>
                      <Label>Precio de lista</Label>
                      <Input className="mb-5" placeholder="Precio de lista del producto" type="number" name="priceList" value={data.priceList} onChange={handleData}/>
                    </label>
                    <label className='mx-1 sm:mx-0'>
                      <Label>Precio al publico</Label>
                      <Input className="mb-5" placeholder="Precio al publico producto" type="number" name="pricePublic" value={data.pricePublic} onChange={handleData}/>
                    </label>
                  </label>
                </AlertDialogDescription>
              </AlertDialogHeader>
                <label>{message}</label>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={sendData}>Crear</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        <div className='flex justify-end m-3 px-3 items-center border-2 rounded-lg'>
          <Input className=" w-48 border-none " placeholder="Buscar productos..." onChange={(e) => setProductsSearch(e.target.value)}/>
          <Search className=" text-gray-500" />
        </div>
      </div>
      
      <div className='flex flex-wrap justify-center'>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.slice().reverse().map((product) => (
            <Cards key={product.name} product={product} refreshProducts={getProducts} />
        ))
        ) : (
        <p>No se encontro ningun producto</p>
        )}
      </div>
    </>
  );
}
