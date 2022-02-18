const fs = require("fs")
const path = require("path")

const essentialNextjs = require("@netlify/plugin-nextjs")
const essentialNextjsConstants = require("@netlify/plugin-nextjs/lib/constants")

/**
 * @param {string} value
 * @param {{ after: string, insert: string }}
 */
function insert(value, { after, insert }) {
  const [prefix, postfix] = value.split(after)
  return prefix + after + insert + postfix
}

module.exports = {
  ...essentialNextjs,
  async onBuild(args) {
    await essentialNextjs.onBuild(args)

    const pathToNetlifyHandler = path.join(
      ".netlify",
      "functions-internal",
      essentialNextjsConstants.HANDLER_FUNCTION_NAME,
      essentialNextjsConstants.HANDLER_FUNCTION_NAME + ".js"
    )
    const currentContent = fs.readFileSync(pathToNetlifyHandler, { encoding: "utf-8" })
    const blitzUpdatedContent = insert(currentContent, {
      after: `required-server-files.json")`,
      insert: `
  const { middleware: blitzMiddleware } = require("../../../.blitz.config.compiled.js");
  config.middleware = blitzMiddleware;
  `,
    })
    fs.writeFileSync(pathToNetlifyHandler, blitzUpdatedContent, { encoding: "utf-8" })
  },
}