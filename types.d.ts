declare module '*.css'
declare module 'bcrypt'

type ArrayOfStrings = string[];
type ArrayOfNumbers = number[];

type User = {
  id: number
  username: string
  password: string
  refreshToken: string
  roles: object
}
type UserProfile = {
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



type GeoResults = {
  [index: string]: string | number;
  id?: string | number;
  name: string;
  latitude: string | number;
  longitude: string | number;
  elevation?: string | number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: ArrayOfStrings;
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
};

type MeteoResult = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    wind_speed_10m: string;
    temperature_2m: string;
  };
  current: {
    time: string;
    interval: number;
    wind_speed_10m: number;
    temperature_2m: number;
  };
  hourly_units: {
    time: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    temperature_2m: string;
  };
  hourly: {
    time: ArrayOfStrings;
    temperature_2m: ArrayOfNumbers;
    wind_speed_10m: ArrayOfNumbers;
    relative_humidity_2m: ArrayOfNumbers;
    precipitation_probability: ArrayOfNumbers;
  };
};

//////////////////////////////
type SearchObject = {
  [index: string]: string;
  name: string;
  latitude: string;
  longitude: string;
  hourly?: string;
  forecast_days?: string;
};
/* type SunsetSunrizeResult = {
  results: {
    date: string;
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
    solar_noon: string;
    golden_hour: string;
    day_length: string;
    timezone: string;
    utc_offset: number;
  };
  status: string;
}; */
/* 
type Post = {
  id: number;
  userId: string;
  title: string;
  body: string;
}; */

/* type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}; */

/* 
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
 */

type Result = {
  pageid: string;
  title: string;
  extract: string;
  snippet: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};

type SearchResults = {
  query?: {
    pages?: Result[];
  };
};