# Daily Sales Report

- `index.html` — public form (GitHub Pages). Anyone can submit; no Google account needed.
- `Code.gs` — Apps Script bound to the Google Sheet. Deploy as Web App (Execute as: Me, Access: Anyone). Writes each store's values into that store's row (matched by SAP code) + "Last Updated".
- Paste the Web App URL into `SHEET_URL` in `index.html`.
