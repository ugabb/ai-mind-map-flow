import { Handle, Node, NodeProps, NodeResizer, Position } from '@xyflow/react'
import React from 'react'

export type DataNode = Node<{   
    label: string
    key?: string
    value?: any
}> 

const Squaree = (props: NodeProps<DataNode>) => {
    const {selected, data} = props

    let str;
    if(typeof data.label !== 'object'){
      
        str = data.label;
    }
  return (
    <div className='bg-violet-500 rounded-lg min-w-[200px]  w-full min-h-[200px] h-full p-5 ' > 
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
        <div className='flex justify-center items-center h-full'>
            <ul>
                { 
                (typeof data.label === 'object') ? 
                Object.entries(data.label).map(([key, value], index) =>(
                    <li key={index}>
                        <span className="jsonVisNode__label__key">{key} : </span>
                        <span>{String(value)}</span>
                    </li>                    
                )) : str
                }   
            </ul>
        </div>
    </div>
  )
}

export default Squaree