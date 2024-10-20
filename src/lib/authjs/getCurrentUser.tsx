import { auth, ExtendedUser } from './auth';

export const getCurrentUser = async () => {
  const session = await auth();
  const currentUser: ExtendedUser | undefined = session?.user;
  
  return { currentUser };
};
