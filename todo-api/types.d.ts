import { Model } from 'mongoose';
export interface UserFields {
  username: string;
  password: string;
  token: string;
}
export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type UserModal = Model<UserFields, {}, UserMethods>;

export interface TaskMutation {
  user: string;
  title: string;
  description?: string;
  status: 'new' | 'in_progress' | 'complete';
}
export interface TaskApi extends TaskMutation {
  id: string;
}
