'use client'

import { Connection, Edge, EdgeProps, Handle, Node, NodeProps, NodeResizer, Position, useReactFlow } from '@xyflow/react'
import React, { memo, useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import GhostSquare from './GhostSquare'

export type DataNode = Node<{   
    label: string
    key?: string
    value?: any
}> 

export interface Direction {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}

const Squaree = (props: NodeProps<DataNode>) => {
    const {id, selected, data, width, height, positionAbsoluteX, positionAbsoluteY} = props
    const { getEdge, getEdges, addEdges, setEdges, addNodes} = useReactFlow()
    
    const [label, setLabel] = useState((typeof data.label === 'object') ? '' : data.label)
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingNode, setIsAddingNode] = useState<Direction>({
        top: false,
        bottom: false,
        left: false,
        right: false
    });
    
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

    const handleNewConnections = (newConnection: Connection) => {
        const curentEdge = getEdge(id)
        if(curentEdge) return
        console.log(curentEdge)
        const newEdge: Edge = {
            id: `${id}-${newConnection.target}`,
            source: newConnection.source,
            target: newConnection.target,
            sourceHandle: newConnection.sourceHandle,
            targetHandle: newConnection.targetHandle,
            type: 'default',
            animated: true,
        }
        addEdges(newEdge)
    }

    const handleAddSideNode = (direction: string) => {
        if(direction === "left" || direction === "right"){
            if(!width) return
            const newNode: Node = {
                id: crypto.randomUUID(),
                position: {
                    x: positionAbsoluteX + (direction === "left" ? -width as number - 100 : width as number + 100),
                    y: positionAbsoluteY
                },
                data: {label: ""},
                type: "square",
                width: width,
                height: height,
                expandParent: true
            }

            const newConnection: Connection = {
                source: id,
                target: newNode.id,
                sourceHandle: direction,
                targetHandle: direction === "left" ? "right" : "left"
            }
            
            handleNewConnections(newConnection)

            addNodes(newNode)
        }
        
    }   
    console.log("Selected", selected,data.label)
    
    return (
    <div className='bg-violet-500 rounded-lg min-w-[200px]  w-full min-h-[200px] h-full p-5 ' onDoubleClick={handleDoubleClick}> 
        <NodeResizer
            minHeight={200}
            minWidth={200}
            isVisible={selected ? true : false}
            lineClassName='bg-blue-500'

            handleClassName='w-4 h-4 bg-white border-1 border-blue-500 rounded' 
        />
        <Handle
            id="top"
            type="source"
            position={Position.Top}
            className={`-top-6 w-3 h-3 bg-blue-500 `}
            
        />

        {isAddingNode.right ? (
            <Handle
                id="right"
                type="source"
                position={Position.Right}
                className='-right-6 size-10 bg-blue-500 flex justify-center items-center '
                onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, right: true }))}
                onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, right: false }))}
                onClick={() => handleAddSideNode("right")}
            >
                <FiArrowRight className='size-5 text-white' />
            </Handle>
        ) :
            (
                <Handle
                    id="right"
                    type="source"
                    position={Position.Right}
                    className={`-right-6 w-3 h-3 bg-blue-500 `}
                    onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, right: true }))}
                    onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, right: false }))}
                />
            )
        }

        {isAddingNode.right && (
                // <div
                //     className='bg-indigo-500/20 rounded  min-w-[200px] min-h-[200px]'
                //     style={{
                //         position: 'absolute',
                //         width: width as number,
                //         height: height as number,
                //         right: width && -width as number - 100, // Adjust the offset as needed
                //         top: 5,
                //         pointerEvents: 'none', // Allow clicks to pass through
                //         zIndex: 1, // Ensure it's above the background
                //     }}
                // />
                <GhostSquare 
                    width={width as number}
                    height={height as number}
                    direction="right"
                />
            )
        }

        <Handle
            id="bottom"
            type="source"
            position={Position.Bottom}
            className={`-bottom-6 w-3 h-3 bg-blue-500  `}
        />
        <Handle
            id="left"
            type="source"
            position={Position.Left}
            className={`-left-6 w-3 h-3 bg-blue-500 `}
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