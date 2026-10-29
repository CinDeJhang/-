export const LED_PROGRAM = 'void setup() {\n    pinMode(10, OUTPUT);\n}\n\nvoid loop() {\n    digitalWrite(10, HIGH);\n}';
export function checkLedWiring(wiring) {
 if(wiring.anode!=='10')return {ok:false,message:'LED 長腳（＋）要經過 220Ω 電阻接到 D10（PIN 10），請再檢查一次。'};
 if(wiring.cathode!=='GND')return {ok:false,message:'LED 短腳（－）要接到 GND，電流才有完整的回路。'};
 return {ok:true,message:'接線正確：D10 → 220Ω 電阻 → LED 長腳，LED 短腳 → GND。'};
}
// This teaching simulator recognizes the lesson's Arduino sketch, not arbitrary C++.
export function checkArduinoProgram(source) {
 const fail=message=>({ok:false,message});
 if(source.length>12000)return fail('先練習本課的短程式，請將內容縮短至 12,000 字以內。');
 const pattern=/\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[A-Za-z_][A-Za-z_0-9]*|[0-9]+|[(){},;=]/y;
 const tokens=[];let pos=0;
 while(pos<source.length){pattern.lastIndex=pos;const m=pattern.exec(source);if(!m)return fail('請檢查半形括號、大括號、分號與註解。本課只支援範例使用的 Arduino 語法。');pos=pattern.lastIndex;if(!/^\s|^\/\//.test(m[0])&&!m[0].startsWith('/*'))tokens.push(m[0])}
 let p=0;const values=new Map();const take=value=>tokens[p]===value?(p++,true):false;
 while(tokens[p]==='const'||tokens[p]==='int'){
  take('const');if(!take('int'))return fail('腳位變數請使用 const int ledPin = 10;。');
  const name=tokens[p++];if(!/^[A-Za-z_][A-Za-z_0-9]*$/.test(name)||['void','setup','loop','HIGH','LOW','OUTPUT','INPUT','pinMode','digitalWrite','int','const'].includes(name)||values.has(name))return fail('請替腳位變數取一個不重複的名字，例如 ledPin。');
  if(!take('='))return fail('腳位變數需要用 = 指定數字，例如 const int ledPin = 10;。');
  const value=tokens[p++];if(!/^\d+$/.test(value)||!take(';'))return fail('腳位變數請寫成 const int ledPin = 10;，最後加上分號。');values.set(name,Number(value));
 }
 const functions={};
 while(p<tokens.length){
  if(!take('void'))return fail('Arduino 程式需要 void setup() 與 void loop() 兩個區塊。');
  const name=tokens[p++];if(!['setup','loop'].includes(name)||functions[name])return fail('請各寫一個 setup() 與 loop()，不要重複。');
  if(!take('(')||!take(')')||!take('{'))return fail(`${name} 的開頭請寫成 void ${name}() {，使用半形括號。`);
  const commands=[];
  while(tokens[p]!=='}'){
   if(p>=tokens.length)return fail(`${name} 少了結尾的大括號 }。`);
   const op=tokens[p++];if(!['pinMode','digitalWrite'].includes(op))return fail('本課先使用 pinMode 與 digitalWrite，照著參考程式練習即可。');
   if(!take('('))return fail(`${op} 後面需要左括號 (。`);
   const pinToken=tokens[p++],pin=/^\d+$/.test(pinToken)?Number(pinToken):values.get(pinToken);
   if(pin===undefined)return fail('腳位請填 10，或先宣告數值為 10 的腳位變數。');
   if(!take(','))return fail(`${op} 的兩個參數之間要加半形逗號。`);
   const mode=tokens[p++];if(!take(')')||!take(';'))return fail(`${op} 結尾需要右括號與分號：);`);
   if(op==='pinMode'&&!['INPUT','OUTPUT'].includes(mode)||op==='digitalWrite'&&!['HIGH','LOW'].includes(mode))return fail('留意大小寫：輸出模式用 OUTPUT，點亮用 HIGH。');
   commands.push({op,pin,mode});
  }
  p++;functions[name]=commands;
 }
 if(!functions.setup||!functions.loop)return fail('程式需要 setup()（開始時做一次）與 loop()（持續重複）兩個區塊。');
 if(!functions.setup.some(c=>c.op==='pinMode'&&c.pin===10&&c.mode==='OUTPUT'))return fail('在 setup() 加入 pinMode(10, OUTPUT);，先讓 PIN 10 成為輸出腳位。');
 let isOutput=false,level='LOW',wroteHigh=false;
 for(const c of [...functions.setup,...functions.loop]){
  if(c.pin!==10)return fail('任務使用 PIN 10，pinMode 與 digitalWrite 的腳位都要填 10。');
  if(c.op==='pinMode')isOutput=c.mode==='OUTPUT';
  else {if(!isOutput)return fail('要先執行 pinMode(10, OUTPUT);，再用 digitalWrite 控制燈。');level=c.mode;if(c.mode==='HIGH')wroteHigh=true}
 }
 if(!wroteHigh||level!=='HIGH'||!isOutput)return fail('用 digitalWrite(10, HIGH); 讓 PIN 10 輸出高電位，LED 才會持續亮著。');
 return {ok:true,message:'程式正確：PIN 10 已設為 OUTPUT，並輸出 HIGH。'};
}
export function checkLedMission(source,wiring){const code=checkArduinoProgram(source),circuit=checkLedWiring(wiring);return {ok:code.ok&&circuit.ok,code,circuit,message:!code.ok?code.message:!circuit.ok?circuit.message:'任務完成！你用 Arduino PIN 10 成功點亮 LED！'}}
