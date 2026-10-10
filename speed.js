// Shared operation-speed settings. Does not affect ball physics or scoring.
export const SPEEDS=[{value:.5,label:'ゆっくり（50%）'},{value:.7,label:'ふつう（70%）'},{value:1,label:'はやい（100%）'}];
export const DEFAULT_SPEED=.7;
export function meterPosition(elapsedMs,cannonSpeed,multiplier=DEFAULT_SPEED){const t=elapsedMs/1000*cannonSpeed*multiplier;return (1-Math.cos(t*Math.PI*1.4))/2;}
export function speedLabel(shot){return shot.speedMultiplier===undefined?'はやい（100%・旧記録）':SPEEDS.find(s=>s.value===shot.speedMultiplier)?.label??'不明';}
