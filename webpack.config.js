const path = require('path');

module.exports = {
  entry: {
    setaddr: { import: './src/addr.js', filename: '[name].js' },
    setval: { import: './src/setval.js', filename: '[name].js' },
    log: { import: './src/log.js', filename: '[name].js' },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: [
        {
          context: ['/api'],
          target: "http://localhost:3000"
        },
      ],
      allowedHosts: "all"

  },
  mode: 'development'

};