"use client"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { handleLogin } from "@/lib/actions/auth"
import { useData } from "@/context/dataContext"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function page() {
  const {isLoggedin, setIsLoggedin, setUser} = useData()
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    ref.current?.focus()
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
       // className="flex h-100 w-100 flex-col items-center justify-center gap-4 rounded-3xl border-2 bg-stone-800 p-3"
        className="flex flex-col h-100 w-100 gap-6 text-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_-60px_rgba(255,255,255,0.2)] backdrop-blur-xl"
        action={async (formData) => {
          const response: MongoUser = await handleLogin(formData)
          if (response.username === "noCredentials") {
            router.push(`/login`)
            setIsLoggedin('noCredentials')
            return
          }
          if (response.username === "unauthorised") {
            router.push("/register")
             setIsLoggedin('unauthorised')
            return
          }
          if (response.username === "forbidden") {
            setIsLoggedin("false")
            router.refresh()
            formRef.current?.reset()
            return
          }

          setUser(response.username);
        //  router.push(`account/${response.id.toString()}`)
          router.push("admin")
        }}
      >
        <Label className="flex w-full justify-start pl-3 text-xl">Username</Label>
        <Input name="username" ref={ref} />
        <Label className="flex w-full justify-start pl-3 text-xl">Password</Label>
        <Input name="password" />

        <Button type="submit" className="w-fit capitalize">
          submit
        </Button>

        <div className="my-[-4] flex w-full h-fit flex-col items-end gap-2 px-6">
          <p className="hover:scale-110">
            <Link href={"/forgot-password"}>forgot password</Link>
          </p>
          <Tooltip key={"left"}>
            <TooltipTrigger>
              <p className="hover:scale-110">
                <Link href={"/register"}>register</Link>
              </p>
            </TooltipTrigger>
            <TooltipContent side={"left"}>fields required</TooltipContent>
          </Tooltip>
          {isLoggedin === "false" && (
            <p className="text-2xl text-red-500">incorrect password</p>
          )}
          {isLoggedin === "noCredentials" && (
            <p className="text-2xl text-red-500">username/password missing</p>
          )}
         
        </div>
      </form>
    </div>
  )
}
