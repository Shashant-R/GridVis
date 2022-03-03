import React from 'react';
import Cell from './Cell';
export default function Grid({mouseStart, mouseHover, mouseEnd, walls, visited, visiting, source, destination, path}){
    const N = 12    // number of rows
    const M = 12    // number of columns
    const grid = []
    for( let row = 0; row < N; row++)
    {
        grid.push([])
        for( let col = 0; col < M; col++)
        {
            let key = `${row} ${col}`
            grid[row].push(<Cell 
                key={key} 
                mouseStart={()=> mouseStart(key)}
                mouseHover={()=> mouseHover(key)} 
                mouseEnd={()=> mouseEnd(key)} 
                isWall={walls.includes(key)} 
                isVisited={visited.includes(key)}
                isVisiting={visiting.includes(key)}
                isSource={source===key}
                isDestination={destination===key}
                isPath = {path.includes(key)}
                />)
        }
    }
    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}