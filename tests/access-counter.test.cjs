const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../access-counter.js'),'utf8'),html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const reference=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/access-counter-reference.json'),'utf8'));
const oldURL=reference.url,expected=new URL(oldURL);expected.searchParams.set('app','stat-golf');
assert.equal((html.match(/src="access-counter.js"/g)||[]).length,1);
(async()=>{for(const outcome of ['success','reject','throw']){const calls=[];vm.runInNewContext(source,{fetch:(url,options)=>{calls.push({url,options:JSON.parse(JSON.stringify(options))});if(outcome==='throw')throw Error('sync failure');return outcome==='reject'?Promise.reject(Error('offline')):Promise.resolve({});}});await new Promise(resolve=>setImmediate(resolve));assert.equal(calls.length,1);assert.equal(calls[0].url,expected.href);assert.deepEqual(calls[0].options,{method:'GET',mode:'no-cors',cache:'no-store',credentials:'omit',keepalive:true});}
console.log('PASS: existing endpoint and app parameter, single script and request, GET/keepalive options, rejection/synchronous failure handling; no real GAS requests');})().catch(e=>{console.error(e);process.exit(1)});
