export const WEATHER_URL='https://api.open-meteo.com/v1/forecast?latitude=24.35&longitude=120.62&current=temperature_2m&timezone=Asia%2FTaipei';
export function taiwanDate(date=new Date()){return new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(date)}
export function parseCurrentTemperature(data,now=Date.now()){
 const current=data?.current,value=current?.temperature_2m;
 if(typeof value!=='number'||!Number.isFinite(value)||value< -20||value>60||data.current_units?.temperature_2m!=='°C')throw Error('氣溫資料無效');
 if(typeof current.time!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d)?$/.test(current.time))throw Error('資料時間無效');
 const time=Date.parse(current.time+'+08:00');
 if(!Number.isFinite(time)||now-time>2*60*60*1000||time-now>30*60*1000)throw Error('氣溫資料已過期');
 return {temperature:Math.round(value*10)/10,time:current.time};
}
export function startCampusWeather(){
 const date=document.querySelector('#today-date'),temperature=document.querySelector('#dajia-temperature');
 function updateDate(){date.textContent=taiwanDate();date.dateTime=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Taipei'}).format(new Date())}
 async function refresh(){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);try{const r=await fetch(WEATHER_URL,{signal:controller.signal,credentials:'omit'});if(!r.ok)throw Error('天氣服務暫無回應');const current=parseCurrentTemperature(await r.json());temperature.textContent=`大甲區 ${current.temperature}°C`;temperature.title=`Open-Meteo 大甲區座標格點估計氣溫 · 更新 ${current.time.replace('T',' ')}（台灣時間）`;temperature.dataset.status='live'}catch{temperature.textContent='大甲區溫度暫無資料';temperature.title='請確認網路可連線至 api.open-meteo.com，稍後會自動更新。';temperature.dataset.status='unavailable'}finally{clearTimeout(timer)}}
 updateDate();refresh();setInterval(updateDate,60000);setInterval(()=>{if(!document.hidden)refresh()},10*60*1000);
}
