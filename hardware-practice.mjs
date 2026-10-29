export const hardwareParts=[
 {id:'cpu',name:'CPU',fullName:'CPU（中央處理器）',role:'執行程式指令，負責運算與控制，像電腦的大腦。',slot:'cpu_socket',hint:'找主機板上方中央的方形 CPU 插座，對齊三角形定位記號。'},
 {id:'ram',name:'記憶體',fullName:'RAM（記憶體）',role:'暫時放置正在使用的程式與資料，關機後內容就會消失。',slot:'dimm',hint:'找 CPU 右邊又長又窄的 DIMM 插槽，對齊記憶體金手指的缺口。'},
 {id:'gpu',name:'顯示卡',fullName:'GPU（顯示卡）',role:'處理影像與圖形運算，把畫面送到螢幕。',slot:'pcie_x16',hint:'找主機板下方最長的 PCIe x16 擴充插槽，顯示卡就裝在這裡。'},
 {id:'ssd',name:'SSD 硬碟',fullName:'M.2 NVMe SSD（固態硬碟）',role:'長期儲存作業系統、程式和檔案，關機後資料仍保留。',slot:'m2',hint:'本關使用細長的 M.2 NVMe SSD。找 CPU 下方的 M.2 插槽，裝入後以螺絲固定。'}
];
export const hardwareSlots=[
 {id:'cpu_socket',label:'A · CPU 插座',accepts:'cpu'},
 {id:'dimm',label:'B · DIMM 記憶體插槽',accepts:'ram'},
 {id:'pcie_x16',label:'C · PCIe x16 插槽',accepts:'gpu'},
 {id:'m2',label:'D · M.2 SSD 插槽',accepts:'ssd'}
];
export function emptyMotherboard(){return Object.fromEntries(hardwareSlots.map(s=>[s.id,null]))}
export function normalizeMotherboard(saved){const board=emptyMotherboard();for(const slot of hardwareSlots)if(saved?.[slot.id]===slot.accepts)board[slot.id]=slot.accepts;return board}
export function installHardware(board,partId,slotId){const next=normalizeMotherboard(board),part=hardwareParts.find(p=>p.id===partId),slot=hardwareSlots.find(s=>s.id===slotId);if(!part||!slot)return {ok:false,board:next,message:'請先選擇元件，再選擇主機板上的插槽。'};if(slot.accepts!==partId)return {ok:false,board:next,message:`這個位置是${slot.label.slice(4)}，不適合安裝${part.fullName}。${part.hint}`};if(next[slotId])return {ok:false,board:next,message:'這個元件已安裝完成。若想重練，可點選板上元件將它卸下。'};next[slotId]=partId;return {ok:true,board:next,message:`安裝成功：${part.fullName} → ${slot.label}。`}}
export function checkHardwareMission(board){const missing=hardwareSlots.filter(s=>board?.[s.id]!==s.accepts);return {ok:missing.length===0,count:4-missing.length,message:missing.length?`還有 ${missing.length} 個元件尚未正確安裝：${missing.map(s=>hardwareParts.find(p=>p.id===s.accepts).name).join('、')}。請依提示找到它們的位置。`:'任務完成！CPU、記憶體、顯示卡與 SSD 都裝到正確位置了！'}}
