import React from 'react';
import { Button as Cutton } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
const colors = {
    'source': 'var(--primary)',
    'destination': 'var(--error)',
    'start': 'var(--success)',
    'dfs': 'var(--primary)',
    'bfs': 'var(--primary)'
}
export default function Button({type, content, buttonClick, disable}){
    return (
        <Cutton
            /*className = {`5${type} ${disable ? 'disabled':''}`}*/
            dark
            rounded
            color={colors[type]}
            disabled = {disable}
            onClick = {()=>buttonClick(type)}
            border='top'
            >
                {content}
                {/*<h4 className='content'>{content}</h4>*/}
        </Cutton>
    );
}