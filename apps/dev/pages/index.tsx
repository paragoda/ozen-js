import { winteraClient } from 'wintera';

const server = winteraClient('')

type Post = {
  name: string
  stars: number
}

type FullPost = Post & {
  id: string
}

export default function Web() {
  const items: Post[] = [{ name: 'I', stars: 10 }]
  server.table('posts').insert<FullPost>(items)

  return (
    <div>
      <h1>Develop WINTERA</h1>
    </div>
  );
}
