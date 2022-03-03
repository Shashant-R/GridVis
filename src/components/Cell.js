import React from 'react';
import { IconButton } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
import Icon from '@mdi/react';
import { mdiRun, mdiWall, mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckCircle, mdiCheckDecagram } from '@mdi/js';

const colors = {
    'cell wall': 'gray',
    'cell src': 'var(--info)',
    'cell visited': '#1e506e',
    'cell visiting': 'var(--info)',
    'cell path': 'var(--success',
    'cell dest': 'var(--error)'
}
const icons = {
    'cell wall': mdiWall,
    'cell src': mdiRun,
    'cell visiting': mdiCheckboxBlankOutline,
    'cell visited': mdiCheckboxIntermediate,
    'cell path': mdiCheckCircle,
    'cell dest': mdiCheckDecagram
}
export default function Cell({key, mouseStart, mouseHover, mouseEnd, isWall, isVisited, isVisiting, isSource, isDestination, isPath}) {
    let name = 'cell '
    if(isWall)
        name = 'cell wall'
    if(isVisited)
        name = 'cell visited'
    if(isVisiting)
        name = 'cell visiting'
    if(isSource)
        name = 'cell src'
    if(isDestination)
        name = 'cell dest'
    if(isPath)
        name = 'cell path'
    return <IconButton className={''}
                //onClick={()=>handleClick(key)}
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
                    color= {colors[name]}
                    />
            </IconButton>
}