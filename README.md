# Daily Sales Entry

Mobile-friendly form: pick a store, enter sales values, Submit → a new row appears in your Google Sheet (opens in Excel too).

## Connect the sheet (2 minutes)
1. Create a Google Sheet.
2. Extensions → Apps Script → paste the contents of `Code.gs` → Save.
3. Deploy → New deployment → type **Web app** → Execute as **Me**, Who has access **Anyone** → Deploy → copy the Web app URL.
4. In `index.html`, paste that URL into `SHEET_URL`, and edit the `STORES` list. Commit & push.
