# graft
A tool for building Elm applications.

# Serving for development
To start an HTTP server and begin watching source files.

```bash
npx graft serve --root=public --port=8080 --entry=src/Main.elm --output=public/elm.js
```

# Building for production
To compile sources files for production.

```bash
npx graft build --entry=src/Main.elm --output=public/elm.js
```