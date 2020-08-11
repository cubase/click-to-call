# ✆ IPEX Click-to-Call

## What is Click-to-Call?

The definition of click-to-call (which is sometimes called click-to-talk, or click-to-text) refers to a type of digital communication in which a person clicks a button or text in order to be connected with another individual in real-time. These connections can occur via phone call, SMS or Voice-over-Internet-Protocol (VoIP). These click-to-call links are commonly found as buttons on websites. But often, click-to-call can be initiated by hyperlinks over emails and videos.

[**More informations**](https://www.ringdna.com/inside-sales-glossary/what-is-click-to-call)

## List of used technologies

- [React](https://github.com/reactjs)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [JsSIP](https://github.com/versatica/JsSIP)
- [Webpack](https://github.com/webpack/webpack)

## Getting started

After `npm install` run:

```
npm run dev
```

Development server serves `index.html` file in root directory

> Note: Webpack in development mode is configured to auto-refresh the page after code changes.

## Production build

Production build is generated using command:

```
npm run build
```

Output file is located in `dist/bundle.js`.

## Using on webpage

Best way to use this script on a webpage is generating startup script which will include and initialize main script after page is loaded.
Startup script is generated using command:

```
npm run create-startup
```

## Compatibility

Current version does not support any mobile devices. Rendering is skipped due to WebRTC compatibility also on Internet Explorer browser.
