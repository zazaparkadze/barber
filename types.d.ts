declare module '*.css'

type MongoUser = {
  id: number
  username: string
  password: string
  refreshToken: string
  roles: object
}
type MongoUserProfile = {
  userId: number
  lastVisited: string
  searches: Array
  lastSearches: Array
}
type MongoUserData = {
  id: number
  firstname: string
  lastname: string
  phone: string
  dob: string
  pob: string
  firstcar: string
  firstschool: string
  firstjob: string
  email: string
}

interface Service {
  id: string
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  images: string[]
}