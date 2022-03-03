import React, {useState, useEffect} from 'react';
import './App.css';
import Grid from './components/Grid';
import Button from './components/Button';
const shortestpath = (source, destination, parent) => {
  let path = []
  let curr = parent[destination];
  while(curr!==source)
  {
    path.unshift(curr)
    curr = parent[curr]
  }
  return path
}
const bfs = (walls, visited, visiting, parent) => {
  const N = 12
  const M = 12
  const dx = [0, 0, 1, -1, 1, 1, -1, -1];
  const dy = [1, -1, 0, 0, -1, 1, 1, -1];
  var q = [];
  var par = parent;
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
          par[child] = dad
          vis[curr_x][curr_y] = 1
          visiting.unshift(child)
      }
    }
  }
  return [visited, visiting, par]
} //end of bfs
const dfs=(walls, stack, visited, visiting, parent)=>{
  const N = 12
  const M = 12
  const dx = [0, 0, 1, -1, 1, 1, -1, -1];
  const dy = [1, -1, 0, 0, -1, 1, 1, -1];
  var par = parent
  var s = stack;
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
        s.push([row, col])
      }
    }
  }
  if(s.length>0)
  {
    let ele = s.pop()
    let x = ele[0]
    let y = ele[1]
    let dad = `${x} ${y}`
    visited.unshift(dad)
    for(let i=0;i<4;i++)
    {
      let curr_x = x + dx[i]
      let curr_y = y + dy[i]
      if(curr_x<0||curr_y<0||curr_x>=N||curr_y>=M)continue;
  
      let child = `${curr_x} ${curr_y}`
  
      if(vis[curr_x][curr_y]===0 && !walls.includes(child))
      {
        vis[curr_x][curr_y]=1
        par[child] = dad
        s.push([curr_x, curr_y])
      }
    }
  }
  if(s.length>0)
  {
    let ele = s.pop()
    let x = ele[0]
    let y = ele[1]
    let dad = `${x} ${y}`
    visiting=[dad]
    while(s.length>0 && visited.includes(visiting[0]))
    {
      let ele = s.pop()
      let x = ele[0]
      let y = ele[1]
      let dad = `${x} ${y}`
      visiting=[dad]
    }
  }
  return [s, visited, visiting, par]
}
export default function App() {
  const [walls, setWalls] = useState([])
  const [visited, setVisited] = useState([])
  const [visiting, setVisiting] = useState([])

  const [source, setSource] = useState()
  const [destination, setDestination] = useState()

  const [source_selected, setSource_selected] = useState(false)
  const [destination_selected, setDestination_selected] = useState(false)

  const [disable_source, setDisable_source] = useState(false)
  const [disable_destination, setDisable_destination] = useState(true)
  const [disable_start, setDisable_start] = useState(true)
  const [start, setStart] = useState(false)
  const [stack, setStack] = useState([])

  const [BFS, setBFS] = useState(true)
  const [parent, setParent] = useState({})
  const [path, setPath] = useState([])
  const [temp_path, setTemp_path] = useState([])
  const [ctr, setCtr] = useState(-1)

  const [pressed, setPressed] = useState(false)

  const mouseStart = (key)=>{
    if(source_selected||destination_selected)
      handleClick(key)
    else
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

  const mouseEnd = (key) =>{
    setPressed(false)
  }

  const handleClick = (key)=>{
    if(source_selected)
    {
      setSource(key)
      setSource_selected(false)
      setDisable_destination(false)
    }
    else if(destination_selected)
    {
      setDestination(key)
      setDestination_selected(false)
      setDisable_start(false)
    }
    else //if(disable_destination && disable_source)
    {
      if(!walls.includes(key))
        setWalls([...walls, key])
      else
        setWalls(walls.filter(item => item !== key))
    }
  }
  useEffect(() => {
    setTimeout(()=>{
      if(visiting.length>0)
      {
        let t1,t2,t3,t4 = [] 
        if(BFS)
          [t1, t2, t3] = bfs(walls, visited, visiting, parent)
        else 
          [t1, t2, t3, t4] = dfs(walls, stack, visited, visiting, parent)
        if(BFS)
          setVisited(t1)
        else 
          setVisited(t2)
        if(BFS)
          setParent(t3)
        else
        {
            setStack(t1)
            setParent(t4)
        }
        if(visiting.includes(destination))
        {
          setVisiting([])
          let temp = shortestpath(source, destination, parent);
          setTemp_path(temp)
          setCtr(ctr+1)
        }
        else 
        {
          if(BFS)
            setVisiting(t2)
          else
            setVisiting(t3)
        }
      }
     }, 0)
	})
  useEffect(()=>{
    setTimeout(() => {
      if(temp_path.length!==path.length)
      {
        setPath([...path, temp_path[ctr]])
        setCtr(ctr+1)
      }
    }, 0);
  },[ctr]);
  const buttonClick = (type) => {
    if(type==='source' && !disable_source)
    {
      setSource_selected(true)
      setDisable_source(true)
    }
    if(type==='destination' && !disable_destination)
    {
      setDestination_selected(true)
      setDisable_destination(true)
    }
    if(type==='start' && !disable_start)
    {
      setStart(true)
      setDisable_start(true)
      setVisiting([source])
    }
    if(type==='dfs' && !start)
    {
      setBFS(false)
    }
    if(type==='bfs' && !start)
    {
      setBFS(true)
    }
  }
  

  return (
    <div onMouseUp={()=>mouseEnd('')} style={{display: 'flex', justifyContent: 'space-around'}}>
      <Grid 
        mouseStart={mouseStart}
        mouseHover={mouseHover}
        mouseEnd={mouseEnd}
        walls={walls} 
        visited={visited} 
        visiting={visiting} 
        source={source} 
        destination={destination}
        path = {path}
      />
      <div className='action-buttons' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        <Button type='source' content='Source cell' buttonClick={buttonClick} disable = {disable_source}/>
        <Button type='destination' content='Destination cell' buttonClick={buttonClick} disable = {disable_destination}/>
        <Button type='start' content='Start' buttonClick={buttonClick} disable={disable_start}/>
        <Button type='dfs' content='DFS' buttonClick={buttonClick} disable={!BFS || start}/>
        <Button type='bfs' content='BFS' buttonClick={buttonClick} disable={BFS || start}/>
      </div>
    </div>
  );
}
