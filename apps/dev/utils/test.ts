import { winteraClient } from 'wintera';
import { Db, Post } from '../models';

// want something top level
const posts = {
  id: 'id',
  name: 'name'
}

const server = winteraClient<Db>('')

// Insert

const post: Partial<Post> = {
  name: 'a',
  stars: 10
}
server.table(posts).insert([post], { posts.id, posts.name })
const [insertedPost, ok] = await server.posts.insert(post, { id: posts.id })

if (!ok) {
  console.log('error')
}

// which one
server.db.posts.update({ name: '10' }, posts.id.eq(insertedPost.id))
server.db.update(posts, { name: '10' }, posts.id.eq(insertedPost.id))

// [updated: { id }, ok: true] | [error: Error, ok^ false]
const [updatedPost, ok] = server.update(db => db.posts,
  { name: 'morethanten' },
  db.posts.id` > 10`,
  { db.posts.id }
)

// delete
server.db.posts.delete(({posts}) => posts.id.eq(insertedPost.id))
// - why function inside? - typesafete?
server.db.posts.delete(({posts}) => posts.id.in([insertedPost.id])) 