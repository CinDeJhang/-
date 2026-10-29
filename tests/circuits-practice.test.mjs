import test from 'node:test';
import assert from 'node:assert/strict';
import {fixedCircuits,normalizeCircuitAnswers,checkCircuitsMission,breadboardCircuit} from '../circuits-practice.mjs';
test('only correct classification of both fixed circuits passes',()=>{assert.deepEqual(fixedCircuits,[{id:'A',type:'series'},{id:'B',type:'parallel'}]);for(const A of ['series','parallel'])for(const B of ['series','parallel'])assert.equal(checkCircuitsMission({A,B}).ok,A==='series'&&B==='parallel');assert.match(checkCircuitsMission({A:'series',B:'parallel'}).message,/任務完成/)});
test('unanswered, partial and invalid answers never complete the task',()=>{for(const answers of [undefined,{}, {A:'series'}, {B:'parallel'}, {A:'series',B:'bad'},{A:true,B:'parallel'}])assert.equal(checkCircuitsMission(answers).ok,false);assert.deepEqual(checkCircuitsMission({A:'series',B:'series'}).correct,{A:true,B:false});assert.deepEqual(normalizeCircuitAnswers({A:'series',B:7}),{A:'series',B:null})});
test('circuit renderer rejects unsupported circuits',()=>{assert.throws(()=>breadboardCircuit('unknown'))});
