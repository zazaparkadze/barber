declare module '*.css'
declare module 'bcrypt'

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
type UserData = {
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


interface FormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes: string
}

interface AvailabilityResult {
  available: boolean
  duration: number
  message: string
}

interface AppointmentResponse {
  success?: boolean
  error?: string
  requiresReschedule?: boolean
  appointment?: {
    id: string
    name: string
    date: string
    time: string
    service: string
  }
  notifications?: {
    email: boolean
    sms: boolean
  }
  message?: string
}

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  duration: number
  notes: string
  confirmed: boolean
  createdAt: Date
}