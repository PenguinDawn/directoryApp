// imports from appwrite
import { Account, Client, ID, Models, Query, TablesDB, } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

// Load configuration from environment variables
// Use EXPO_PUBLIC_ prefix for variables accessible in React Native
const getAppWriteConfig = () => {
  const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
  const platform = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM;
  const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
  const membersTableId = process.env.EXPO_PUBLIC_APPWRITE_MEMBERS_TABLE_ID;
  const eventsTableId = process.env.EXPO_PUBLIC_APPWRITE_EVENTS_TABLE_ID;
  // if it doesn't have the data, throw an error
  if (!endpoint || !projectId || !platform || !databaseId || !membersTableId) {
    throw new Error(
      "Missing required AppWrite environment variables. " +
      "Please check your .env file and ensure all EXPO_PUBLIC_APPWRITE_* variables are set."
    );
  }
  // returning all of our data
  return {
    endpoint,
    projectId,
    platform,
    databaseId,
    membersTableId,
    eventsTableId,
  };
};
// function that gets all of the IDS
export const APPWRITE_CONFIG = getAppWriteConfig();
// How our Member Row from our database looks like
export interface MemberRow extends Models.Row {
  name: string;
  userID: string;
  club?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  showEmail?: boolean | undefined;
  showPhone?: boolean | undefined;
  office?: string | undefined;
  classification?: string | undefined;
  imgsrc?: string | undefined;
}
// how our events look like
export interface EventRow extends Models.Row {
  title: string;
  club?: string | undefined;
  location?: string | undefined;
  date?: string | undefined;
  time?: string | undefined;
  description?: string | undefined;
}
// our member login or registration
export type MemberInput = {
  name: string;
  userID: string;
  club?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
};

// the types of our ids
export type AppWriteConfig = {
  endpoint: string;
  projectId: string;
  platform: string; // e.g. 'com.example.app'
  databaseId: string; // TablesDB database id
  membersTableId: string; // Members table id
  eventsTableId: string;
};
// The returned shape of the service for easy typing elsewhere
export type AppWriteService = ReturnType<typeof createAppWriteService>;

// creating the service
export function createAppWriteService(config: AppWriteConfig) {
  // our new Client
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);
  // our account and our tables
  const account = new Account(client);
  const tables = new TablesDB(client);

  // AUTH register
  const registerWithEmail = async ({
    email,
    password,
    name,
    phone,
    club
  }: {
    email: string;
    password: string;
    name: string;
    phone: string;
    club: string
  }): Promise<Models.User<Models.Preferences> | null> => {
    try {
      await account.create({ userId: ID.unique(), email, password, name });
      await account.createEmailPasswordSession({ email, password });
      const user = await account.get<Models.User<Models.Preferences>>();
      await createMemberForUser(user, { email, phone, club });

      return user;
    } catch (exception) {
      console.error("[registerWithEmail] Error during registration:", exception);
      return null;
    }
  };
  // logging in the user
  const loginWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Models.User<Models.Preferences> | null> => {
    try {
      await account.createEmailPasswordSession({ email, password });
      return await account.get<Models.User<Models.Preferences>>();
    } catch (exception) {
      console.error("[loginWithEmail] Error during login:", exception);
      return null;
    }
  };

  // if we're already logged in the app
  const getCurrentUser = async (): Promise<Models.User<Models.Preferences> | null> => {
    try {
      const user = await account.get<Models.User<Models.Preferences>>();
      return user;
    } catch (exception) {
      console.error("[getCurrentUser] Error fetching current user:", exception);
      return null;
    }
  };

  // logging out
  const logoutCurrentDevice = async () => {
    try {
      await account.deleteSessions();
    } catch {
      // already logged out
    }
  };

  // MEMBERS - DATABASE (getting our row and what we need for our current user)
  const getMemberByUserId = async (userID: string): Promise<MemberRow | null> => {
    try {
      const response = await tables.listRows<MemberRow>({
        databaseId: config.databaseId,
        tableId: config.membersTableId,
        queries: [Query.equal("userID", userID), Query.limit(1)],
      });

      return response.rows[0] ?? null;
    } catch (exception) {
      console.error("[getMemberByUserId] Error fetching member:", exception);
      return null;
    }
  };

  // creating a member for the user
  const createMemberForUser = async (
    user: Models.User<Models.Preferences>,
    extra?: Partial<MemberInput>
  ): Promise<MemberRow> => {
    const email = user.email ?? extra?.email ?? null;

    return tables.createRow<MemberRow>({
      databaseId: config.databaseId,
      tableId: config.membersTableId,
      rowId: ID.unique(),
      data: {
        name: user.name,
        userID: user.$id,
        club: extra?.club ?? undefined,
        phone: extra?.phone ?? undefined,
        email,
      },
      // You can add explicit permissions here if you prefer:
      // permissions: [
      //   Permission.read(Role.user(user.$id)),
      //   Permission.update(Role.user(user.$id)),
      //   Permission.delete(Role.user(user.$id)),
      // ],
    });
  };

  // getting a member for the user
  const ensureMemberForUser = async (
    user: Models.User<Models.Preferences>,
    extra?: Partial<MemberInput>
  ): Promise<MemberRow> => {
    const existing = await getMemberByUserId(user.$id);
    return existing ?? (await createMemberForUser(user, extra));
  };

  // changing the member if need be
  const updateMember = async (
    rowId: string,
    data: Partial<MemberInput>
  ): Promise<MemberRow> => {
    return tables.updateRow<MemberRow>({
      databaseId: config.databaseId,
      tableId: config.membersTableId,
      rowId,
      data,
    });
  };

  return {
    // low-level objects
    client,
    account,
    tables,

    // high-level helpers
    getCurrentUser,
    registerWithEmail,
    loginWithEmail,
    logoutCurrentDevice,

    getMemberByUserId,
    createMemberForUser,
    ensureMemberForUser,
    updateMember,
  };
}

/*const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setPlatform(APPWRITE_PLATFORM_NAME)

const account = new Account(client)

async function registerWithEmail( {email, password,name} : {email:string, password:string, name:string}) {

    await account.create({userId:ID.unique(), email, password, name})

    await account.createEmailPasswordSession({email, password})

    return await account.get<Models.User<Models.Preferences>>()
} 

async function loginWithEmail( {email, password}: {email:string, password:string}) {

    await account.createEmailPasswordSession({email, password})

    return await account.get<Models.User<Models.Preferences>>()
}

async function getCurrentUser() {
    try {
        const user = await account.get<Models.User<Models.Preferences>>()
        return user
    }
    catch {
        return null
    }
}

async function logoutCurrentDevice() {
    await account.deleteSession({sessionId: "current"})
}

export const appwrite = {
    client,
    account,
    registerWithEmail,
    loginWithEmail,
    getCurrentUser,
    logoutCurrentDevice
}*/


// import { Account, Client, ID, Models, Query, TablesDB } from "react-native-appwrite";
// import "react-native-url-polyfill/auto";

// const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1"
// const APPWRITE_PROJECT_ID = "6908d1580030732fe1df";
// const APPWRITE_PLATFORM = "Andriod"
// const DATABASE_ID = "6908d1de0004883c9d8a";
// const MEMEBERS_ID = "membersofclub";

// export interface MemberRow extends Models.Row{
// 	firstName: string,
// 	lastName: string,
// 	userID: string,
// 	phone: string,
// 	email: string,
// 	showEmail: boolean,
// 	club?: string,
// 	showPhone: boolean,
// 	office?: string,
// 	status: string,
// 	classification: string,
// 	imgsrc: string,
// }


// export function createAppWriteService(config) {
// 	const client = new Client()
// 		.setEndpoint(APPWRITE_ENDPOINT)
// 		.setPlatform(APPWRITE_PLATFORM)
// 		.setProject(APPWRITE_PROJECT_ID)

// 	const account = new Account(client);
// 	const tables = new TablesDB(client);

// 	// auth
// 	async function registerWithEmail({email, password, name} : {email:string, password: string, name:string}) {
// 	await account.create({userId: ID.unique(), email, password, name})
// 	await account.createEmailPasswordSession({email, password})
// 	return await account.get<Models.User<Models.Preferences>>()}

// 	async function loginWithEmail({email, password} : {email:string, password: string}) {
// 	await account.createEmailPasswordSession({email, password})
// 	return await account.get<Models.User<Models.Preferences>>()
// }

// 	async function getCurrentUser() {
// 		try {
// 			const user = await account.get<Models.User<Models.Preferences>>()
// 			return user;
// 		}
// 		catch {
// 			return null;
// 		}
// 	}

// 	async function logoutCurrentDevice() {
// 	await account.deleteSession({sessionId: "current"});
// 	}

// 	// members and database stuff
// 	const getMemberByUserId = async (userID: string):Promise<MemberRow> => {
// 		const response = await tables.listRows<MemberRow>({
// 			databaseId: DATABASE_ID,
// 			tableId: MEMEBERS_ID,
// 			queries: [Query.equal('userID', userID), Query.limit(1)]
// 		})
// 		return response.rows[0] ?? null
// 	}

// 	return {
// 		// low-level objects
// 		client,
// 		account,
// 		tables,
// 		// high-level helpers
// 		registerWithEmail,
// 		loginWithEmail,
// 		getCurrentUser,
// 		logoutCurrentDevice,
// 		getMemberByUserId,
// 	}


// }





// // our object
// export const appwrite = {
//     client,
//     account,
//     registerWithEmail,
//     loginWithEmail,
// 	getCurrentUser,
// 	logoutCurrentDevice,
// }
