import { firebaseAuth } from 'config/firebase';

export async function SignInService(email: string, password: string) {
  try {
    const { user} = await firebaseAuth.signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password);

    return user;
  } catch(err) {
    throw new Error(String(err));
  }
}

export async function SignOutService() {
  try {
    await firebaseAuth.getAuth().signOut();
    return true;
  } catch(err) {
    return false;
  }
}

export async function SignUpService(email: string, password: string, name: string) {
  try {
    const { user } = await firebaseAuth.createUserWithEmailAndPassword(
      firebaseAuth.getAuth(),
      email, password,
    );
    await firebaseAuth.updateProfile(user, { displayName: name });
  } catch(err) {
    throw new Error(String(err));
  }
}