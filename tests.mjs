import assert from 'node:assert/strict';
import {rooms,walls,furniture,extraObstacles,walkable,pathfind,roomAt,STEP,planSVG} from './src/layout.js';
import {writeFileSync,mkdirSync} from 'node:fs';
let checks=0;
function check(v,message){assert.ok(v,message);checks++}
for(let i=0;i<rooms.length;i++)for(let j=i+1;j<rooms.length;j++){let[a,b,w,d]=rooms[i].rect,[x,z,ww,dd]=rooms[j].rect;check(Math.min(a+w,x+ww)-Math.max(a,x)<.001||Math.min(b+d,z+dd)-Math.max(b,z)<.001,`floor overlap ${rooms[i].id}/${rooms[j].id}`)}
for(const f of furniture){let[x,z,w,d]=rooms.find(r=>r.id===f.room).rect;check(f.x-f.w/2>=x-.03&&f.x+f.w/2<=x+w+.03&&f.z-f.d/2>=z-.03&&f.z+f.d/2<=z+d+.03,`furniture bounds: ${f.id}`)}
for(let i=0;i<walls.length;i++)for(let j=i+1;j<walls.length;j++){const a=walls[i],b=walls[j];for(const axis of [0,1]){const other=1-axis;if(a.a[axis]===a.b[axis]&&b.a[axis]===b.b[axis]&&a.a[axis]===b.a[axis])check(Math.min(a.b[other],b.b[other])-Math.max(a.a[other],b.a[other])<.001,`duplicate wall ${i}/${j}`)}}
check(!walkable(-.2,5),'outside');check(!walkable(3.5,1.1),'solid wall');check(!walkable(7.97,4.8),'window not passage');check(!walkable(5.23,10.46),'bed collision');
const reached=[];
for(const r of rooms.filter(r=>r.id!=='bay')){let[x,z,w,d]=r.rect,route=[];for(let xx=x+.28;xx<x+w-.16&&!route.length;xx+=STEP)for(let zz=z+.28;zz<z+d-.16&&!route.length;zz+=STEP)if(walkable(xx,zz))route=pathfind([2.7,5.1],[xx,zz]);check(route.length,`unreachable room ${r.id}`);for(const p of route)check(walkable(...p),`path collision ${r.id}`);reached.push(r.id)}
for(const f of furniture.filter(f=>f.approach)){const route=pathfind([2.7,5.1],f.approach);check(route.length,`unreachable activity ${f.id}`);let prev=[2.7,5.1];for(const p of route){for(let t=0;t<=1;t+=.1)check(walkable(prev[0]*(1-t)+p[0]*t,prev[1]*(1-t)+p[1]*t),`segment collision ${f.id}`);prev=p}}
// Reproducible static route stress: different room pairs and dense segment samples.
let routes=0;for(const seed of [7,42,2026]){let n=seed;const rand=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296};let from=[2.7,5.1];for(let i=0;i<60;i++){const to=[.2+rand()*7.5,.2+rand()*13.2];if(!walkable(...to))continue;const p=pathfind(from,to);if(p.length){for(let k=1;k<p.length;k++){check(walkable((p[k-1][0]+p[k][0])/2,(p[k-1][1]+p[k][1])/2),'random path midpoint collision')}from=p.at(-1);routes++}}}
mkdirSync('public',{recursive:true});writeFileSync('public/floor-plan.svg',planSVG());
console.log(JSON.stringify({checks,reached,randomStaticRoutes:routes,activities:furniture.filter(f=>f.approach).map(f=>f.id),exported:'public/floor-plan.svg'},null,2));
