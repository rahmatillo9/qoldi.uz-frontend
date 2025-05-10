export interface User {
  id: number;
  username: string;
  avatar: string | null;
  email?: string;
  bio?: string;
  isEmailConfirmed?: boolean;
}
  export interface ProfileInfoProps {
    user: User;
    onUpdate: (updatedUser: Partial<User>, avatarFile: File | null) => Promise<void>;
  }
  