export interface User {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  lastLoginDate: string | null;
  isBlocked: boolean;
}

export interface UserIsChecked extends User {
  isChecked: boolean;
}
