const terser = require('terser')

const isDev = process.env.NODE_ENV !== 'production'
const version = process.env.VERSION || 'v1'

const code = (appId) => `
;(function (window, document) {
  const script = document.createElement('script')
  const head = document.getElementsByTagName('head')[0]
  window._ipex_ctc_ = { _id: '${appId}' }
  script.type = 'text/javascript'
  script.async = true
  script.src = '${isDev ? 'dist/bundle.js' : `https://cdn.ipex.cz/libs/ctc/${version}/bundle.js`}'
  head.appendChild(script)
})(window, document)
`

;(async () => {
  const appId = process.argv[2]

  if (!appId) {
    throw new Error('You need to provide appId as paramter')
  }

  const result = await terser.minify(code(appId), { compress: true, mangle: true })
  console.log(`<script type="text/javascript">${result.code}</script>`)
})()
