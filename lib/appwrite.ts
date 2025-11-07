import { Account, Client, ID, Models } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1"
const APPWRITE_PROJECT_ID = "6908d1580030732fe1df";
const APPWRITE_PLATFORM = "Andriod"

const client = new Client()
	.setEndpoint(APPWRITE_ENDPOINT)
	.setPlatform(APPWRITE_PLATFORM)

const account = new Account(client)

async function registerWithEmail({email, password, name} : {email:string, password: string, name:string}) {
	await account.create({userId: ID.unique(), email, password, name})
	await account.createEmailPasswordSession({email, password})
	return await account.get<Models.User<Models.Preferences>>()
}

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

// our object
export const appwrite = {
    client,
    account,
    registerWithEmail,
    loginWithEmail,
	getCurrentUser,
	logoutCurrentDevice,
}