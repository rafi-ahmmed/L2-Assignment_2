export type ROLE = 'contributor' | 'maintainer';

export type IUser = {
   id?: number;
   name: string;
   email: string;
   password: string;
   role: ROLE;
   created_at: Date;
   updated_at: Date;
};

export type TResponse<T> = {
   statusCode: number;
   success: boolean;
   message: string;
   data?: T;
   errors?: unknown;
};

export type TSignupPayload = {
   name: string;
   email: string;
   password: string;
   role: ROLE;
};
export type TSigninPayload = {
   email: string;
   password: string;
};
