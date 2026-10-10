import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ORIGIN,TOOLS,TARGETS,shoot,seeded,scoreAt,stats,csv} from '../core.js';
const baseline=JSON.parse(readFileSync(new URL('./fixtures/physics-baseline.json',import.meta.url)));
assert.deepEqual(TOOLS.map(({id,range,speed,spread})=>({id,range,speed,spread})),baseline.tools);
assert.deepEqual(TARGETS,baseline.targets);
assert.deepEqual(ORIGIN,{x:95,y:565});
for(const {input,output} of baseline.shots){assert.deepEqual(shoot(TOOLS.find(t=>t.id===input.tool),TARGETS.find(t=>t.id===input.target),input.power,input.direction,seeded(input.seed)),output);}
const legacy=JSON.parse(readFileSync(new URL('./fixtures/stat-golf-v1.json',import.meta.url)));
for(const e of [legacy.current,...legacy.saved])for(const s of e.shots){assert.equal(scoreAt(s.x,s.y),s.score);assert.ok(TOOLS.some(t=>t.id===s.tool));}
assert.equal(stats(legacy.current.shots.map(s=>s.score)).n,4);
assert.ok(csv(legacy.current).includes('のんびりカメ大砲'));
console.log('PASS: all physics parameters, 12 seeded shots, target scoring, legacy tool IDs, legacy statistics and CSV');
