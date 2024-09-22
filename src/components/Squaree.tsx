'use client'

import { Connection, Edge, EdgeProps, Handle, Node, NodeProps, NodeResizer, Position, useReactFlow } from '@xyflow/react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from 'react-icons/fi'
import { GhostSquare } from './GhostSquare'

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
    const {id, selected, data, width, height, positionAbsoluteX, positionAbsoluteY, targetPosition, sourcePosition} = props
    const { getEdge, getEdges, addEdges, setEdges, addNodes, deleteElements} = useReactFlow()
    
    const [label, setLabel] = useState((typeof data.label === 'object') ? '' : data.label)
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingNode, setIsAddingNode] = useState<Direction>({
        top: false,
        bottom: false,
        left: false,
        right: false
    });
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEnableEditing = () => {
        if(!selected) return
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
        } else{
            if(!height) return
            const newNode: Node = {
                id: crypto.randomUUID(),
                position: {
                    x: positionAbsoluteX, 
                    y: positionAbsoluteY + (direction === "top" ? -height as number - 100 : height as number + 100)
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
                targetHandle: direction === "bottom" ? "top" : "bottom"
            }

            handleNewConnections(newConnection)

            addNodes(newNode)
        }
        
    }   

    const handleDeleteNode = useCallback((event: KeyboardEvent) => {
        if(selected){
            if(event.key === 'Delete' && id){
                const nodesToDelete = [{id}]
                deleteElements({nodes: nodesToDelete})
            }
        }
    },[deleteElements, selected, id])

    useEffect(() => {
        document.addEventListener('keydown', handleDeleteNode)

        return () => {
            document.removeEventListener('keydown', handleDeleteNode)
        }
    },[handleDeleteNode])
    console.log({width}, {height})
    
    return (
    <div className='bg-violet-500 rounded-lg min-w-[200px]  w-fit min-h-[200px] h-fit p-5 ' onClick={handleEnableEditing}> 
        <NodeResizer
            minHeight={width}
            minWidth={height}
            isVisible={selected ? true : false}
            lineClassName='bg-blue-500'

            handleClassName='w-4 h-4 bg-white border-1 border-blue-500 rounded' 
        />
        {isAddingNode.top ? (
            <Handle
                id="top"
                type="source"
                position={Position.Top}
                className={`-top-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-up.svg')] bg-no-repeat bg-center`}
                onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, top: true }))}
                onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, top: false }))}
                onClick={() => handleAddSideNode("top")}
            />
        ) : (
                <Handle
                    id="top"
                    type="source"
                    position={Position.Top}
                    className={`-top-6 w-3 h-3 bg-blue-500`}
                    onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, top: true }))}
                    onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, top: false }))}
                />
            )
        }

        {isAddingNode.top && (
                <GhostSquare 
                    width={width as number}
                    height={height as number}
                    direction="top"
                />
            )
        }

        {isAddingNode.right ? (
            <Handle
                id="right"
                type="source"
                position={Position.Right}
                className={`-right-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-right.svg')] bg-no-repeat bg-center`}
                onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, right: true }))}
                onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, right: false }))}
                onClick={() => handleAddSideNode("right")}
            />
        ) :
            (
                <Handle
                    id="right"
                    type="source"
                    position={Position.Right}
                    className={`-right-6 w-3 h-3 bg-blue-500 ${(targetPosition === Position.Right || sourcePosition === Position.Right) && 'bg-transparent'}`}
                    onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, right: true }))}
                    onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, right: false }))}
                />
            )
        }

        {isAddingNode.right && (
                <GhostSquare 
                    width={width as number}
                    height={height as number}
                    direction="right"
                />
            )
        }

        {isAddingNode.bottom ? (
            <Handle
            id="bottom"
            type="source"
            position={Position.Bottom}
            className={`-bottom-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-down.svg')] bg-no-repeat bg-center`}
            onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, bottom: true }))}
            onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, bottom: false }))}
            onClick={() => handleAddSideNode("bottom")}
        />
        ) : (
                <Handle
                    id="bottom"
                    type="source"
                    position={Position.Bottom}
                    className={`-bottom-6 w-3 h-3 bg-blue-500  `}
                    onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, bottom: true }))}
                    onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, bottom: false }))}
                />
            )
        }

        {isAddingNode.bottom && (
                <GhostSquare 
                    width={width as number}
                    height={height as number}
                    direction="bottom"
                />
            )
        }

        {isAddingNode.left ? (
            <Handle
                id="left"
                type="source"
                position={Position.Left}
                className={`-left-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-left.svg')] bg-no-repeat bg-center`}
                onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, left: true }))}
                onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, left: false }))}
                onClick={() => handleAddSideNode("left")}
            />
        ) :
            (
                <Handle
                    id="left"
                    type="source"
                    position={Position.Left}
                    className={`-left-6 w-3 h-3 bg-blue-500 `}
                    onMouseOver={() => setIsAddingNode((prev) => ({ ...prev, left: true }))}
                    onMouseLeave={() => setIsAddingNode((prev) => ({ ...prev, left: false }))}
                />
            )
        }

        {isAddingNode.left && (
                <GhostSquare 
                    width={width as number}
                    height={height as number}
                    direction="left"
                />
            )
        }



            <div className='flex justify-center items-center h-full w-full text-left text-wrap p-3'>
                { 
                (typeof data.label === 'object') ? 
                Object.entries(data.label).map(([key, value], index) =>(
                    <div key={index} className='flex flex-col justify-center items-center p-3'>
                        <span className="">{key} : {String(value)}</span>
                    </div>                    
                )) : (
                    <div className='flex justify-center items-center h-full w-full p-3 text-wrap '>
                        {selected ? (
                            <input
                                className={`border-none bg-transparent w-full min-h-full h-fit max-w-[${width}px] focus:outline-none text-center text-white text-wrap break-words resize-none overflow-y-hidden placeholder-zinc-200`}
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                onBlur={handleInputBlur}
                                placeholder='Enter text here'
                            />
                        ) : (
                            <span className={`text-white w-fit max-w-[${width}px] text-center cursor-text`}>{label}</span>
                        )}
                    </div>
                )
                }   
            </div>
    </div>
  )
}

export const Square = memo(Squaree)