# Dopolink landing page

A responsive landing page built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page structure and content
- `style.css` — desktop and responsive styles
- `script.js` — mobile navigation, popup application form, accordions, optional job filtering and reveal animations

## Run locally
Open `index.html` directly in a browser, or use a local server such as:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes
The header CTA, role apply links and CTA section buttons open the popup application form. The form is currently front-end only, so connect the form action or JavaScript submit handler to your own backend/form service before going live.

The page loads Google Fonts and one Unsplash image from the internet. Replace the image URL in `index.html` with a local asset if the final site must work fully offline.


## Extra pages

This package includes:

- `privacy-policy/index.html` — publish/link as `/privacy-policy/` or `/privacy-policy`
- `thank-you/index.html` — publish/link as `/thank-you/` or `/thank-you`

Most web servers automatically serve `index.html` from a folder, so the public URL can be `domainname.com/privacy-policy` without showing `/index.html`.

The form currently redirects to `thank-you/` after submission. Connect the form to your backend/form handler before going live if you need to store submissions.

