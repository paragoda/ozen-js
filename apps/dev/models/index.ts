// shared models from db

type Post = {
  id: string
  name: string
  stars: number
  data: object
  img: string
  uid: string
}

type PostComment = {
  id: string
  content: string
  postId: string
}

type Tag = {
  id: number
  name: string
}

type PostTag = {
  id: number
  postId: string
  tagId: string
}

// shared type for server and client
type Db = {
  posts: Post
  tags: Tag
  comments: PostComment
  postTags: PostTag
}


export type { Db, Post, Tag, PostTag, PostComment }