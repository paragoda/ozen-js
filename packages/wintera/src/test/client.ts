import { w, model } from "../client"

const postsSchema = {
  id: w.uuid().defaulted(),           // can be undefined during insert
  name: w.varchar().nullable(),   // should be inserted  
  stars: w.bigint().nullable(),      // should be inserted
  // data: w.json().optional(), // can be undefined
  pro: w.bool(), // can be undefined
  // uid: w.user()              // should be inserted
}

class PostSchema {
  id = w.uuid().defaulted()
  name = w.varchar().nullable()
  stars = w.bigint().nullable()
  pro = w.bool()
}

const posts = model(postsSchema)

async function test() {
  // 1
  const newPostInput = { name: 'changeable data', pro: true }

  const i1Error = await posts.insert(newPostInput)

  const [newPost, newPostOk] = await posts
    .output(p => [p.id, p.stars, p.pro]).insert(newPostInput)

  // return list of posts with full data
  const [newPosts, newPostsOk] = await posts
    .output(p => p).insert([newPostInput, { name: 'second post', pro: true, stars: 123 }])


  // exception free = error as return value (no need try, catch)
  if (newPostsOk && newPostOk) {
    newPost // post with id and stars
    newPosts[0]
  } else {
    newPosts // error
  }


  // UPDATE
  const [updatedPost, updateOk] = await posts
    .output(p => [p.id, p.name])
    .where(p => p.id.eq(10))
    .update({ name: 'new name' })

  if (updateOk) {
    updatedPost
  }

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


// IMAGINE

var a = await posts.output(p => ({
  id: p.id,
  name: p.name,
  pro: p.pro,
  stars: p.stars
})).insert({ name: 'changeable data', pro: true })

if (a[1]) {

}




function select<T extends object>(schema: T, selector: (obj: T) => Partial<T>) {
  // I want { id: 'id' }
  // to get this i will do magic with 'any'
  const obj = {} as any
  for (const key in schema) {
    Object.defineProperty(schema, key, key.toString())
  }

  // dto { id: 'id' }
  const dto: any = selector(obj)


}

type N = {
  id: string,
  size: number
}

const nnn = select({ id: '', size: 10 }, n => ({ id: n.id }))