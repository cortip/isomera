const { composePlugins, withNx } = require('@nx/webpack')
const { withReact } = require('@nx/react')
const path = require('path')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), config => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.resolve.alias['@nestjs/swagger'] = path.resolve(
    __dirname,
    'ApiProperty.override.ts'
  )
  return config
})
