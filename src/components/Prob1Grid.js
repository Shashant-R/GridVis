import React from 'react';
import Cell from './Prob1Cell';
export default function Prob1Grid({mouseStart, mouseHover, mouseEnd, walls, visited, visiting, rooms, room_ctr}){
    const N = 20    // number of rows
    const M = 20    // number of columns
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
                room_no={rooms[key]}
                />)
        }
    }
    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}