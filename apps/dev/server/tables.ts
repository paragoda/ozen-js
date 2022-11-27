import { Post, PostComment, PostTag, Tag } from '../models';
import { ab, cb, table, wql } from 'wintera';

// Server deffinition
// should export default WinteraServer


// looks nice
const posts = table<Post>({
  fields: {
    id: cb.uuid().pk(),
    name: cb.varchar(100).unique(),
    stars: cb.bigint(),//.min(0).default(0),
    data: cb.json().optional(),
    img: cb.text().optional(),
    uid: cb.user() // mean foreign key to user id,
  },
  access: ({ uid }) => ({
    select: ab.anyone(),
    insert: ab.authorized(),
    update: ab.userId(uid),
    delete: ab.userId(uid),
  })
})

// or
const comments = table<PostComment>({
  fields: {
    id: cb.uuid(),
    content: cb.text(),
    postId: cb.fk(posts.id)
  },
  access: ({ postId }) => ({
    select: ab.anyone(),
    insert: ab.authorized(),
    delete: ab.userId(
      wql.select('uid').from('posts').where(`posts.id = ${postId}`)
    ), // how can i do it
    update: ab.nobody()
  })
})

const tags = table<Tag>({
  fields: {
    id: cb.bigint().autoincrement(),
    name: cb.varchar(100).unique()
  }
})

// standart sql way
const postTags = table<PostTag>({
  fields: {
    id: cb.bigint().autoincrement(),
    postId: cb.fk(posts.id),
    tagId: cb.fk(tags.id)
  }
})


export { posts, comments, tags, postTags }