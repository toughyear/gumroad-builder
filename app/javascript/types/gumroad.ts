export type UserProfile = {
  bio: string;
  name: string;
  twitter_handle: string | null;
  user_id: string;
  email: string;
  url: string;
};

export type UseUserProfileResult = {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
};
