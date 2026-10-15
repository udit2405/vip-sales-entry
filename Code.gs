// Google Apps Script — paste into Extensions > Apps Script of your Google Sheet.
const HEADERS = ["Timestamp", "Store", "VIP Sale", "SKY Sale", "ARI Sale", "VIP Total Sale", "VIP MTD Sale",
                 "AT", "KT", "AT Total Sale", "AT MTD", "Safari Sale", "Safari MTD"];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow(HEADERS.map(h => d[h] === undefined ? "" : d[h]));
  return ContentService.createTextOutput("ok");
}
