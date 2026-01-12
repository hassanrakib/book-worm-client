export const USER_ROLE = {
  Admin: 'admin',
  User: 'user',
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IUser {
  userId: string;
  name: string;
  profilePhoto: string;
  email: string;
  password: string;
  role: TUserRole;
}