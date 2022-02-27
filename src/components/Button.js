import React from 'react';

export default function Button({type, content, buttonClick, disable}){
    return (
        <div
            className = {`${type} ${disable ? 'disabled':''}`}
            onClick = {()=>buttonClick(type)}
            >
                <h4 className='content'>{content}</h4>
        </div>
    );
}