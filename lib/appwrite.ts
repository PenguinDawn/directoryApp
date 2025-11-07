import { Account, Client, ID, Models, Query, TablesDB } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1"
const APPWRITE_PROJECT_ID = "6908d1580030732fe1df";
const APPWRITE_PLATFORM = "Andriod"
const DATABASE_ID = "6908d1de0004883c9d8a";
const MEMEBERS_ID = "membersofclub";

export interface MemberRow extends Models.Row{
	firstName: string,
	lastName: string,
	userID: string,
	phone: string,
	email: string,
	showEmail: boolean,
	club?: string,
	showPhone: boolean,
	office?: string,
	status: string,
	classification: string,
	imgsrc: string,
}


export function createAppWriteService(config) {
	const client = new Client()
		.setEndpoint(APPWRITE_ENDPOINT)
		.setPlatform(APPWRITE_PLATFORM)
		.setProject(APPWRITE_PROJECT_ID)

	const account = new Account(client);
	const tables = new TablesDB(client);

	// auth
	async function registerWithEmail({email, password, name} : {email:string, password: string, name:string}) {
	await account.create({userId: ID.unique(), email, password, name})
	await account.createEmailPasswordSession({email, password})
	return await account.get<Models.User<Models.Preferences>>()}

	async function loginWithEmail({email, password} : {email:string, password: string}) {
	await account.createEmailPasswordSession({email, password})
	return await account.get<Models.User<Models.Preferences>>()
}

	async function getCurrentUser() {
		try {
			const user = await account.get<Models.User<Models.Preferences>>()
			return user;
		}
		catch {
			return null;
		}
	}

	async function logoutCurrentDevice() {
	await account.deleteSession({sessionId: "current"});
	}

	// members and database stuff
	const getMemberByUserId = async (userID: string):Promise<MemberRow> => {
		const response = await tables.listRows<MemberRow>({
			databaseId: DATABASE_ID,
			tableId: MEMEBERS_ID,
			queries: [Query.equal('userID', userID), Query.limit(1)]
		})
		return response.rows[0] ?? null
	}

	return {
		// low-level objects
		client,
		account,
		tables,
		// high-level helpers
		registerWithEmail,
		loginWithEmail,
		getCurrentUser,
		logoutCurrentDevice,
		getMemberByUserId,
	}


}





// // our object
// export const appwrite = {
//     client,
//     account,
//     registerWithEmail,
//     loginWithEmail,
// 	getCurrentUser,
// 	logoutCurrentDevice,
// }