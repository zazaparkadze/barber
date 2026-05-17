"use server"
import connectDB from "@/lib/connectBD"
import bcrypt from "bcrypt"
import User from "@/model/User"
import UserData from "@/model/UserData"

export async function handleLogin(formData: FormData) {
  await connectDB()
  const usr = formData.get("username") as string
  const pwd = formData.get("password") as string

  if (!usr || !pwd) {
    return JSON.parse(
      JSON.stringify({
        id: 0,
        username: "noCredentials",
        password: "",
        refreshToken: "",
        roles: {},
      })
    )
  }

  const foundUser: User | null = await User.findOne({
    username: usr,
  }).lean()

  if (!foundUser) {
    return JSON.parse(
      JSON.stringify({
        id: 0,
        username: "unauthorised",
        password: "",
        refreshToken: "",
        roles: {},
      })
    )
  }

  const match = await bcrypt.compare(pwd, foundUser.password)

  if (!match) {
    return JSON.parse(
      JSON.stringify({
        id: 0,
        username: "forbidden",
        password: "",
        refreshToken: "",
        roles: {},
      })
    )
  } else {
    return JSON.parse(JSON.stringify(foundUser))
  }
}

export async function handleRegister(formData: FormData) {
  await connectDB()
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const email = formData.get("email") as string

  if (!username || !password) {
    return JSON.stringify({ message: "no credentials supplied" })
  }

  const users: User[] = await User.find({}).lean()

  const duplicate = await User.findOne({ username: username })
  if (duplicate) {
    return JSON.stringify({ message: "choose another username" })
  }
  const hashedPwd = await bcrypt.hash(password, 10)

  const newRegister = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username: username,
    password: hashedPwd,
    email: email,
  }
  const result = await User.create(newRegister)
  return JSON.stringify(result)
}


export async function handleForgot(formData: FormData) {
  await connectDB()
  const firstname = formData.get("firstname")
  const lastname = formData.get("lastname")
  const phone = formData.get("phone")
  const dob = formData.get("dob")
  const pob = formData.get("pob")
  const firstcar = formData.get("firstcar")
  const firstschool = formData.get("firstschool")
  const firstjob = formData.get("firstjob")
  const email = formData.get("email")

  const UserDataObj = {
    firstname,
    lastname,
    email,
    phone,
    dob,
    pob,
    firstcar,
    firstschool,
    firstjob,
  }

  const userData = await UserData.findOne(UserDataObj).lean()

  if (userData) {
    return JSON.parse(JSON.stringify(userData))
  } else {
    return null
  }
}

//change forgotten password

export async function changeUserPwd(formData: FormData) {
  await connectDB()
  const newPwd = formData.get("newPwd") as string
  const id = formData.get("id")

  const newHashedPwd = await bcrypt.hash(newPwd, 10)
  const updatedUser: User | null = await User.findOneAndUpdate(
    { id: Number(id) },
    { password: newHashedPwd },
    { returnDocument: "after" }
  )
console.log("updated user from auth", updatedUser)
  if (updatedUser) {
    console.log("updated user", updatedUser)
    return JSON.parse(JSON.stringify(updatedUser))
  } else {
    return null
  }
}

export async function handleSaveUserData(formData: FormData) {
  await connectDB()
  const firstname = formData.get("firstname")
  const lastname = formData.get("lastname")
  const phone = formData.get("phone")
  const dob = formData.get("dob")
  const pob = formData.get("pob")
  const firstcar = formData.get("firstcar")
  const firstschool = formData.get("firstschool")
  const firstjob = formData.get("firstjob")
  const email = formData.get("email")

const usersData: UserData[] = await UserData.find({}).lean();

  const UserDataObj = {
    id: usersData[usersData.length - 1] ? usersData[usersData.length - 1].id + 1 : 1,
    firstname,
    lastname,
    email,
    phone,
    dob,
    pob,
    firstcar,
    firstschool,
    firstjob,
  }

  const userData: User = await UserData.create(UserDataObj)

  if (userData) {
    return JSON.parse(JSON.stringify(userData))
  } else {
    return null
  }
}
