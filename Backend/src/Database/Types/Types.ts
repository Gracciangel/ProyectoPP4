export type TableResponse = {
  success: boolean;
  message: string;
};

export type EmailResponse = {
  exist: boolean;
  message: string;
};

export type PasswordResponse = {
  succes: boolean; 
  message: string; 
}; 

export type CreateUserResponse = {
  success: boolean;
  message: string;
};

//regular expression 
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
