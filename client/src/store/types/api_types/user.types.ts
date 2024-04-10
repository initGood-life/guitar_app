export interface UserResponse {
  userData: {
    phone: string;
    gender: 'male' | 'female' | 'other';
    firstname: string;
    lastname: string;
  }
}

export interface UserArg {
  userId: string,
  userData: object,
  token: object
}

export interface EmailUserResponse {
  userEmail: {
    email: string;
    newemail: string;
  }
}

export interface EmailArg {
  userId: string,
  userEmail: object
  token: object
}
