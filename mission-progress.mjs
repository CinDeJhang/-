export const missionRooms = ['office','team','A201','A202','A301','A302','A401','A402'];
export function normalizeCompletions(value,visited=[]){const completed=Array.isArray(value)?value:[];const visits=Array.isArray(visited)?visited.filter(id=>id==='office'||id==='team'):[];return [...new Set([...completed,...visits].filter(id=>missionRooms.includes(id)))]}
export function completeMission(completed,id){const valid=normalizeCompletions(completed);return missionRooms.includes(id)&&!valid.includes(id)?[...valid,id]:valid}
export function allMissionsComplete(completed){return normalizeCompletions(completed).length===missionRooms.length}
