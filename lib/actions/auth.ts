"use server"
import connectDB from "@/lib/connectBD"
import bcrypt from "bcrypt"
import User from "@/model/User"
import UserData from "@/model/UserData"

//login

export async function handleLogin(formData: FormData) {
  connectDB()
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

  const foundUser: MongoUser | null = await User.findOne({
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

//register

export async function handleRegister(formData: FormData) {
  connectDB()
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const email = formData.get("email") as string

  if (!username || !password) {
    return JSON.stringify({ message: "no credentials supplied" })
  }

  const valPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/.test(
    password
  )

  if (valPass) {
    const users: MongoUser[] = await User.find({}).lean()

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
  } else {
    return JSON.stringify({ message: "choose another password" })
  }
}

//forgot

export async function handleForgot(formData: FormData) {
  connectDB()
  const firstname = formData.get("firstname")
  const lastname = formData.get("lastname")
  const phone = formData.get("phone")
  const dob = formData.get("dob")
  const pob = formData.get("pob")
  const firstcar = formData.get("firstcar")
  const firstschool = formData.get("firstschool")
  const firstjob = formData.get("firstjob")
  const email = formData.get("email")

  const mongoUserData = {
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

  const userData: MongoUser = await UserData.findOne(mongoUserData).lean()

  if (userData) {
    return JSON.parse(JSON.stringify(userData))
  } else {
    return null
  }
}

//change forgotten password

export async function changeUserPwd(formData: FormData) {
  connectDB()
  const newPwd = formData.get("newPwd") as string
  const id = formData.get("id")
  const newHashedPwd = await bcrypt.hash(newPwd, 10)
  const updatedUser: MongoUser | null = await User.findOneAndUpdate(
    { id: Number(id) },
    { password: newHashedPwd },
    { returnDocument: "after" }
  )

  if (updatedUser) {
    return JSON.parse(JSON.stringify(updatedUser))
  } else {
    return JSON.stringify({ message: "no user found" })
  }
}

export async function handleSaveMongoUserData(formData: FormData) {
  // I should bring here id
  connectDB()
  const firstname = formData.get("firstname")
  const lastname = formData.get("lastname")
  const phone = formData.get("phone")
  const dob = formData.get("dob")
  const pob = formData.get("pob")
  const firstcar = formData.get("firstcar")
  const firstschool = formData.get("firstschool")
  const firstjob = formData.get("firstjob")
  const email = formData.get("email")

  const mongoUserData = {
    id: 2,
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

  const userData: MongoUser = await UserData.create(mongoUserData)

  if (userData) {
    return JSON.parse(JSON.stringify(userData))
  } else {
    return null
  }
}
