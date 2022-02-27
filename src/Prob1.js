import React, {useState, useEffect} from 'react';
import './App.css';
import Grid from './components/Prob1Grid';
import Button from './components/Button';
const bfs = (walls, visited, visiting, rooms, room_ctr) => {
  const N = 20
  const M = 20
  const dx = [0, 0, 1, -1, 1, 1, -1, -1];
  const dy = [1, -1, 0, 0, -1, 1, 1, -1];
  var q = [];
  var room_list = rooms
  let vis = new Array(N);
  for (let row = 0; row < N; row++) 
  {
      vis[row] = new Array(M).fill(0);
  }
  for(let row=0;row<N;row++)
  {
    for(let col=0;col<M;col++)
    {
      if(visited.includes(`${row} ${col}`))
      {
        vis[row][col] = 1;
      }
      if(visiting.includes(`${row} ${col}`))
      {
        vis[row][col] = 1
        q.unshift([row, col])
      }
    }
  }
  while(q.length>0)
  {
    let [x, y] = q.pop()
    let dad = `${x} ${y}`
    visited.unshift(dad)
    visiting = visiting.filter(item=>item!==dad)
    
    for(let i=0;i<4;i++)
    {
      let curr_x = x+dx[i];
      let curr_y = y+dy[i];
      if(curr_x<0||curr_x>=N||curr_y<0||curr_y>=M)continue;

      let child = `${curr_x} ${curr_y}`
      
      if(vis[curr_x][curr_y]===0 && !walls.includes(child))
      {
          room_list[child]=room_ctr
          vis[curr_x][curr_y] = 1
          visiting.unshift(child)
      }
    }
  }
  return [visited, visiting, room_list]
}
export default function Copy() {
  const [walls, setWalls] = useState([])
  const [visited, setVisited] = useState([])
  const [visiting, setVisiting] = useState([])

  const [pressed, setPressed] = useState(false)
  const [disable_start, setDisable_start] = useState(false)

  const [room_ctr, setRoom_ctr] = useState(0)
  const [rooms, setRooms] = useState({})

  const mouseStart = (key)=>{
    if(!disable_start)
    {
      setPressed(true)
      if(!walls.includes(key))
        setWalls([...walls, key])
      else
        setWalls(walls.filter(item => item !== key))
    }
  }

  const mouseHover = (key) => {
    if(!pressed)return
    else
    {
      if(!walls.includes(key))
        setWalls([...walls, key])
      else
        setWalls(walls.filter(item => item !== key))
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      if(visiting.length>0)
      {
        let [t1, t2, t3] = bfs(walls, visited, visiting, rooms, room_ctr)
        setVisited(t1)
        setVisiting(t2)
        setRooms(t3)
      }
     }, 10)
  })
  useEffect(()=>{
    if(disable_start && !visiting.length)
    {
      console.log(rooms)
      for(let i=0;i<20;i++)
      {
        for(let j=0;j<20;j++)
        {
          let pos = `${i} ${j}`;
          if(!visited.includes(pos) && !walls.includes(pos))
          {
            var x=rooms
            x[pos]=room_ctr+1
            setRooms(x)
            setRoom_ctr(room_ctr+1)
            setVisiting([pos]);return;
          }
        }
      }
    }
  })

  const mouseEnd = (key) =>{
    setPressed(false)
  }
  const buttonClick=(type)=> {
    if(type==='start')
    {
      setDisable_start(true)
    }
  }

  return (
    <div onMouseUp={()=>mouseEnd('')}>
      <Grid 
      mouseStart={mouseStart}
      mouseHover={mouseHover}
      mouseEnd={mouseEnd}
      walls={walls} 
      visited={visited} 
      visiting={visiting}
      room_ctr={room_ctr}
      rooms={rooms}
      />
      <Button
      type = 'source'
      content = {`Room no: ${room_ctr}`}
      buttonClick = {buttonClick}
      disable = {disable_start}  
      />
      <Button
        type = 'start'
        content = 'Start'
        buttonClick = {buttonClick}
        disable = {disable_start}  
      />
    </div>
  );
}
