"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Login({className, ...props}) {
  const router = useRouter()
  const [data, setData] = useState({
    user: "",
    password: ""
  })
  const [message, setMessage] = useState("")

  const handleData = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.success){
          sessionStorage.setItem("token", data.token)
          router.push('/dashboard')
        }
        setMessage(data.message)
      })
    } catch (error) {
      console.log('Ocurrio un error en peticion al usuario', error)
      setMessage(error.message)
    }
  }

  return (
    <>
      <div className="w-80 sm:w-80 h-full flex items-center justify-center m-3">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Acceso</CardTitle>
              <CardDescription>
                Ingrese su usuario a continuación para iniciar sesión en su cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="user">Usuario</Label>
                    <Input id="user" type="text" name="user" onChange={handleData} value={data.user} placeholder="" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Contraseña</Label>
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input id="password" name="password" type="password" value={data.password} onChange={handleData} required />
                  </div>
                  <Button className="w-full" onClick={handleSubmit}>
                    Acceder
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    Login with Google
                  </Button> */}
                </div>
                {/* <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div> */}
              </form>
            <p className="my-2">{message}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
