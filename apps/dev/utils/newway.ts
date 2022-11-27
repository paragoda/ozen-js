
const w: any = {}
// imagine this
// shared schema for client and server
// should be super lightweight
const postsSchema = {
    id: w.uuid(),           // can be undefined during insert
    name: w.varchar(100),   // should be inserted  
    stars: w.bigint(),      // should be inserted
    data: w.json().optional(), // can be undefined
    img: w.text().default(''), // can be undefined
    uid: w.user()              // should be inserted
}

// model means table representation on client
// also used on server proj, but extended version
const posts = w.model(postsSchema)


// incorrect
// const [newPost, postInsertOk] = postsModel.insert({ name: 10 })
// correct
// return only ok or not
const i1Ok = posts.insert({ name: 'only string allowed' })

// also return only ok
const i2Ok = posts
    .insert({ name: 'only string allowed' })
    .output()

// return empty obj
const i2Ok = posts
    .insert({ name: 'only string allowed' })
    .output(p => { })

// return whole post
const [post, i3Ok] = posts
    .insert({ name: 'only string allowed' })
    .output(p => p)

// newPosts = [{ id: 'tcrstcr-csr-tc-gc' }, { id:'gckq-gcqck-s-cq-p' }]
const [newPosts, insertManyOk] = posts.insert([
    { name: 'only string allowed', stars: 14132, user: w.currentUser() },
    { name: 'second', stars: 5322, user: w.currentUser() }
])
    .output(p => { p.id })

if (!insertOk) {
    console.error('post insert went wrong')
}

function stringLiteralArray<T extends string>(a: T[]) {
    return a;
}

const fruits = stringLiteralArray(["Apple", "Orange", "Pear"]);
type Fruits = typeof fruits[number]


const [, ok] = posts
    .update({ name: 'new name also str' })
    .where(({ id, name, stars }) => id.eq(newPost.id)
        .or(name.eq('').and(stars.less(stars.avg()))) // o lot of (brackets)
    )
    .output(p => { p.id, p.name })

// simple select without joint looks ok, even beautiful
const [postsList, postsListOk] = posts
    .select(p => { p.id, p.name, p.img, p.data })
    .where(p => p.stars.more(100))


// looks impossible when use brackets
// solution have two variants
// when need brackets use function and/or
// when no use property
const [, ok] = posts
    .update({ name: 'new name also str' })
    .where(({ id, name, stars }) => (name.eq('').and.stars.less(stars.avg())).or(id.eq(newPost.id).or.id.less(10)))
    .output(p => { p.id, p.name })


// perform delete where 
const ok = posts.delete(p => p.stars.less(100))