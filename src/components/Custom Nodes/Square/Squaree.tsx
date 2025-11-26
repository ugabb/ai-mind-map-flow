'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type Node, NodeResizer, useReactFlow } from '@xyflow/react'
import { memo, useCallback, useEffect, useState } from 'react'
import { indigo } from 'tailwindcss/colors'
import { Toolbar } from '@/components/Toolbar'
import { fontSizes } from '@/constants/values'
import type { DataNode } from '@/hooks/useNodes'
import { cn } from '@/lib/utils'
import type { ExtendedNode } from '@/types/node'
import { getTextColor } from '@/utils/getTextColor'
import { Handles } from '../Handles'

export type Direction = {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

const Squaree = (props: ExtendedNode) => {
  const {
    id,
    selected = false,
    data,
    width = 0,
    height = 0,
    positionAbsoluteX,
    positionAbsoluteY,
    targetPosition,
    sourcePosition,
  } = props

  const {
    deleteElements,
    updateNodeData,
    getNode,
    addNodes,
    addEdges,
    setNodes,
  } = useReactFlow()

  // Local state for the node
  const [node, setNode] = useState<Node<DataNode> | null>(null)
  const [isEditingText, setIsEditingText] = useState(false)
  const [isAddingNode, setIsAddingNode] = useState<Direction>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  })

  // Initialize TipTap editor
  // Supports rich text editing with keyboard shortcuts:
  // Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+Shift+S (Strikethrough)
  // Markdown-style headings: # H1, ## H2, ### H3
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Add text',
        emptyEditorClass: 'is-editor-empty',
        showOnlyWhenEditable: false,
        considerAnyAsEmpty: true,
      }),
    ],
    content:
      typeof data.label === 'string' && data.label.trim() !== ''
        ? data.label
        : '',
    editorProps: {
      attributes: {
        class:
          'nodrag w-full h-full border-none cursor-text focus:outline-none text-center',
      },
    },
    editable: isEditingText, // Only editable when explicitly editing
    onUpdate: ({ editor }) => {
      if (!editor) {
        return
      }
      const content = editor.getHTML()
      // Update node data immediately
      updateNodeData(id, { ...data, label: content })
    },
    onBlur: () => {
      setIsEditingText(false)
      // Auto-resize node to fit content
      setTimeout(() => {
        resizeNodeToContent()
      }, 100)
    },
    onFocus: () => {
      setIsEditingText(true)
    },
    immediatelyRender: false,
  })

  // Initialize node state
  useEffect(() => {
    const currentNode = getNode(id) as Node<DataNode>
    if (currentNode) {
      setNode(currentNode)
      if (editor && typeof currentNode.data.label === 'string') {
        editor.commands.setContent(currentNode.data.label)
      }
    }
  }, [id, getNode, editor])

  // Update editor content when data changes externally
  useEffect(() => {
    if (editor && typeof data.label === 'string' && !isEditingText) {
      const currentContent = editor.getHTML()
      if (currentContent !== data.label) {
        editor.commands.setContent(data.label)
      }
    }
  }, [data.label, editor, isEditingText])

  // Update editor editable state when editing mode changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditingText)
    }
  }, [editor, isEditingText])

  const handleAddSideNode = useCallback(
    (direction: string) => {
      if (direction === 'left' || direction === 'right') {
        if (!width) {
          return
        }
        const newNode: Node = {
          id: crypto.randomUUID(),
          position: {
            x:
              positionAbsoluteX +
              (direction === 'left'
                ? (-width as number) - 100
                : (width as number) + 100),
            y: positionAbsoluteY,
          },
          data: { label: '', color: data.color },
          type: 'square',
          width,
          height,
          expandParent: true,
        }

        const newEdge = {
          id: `${id}-${newNode.id}`,
          source: id,
          target: newNode.id,
          sourceHandle: direction,
          targetHandle: direction === 'left' ? 'right' : 'left',
          type: 'default',
        }

        addNodes(newNode)
        addEdges(newEdge)
      } else {
        if (!height) {
          return
        }
        const newNode: Node = {
          id: crypto.randomUUID(),
          position: {
            x: positionAbsoluteX,
            y:
              positionAbsoluteY +
              (direction === 'top'
                ? (-height as number) - 100
                : (height as number) + 100),
          },
          data: { label: '', color: data.color },
          type: 'square',
          width,
          height,
          expandParent: true,
        }

        const newEdge = {
          id: `${id}-${newNode.id}`,
          source: id,
          target: newNode.id,
          sourceHandle: direction,
          targetHandle: direction === 'bottom' ? 'top' : 'bottom',
          type: 'default',
        }

        addNodes(newNode)
        addEdges(newEdge)
      }
    },
    [
      addNodes,
      addEdges,
      data.color,
      height,
      id,
      positionAbsoluteX,
      positionAbsoluteY,
      width,
    ]
  )

  // Handle clicking on the node to enable editing
  const handleNodeClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      // First ensure the node is selected if it isn't already
      if (!selected) {
        setNodes((nodes) =>
          nodes.map((node) => ({
            ...node,
            selected: node.id === id,
          }))
        )
        return
      }

      // If already selected and not editing, enable editing
      if (selected && !isEditingText && editor) {
        setIsEditingText(true)
        // Focus the editor after state update
        setTimeout(() => {
          editor.commands.focus()
        }, 0)
      }
    },
    [selected, isEditingText, editor, setNodes, id]
  )

  const handleDeleteNode = useCallback(() => {
    if (id) {
      const nodesToDelete = [{ id }]
      deleteElements({ nodes: nodesToDelete })
    }
  }, [deleteElements, id])

  const handleUpdateNodeColor = useCallback(
    (color: string) => {
      if (!color) {
        return
      }
      const textColor = getTextColor(color)

      updateNodeData(id, { ...data, color, textColor })
      setNode((prevNode) => {
        if (prevNode) {
          return { ...prevNode, data: { ...prevNode.data, color, textColor } }
        }
        return prevNode
      })
    },
    [data, id, updateNodeData]
  )

  const handleUpdateTextSize = useCallback(
    (size: 'sm' | 'md' | 'lg' | 'xl') => {
      const fontSize = fontSizes[size]
      updateNodeData(id, { ...data, fontSize })
      setNode((prevNode) => {
        if (prevNode) {
          return { ...prevNode, data: { ...prevNode.data, fontSize } }
        }
        return prevNode
      })
    },
    [id, data, updateNodeData]
  )

  // Auto-resize node to fit content
  const resizeNodeToContent = useCallback(() => {
    if (!editor) {
      return
    }

    // Create a temporary element to measure content size
    const tempDiv = document.createElement('div')
    tempDiv.className = 'content-measure'
    tempDiv.style.position = 'absolute'
    tempDiv.style.visibility = 'hidden'
    tempDiv.style.pointerEvents = 'none'
    tempDiv.style.maxWidth = 'none'
    tempDiv.style.fontSize =
      node?.data?.fontSize || data.fontSize || `${fontSizes.md}px`
    tempDiv.style.fontFamily = 'inherit'
    tempDiv.style.padding = '16px' // Match node padding
    tempDiv.style.textAlign = 'center'
    tempDiv.innerHTML = editor.getHTML()

    document.body.appendChild(tempDiv)

    // Measure content
    const contentWidth = Math.max(tempDiv.scrollWidth, 200) // Minimum width
    const contentHeight = Math.max(tempDiv.scrollHeight, 200) // Minimum height

    // Add some padding for comfort
    const newWidth = Math.max(contentWidth + 40, width || 300)
    const newHeight = Math.max(contentHeight + 40, height || 200)

    // Clean up
    document.body.removeChild(tempDiv)

    // Update node size if content is larger
    if (newWidth > (width || 0) || newHeight > (height || 0)) {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id
            ? {
                ...n,
                width: newWidth,
                height: newHeight,
              }
            : n
        )
      )
    }
  }, [editor, node?.data?.fontSize, data.fontSize, width, height, id, setNodes])

  // Handle delete key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selected && !isEditingText && event.key === 'Delete' && id) {
        const nodesToDelete = [{ id }]
        deleteElements({ nodes: nodesToDelete })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected, isEditingText, id, deleteElements])

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-lg p-2',
        {
          'ring-2 ring-blue-500': selected,
          'cursor-pointer': !isEditingText,
          'cursor-text': isEditingText,
        }
      )}
      onClick={handleNodeClick}
      style={{
        backgroundColor: node?.data?.color || data.color || indigo[300],
        color: node?.data?.textColor || data.textColor || '#000000',
        width,
        height,
        fontSize: node?.data?.fontSize || data.fontSize || fontSizes.md,
      }}
    >
      <NodeResizer
        handleClassName="w-3 h-3 bg-white border-2 border-blue-500 rounded"
        isVisible={selected}
        lineClassName="border-2 border-blue-500"
        minHeight={200}
        minWidth={200}
      />

      <Handles
        color={node?.data?.color || data.color || indigo[300]}
        handleAddSideNode={handleAddSideNode}
        height={height ?? 0}
        isAddingNode={isAddingNode}
        setIsAddingNode={setIsAddingNode}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        width={width ?? 0}
      />

      {selected && (
        <Toolbar
          handleDeleteNode={handleDeleteNode}
          handleUpdateNodeColor={handleUpdateNodeColor}
          handleUpdateTextSize={handleUpdateTextSize}
          selected={selected}
        />
      )}

      <div
        className="flex h-full w-full items-center justify-center p-2"
        style={{
          pointerEvents: isEditingText ? 'all' : 'none',
        }}
      >
        {isEditingText ? (
          <EditorContent
            className="nodrag h-full w-full"
            editor={editor}
            style={{
              pointerEvents: 'all',
              minHeight: '100%',
            }}
          />
        ) : (
          <div
            className="prose-mirror-content flex h-full w-full items-center justify-center break-words text-center"
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              pointerEvents: 'none',
            }}
          >
            {(() => {
              const content = editor?.getHTML() || ''
              const isEmpty =
                !content || content === '<p></p>' || content.trim() === ''

              if (isEmpty && selected) {
                return (
                  <span className="text-muted-foreground italic">Add text</span>
                )
              }
              if (isEmpty) {
                return ''
              }
              return <div dangerouslySetInnerHTML={{ __html: content }} />
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export const Square = memo(Squaree)
