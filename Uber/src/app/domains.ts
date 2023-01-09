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
  
export interface UserEmail {
id : Number;
email : String;
}

export interface AllUsers {
  totalCount: number;
  results: User[];
}

export interface User {  
  active: Boolean,
  address: String,
  blocked: Boolean,
  email: String,
  enabled: Boolean,
  id: number,
  lastPasswordResetDate: Number,
  name: String,
  profilePicture: String,
  roles: Role[],
  surname: String,
  telephoneNumber: String,
  username: String
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
  id: Number,
  name: String,
  authority: String
}

  
