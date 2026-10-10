import assert from 'node:assert/strict';
import {DEFAULT_SPEED,SPEEDS,meterPosition,speedLabel} from '../speed.js';
import {TOOLS,detailedCsv} from '../core.js';
assert.equal(DEFAULT_SPEED,.7);assert.deepEqual(SPEEDS.map(s=>s.value),[.5,.7,1]);
for(const cannon of TOOLS)for(const multiplier of [.5,.7,1])for(const time of [0,100,400,900,2400]){const old=(1-Math.cos(time/1000*cannon.speed*Math.PI*1.4))/2;assert.ok(Math.abs(meterPosition(time/multiplier,cannon.speed,multiplier)-old)<1e-12);}
assert.equal(speedLabel({}),'はやい（100%・旧記録）');assert.equal(speedLabel({speedMultiplier:.7}),'ふつう（70%）');
for(const multiplier of [undefined,.5,.7,1]){const output=detailedCsv({name:'速度テスト',mode:'experiment',shots:[{tool:'steady',target:'near',score:20,speedMultiplier:multiplier}]});assert.ok(output.split('\r\n')[1].endsWith('"'+(multiplier??1)+'",""'));}
console.log('PASS: default 70%, all 3 multipliers x 4 cannons preserve timing ratios, legacy labels, speed CSV');
