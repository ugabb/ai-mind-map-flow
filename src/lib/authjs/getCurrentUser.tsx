import { auth } from './auth';

export const getCurrentUser = async () => {
  const session = await auth();
  const currentUser = session?.user;
  
  return { currentUser };
};
