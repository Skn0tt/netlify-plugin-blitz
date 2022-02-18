# netlify-plugin-blitz

A plugin to run Blitz.js on Netlify.

## Installing the plugin

You can install the plugin [via the Netlify UI](https://app.netlify.com/plugins/netlify-plugin-blitz/install) or by adding it in code:

```shell
npm install -D netlify-plugin-blitz
```

...then add the plugin to your `netlify.toml` file:

```toml
[build]
  command="npm run build"
  publish=".next"

[[plugins]]
package = "netlify-plugin-blitz"
```

