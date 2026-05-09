"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { handleRegister } from "@/lib/actions/auth"
import { useData } from "@/context/dataContext"
import clsx from "clsx"

export default function page() {
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [registered, setRegistered] = useState<string>("true")
  const [pass, setPass] = useState("")
  const [rptPass, setRptPass] = useState("")
  const [passMatch, setPassMatch] = useState(false)
  const {isLoggedin} = useData();
  useEffect(() => {
    inputRef.current?.focus()
    setPassMatch(pass === rptPass && pass !== "" ? true : false)
  }, [pass, rptPass])

  const valPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/.test(
    pass
  )

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        className="flex h-fit w-100 flex-col items-center justify-center gap-4 rounded-3xl border-2 bg-stone-800 px-3 py-8"
        ref={ref}
        action={async (formData) => {
          // check passwords
          if (passMatch) {
            const result = await handleRegister(formData)
            if (JSON.parse(result).username === formData.get("username")) {
              router.push("feedback/reg")
            } else if (
              JSON.parse(result).message === "no credentials supplied"
            ) {
              setRegistered("noCredentials")
              ref.current?.reset()
            } else if (
              JSON.parse(result).message === "choose another username"
            ) {
              setRegistered("choose another username")
              ref.current?.reset()
            } else if (
              JSON.parse(result).message === "choose another password"
            ) {
              setRegistered("choose another password")
              ref.current?.reset()
            } else {
              setRegistered("error")
              ref.current?.reset()
            }
          } else {
            router.refresh()
            setPass("")
            setRptPass("")
            setRegistered("false")
          }
        }}
      >
        <Label className="flex w-full justify-start pl-3">Username</Label>
        <Input name="username" /* ref={inputRef} */ />
        <Label className="flex w-full justify-start pl-3">Password</Label>
        <Input
          name="password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className={clsx(
            passMatch && "text-green-500",
            !valPass && "text-red-500"
          )}
        />
        <Label className="flex w-full justify-start pl-3">
          Repeat Password
        </Label>
        <Input
          name="rpt-password"
          value={rptPass}
          type="password"
          onChange={(e) => setRptPass(e.target.value)}
          className={clsx(
            !passMatch && "text-red-600",
            passMatch && "text-green-500"
          )}
        />
        {registered === "choose another password" && (
          <p className="text-amber-300">
            Password must contain at least one uppercase and
            lowercase letter, one degit and special character, 8 tokens
            minimum
          </p>
        )}
        <Label className="flex w-full justify-start pl-3">Email</Label>
        <Input name="email" />
        <Button type="submit">submit</Button>
        {registered === "choose another username" && (
          <p>Choose another username</p>
        )}
        {registered === "noCredentials" && <p> credentials missing</p>}
        {registered === "error" && <p>unknown error</p>}
        {!passMatch && rptPass && <p className="text-red-700">no match</p>}
        {passMatch && valPass && <p className="text-green-700">valid password</p>}
         {isLoggedin === "unauthorised" && (
            <p className="text-2xl text-red-500">no account, register</p>
          )}
      </form>
    </div>
  )
}
