export interface RideReview {
    vehicleReview : Review;
    driverReview : Review;
}
  
export interface Review {
id : number;
rating : number;
comment : string;
passenger : UserEmail;
}

export interface ReviewRequest {
  rating : number;
  comment : string;
}
  
export interface UserEmail {
id : number;
email : string;
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
  address: string,
  blocked: boolean,
  changed: boolean,
  email: string,
  id: number,
  lastPasswordResetDate: number,
  name: string,
  profilePicture: string,
  roles: Role[],
  surname: string,
  telephoneNumber: string,
  username: string,
  drivingLicense : string,
  password : string,
  vehicle : Vehicle,
}

export interface Vehicle{
  id: Number;
  babyTransport: boolean,
  petTransport: boolean,
  model: string,
  vehicleType: string,
  passengerSeats: number,
  licenseNumber: string,
  currentLocation: Location
}

export interface AllRides {
    totalCount : number;
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
  scheduledTime: string;
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
reason: string;
timeOfRejection: string;
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
  header: string,
  from: string,
  to: string,
  scheduledTime: string,
  fromId: string,
  toId: string,
  rideId: number
}

export interface Panic {
  user: string,
  reason: string,
  licenseNum: string
}

export interface PanicRequest {
  reason: string
}

export interface Report {
  date: string;
  value: number;
}

export interface AllReports {
  totalCount: number;
  results: Report[];
}