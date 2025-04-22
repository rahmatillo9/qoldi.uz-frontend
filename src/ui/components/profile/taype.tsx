export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    bio: string | null;
    isEmailConfirmed: boolean;
  }

  export interface ProfileInfoProps {
    user: User;
    onUpdate: (updatedUser: Partial<User>, avatarFile: File | null) => Promise<void>;
  }
  