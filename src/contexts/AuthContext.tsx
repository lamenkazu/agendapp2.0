import { createContext, useState, useEffect, ReactNode } from "react";
import { auth, authGoogle, authPopup } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;

}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>()

    async function signInWithGoogle() {
        const provider = authGoogle

        const result = await authPopup(auth, provider)
        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing Info from Google')
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}