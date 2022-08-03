export interface User {
  id: number;
  name: string;
  email: string;
  registrationDate: Date;
  lastLoginDate: Date | null;
  isBlocked: boolean;
}
