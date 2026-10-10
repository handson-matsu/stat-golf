import assert from 'node:assert/strict';
import {stats,histogram,scoreAt,shoot,seeded,TOOLS,TARGETS,idealPower,detailedCsv} from '../core.js';
assert.deepEqual(stats([]),{n:0,total:0,mean:null,median:null,variance:null,sd:null,min:null,max:null,zeroRate:null});
const s=stats([0,20,40,60]);assert.equal(s.total,120);assert.equal(s.mean,30);assert.equal(s.median,30);assert.equal(s.variance,500);assert.equal(s.sd,Math.sqrt(500));assert.equal(s.zeroRate,.25);assert.equal(s.min,0);assert.equal(s.max,60);assert.equal(stats([5,1,9]).median,5);assert.equal(stats([42]).variance,0);assert.equal(stats([0]).zeroRate,1);
for(const t of TARGETS){t.radii.forEach((r,i)=>assert.equal(scoreAt(t.x+r,t.y),t.points[i]));assert.equal(scoreAt(t.x,t.y),t.points[0]);}assert.equal(scoreAt(-1,20),0);assert.equal(scoreAt(1101,20),0);assert.equal(scoreAt(100,100),5);assert.equal(scoreAt(10,10),2);
assert.deepEqual(histogram([0,19,20,149,150],20).map(b=>b.count),[2,1,0,0,0,0,0,2]);assert.equal(histogram([150],25).at(-1).count,1);assert.throws(()=>histogram([],0));
for(const tool of TOOLS)for(const t of TARGETS){const p=idealPower(tool,t);assert.ok(p>0&&p<1);const shot=shoot(tool,t,p,0,seeded(42));assert.ok(Number.isFinite(shot.x));assert.equal(shot.score,scoreAt(shot.x,shot.y));assert.deepEqual(shot,shoot(tool,t,p,0,seeded(42)));}
const output=detailedCsv({name:'a,"b',mode:'experiment',shots:[{tool:'steady',target:'near',x:1,y:2,score:5,power:.5,direction:0,idealPower:.3,time:'today'}]});assert.ok(output.startsWith('\uFEFF'));assert.ok(output.includes('"a,""b"'));assert.equal(output.split('\r\n').length,2);
console.log('PASS: statistics, empty/singleton samples, all ring boundaries, background scoring, histogram boundaries, deterministic shots, CSV escaping');
