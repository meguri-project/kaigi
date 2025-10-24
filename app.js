// ユーティリティ
}


function scheduleChecks(){
setInterval(()=>{
const now = Date.now();
for(const e of events){
if(!e.firedPre && now >= e.time - 60_000 && now < e.time - 59_000){
notify('会議1分前', e.title);
beep();
e.firedPre = true;
}
if(!e.fired && now >= e.time && now < e.time + 10_000){
notify('会議開始', e.title);
beep();
e.fired = true;
}
}
}, 5000);
}


window.addEventListener('load', ()=>{
// デフォルト日付
const dateEl = $('#date');
if(dateEl) dateEl.value = todayStr();
refreshEnv();


// 追加
$('#add')?.addEventListener('click', ()=>{
const d = $('#date')?.value;
const t = $('#time')?.value;
const title = ($('#title')?.value || '会議').trim();
if(!d || !t){ alert('日付と時間を入力してください'); return; }
const dt = new Date(`${d}T${t}`);
events.push({ time: dt.getTime(), title, firedPre:false, fired:false });
render();
});


// 通知許可
$('#perm')?.addEventListener('click', async ()=>{
const ok = await ensurePermission();
alert(ok ? '通知許可OK' : '通知許可が得られませんでした');
refreshEnv();
});


// テスト
$('#test')?.addEventListener('click', async ()=>{
if(await ensurePermission()){
notify('テスト通知', 'これはテストです');
beep();
refreshEnv();
}else{
alert('通知許可が必要です');
}
});


// 監視開始
scheduleChecks();
});
