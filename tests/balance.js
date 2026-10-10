import assert from 'node:assert/strict';
import {TOOLS,TARGETS,shoot,idealPower,seeded,gaussian,stats} from '../core.js';
const results=[];for(const error of [0,.025,.06]){for(const tool of TOOLS)for(const target of TARGETS){const rng=seeded(20261010),values=[];for(let i=0;i<20000;i++){const power=Math.max(0,Math.min(1,idealPower(tool,target)+gaussian(rng)*error*tool.speed)),direction=Math.max(-1,Math.min(1,gaussian(rng)*error*tool.speed*2));values.push(shoot(tool,target,power,direction,rng).score);}const s=stats(values);results.push({error,tool:tool.name,target:target.name,mean:+s.mean.toFixed(2),sd:+s.sd.toFixed(2),zeroRate:+(s.zeroRate*100).toFixed(2)});}}
console.table(results);console.log(JSON.stringify(results));

const winners=[0,.025,.06].map(error=>results.filter(r=>r.error===error).sort((a,b)=>b.mean-a.mean)[0].tool);assert.equal(new Set(winners).size,3);assert.ok(results.every(r=>r.zeroRate<5));console.log("PASS: winners vary across operation-error scenarios; all modeled zero rates <5%");
