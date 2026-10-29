const courses={
 opa:{room:'A401',eyebrow:'MAKE A SMALL SIGNAL BIGGER',title:'讓小小的波形，長高 4 倍。',icon:'×4',paragraphs:['電子學實習會認識電子元件與訊號。放大器能把小小的電壓訊號變得更大，像把微弱的聲音訊號提升到容易處理的程度。放大的是波形的上下高度，不是起伏的快慢。','今天使用非反相 OPA（運算放大器）：輸入向上時，輸出也向上，頻率保持不變。訊號產生器固定送入正弦波，你調整負迴授可變電阻 Rf，就能從示波器即時看見輸出波形改變。','放大需要外部供電，不是憑空產生能量。本關已接好 ±12 V 供電與固定電阻 Rin = 10 kΩ；請讓 0.50 V 峰值變成 2.00 V 峰值，達到題目的 4 倍目標。'],steps:[['先認識放大','波形變高，頻率和正負方向不改變。'],['調整負迴授電阻','看公式 Av = 1 + Rf / Rin，改變 Rf。'],['對照示波器目標','黃色輸出吻合白色虛線，就自動通關。']]},
 circuits:{room:'A402',eyebrow:'FOLLOW THE CURRENT',title:'跟著電流走，分辨串聯與並聯。',icon:'Ω',paragraphs:['基本電學實習，是學習電壓、電流與電路的關係。電源供應器提供電壓，電流需要走完一個完整回路，燈泡才會亮。麵包板則能讓我們不用焊接就連接元件。','串聯像一條只有單一路線的道路：電流會依序通過兩顆燈泡。並聯則像分岔的道路：兩顆燈泡各自位在一條支路，支路兩端接到相同的電源節點。','今天兩組麵包板燈泡電路都已接上電源，不用自己接線。請沿著導線觀察路徑，判斷哪一組是串聯、哪一組是並聯，兩題都答對就能完成任務。'],steps:[['先認識麵包板','透過圖解看懂五孔、中央溝槽與電源軌。'],['再觀察固定電路','沿著已接好的導線，找出電流路徑。'],['最後判斷與檢查','選擇串聯或並聯，兩題都答對就通關。']]},
 hardware:{room:'A302',eyebrow:'BUILD YOUR FIRST COMPUTER',title:'認識電腦的四位核心夥伴。',icon:'PC',paragraphs:['電腦網路實習會認識電腦設備與網路的運作。這一關先體驗組裝電腦，建立認識網路工作站的硬體基礎；主機板就像連結各個元件的道路。','CPU 執行程式、負責運算；RAM 記憶體暫存正在使用的資料；顯示卡處理圖形與畫面；SSD 長期保存系統和檔案。記憶體關機會失去資料，SSD 的資料則會保留。','今天使用桌上型電腦的示意主機板，依提示把四種元件裝到對應位置。SSD 採用細長的 M.2 NVMe 型式。這是斷電狀態的網頁模擬，不需要實體零件。'],steps:[['認識元件','看懂 CPU、記憶體、顯示卡與 SSD 的功能。'],['找到插槽','點選或拖曳，依提示將元件裝到正確位置。'],['檢查組裝','四件都裝對後，檢查並完成任務。']]},
 programming:{room:'A202',eyebrow:'YOUR FIRST LINE OF CODE',title:'用程式，向世界打聲招呼。',icon:'{ }',paragraphs:['程式設計實習，就是練習把「解決問題的步驟」寫成電腦看得懂的指令。你會學習變數、判斷、迴圈，也會親手撰寫、執行程式，找出錯誤並修正。','今天先用 C 語言，讓電腦在螢幕上顯示 Hello, World!。這是許多人踏入程式世界的第一步。'],steps:[['寫程式','依提示在編輯器輸入完整程式。'],['試著執行','觀察電腦輸出的文字。'],['修正與完成','看提示、修改，再試一次。']]},
 arduino:{room:'A201',eyebrow:'MAKE YOUR FIRST LIGHT',title:'讓程式，點亮第一顆 LED。',icon:'✦',paragraphs:['單晶片微處理機實習，是學習讓小型控制器依照程式指令，控制身邊的電子零件。Arduino 就像一個小小的控制中心，能讀取訊號，讓 LED、感測器與馬達一起工作。','今天使用 Arduino UNO，先將 LED 長腳經過 220Ω 電阻接到 PIN 10，短腳接到 GND，再跟著完整程式提示設定腳位，親手點亮 LED。這是網頁模擬體驗，不需要實體零件。'],steps:[['認識與接線','用電阻保護 LED，接好長腳與短腳。'],['寫下控制指令','用 setup、loop 設定 PIN 10 輸出。'],['執行與觀察','接線與程式都正確，LED 才會亮起。']]},
 logic:{room:'A301',eyebrow:'THINK IN ZEROES & ONES',title:'撥動開關，看見 0 與 1 的規則。',icon:'0/1',paragraphs:['可程式邏輯設計實習，是學習電腦如何用 0 和 1 做判斷。AND（且閘）、OR（或閘）、NOT（反閘）就像三種不同的規則，會根據輸入產生不同的輸出。','今天的三組電路各自獨立，開關與 LED 都已經接好。透過表示式和真值表認識規則，再調整指撥開關，讓 AND 亮燈、OR 不亮燈、NOT 不亮燈。'],steps:[['認識邏輯閘','閱讀 AND、OR、NOT 的規則與表示式。'],['試試指撥開關','切換 0、1，觀察 LED 與真值表。'],['確認任務目標','同時達到三個 LED 目標，再檢查結果。']]}
};
// Keep the task DOM intact while revisiting the introduction, preserving all work.
export function addCourseIntro(dialog,id){
 const course=courses[id],head=dialog.querySelector('.lesson-head');
 const workspace=document.createElement('section');workspace.id=id+'-workspace';workspace.className='course-workspace hidden';workspace.tabIndex=-1;
 for(const node of [...dialog.children])if(node!==head)workspace.append(node);
 const introduction=document.createElement('section');introduction.id=id+'-intro';introduction.className='course-introduction';
 introduction.innerHTML=`<div class="lesson-welcome"><div class="code-emblem">${course.icon}</div><div><span class="lesson-chip">${course.room} · 課程介紹</span><h3 tabindex="-1">${course.title}</h3>${course.paragraphs.map(p=>`<p>${p}</p>`).join('')}</div></div><div class="lesson-route">${course.steps.map(([title,text],i)=>`<div><b>0${i+1} · ${title}</b><p>${text}</p></div>`).join('')}</div><button id="${id}-begin" class="primary">開始任務 →</button><p class="course-intro-note">慢慢試、不怕錯；需要時可從任務選單再次查看課程介紹。</p>`;
 const menu=document.createElement('nav');menu.className='course-menu';menu.setAttribute('aria-label','任務選單');
 const review=document.createElement('button');review.id=id+'-review-intro';review.className='quiet';review.textContent='課程介紹';review.setAttribute('aria-controls',introduction.id);
 menu.append(review,...head.querySelectorAll('button'));head.append(menu);dialog.append(introduction,workspace);
 let started=false;const begin=introduction.querySelector('button');
 function showIntro(focus=true){introduction.classList.remove('hidden');workspace.classList.add('hidden');review.setAttribute('aria-expanded','true');begin.textContent=started?'繼續任務 →':'開始任務 →';dialog.scrollTop=0;if(focus)introduction.querySelector('h3').focus({preventScroll:true})}
 function showTask(){started=true;introduction.classList.add('hidden');workspace.classList.remove('hidden');review.setAttribute('aria-expanded','false');workspace.focus({preventScroll:true});dialog.scrollTop=0}
 begin.onclick=showTask;review.onclick=()=>showIntro();
 return {reset(){started=false;showIntro(false)},showIntro,showTask};
}
