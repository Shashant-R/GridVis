import React from 'react';
import { IconButton } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
import Icon from '@mdi/react';
import { mdiWall, mdiCheckboxBlankOutline, mdiCheckboxIntermediate } from '@mdi/js';
function getRandomColor(seed) {
    return Math.floor((Math.abs(Math.sin(seed) * 16777215))).toString(16);
}
const icons = {
    'cell wall': mdiWall,
    'cell visited': mdiCheckboxBlankOutline,
    'cell done': mdiCheckboxIntermediate,
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
        name = 'cell done';
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