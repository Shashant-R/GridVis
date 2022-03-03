import React from 'react';
import { IconButton } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
import Icon from '@mdi/react';
import    { mdiWall, mdiCheckboxBlankOutline, mdiCheckboxIntermediate, 
            mdiNumeric1Circle, mdiNumeric2Circle, mdiNumeric3Circle, mdiNumeric4Circle, mdiNumeric5Circle, mdiNumeric6Circle,
            mdiNumeric7Circle, mdiNumeric8Circle, mdiNumeric9Circle, mdiNumeric0Circle } from '@mdi/js';
function getRandomColor(seed) {
    return Math.floor((Math.abs(Math.sin(seed) * 16777215))).toString(16);
}
const icons = {
    'cell wall': mdiWall,
    'cell visited': mdiCheckboxBlankOutline,
    'cell done': mdiCheckboxIntermediate,
    1: mdiNumeric1Circle,
    2: mdiNumeric2Circle,
    3: mdiNumeric3Circle,
    4: mdiNumeric4Circle,
    5: mdiNumeric5Circle,
    6: mdiNumeric6Circle,
    7: mdiNumeric7Circle,
    8: mdiNumeric8Circle,
    9: mdiNumeric9Circle,
    0: mdiNumeric0Circle
}
export default function Prob1Cell({key, mouseStart, mouseHover, mouseEnd, isWall, isVisited, isVisiting, room_no}) {
    var randomColor = 'b2c1c9';
    let name = 'cell';
    if(isWall)
    {
        name = 'cell wall';
        randomColor = '211112';
    }
    if(isVisited||isVisiting)
    {
        name = room_no%10;
        randomColor = getRandomColor(room_no);
    }
    return (
        <IconButton className={''}
                size='small'
                dark
                bordered
                text={false}
                onMouseDown={()=>mouseStart(key)}
                onMouseEnter={()=>mouseHover(key)}
                onMouseUp={()=>mouseEnd(key)}
            >
                <Icon path={icons[name]}
                    size={1}
                    color= {`#${randomColor}`}
                    />
        </IconButton>
    );
}