import { model } from "./model"
import { w } from "../shared/schema"

// shared
const postsSchema = {
  id: w.uuid().optional(),           // can be undefined during insert
  name: w.varchar(100),   // should be inserted  
  stars: w.bigint(),      // should be inserted
  data: w.json().optional(), // can be undefined
  img: w.text().default(''), // can be undefined
  uid: w.user()              // should be inserted
}

// Placeholder to get right types
const postsSchemaT = {
  id: '',
  name: '',
  stars: 1,
}

const posts = model(postsSchemaT)

// INSERT
/*
Q? Return all data by default ? NO
Data wich we insert is chageable in runtime
(insert new object each time)
Ideas: 
  1. put insert into the end of chain + use as executor
  2. return function wich will take item and insert it
  3. make executor function
*/

async function test() {
  // 1
  const newPostInput = { name: 'changeable data' }

  const i1Error = await posts.insert(newPostInput)

  const [newPost, newPostOk] = await posts
    .output(p => [p.id, p.stars]).insert(newPostInput)

  // return list of posts with full data
  const [newPosts, newPostsOk] = await posts
    .output(p => p).insert([newPostInput, { name: 'second post' }])


  // exception free = error as return value (no need try, catch)
  if (newPostOk) {
    newPost // post with id and stars
  } else {
    newPost // error
  }


  // UPDATE
  const [updatedPost, updateOk] = await posts
    .output(p => [p.id, p.name])
    .where(p => p.id.eq(10))
    .update({ name: 'new name' })

  /// NEED REWORK: only ok or not
  const upError = await posts
    .where(p => p.id.eq(10))
    .update({ name: 'new name' })

  if (newPostOk) {
    const [u3, u3Ok] = await posts
      .output(p => [p.id, p.name])
      .where(p => (p.name.eq('').and.stars.less(p.stars.avg())).or(p.id.eq(newPost.id).or.id.less(10)))
      .update({ name: 'new name also str' })
  }




  // DELETE
  const d1 = await posts.delete(p => p.id.eq(10))
  if (d1) console.error(d1)

  const d2 = await posts.delete(p => p.stars.less(100))
  if (d2) console.error(d2)



  // SELECT
  const [postsList, postsListOk] = posts
    .where(p => p.stars.more(100))
    .select(p => [p.id, p.name])
}

// ???????????????????????????????????
// multifetch
/*
const data = fetch(
  '/api/db/multi',
  {
    body: JSON.stringify({
      list: [
        {
          name: 'tag', // means variable where result of request will be stored
          table: 'tags',
          command: 'insert', // sql: 'INSERT (name) INTO tags VALUES $name',
          content: {
            name: 'work'
          }
        },
        {
          name: 'post',
          table: 'posts',
          command: 'insert', // sql: 'INSERT (name, tagId) INTO posts VALUES $name, ^tag.id',
          content: {
            name: 'how to',
            tag: '^tag.id'
          }
        }
      ],
      need: ['post']
    })
  }
)
*/