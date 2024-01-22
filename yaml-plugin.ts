import { plugin } from 'bun'

plugin({
  name: 'YAML',
  
  setup(build)
  {
    const { load } = require('js-yaml')

    build.onLoad({ filter: /\.(yaml|yml)$/ }, async ({ path }) => {
      const exports = load(await Bun.file(path).text()) as Record<string, any>

      return {
        loader: 'object',
        exports
      }
    })
  }
})
