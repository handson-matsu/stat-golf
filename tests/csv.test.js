import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TOOLS,TARGETS,csv,detailedCsv,hitTarget} from '../core.js';
import {parseCsv} from './csv-helpers.cjs';
const headers=['発射番号','大砲','狙った的','当たった的','得点','速度','日時'];
const shots=[{tool:'steady',target:'far',x:330,y:420,score:60,speedMultiplier:.5,time:'2026-10-10T12:34:56.000Z',power:.3,direction:-.2,idealPower:.88},{tool:'balanced',target:'near',x:600,y:300,score:100,speedMultiplier:.7,time:'2026-10-10T12:35:00.000Z',power:.5,direction:.2,idealPower:.25},{tool:'precise',target:'mid',x:890,y:170,score:150,speedMultiplier:1,time:'2026-10-10T12:35:05.000Z',power:.8,direction:0,idealPower:.5},{tool:'power',target:'far',x:100,y:100,score:5,time:'2026-10-10T12:35:10.000Z',power:.1,direction:0,idealPower:.6}];
const experiment={name:'実験,"A"\n大作戦',mode:'experiment',shots},before=JSON.stringify(experiment),text=csv(experiment),rows=parseCsv(text);
assert.deepEqual(rows,[headers,['1',TOOLS[0].name,'遠距離','近距離','60','ゆっくり',shots[0].time],['2',TOOLS[1].name,'近距離','中距離','100','ふつう',shots[1].time],['3',TOOLS[2].name,'中距離','遠距離','150','はやい',shots[2].time],['4',TOOLS[3].name,'遠距離','的外','5','はやい',shots[3].time]]);
assert.ok(rows.every(r=>r.length===7));assert.ok(!text.includes(experiment.name));assert.ok(text.startsWith('\uFEFF'));assert.ok(text.includes('\r\n'));
for(const t of TARGETS){assert.equal(hitTarget({x:t.x+t.radii[2],y:t.y}),t.name);assert.equal(hitTarget({x:t.x+t.radii[2]+.001,y:t.y}),'的外');}
for(const shot of [{x:-1,y:0},{x:1101,y:300},{x:10,y:10},{x:100,y:100}])assert.equal(hitTarget(shot),'的外');
const detailed=parseCsv(detailedCsv(experiment));assert.equal(detailed[0].length,13);assert.deepEqual(detailed[1],[experiment.name,'experiment','1',shots[0].time,TOOLS[0].name,'遠距離','330','420','60','0.3','-0.2','0.88','0.5']);assert.equal(JSON.stringify(experiment),before);
const legacy=JSON.parse(readFileSync(new URL('./fixtures/stat-golf-v1.json',import.meta.url))),original=JSON.stringify(legacy);for(const e of [legacy.current,...legacy.saved]){const out=parseCsv(csv(e));assert.deepEqual(out[0],headers);out.slice(1).forEach((r,i)=>{assert.equal(r[0],String(i+1));assert.equal(r[4],String(e.shots[i].score));assert.equal(r[5],'はやい');assert.equal(r[6],e.shots[i].time);});}assert.equal(JSON.stringify(legacy),original);
assert.deepEqual(parseCsv(csv({shots:[]})),[headers]);
console.log('PASS: exact 7 columns and every field, actual vs aimed targets, misses/boundaries, 3 speed labels and legacy 100%, 13-column details, BOM/CRLF/escaping, empty data, no record mutation');
