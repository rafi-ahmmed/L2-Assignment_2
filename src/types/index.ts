export type ROLE = 'contributor' | 'maintainer';

export const userRole = {
   MAINTAINER: 'maintainer',
   CONTRIBUTOR: 'contributor',
} as const;

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
   message?: string;
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

export type TIssueReqBody = {
   title: string;
   description: string;
   type: 'bug' | 'feature_request';
};
export type TIssueUpdateBody = {
   title?: string;
   description?: string;
   type?: 'bug' | 'feature_request';
};

export type TJwtPayload = {
   id: number;
   name: string;
   role: ROLE;
};

export type QueryParams = {
   sort?: string;
   type?: string;
   status?: string;
};