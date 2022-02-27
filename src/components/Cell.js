import React from 'react';

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
    return <div className={name}
                //onClick={()=>handleClick(key)}
                onMouseDown={()=>mouseStart(key)}
                onMouseEnter={()=>mouseHover(key)}
                onMouseUp={()=>mouseEnd(key)}
            />
}