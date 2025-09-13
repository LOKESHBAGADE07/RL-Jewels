import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider, firebaseAvailable } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseAvailable || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u: User | null) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthCtx>(() => ({
    user,
    loading,
    async signInWithGoogle() {
      if (!firebaseAvailable || !auth || !googleProvider) {
        alert('Sign-in unavailable: Firebase is not configured. Check your .env and restart the dev server.');
        return;
      }
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (err: any) {
        console.error('Google sign-in failed', err);
        const msg = err?.message || 'Unknown error';
        alert(`Google sign-in failed: ${msg}.\nIf you are using the Network URL, add it to Firebase Auth > Authorized domains, or open http://localhost:5173`);
      }
    },
    async signOutUser() {
      if (!firebaseAvailable || !auth) return;
      await signOut(auth);
    }
  }), [user, loading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
