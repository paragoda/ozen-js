
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


// newPosts = [{ id: 'tcrstcr-csr-tc-gc' }, { id:'gckq-gcqck-s-cq-p' }]
const [newPosts, insertManyOk] = posts.insert([
    { name: 'only string allowed', stars: 14132, user: w.currentUser() },
    { name: 'second', stars: 5322, user: w.currentUser() }
])

// imagine work with select as with regular array
// array represent table
const arr = [
    { name: 'only string allowed', stars: 14132, user: w.currentUser() },
    { name: 'second', stars: 5322, user: w.currentUser() }
]

// select only where stars more 10000
arr.filter(val => val.stars > 10000)
// =
posts.where(p => p.stars.more(10000))
// if use operator overloading (dangerous thing)
posts.where(p => p.stars > 10000)

// select only 1 element
arr.find(val => val.name == 'second')
// now return array with 1 element
// maybe add optional parameter
// or specify in 
posts.where(p => p.name.eq('second'))

// select specific
arr.map(val => ({ name: val.name }))
// wintera wins there
posts.select(p => [p.name])