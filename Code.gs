var FIELDS = ['VIP Sale', 'SKY Sale', 'ARI Sale', 'VIP Total Sale', 'VIP MTD Sale',
              'AT', 'KT', 'AT TOTAL SALE', 'AT MTD', 'SAFARI SALE', 'SAFARI MTD'];
var FIRST_VALUE_COL = 3;   // column C
var STAMP_COL = 14;        // column N

function doGet() {
  return HtmlService.createHtmlOutput(PAGE_)
    .setTitle('Daily Sales Report')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function sheet_() { return SpreadsheetApp.getActive().getSheets()[0]; }

function getStores() {
  var v = sheet_().getDataRange().getValues(), out = [];
  for (var i = 1; i < v.length; i++) {
    if (v[i][0] !== '' && v[i][1] !== '') out.push({ code: String(v[i][0]).trim(), name: String(v[i][1]).trim() });
  }
  return out;
}

function submitSale(code, values) {
  var sh = sheet_(), v = sh.getDataRange().getValues(), row = -1;
  for (var i = 1; i < v.length; i++) {
    if (String(v[i][0]).trim() === String(code).trim()) { row = i + 1; break; }
  }
  if (row < 0) throw new Error('Store not found');
  var vals = FIELDS.map(function (f) { return (values[f] === '' || values[f] == null) ? '' : Number(values[f]); });
  sh.getRange(row, FIRST_VALUE_COL, 1, FIELDS.length).setValues([vals]);
  sh.getRange(1, STAMP_COL).setValue('Last Updated');
  sh.getRange(row, STAMP_COL).setValue(new Date());
  return 'ok';
}

var PAGE_ = `<!doctype html>
<html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<base target="_top">
<style>
body{margin:0;background:#f4f5f7;color:#14171c;font:16px/1.4 Arial,sans-serif}
main{max-width:560px;margin:0 auto;padding:16px}
h1{font-size:20px;margin:8px 0 16px}
.card{background:#fff;border:1px solid #d9dde3;border-radius:10px;padding:14px;margin-bottom:14px}
.card h2{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#5d6673;margin:0 0 10px}
label{display:block;font-size:14px;margin:10px 0 4px}
input{width:100%;box-sizing:border-box;padding:12px;font-size:16px;border:1px solid #d9dde3;border-radius:8px}
.code{font-size:13px;color:#5d6673;margin-top:6px;min-height:18px}
button{width:100%;padding:14px;font-size:17px;font-weight:600;border:0;border-radius:10px;background:#1b4fd8;color:#fff;cursor:pointer}
button:disabled{opacity:.5}
#msg{margin-top:12px;font-weight:600;text-align:center}
.ok{color:#117a3d}.err{color:#b3261e}
</style></head><body><main>
<h1>Daily Sales Report</h1>
<form id="f" autocomplete="off">
<div class="card"><h2>Store</h2>
<label>Select store name</label>
<input id="store" list="stores" placeholder="Type or pick a store" required>
<datalist id="stores"></datalist>
<div class="code" id="code"></div></div>

<div class="card"><h2>VIP</h2>
<label>VIP Sale</label><input data-f="VIP Sale" type="number" step="any" min="0">
<label>SKY Sale</label><input data-f="SKY Sale" type="number" step="any" min="0">
<label>ARI Sale</label><input data-f="ARI Sale" type="number" step="any" min="0">
<label>VIP Total Sale</label><input data-f="VIP Total Sale" type="number" step="any" min="0">
<label>VIP MTD Sale</label><input data-f="VIP MTD Sale" type="number" step="any" min="0"></div>

<div class="card"><h2>AT / KT</h2>
<label>AT</label><input data-f="AT" type="number" step="any" min="0">
<label>KT</label><input data-f="KT" type="number" step="any" min="0">
<label>AT Total Sale</label><input data-f="AT TOTAL SALE" type="number" step="any" min="0">
<label>AT MTD</label><input data-f="AT MTD" type="number" step="any" min="0"></div>

<div class="card"><h2>Safari</h2>
<label>Safari Sale</label><input data-f="SAFARI SALE" type="number" step="any" min="0">
<label>Safari MTD</label><input data-f="SAFARI MTD" type="number" step="any" min="0"></div>

<button id="go" type="submit">Submit</button>
<div id="msg"></div>
</form>
<script>
var STORES = [];
function $(id){ return document.getElementById(id); }
function fill(){
  var h = '';
  for (var i = 0; i < STORES.length; i++) h += '<option value="' + STORES[i].name.replace(/"/g, '&quot;') + '">';
  $('stores').innerHTML = h;
}
google.script.run.withSuccessHandler(function(l){ STORES = l; fill(); }).getStores();
function find(){
  var n = $('store').value.trim().toLowerCase();
  for (var i = 0; i < STORES.length; i++) if (STORES[i].name.toLowerCase() === n) return STORES[i];
  return null;
}
$('store').addEventListener('input', function(){ var s = find(); $('code').textContent = s ? 'SAP code: ' + s.code : ''; });
$('f').addEventListener('submit', function(e){
  e.preventDefault();
  var m = $('msg'), s = find();
  if (!s) { m.className = 'err'; m.textContent = 'Please pick a store from the list.'; return; }
  var values = {};
  var ins = document.querySelectorAll('[data-f]');
  for (var i = 0; i < ins.length; i++) values[ins[i].getAttribute('data-f')] = ins[i].value;
  $('go').disabled = true; m.className = ''; m.textContent = 'Submitting...';
  google.script.run
    .withSuccessHandler(function(){ m.className = 'ok'; m.textContent = 'Submitted for ' + s.name; $('f').reset(); $('code').textContent = ''; $('go').disabled = false; })
    .withFailureHandler(function(err){ m.className = 'err'; m.textContent = 'Could not submit: ' + err.message; $('go').disabled = false; })
    .submitSale(s.code, values);
});
</script></main></body></html>`;
