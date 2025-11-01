import { appwrite } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

type AuthContentType = {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContentType | undefined>(undefined);
export function AuthProvider({children}: {children:React.ReactNode}) {
    // our two states
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true)

    // getting the user if they're logged in
    useEffect( () => {
        (async () => {
        // get current user
        const currentUser = await appwrite.getCurrentUser()
        setUser(currentUser)
        setLoading(false);
        }
        )()
    }, [] )

    // logging in the user
    async function login(email: string, password: string) {
        const loggedInUser = await appwrite.loginWithEmail({email, password})
        // updates the user
        setUser(loggedInUser);
    }

    async function register(email: string, password: string, name: string) {
        const loggedInUser = await appwrite.registerWithEmail({email, password, name})
        // updates the user
        setUser(loggedInUser)
    }

     async function logout() {
        await appwrite.logoutCurrentDevice();
        setUser(null);
        setLoading(false);
    }




    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )

}
export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
