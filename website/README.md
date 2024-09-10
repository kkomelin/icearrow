# IceArrow Frontend

## Local Development

```bash
VITE_BACKEND_URL='http://127.0.0.1:31415' pnpm start
```

## Production Build

```bash
VITE_BASE_URL='https://my-domain.com' VITE_BACKEND_URL='http://api.my-domain.com' pnpm build
```

Upload contents of `build/` to your CDN or hosting provider of choice, be it S3, Netlify or GCS.

## Multilingual Build

The Yopass user interface is shipped in English by default. It is possible to create a custom build that supports multiple languages.
To include an additional language, place a LOCALE.json (for example `de.json`) in `./public/locales/`.
The user interface tries to determine the browser's preferred language by using the following information (in the given order):

- querystring (append ?lng=LANGUAGE to URL)
- cookie (set cookie i18next=LANGUAGE)
- localStorage (set key i18nextLng=LANGUAGE)
- sessionStorage (set key i18nextLng=LANGUAGE)
- navigator (browser language)
- htmlTag (html lang="LANGUAGE")

You can change this list in the i18n options in `./src/i18n.tsx`. Please have a look at https://github.com/i18next/i18next-browser-languageDetector for the details.

If the determined language cannot be found, a fallback language is being used. It defaults to English ("en").
The fallback language can be set at build time using the environment variable VITE_FALLBACK_LANGUAGE.
If you want to change the fallback language, you need to make sure to place a complete language json file under `./public/locales/` containing all keys defined in the original "en.json".

After adding your LOCALE.json file(s) in `./public/locales/`, build the website as usual. Optionally, the environment variable VITE_FALLBACK_LANGUAGE can be set.

```bash
VITE_BASE_URL='https://my-domain.com' VITE_BACKEND_URL='http://api.my-domain.com' VITE_FALLBACK_LANGUAGE=en pnpm build
```
