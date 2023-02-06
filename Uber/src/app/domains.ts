export interface RideReview {
    vehicleReview : Review;
    driverReview : Review;
}
  
export interface Review {
id : Number;
rating : Number;
comment : String;
passenger : UserEmail;
}

export interface ReviewRequest {
  rating : number;
  comment : string;
}
  
export interface UserEmail {
id : Number;
email : String;
}

export interface AllUsers {
  totalCount: number;
  results: User[];
}

export interface User {  
  active: boolean,
  address: string,
  blocked: boolean,
  email: string,
  enabled: boolean,
  id: number,
  lastPasswordResetDate: number,
  name: string,
  profilePicture: string,
  roles: Role[],
  surname: string,
  telephoneNumber: string,
  username: string,
  changed: boolean
}

export interface Driver {
  active: Boolean,
  address: String,
  blocked: Boolean,
  changed: boolean,
  email: String,
  id: Number,
  lastPasswordResetDate: Number,
  name: String,
  profilePicture: String,
  roles: Role[],
  surname: String,
  telephoneNumber: String,
  username: String,
  drivingLicense : String,
  password : String,
  vehicle : Vehicle,
}

export interface Vehicle{
  id: Number;
  babyTransport: Boolean,
  petTransport: Boolean,
  model: String,
  vehicleType: String,
  passengerSeats: Number,
  licenseNumber: String,
  currentLocation: Location
}

export interface AllRides {
    totalCount : Number;
    results : Ride[];
}

export interface Ride {
id: number;
startTime: string; 
endTime: string;
totalCost: number;
driver: UserEmail;
passengers: UserEmail[];
estimatedTimeInMinutes : number;
vehicleType: string;
babyTransport: boolean;
petTransport: boolean;
rejection : Rejection;
locations: Route[];
status: string;
scheduledTime: string;
panic: boolean;
}

export interface RideRequest {
  locations: Route[];
  passengers: UserEmail[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  scheduledTime: String;
}

export interface FavoriteRide {
  id: number;
  favoriteName: string;
  scheduledTime: string;
  locations: Route[];
  passengers: UserEmail[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
}

export interface FavoriteRideRequest {
  favoriteName: string;
  locations: Route[];
  passengers: UserEmail[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
}

export interface Rejection {
reason: String;
timeOfRejection: String;
}

export interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

export interface Route {
    departure: Location;
    destination: Location;
}

export interface AllNotes {
  totalCount: number;
  results: Note[];
}

export interface Note {  
    id: number;
    message: string,
    date: string
}

export interface RequestNote {
    message: string;
}

export interface Role {
  id: number,
  name: string,
  authority: string
}

export interface UpdateUser {  
  address: string,
  email: string,
  name: string,
  profilePicture: string,
  surname: string,
  telephoneNumber: string,
  username: string
}

export interface ResetPassword {  
  newPassword: string,
  code: string
}

export interface ChangePassword {  
  newPassword: string,
  oldPassword: string
}

export interface AllFavoriteRides {
  totalCount : number;
  results : FavoriteRide[];
}

export interface FavoriteRide {
  id: number;
  favoriteName: string;
  locations: Route[];
  passengers: UserEmail[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
}

export interface Message {
  message: string,
  fromId: string,
  toId: string,
  rideId: number
}

export interface Panic {
  id: number, 
  reason: string,
  user: User,
  ride: Ride,
  time: string
}