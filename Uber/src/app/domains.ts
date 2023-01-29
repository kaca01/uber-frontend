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
id: Number;
startTime: String; 
endTime: String;
totalCost: Number;
driver: UserEmail;
passengers: UserEmail[];
estimatedTimeInMinutes : Number;
vehicleType: String;
babyTransport: String;
petTransport: String;
rejection : Rejection;
locations: Route[];
}

export interface Rejection {
reason: String;
timeOfRejection: String;
}

export interface Location {
address: String;
longitude: Number;
latitude: Number;
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

interface Role {
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