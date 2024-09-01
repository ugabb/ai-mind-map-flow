'use client'

import { Handle, Node, NodeProps, NodeResizer, Position } from '@xyflow/react'
import React, { memo, useRef, useState } from 'react'

export type DataNode = Node<{   
    label: string
    key?: string
    value?: any
}> 

const Squaree = (props: NodeProps<DataNode>) => {
    const {selected, data, width} = props
    
    const [label, setLabel] = useState((typeof data.label === 'object') ? '' : data.label)
    const [isEditing, setIsEditing] = useState(false)
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDoubleClick = () => {
        setIsEditing(true);
        if (inputRef.current) {
            inputRef.current.focus(); // Set focus on the input element when double-clicked
        }
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    }

  return (
    <div className='bg-violet-500 rounded-lg min-w-[200px]  w-full min-h-[200px] h-full p-5 ' onDoubleClick={handleDoubleClick}> 
        <NodeResizer
            minHeight={200}
            minWidth={200}
            isVisible={selected}
            lineClassName='bg-blue-500'

            handleClassName='w-4 h-4 bg-white border-1 border-blue-500 rounded' 
        />
        <Handle
            id="top"
            type="source"
            position={Position.Top}
            className='-top-2 w-3 h-3 bg-blue-500'
        />
        <Handle
            id="right"
            type="source"
            position={Position.Right}
            className='-right-2 w-3 h-3 bg-blue-500'
        />
        <Handle
            id="bottom"
            type="source"
            position={Position.Bottom}
            className='-bottom-2 w-3 h-3 bg-blue-500'
        />
        <Handle
            id="left"
            type="source"
            position={Position.Left}
            className='-left-2 w-3 h-3 bg-blue-500'
        />
        <div className='flex justify-center items-center h-full w-full text-wrap'>
            <ul className='h-full w-full'>
                { 
                (typeof data.label === 'object') ? 
                Object.entries(data.label).map(([key, value], index) =>(
                    <li key={index}>
                        <span className="jsonVisNode__label__key">{key} : </span>
                        <span>{String(value)}</span>
                    </li>                    
                )) : (
                    <div className='flex justify-center items-center h-full w-full p-3'>
                        {isEditing ? (
                            <textarea
                                className={`border-none bg-transparent w-full h-full max-w-[${width}px] focus:outline-none text-center text-white resize-none overflow-y-hidden`}
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                onBlur={handleInputBlur}
                            />
                        ) : (
                            <span className={`text-white w-full max-w-[${width}px] text-wrap text-center`}>{label}</span>
                        )}
                    </div>
                )
                }   
            </ul>
        </div>
    </div>
  )
}

export const Square = memo(Squaree)