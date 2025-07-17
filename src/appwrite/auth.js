import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setProject(conf.appWriteProjectId).setEndpoint(conf.appWriteUrl);
    this.account = new Account(client);
  }

    //create user 
  async createAccount({ username, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        username,
        email,
        password
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("failed creating account", error.message);
      throw error;
    }
  }

    //check login credentials 
  async login({ email, password }) {
    try {
     return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }

  //get current user 
  async getCurrentUser() {
    try{
        return await this.account.get();
    }catch(error){
        console.log("Appwrite servie error :: getcurrentuser", error );
    }

    return null;
  }
  async logout() {
    try {
        return await this.account. deleteSessions();
    } catch (error) {
        console.log("Appwrite service error :: Logout()", error)
    }

    return null;
  }
}

const authService = new AuthService();
export default authService;