import { model } from "./model"

// show dx
const w: any = {}

// shared
const postsSchema = {
  id: w.uuid(),
  name: w.varchar(100),
  stars: w.bigint(),
  data: w.json(),
  img: w.text(),
  uid: w.user()
}

const postsSchemaT = {
  id: '',
  name: '',
  stars: 1,
}

const posts = model(postsSchemaT)

// INSERT
/*
Q? Return all data by default ?
Data wich we insert is chageable in runtime
(insert new object each time)
Ideas: 
  1. put insert into the end of chain + use as executor
  2. return function wich will take item and insert it
  3. make executor function
*/


function c<T extends string>(a: T[]) {
  return a;
}

// 1
const newPost = { id: 'changeable data' }
// doesn't work
// always all keys in return (newPostData) ):
const [newPostData, newPostDataOk] = await posts
  .output(p => [p.id, p.stars]).insert(newPost)

// const [newPostData, newPostDataOk] = await posts
//   .output(({ id, stars }) => ({ id, stars })).insert(newPost)

if (newPostDataOk) {
  newPostData
}

// prepared ?
const preparedI1 = posts.output(p => p)
const [newPreparedPost, nppok] = await preparedI1.insert({ id: 'prepared, only change data' })



// DELETE
const d1ok = await posts.delete(p => p.id.eq(10))
if (!d1ok) console.error('sorry but item wasnt deleted')




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