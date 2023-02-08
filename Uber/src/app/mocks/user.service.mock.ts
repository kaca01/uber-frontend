import { AllUsers, Login, Passenger, Role, UpdateUser, User } from "../domains";

const update1: UpdateUser = {  
    address: "adresica 33",
    email: "mica@gmail.com",
    name: "Milica",
    profilePicture: "slicica",
    surname: "Nedovic",
    telephoneNumber: "1234567",
    username: "mica"
}

const passengerRole: Role = {
    id: 1,
    name: "ROLE_PASSENGER",
    authority: "ROLE_PASSENGER"
}

const passengerRoleArray: Role[] = [passengerRole];

const passenger1: User = {  
    active: true,
    address: "bulevar oslobodjenja 12",
    blocked: false,
    email: "",
    enabled: true,
    id: 1,
    lastPasswordResetDate: 123,
    name: "Milica",
    profilePicture: "slicica",
    roles: passengerRoleArray,
    surname: "Nedovic",
    telephoneNumber: "1234567",
    username: "mica",
    changed: false
}

const passenger2: User = {
    active: true,
    address: "sekspirova 12",
    blocked: false,
    email: "neda@gmail.com",
    enabled: true,
    id: 2,
    lastPasswordResetDate: 123,
    name: "Nada",
    profilePicture: "slika",
    roles: passengerRoleArray,
    surname: "Markovic",
    telephoneNumber: "7890432",
    username: "neda",
    changed: false
};
  
const passenger3: User = {
    active: true,
    address: "bulevar cara lazara 101",
    blocked: false,
    email: "pedja@gmail.com",
    enabled: true,
    id: 3,
    lastPasswordResetDate: 123,
    name: "Predrag",
    profilePicture: "slicica",
    roles: passengerRoleArray,
    surname: "Milosevic",
    telephoneNumber: "1230954",
    username: "pedja",
    changed: false
};

const passengersArray: User[] = [passenger1, passenger2, passenger3];

const allPassengers: AllUsers = {
    totalCount: passengersArray.length,
    results: passengersArray
}

const login1: Login = {  
    email: "mica@gmail.com",
    password: "Milica"
}

export { update1, passenger1, passenger2, passenger3, allPassengers, login1 };