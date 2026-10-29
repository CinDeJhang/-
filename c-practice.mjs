export const HELLO_PROGRAM = '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}';

// A deliberately small C teaching simulator: tokenize and recognize only this
// lesson's grammar. Never evaluate learner input as JavaScript or shell code.
function tokenize(source) {
 const tokens=[];
 const pattern=/\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\[nrt"\\])*"|[A-Za-z_][A-Za-z_0-9]*|[0-9]+|[#<>().{},;]/y;
 let pos=0;
 while(pos<source.length){pattern.lastIndex=pos;const m=pattern.exec(source);if(!m)return {error:`第 ${source.slice(0,pos).split('\n').length} 行有無法辨識的內容。請檢查半形符號、雙引號，以及註解是否關閉。`};pos=pattern.lastIndex;if(!/^\s|^\/\//.test(m[0])&&!m[0].startsWith('/*'))tokens.push(m[0])}
 return {tokens};
}
export function checkProgram(source){
 if(source.length>12000)return {ok:false,steps:[false,false,false],message:'這次先練習短短的 Hello, World!，請將程式縮短至 12,000 字以內。'};
 const result=tokenize(source);
 if(result.error)return {ok:false,steps:[false,false,false],message:result.error};
 const t=result.tokens;let p=0;
 const take=expected=>{if(t[p]===expected){p++;return true}return false};
 const failure=(message,steps)=>({ok:false,message,steps});
 if(!['#','include','<','stdio','.','h','>'].every(take))return failure('先加入 #include <stdio.h>，借用標準輸入輸出工具，才能使用 printf。',[false,false,false]);
 if(!['int','main','('].every(take))return failure('接著寫 int main(void) {，告訴電腦程式要從 main 開始。',[true,false,false]);
 take('void');
 if(![')','{'].every(take))return failure('main 的括號要成對：int main(void) {。最後還要用 } 收尾。',[true,false,false]);
 if(!take('printf')||!take('('))return failure('在 main 的大括號內，用 printf("Hello, World!\\n"); 輸出第一句話。',[true,true,false]);
 const literal=t[p++];
 if(!literal?.startsWith('"'))return failure('printf 的文字要放在半形雙引號裡，例如 "Hello, World!\\n"。',[true,true,false]);
 let output;try{output=JSON.parse(literal)}catch{return failure('請使用本課支援的字串與跳脫字元，例如 \\n 表示換行。',[true,true,false])}
 if(!take(')')||!take(';'))return failure('printf 這行最後需要右括號和半形分號：);',[true,true,false]);
 if(!['return','0',';'].every(take))return failure('在 printf 後面加入 return 0;，表示程式正常結束。',[true,true,false]);
 if(!take('}'))return failure('別忘了最後的 }，把 main 的程式區塊關起來。',[true,true,false]);
 if(p!==t.length)return failure('這個課堂模擬器只支援本課的一次 printf 與 return 0。請先移除範例以外的指令。',[true,true,false]);
 if(!['Hello, World!','Hello, World!\n'].includes(output))return {...failure('程式已能輸出文字！這次任務請精確印出 Hello, World!，留意大寫 H、W、逗號後的空格與驚嘆號。',[true,true,false]),output};
 return {ok:true,steps:[true,true,true],output,message:'任務完成！你成功輸出了 Hello, World!，完成第一支 C 語言程式。'};
}
