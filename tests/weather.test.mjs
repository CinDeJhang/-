import test from 'node:test';
import assert from 'node:assert/strict';
import {taiwanDate,parseCurrentTemperature} from '../weather.mjs';
const now=Date.parse('2026-10-29T02:00:00+08:00');
const weather={current:{temperature_2m:25.14,time:'2026-10-29T02:00'},current_units:{temperature_2m:'°C'}};
test('date follows Taiwan across the UTC date boundary',()=>{assert.equal(taiwanDate(new Date('2026-10-28T16:01:00Z')),'2026/10/29')});
test('current temperatures are validated and rounded without inventing a fallback',()=>{assert.equal(parseCurrentTemperature(weather,now).temperature,25.1);for(const data of [{},{...weather,current:{...weather.current,temperature_2m:null}},{...weather,current:{...weather.current,temperature_2m:NaN}},{...weather,current_units:{temperature_2m:'°F'}},{...weather,current:{...weather.current,time:'invalid'}},{...weather,current:{...weather.current,time:'2026-10-28T22:00'}},{...weather,current:{...weather.current,time:'2026-10-30T02:00'}}])assert.throws(()=>parseCurrentTemperature(data,now))});
