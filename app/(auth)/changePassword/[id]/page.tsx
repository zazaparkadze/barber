"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, use } from "react"
import { changeUserPwd } from "@/lib/actions/auth"
import {useRouter} from 'next/navigation'


export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [newPwd, setNewPwd] = useState("")
  const router = useRouter()
  const { id } =  use(params)
  return (
    <form
      className="flex h-screen flex-col max-w-4xl gap-5 justify-center items-center text-amber-500"
      action={async (formData) => {
        const result: MongoUser = await changeUserPwd(formData)
        if(result.id === Number(id)) {
               router.refresh()
        }
        console.log(result)
      }}
    >
      <h1 className="text-4xl">Change Password</h1>
      <h3>your id is {id}</h3>
      <Input readOnly value={id} name={"id"} />
      <Input
        placeholder="new password"
        value={newPwd}
        name={"newPwd"}
        onChange={(e) => setNewPwd(e.target.value)}
      />
      <Button type="submit">submit</Button>
    </form>
  )
}
