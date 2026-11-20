(function(){
  function bars(id, rows){
    var el=document.getElementById(id); if(!el) return;
    var max=Math.max.apply(null,rows.map(function(r){return r[1]}));
    el.innerHTML=rows.map(function(r){
      return '<div class="bar"><span class="lab">'+r[0]+'</span><div class="track"><div class="fill" style="width:'+(r[1]/max*100).toFixed(1)+'%"></div></div><span class="val">'+r[1].toLocaleString()+'</span></div>';
    }).join('');
  }
  bars('prbars',[['6 月',809],['7 月',1784],['8 月',4203],['9 月',5648],['10 月',10926]]);
  bars('lintbars',[['起點',7],['',17],['',38],['',90],['',139],['',149],['',157],['11/1',167]]);

  var ptext=document.getElementById('ptext'); if(!ptext) return;
  var KEY='acis-checklist-v1', state={};
  try{ state=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ state={}; }
  var boxes=[].slice.call(document.querySelectorAll('.check input[type=checkbox]'));
  function update(){
    var done=boxes.filter(function(b){return b.checked}).length;
    ptext.textContent=done+' / '+boxes.length;
    document.getElementById('pfill').style.width=(boxes.length?done/boxes.length*100:0)+'%';
  }
  boxes.forEach(function(b){
    if(state[b.id]) b.checked=true;
    b.addEventListener('change',function(){
      state[b.id]=b.checked;
      try{ localStorage.setItem(KEY,JSON.stringify(state)); }catch(e){}
      update();
    });
  });
  update();
})();
