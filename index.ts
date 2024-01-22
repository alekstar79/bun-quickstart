import figlet from 'figlet'

// @ts-ignore
import { name, releaseYear } from './data.yml'
import { Database } from "bun:sqlite"
import text from './text.txt'

/*
;(async () => {
  const { name, releaseYear } = await import('./data.yml')
  console.log({ name, releaseYear })
})()
*/

/** [Quickstart](https://bun.sh/docs/quickstart) */

const db = new Database(':memory:')
const query = db.query("select 'Hello world from sqlite' as message;")

console.log(`${Bun.version}\n`)
console.log(`${text}\n`)
console.log({ name, releaseYear }, '\n')
console.log(query.get(), '\n')

const server = Bun.serve({
  port: 3000,

  fetch()
  {
    return new Response(figlet.textSync('Bun!'))
  }
})

console.log(`Listening on http://localhost:${server.port} ...`)
