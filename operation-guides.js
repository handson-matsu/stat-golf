// Existing direction guide: 45% to 54% of the bar. Shared by rendering and recording.
export const DIRECTION_GUIDE=Object.freeze({left:45,width:9});
export function recommendedDirection(){return Number(((DIRECTION_GUIDE.left+DIRECTION_GUIDE.width/2)/100*2-1).toFixed(12));}
