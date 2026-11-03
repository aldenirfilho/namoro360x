/* Original geometric n° mark, rendered with Node only. No downloaded assets or fonts. */
import {deflateSync} from 'node:zlib';
const crc = data => {let c=0xffffffff; for(const byte of data){c^=byte; for(let b=0;b<8;b++) c=(c>>>1)^((c&1)?0xedb88320:0);} return (c^0xffffffff)>>>0;};
function chunk(type,data) {const name=Buffer.from(type); const length=Buffer.alloc(4); length.writeUInt32BE(data.length); const sum=Buffer.alloc(4); sum.writeUInt32BE(crc(Buffer.concat([name,data]))); return Buffer.concat([length,name,data,sum]);}
export function iconPNG(size) {
  const raw=Buffer.alloc(size*(size*4+1));
  const ink=[248,245,237], background=[56,43,63];
  function mark(x,y) {
    const stem=x>=.31 && x<=.38 && y>=.37 && y<=.67;
    const right=x>=.54 && x<=.61 && y>=.48 && y<=.67;
    const dx=x-.465, dy=y-.48, distance=Math.hypot(dx,dy);
    const arch=y<=.48 && distance>=.075 && distance<=.145;
    const circle=Math.hypot(x-.69,y-.315);
    return stem || right || arch || (circle>=.033 && circle<=.06);
  }
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    let samples=0; for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++)if(mark((x+(sx+.5)/2)/size,(y+(sy+.5)/2)/size))samples++;
    const offset=y*(size*4+1)+1+x*4;
    for(let c=0;c<3;c++)raw[offset+c]=Math.round(background[c]+(ink[c]-background[c])*samples/4);
    raw[offset+3]=255;
  }
  const header=Buffer.alloc(13); header.writeUInt32BE(size); header.writeUInt32BE(size,4); header[8]=8; header[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);
}
