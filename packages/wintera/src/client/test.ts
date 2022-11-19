import { winteraClient } from './index'
import { select } from './select'

// show dx
const zima = winteraClient('myapidomen.com')

const posts = zima.table('posts')


// INSERT
const item = { name: 'how to', stars: 10 }

type I1 = {
  id: string,
  name: string
}
/// [{ id: 'tcrs-bsrc-ggcc-rtcb', name: 'how to' }]
const i1 = posts.insert<I1>([item], 'id, name')

const items = [item, { name: 'why to', stars: 100 }]

/// null
const i2 = posts.insert(items, null)

/*[
  { id: 'tcrs-bsrc-ggcc-rtcb', name: 'how to', stars: 10 }, 
  { id: 'rstg-bcrs-btdq-kjhu', name: 'why to', stars: 100 }
]*/
const i3 = posts.insert(items)


const neoi1 = posts.insertRet<I1>([item])
const neoi2 = posts.insertRet([item])


// UPDATE
const id = 'tcrs-bsrc-ggcc-rtcb'

/// { id: 'tsrc-tsrct-cstgc' }
const u1 = posts.update({ stars: 50 }, `id = ${id}`, 'id, money')

/// null
const u2 = posts.update({ stars: 5420 }, `id = ${id}`, null)


// DELETE
const d1 = posts.delete(`id = ${id}`)


// SELECT

const test = () => {
  console.clear()

  const long = select('id, name, price')
    .from('users')
    .join('products').on('products.uid = users.id')
    .join('urls').on('url.uid = users.id')
    .where('price > 100')
    .groupby('category')
    .having('COUNT(*) > 100')
    .orderby('price')

  console.log(long.toString(), long.toString().length)


  const complex = select('users.name, products.id')
    .from('users')
    .join('products').on('users.id == products.uid')
    .where(`users.name IS NOT NULL AND products.count > ${select('avg(count)').from('products')}`)
    .orderby('products.price DESC')
    .having('count(*) > 100')

  console.log(complex.toString(), complex.toString().length)

  // const q1 = select('nums')
  //   .from('employee')
  //   .where(`id = ${select('MIN id').from('Employee')}`)
  //   .having('COUNT(*) == 1')


  // alternative
  // .as('Minimal')
  // const alt = select('id, name, price', count(), min('price'))
  //   .distinct()
  //   .from('users')
  //   //   .join('products').on(equals('products.uid', 'users.id'))
  //   //   .join('urls').on(col('ulr.uid').equals('users.id'))
  //   .where(and(col('price').bigger(100), col('products.price').in(q1)))
  //   .groupby('category')
  //   .having(count().bigger(100))
  //   .orderby('price')
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