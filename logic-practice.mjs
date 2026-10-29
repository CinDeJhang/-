export const logicGates=[
 {id:'AND',name:'AND（且閘）',inputs:['A','B'],expression:'Y = A · B',rule:'兩個輸入都是 1，輸出才會是 1。',target:1,hint:'AND 要亮燈，兩個輸入都要切到 1。'},
 {id:'OR',name:'OR（或閘）',inputs:['A','B'],expression:'Y = A + B',rule:'至少一個輸入是 1，輸出就是 1。這裡的 + 表示「或」，所以 1 + 1 的邏輯結果仍是 1。',target:0,hint:'OR 要熄燈，兩個輸入都要切到 0。'},
 {id:'NOT',name:'NOT（反閘）',inputs:['A'],expression:'Y = A̅',rule:'把輸入反過來：輸入 0，輸出 1；輸入 1，輸出 0。A 上面的橫線代表「反相」。',target:0,hint:'NOT 要熄燈，輸入要切到 1。'}
];
export function gateOutput(type,inputs){const gate=logicGates.find(g=>g.id===type);if(!gate||!Array.isArray(inputs)||inputs.length!==gate.inputs.length||inputs.some(v=>v!==0&&v!==1))throw Error('邏輯閘輸入必須是 0 或 1');if(type==='AND')return inputs[0]&inputs[1];if(type==='OR')return inputs[0]|inputs[1];return 1-inputs[0]}
export function truthRows(type){const gate=logicGates.find(g=>g.id===type);if(!gate)throw Error('未知邏輯閘');return Array.from({length:2**gate.inputs.length},(_,n)=>{const inputs=gate.inputs.map((_,i)=>(n>>(gate.inputs.length-i-1))&1);return {inputs,output:gateOutput(type,inputs)}})}
export function initialLogicInputs(){return {AND:[0,0],OR:[1,0],NOT:[0]}}
export function normalizeLogicInputs(value){const result=initialLogicInputs();for(const gate of logicGates){try{gateOutput(gate.id,value?.[gate.id]);result[gate.id]=[...value[gate.id]]}catch{}}return result}
export function checkLogicMission(inputs){try{const outputs=Object.fromEntries(logicGates.map(g=>[g.id,gateOutput(g.id,inputs?.[g.id])]));const wrong=logicGates.filter(g=>outputs[g.id]!==g.target);return {ok:wrong.length===0,outputs,message:wrong.length?wrong.map(g=>g.hint).join(' '):'任務完成！AND 亮燈、OR 熄燈、NOT 熄燈，三個邏輯閘都符合目標！'}}catch{return {ok:false,outputs:{},message:'請確認三個邏輯閘的開關都是 0 或 1。'}}}
