import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

//creating class services for reusable code.
export class Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    // DATABASE SERVICES
    //get document from the database.
    async getDocument(slug) {
        try {
            return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite service error:: getDocument", error);
            return false;
        }
    }

    // list document/post based on the query
    async getPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite service error :: getPost", error);
            return false;
        }
    }

    // create the document
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {title, content, featuredImage,status, userId});
        } catch (error) {
            console.log("Appwrite service error:: createPost", error);
            return false;
        }
    }

    // update the post
    async updatePost(slug, {title, featuredImage, content, status}){
        try {
            return await this.databases(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {title, featuredImage, content, status} );
        } catch (error) {
             console.log("Appwrite service error:: updatePost", error);
            return false;
        }
    }

    //delete the post
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
             return true;
        } catch (error) {
            console.log("Appwrite Service issue :: deletePost", error);
            return false;
        }
    }

    // STORAGE SERVICES
    //create file
    async createFile(file){
        try {
            return await this.bucket.createFile(conf.appWriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service issue:: createFile", error);
            return false;
        }
    }

    //delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
            return true;
        } catch (error) {
              console.log("Appwrite service issue:: deleteFile", error);
            return false;
        }
    }

    // get preview of the file
    getPreview(fileId){
        return  this.bucket.getFilePreview(conf.appWriteBucketId, fileId).href;
    }
}

const service = new Services();
export default service; 