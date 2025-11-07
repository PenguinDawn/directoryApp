// import { appwrite } from "@/lib/appwrite";
import { createAppWriteService, MemberRow } from "@/lib/appwrite";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

		// low-level objects
		// client,
		// account,
		// tables,
		// // high-level helpers
		// registerWithEmail,
		// loginWithEmail,
		// getCurrentUser,
		// logoutCurrentDevice,
		// getMemberByUserId,

type AuthContentType = {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    member: MemberRow | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContentType | undefined>(undefined);
export function AuthProvider({children}: {children:React.ReactNode}) {
    // our two states
    const appwriteService = createAppWriteService(null);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true)
    const [member, setMember] = useState<MemberRow | null>(null)

    // getting the user if they're logged in
    useEffect( () => {
        (async () => {
        // get current user
        const currentUser = await appwriteService.getCurrentUser()
        setUser(currentUser)
        setLoading(false);
        }
        )()
    }, [] )

    // logging in the user
    async function login(email: string, password: string) {
        const loggedInUser = await appwriteService.loginWithEmail({email, password})
        // updates the user
        setUser(loggedInUser);
    }

    async function register(email: string, password: string, name: string) {
        const loggedInUser = await appwriteService.registerWithEmail({email, password, name})
        // updates the user
        setUser(loggedInUser)
    }

     async function logout() {
        await appwriteService.logoutCurrentDevice();
        setUser(null);
        setLoading(false);
    }


    const loadUser = useCallback(async () => {
        setLoading(true)
        try {
            const user = await appwriteService.getCurrentUser();
            if(user) {
                const mem = await appwriteService.getMemberByUserId(user.$id)
                setMember(mem)
            }
            else {
                setMember(null)
            }
        }
        finally {
            setLoading(false)
        }
    }, [appwriteService])



    useEffect(() => {
        loadUser()
    }, [loadUser])



    return (
        <AuthContext.Provider value={{user, member, loading, login, register, logout}}>
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
