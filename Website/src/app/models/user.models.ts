export class User{
    FirstName: string = "";
    LastName: string = "";
    Email: string = "";
    Password: string = "";
    DateOfBirth:string = "";
    PhoneNumbers:string = "";
    Image:string = "";
}

export interface Users{
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumbers:string;
    dateAdded:string;
    status:string;
}
