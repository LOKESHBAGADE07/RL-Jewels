import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider, firebaseAvailable } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
const Ctx = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!firebaseAvailable || !auth) {
            setLoading(false);
            return;
        }
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, []);
    const value = useMemo(() => ({
        user,
        loading,
        async signInWithGoogle() {
            if (!firebaseAvailable || !auth || !googleProvider)
                return;
            await signInWithPopup(auth, googleProvider);
        },
        async signOutUser() {
            if (!firebaseAvailable || !auth)
                return;
            await signOut(auth);
        }
    }), [user, loading]);
    return _jsx(Ctx.Provider, { value: value, children: children });
};
export const useAuth = () => {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
