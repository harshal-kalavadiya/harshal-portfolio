# Harshal Kalavadiya — Portfolio Website

Plain HTML / CSS / vanilla JS. No npm, no build step, no dependencies —
just open `index.html` in a browser and it works.

## Files
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/Harshal_Kalavadiya_CV.pdf   ← your CV, used by the "Download CV" buttons
└── README.md
```

## View it locally
Double-click `index.html`, or from a terminal:
```
cd portfolio
python3 -m http.server 8000
```
then open http://localhost:8000

## Put it online for free — GitHub Pages (5 minutes)
1. Create a new GitHub repo, e.g. `harshal-portfolio`.
2. Upload everything in this folder to the repo (drag-and-drop on
   github.com works fine, or `git push`).
3. In the repo: **Settings → Pages → Source → Deploy from a branch →
   branch: `main`, folder: `/ (root)`** → Save.
4. Your site goes live at:
   `https://<your-github-username>.github.io/harshal-portfolio/`

## Custom domain (optional)
Buy a domain (e.g. from Namecheap or Google Domains), then in the same
GitHub Pages settings add it under "Custom domain" and follow GitHub's
DNS instructions.

## Editing content
Everything is in `index.html` — it's plain text, no components to hunt
through. Search for the section you want to change (About, Experience,
Projects, Skills, Achievements, Contact) and edit directly. Colors,
fonts and spacing all live in `css/style.css` under `:root` at the top
if you want to retheme.

## Swap the CV file
Replace `assets/Harshal_Kalavadiya_CV.pdf` with an updated version,
keeping the same filename — the download buttons will pick it up
automatically.
