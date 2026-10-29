import test from 'node:test';
import assert from 'node:assert/strict';
import {breadboardHolesConnected,breadboardGuideSvg} from '../breadboard-guide.mjs';
test('five-hole strips connect within one column but not across the trench or adjacent columns',()=>{assert.equal(breadboardHolesConnected('a9','e9'),true);assert.equal(breadboardHolesConnected('f9','j9'),true);assert.equal(breadboardHolesConnected('e9','f9'),false);assert.equal(breadboardHolesConnected('a9','a10'),false)});
test('each continuous power rail is independent from the other rail and terminal strips',()=>{assert.equal(breadboardHolesConnected('plus1','plus32'),true);assert.equal(breadboardHolesConnected('minus1','minus32'),true);assert.equal(breadboardHolesConnected('plus9','minus9'),false);assert.equal(breadboardHolesConnected('plus9','a9'),false);assert.throws(()=>breadboardHolesConnected('a33','a1'));assert.throws(()=>breadboardGuideSvg('bad'))});
