import { WinteraServer } from 'wintera';
import { Db } from '../models';
import { comments, posts, postTags, tags } from './tables';

// Server deffinition
// should export default WinteraServer

// it should be based on shared type
const server = new WinteraServer<Db>({
  url: 'https://serverdomain.com',
  token: 'long-super-secret-admin-token',
  auth: true,
  tables: {
    posts,   // tables will have same names as keys in this object
    comments,
    tags,
    postTags
  }
})

export default server

// I want to use this client from frontend
// Q: how to not run it on runtime ?
// A: build it and create file on build spep and put in into special folder
// Still questions 
const client = server.client()
export { client }
