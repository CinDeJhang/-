export const floors = [
 {number:1,rooms:[{id:'office',name:'辦公室',code:'1F',width:2/3},{id:'team',name:'選手室',code:'1F',width:1/3}]},
 {number:2,rooms:[{id:'A202',name:'應用軟體實習工場',code:'A202',width:.5},{id:'A201',name:'微電腦實習工場',code:'A201',width:.5}]},
 {number:3,rooms:[{id:'A302',name:'電腦網路實習工場',code:'A302',width:.5},{id:'A301',name:'週邊電路實習工場',code:'A301',width:.5}]},
 {number:4,rooms:[{id:'A402',name:'基電實驗工場',code:'A402',width:.5},{id:'A401',name:'電子實習工場',code:'A401',width:.5}]}
];
export function validName(name){return /^[\p{Script=Han}]{3,4}$/u.test(name)}
export function roomPosition(floor,index){const rooms=floors[floor-1].rooms;return 135+730*(rooms.slice(0,index).reduce((s,r)=>s+r.width,0)+rooms[index].width/2)}
export function floorY(floor){return 566-(floor-1)*119}
export function avatar(gender='boy',npc=false){const shirt=npc?'#d8c49b':gender==='girl'?'#f7e5c0':'#f4f1df';return `<ellipse cx="50" cy="103" rx="19" ry="4" fill="#193d3426"/>${gender==='girl'&&!npc?'<path d="M29 43Q22 9 50 10Q80 10 73 60L29 60Z" fill="#3b3930"/>':''}<path d="M37 79L36 99H46L49 82L53 99H63L61 78" fill="${npc?'#626d5a':'#384f55'}"/><path d="M30 51Q50 42 70 51L72 79H28Z" fill="${shirt}"/><path d="M30 54L23 75M70 54L77 75" stroke="#e6b48d" stroke-width="8" stroke-linecap="round"/><path d="M42 48L50 59L58 48" fill="${npc?'#b8a782':'#6c8f79'}"/><rect x="45" y="52" width="10" height="5" fill="#6c8f79"/><rect x="32" y="16" width="36" height="35" rx="15" fill="#edbf95"/><path d="M31 31V22Q32 6 52 10Q72 9 70 30L57 22L47 28L37 26L34 35Z" fill="${npc?'#77776a':'#363b32'}"/><circle cx="42" cy="34" r="2" fill="#3c3c33"/><circle cx="58" cy="34" r="2" fill="#3c3c33"/><path d="M46 43Q50 46 54 43" fill="none" stroke="#a76c54" stroke-width="1.5"/>${npc?'<path d="M34 31H47V39H35ZM53 31H66V39H54ZM47 34H53" fill="none" stroke="#535d51" stroke-width="2"/>':''}${gender==='girl'&&!npc?'<path d="M66 19L73 22L69 28L63 25Z" fill="#bd724e"/>':''}`}

export const directorLines = [
 '同學，今天開機成功了嗎？記得把快樂模式設成自動啟動！',
 '看到主任不用緊張，我不是防火牆，是來幫你加速的！',
 '今天 CPU 有沒有全速運轉？記得努力學習，也要適時散熱喔！',
 '遇到困難別擔心，人生有 Bug 很正常，會 Debug 才是真高手！',
 '同學，今天有更新自己的版本嗎？每天進步 1%，遲早變成旗艦版！',
 '今天 Wi-Fi 訊號滿格嗎？記得多跟同學交流，讓友誼永遠保持連線！',
 '人生就像寫程式，不怕執行失敗，只怕你不敢按下 Run！',
 '考試成績只是暫存資料，真正的實力要靠每天累積，記得持續升級！',
 '同學，今天電量剩幾趴？累了記得充電，滿血復活再繼續挑戰！',
 '資訊科的未來工程師，加油！你的潛力就像雲端空間，只要願意學習，就能不斷擴充！'
];
export function directorGreeting(random = Math.random) { return directorLines[Math.floor(random() * directorLines.length)] }

export function visibleFloors(mode,floor,direction=1){if(mode!=='partial')return [1,2,3,4];const first=Math.min(3,Math.max(1,(Number.isInteger(floor)?floor:1)+(direction<0?-1:0)));return [first,first+1]}
export function mapViewBox(mode,floor,direction=1){const shown=visibleFloors(mode,floor,direction);return mode==='partial'?`95 ${floorY(shown[1])-105} 900 244`:'0 0 1100 690'}
