// Metres, approximately traced from the supplied plan. X right, Z down, Y up.
export const rooms=[
 {id:'kitchen',name:'厨房',icon:'♨',rect:[0,0,1.85,3],color:'#dedfc8',kind:'tile'},
 {id:'guestBath',name:'客卫',icon:'♧',rect:[1.85,0,1.65,1.85],color:'#cfddd7',kind:'tile'},
 {id:'northHall',name:'洗漱过道',icon:'◌',rect:[1.85,1.85,1.65,1.15],color:'#e7d3af',hidden:true},
 {id:'bed2',name:'次卧2',icon:'☾',rect:[3.5,0,2.95,3],color:'#e5d5bd'},
 {id:'living',name:'客厅',icon:'▱',rect:[2.25,3,5.72,3.7],color:'#eddbc0'},
 {id:'dining',name:'餐厅 · 玄关',icon:'♧',rect:[0,3,2.25,5.05],color:'#eddbc0'},
 {id:'hall',name:'卧室过道',icon:'◌',rect:[2.25,6.7,.75,1.35],color:'#eddbc0',hidden:true},
 {id:'masterHall',name:'套内过道',icon:'◌',rect:[3,6.7,1.15,5.65],color:'#e7d4b5',parent:'master',hidden:true},
 {id:'masterBath',name:'主卫',icon:'♧',rect:[4.15,6.7,2.3,1.68],color:'#cbd9d0',parent:'master'},
 {id:'master',name:'主卧',icon:'☾',rect:[4.15,8.38,2.3,3.97],color:'#e5d2b2'},
 {id:'bed1',name:'次卧1',icon:'☾',rect:[0,8.05,3,4.3],color:'#e3d1ba'},
 {id:'bay',name:'次卧1飘窗',icon:'☀',rect:[0,12.35,1.95,.8],color:'#d8ddc6',parent:'bed1',hidden:true},
 {id:'nook',name:'南侧休闲区',icon:'☀',rect:[3.5,12.35,2.95,1.47],color:'#dde0c6',parent:'master'}
];
// One physical wall per segment. Gaps are real door/window openings.
export const walls=[];
const W=(a,b,adj,open=[])=>walls.push({id:'wall'+walls.length,a,b,adj,open});
W([0,0],[6.45,0],['kitchen','guestBath','bed2'],[{from:.5,to:1.35,type:'window'},{from:2.25,to:3.25,type:'window'},{from:3.7,to:5.75,type:'window'}]);
W([0,0],[0,12.35],['kitchen','dining','bed1'],[{from:4.05,to:5.15,type:'door'}]);
W([1.85,0],[1.85,3],['kitchen','guestBath','northHall']);
W([3.5,0],[3.5,3],['guestBath','northHall','bed2'],[{from:1.94,to:2.86,type:'door'}]);
W([6.45,0],[6.45,3],['bed2']);
W([0,3],[1.85,3],['kitchen','dining'],[{from:.92,to:1.75,type:'door'}]);
W([1.85,1.85],[3.5,1.85],['guestBath','northHall'],[{from:.7,to:1.57,type:'door'}]);
W([3.5,3],[7.97,3],['bed2','living']);
W([7.97,3],[7.97,6.7],['living'],[{from:.4,to:3.3,type:'window'}]);
W([3,6.7],[7.97,6.7],['living','masterHall','masterBath'],[{from:.07,to:1.04,type:'door'}]);
W([6.45,6.7],[6.45,13.82],['masterBath','master','nook'],[{from:.55,to:1.22,type:'window'}]);
W([4.15,6.7],[4.15,8.38],['masterHall','masterBath'],[{from:.73,to:1.56,type:'door'}]);
W([4.15,8.38],[6.45,8.38],['masterBath','master']);
W([0,8.05],[3,8.05],['dining','hall','bed1'],[{from:1.95,to:2.83,type:'door'}]);
W([3,8.05],[3,12.35],['bed1','masterHall']);
W([0,12.35],[1.95,12.35],['bed1','bay'],[{from:.15,to:1.8,type:'window'}]);
W([0,12.35],[0,13.15],['bay']);W([0,13.15],[1.95,13.15],['bay'],[{from:.15,to:1.8,type:'window'}]);W([1.95,12.35],[1.95,13.15],['bay']);
W([1.95,12.35],[3.5,12.35],['bed1','masterHall']);
W([3.5,12.35],[3.5,13.82],['nook'],[{from:.25,to:1.1,type:'window'}]);
W([3.5,13.82],[6.45,13.82],['nook'],[{from:.22,to:2.15,type:'window'}]);
export const furniture=[];
const F=(id,room,type,x,z,w,d,extra={})=>furniture.push({id,room,type,x,z,w,d,...extra});
F('bed-north','bed2','bed',5.12,1.13,2.12,1.52,{head:'right',tone:'#bec9a6',label:'小床'});
F('wardrobe-north','bed2','wardrobe',5.32,2.61,1.75,.53,{label:'次卧2衣柜',interactive:'wardrobe'});
F('side-north','bed2','side',6.01,2.07,.48,.45,{label:'床头灯',interactive:'lamp'});
F('bed-west','bed1','bed',1.2,10.36,2.15,1.8,{head:'left',tone:'#d9b8a6',label:'次卧1的床'});
F('wardrobe-west','bed1','wardrobe',.95,8.43,1.65,.56,{label:'次卧1衣柜',interactive:'wardrobe'});
F('side-west','bed1','side',.45,9.15,.48,.48,{interactive:'lamp',label:'次卧1床头灯'});
F('desk-west','bed1','desk',.5,11.71,.73,.63,{interactive:'study',label:'书桌',approach:[1.45,11.68],seat:[.99,11.68]});
F('bay-cushion','bay','cushion',.97,12.76,1.62,.52,{label:'飘窗软垫',solid:false});
F('bed-master','master','bed',5.23,10.46,2.05,1.8,{head:'right',tone:'#e4c88e',label:'主卧的床'});
F('wardrobe-master','master','wardrobe',5.32,8.82,1.88,.6,{label:'主卧衣柜',interactive:'wardrobe'});
F('side-master','master','side',6.02,11.75,.5,.48,{interactive:'lamp',label:'主卧床头灯'});
F('side-master2','master','side',6.02,9.25,.47,.4,{label:'床头柜'});
F('nook-cabinet','nook','wardrobe',6.08,13.04,.5,1.1,{interactive:'wardrobe',label:'休闲区收纳柜'});
F('sofa','living','sofa',4.84,6.08,2.63,.83,{interactive:'sit',label:'沙发',approach:[4.85,5.36],seat:[4.85,5.91]});
F('coffee','living','coffee',5.59,5.1,.65,.65,{label:'圆茶几'});
F('tv','living','tv',4.84,3.22,2.48,.34,{interactive:'tv',label:'电视'});
F('plant-living','living','plant',7.47,6.13,.46,.46,{label:'绿植'});
F('dining-table','dining','table',1.03,6.04,1.22,.92,{interactive:'sit',label:'餐桌',approach:[1.85,5.34],seat:[1.37,5.34]});
F('shoe','dining','cabinet',.28,3.55,.43,.73,{label:'玄关鞋柜'});
F('sideboard','dining','cabinet',.87,7.58,1.53,.53,{label:'餐边柜'});
F('kitchen-counter','kitchen','counter',.39,1.88,.57,1.94,{label:'灶台'});
F('kitchen-sink','kitchen','sink',1.08,.35,1.13,.53,{label:'水槽'});
F('fridge','kitchen','fridge',.37,.43,.49,.56,{label:'冰箱'});
F('basin-hall','northHall','sink',2.08,2.38,.32,.72,{label:'干区洗手台'});
F('toilet-guest','guestBath','toilet',2.21,1.25,.47,.66,{label:'马桶'});
F('shower-guest','guestBath','shower',3.04,.49,.55,.62,{solid:false,label:'淋浴'});
F('basin-master','masterBath','sink',4.57,7.02,.55,.42,{label:'洗手台'});
F('toilet-master','masterBath','toilet',5.63,7.23,.47,.66,{label:'马桶'});
F('shower-master','masterBath','shower',6.01,7.94,.5,.53,{solid:false,label:'淋浴'});
export const doors=walls.flatMap(w=>w.open.filter(o=>o.type==='door').map(o=>({wall:w.id,...o})));
export function roomAt(x,z){return rooms.find(r=>{let[a,b,w,d]=r.rect;return x>=a&&x<=a+w&&z>=b&&z<=b+d})}
export function wallDistance(x,z,w){let dx=w.b[0]-w.a[0],dz=w.b[1]-w.a[1],len=Math.hypot(dx,dz),t=((x-w.a[0])*dx+(z-w.a[1])*dz)/len;return {t,len,d:Math.hypot(x-(w.a[0]+dx*Math.max(0,Math.min(len,t))/len),z-(w.a[1]+dz*Math.max(0,Math.min(len,t))/len))}}
export const extraObstacles=[{x:.99,z:11.68,w:.34,d:.34},...[-1,1].flatMap(z=>[-1,1].map(x=>({x:1.03+x*1.22*.28,z:6.04+z*.92*.76,w:.38,d:.36})))];
export function walkable(x,z,radius=.16){if(!roomAt(x,z))return false;for(const w of walls){let{d,t}=wallDistance(x,z,w);if(d<radius+.075&&!w.open.some(o=>o.type==='door'&&t>o.from+radius&&t<o.to-radius))return false}for(const f of [...furniture,...extraObstacles]){if(f.solid===false)continue;if(Math.abs(x-f.x)<f.w/2+radius&&Math.abs(z-f.z)<f.d/2+radius)return false}return true}
export const STEP=.14;
const key=(x,z)=>`${x},${z}`;
export function pathfind(from,to){if(!walkable(...to))return [];let sx=Math.round(from[0]/STEP),sz=Math.round(from[1]/STEP),tx=Math.round(to[0]/STEP),tz=Math.round(to[1]/STEP);const start=key(sx,sz),goal=key(tx,tz);const open=[{x:sx,z:sz,g:0,f:0}],cost=new Map([[start,0]]),parent=new Map();let n=0;while(open.length&&n++<18000){open.sort((a,b)=>b.f-a.f);const c=open.pop(),ck=key(c.x,c.z);if(ck===goal){let k=ck,p=[];while(k!==start){p.push(k.split(',').map(Number).map(v=>v*STEP));k=parent.get(k);if(!k)return []}return p.reverse()}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){let x=c.x+dx,z=c.z+dz,nk=key(x,z),g=c.g+1;if(g>=(cost.get(nk)??Infinity)||!walkable(x*STEP,z*STEP))continue;cost.set(nk,g);parent.set(nk,ck);open.push({x,z,g,f:g+Math.abs(x-tx)+Math.abs(z-tz)})}}return []}
export function planSVG(){const scale=48,ox=45,oz=40;const rect=(x,z,w,d,fill,stroke='',radius=0)=>`<rect x="${ox+x*scale}" y="${oz+z*scale}" width="${w*scale}" height="${d*scale}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 755"><rect width="480" height="755" fill="#faf9f3"/><style>text{font-family:Microsoft YaHei,sans-serif;fill:#4c5e45}</style><text x="432" y="30" font-size="13">北 ↑</text>`;for(const r of rooms){let[x,z,w,d]=r.rect;s+=rect(x,z,w,d,r.color)}for(const f of furniture){s+=rect(f.x-f.w/2,f.z-f.d/2,f.w,f.d,f.type==='bed'?f.tone:'#baad91','#998e77',3);s+=`<text x="${ox+f.x*scale}" y="${oz+f.z*scale+3}" font-size="7" text-anchor="middle">${({bed:'床',wardrobe:'衣柜',sofa:'沙发',tv:'电视',table:'餐桌',counter:'灶台',sink:'水槽',toilet:'马桶',desk:'书桌'})[f.type]||''}</text>`}for(const w of walls){let len=Math.hypot(w.b[0]-w.a[0],w.b[1]-w.a[1]),dx=(w.b[0]-w.a[0])/len,dz=(w.b[1]-w.a[1])/len;const line=(a,b,color,width)=>`<line x1="${ox+(w.a[0]+dx*a)*scale}" y1="${oz+(w.a[1]+dz*a)*scale}" x2="${ox+(w.a[0]+dx*b)*scale}" y2="${oz+(w.a[1]+dz*b)*scale}" stroke="${color}" stroke-width="${width}"/>`;let prev=0;for(const o of w.open){s+=line(prev,o.from,'#69735b',5);s+=line(o.from,o.to,o.type==='window'?'#89b6bb':'#d6b685',o.type==='window'?3:1);prev=o.to}s+=line(prev,len,'#69735b',5)}for(const r of rooms.filter(r=>!r.hidden)){let[x,z,w,d]=r.rect;s+=`<text x="${ox+(x+w/2)*scale}" y="${oz+(z+d*.6)*scale}" text-anchor="middle" font-size="11" font-weight="bold" paint-order="stroke" stroke="#faf9f3" stroke-width="3">${r.name}</text>`}s+='<text x="45" y="730" font-size="10">蓝线：窗 · 浅棕线：门洞 · 材质与窗型待实拍校准</text></svg>';return s}
