import React from 'react';
function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (157)*hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}
export default function Prob1Cell({key, mouseStart, mouseHover, mouseEnd, isWall, isVisited, isVisiting, room_no}) {
    var randomColor = 'b2c1c9'
    //console.log(`#${randomColor}`)
    let name = 'cell'
    if(isWall)//||key.includes('0 ')||key.includes('19')||key.includes(' 0'))
    {
        name = 'cell wall'
        randomColor = '000413'
    }
    if(isVisited||isVisiting)
    {
        name = 'cell'
        randomColor = intToRGB(hashCode(`ok${room_no*5}o`))
        randomColor+='d8'
        //name+='-'+room_no
    }
    return <div className={name}
                style={{background: isWall?'transparent':`#${randomColor}`}}
                onMouseDown={()=>mouseStart(key)}
                onMouseEnter={()=>mouseHover(key)}
                onMouseUp={()=>mouseEnd(key)
                }
            />
}