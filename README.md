# Daily Sales Report

`Code.gs` is the Google Apps Script bound to the sales Google Sheet. Deployed as a Web App (Execute as Me, access Anyone), it serves the form itself and writes each store's values into that store's row (matched by SAP code), with a "Last Updated" stamp.

`index.html` on GitHub Pages simply redirects to the Web App URL. `form-github-version.html` is an older standalone form (append-row version), unused.
