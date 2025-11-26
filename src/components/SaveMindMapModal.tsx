'use client'

import { useRef } from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { LuSave } from 'react-icons/lu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from './ui/button'
import { Input } from './ui/input'

type SaveMindMapModalProps = {
  onSave: (title: string) => Promise<void>
  isPending: boolean
  title?: string
}

export const SaveMindMapModal = (props: SaveMindMapModalProps) => {
  const { onSave, isPending, title } = props
  const titleRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <DialogTrigger>
            <TooltipTrigger>
              <LuSave className="h-24 w-24 translate-y-8 cursor-pointer rounded-md transition-transform hover:translate-y-5" />
            </TooltipTrigger>
            <TooltipContent className="bg-primary">
              <p>Save Mind Map</p>
            </TooltipContent>
          </DialogTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Mind Map</DialogTitle>
        </DialogHeader>
        <Input
          defaultValue={title ? title : ''}
          placeholder="Title"
          ref={titleRef}
        />
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => {
            onSave(titleRef.current ? titleRef.current.value : '')
          }}
        >
          {isPending ? (
            <ImSpinner8 className="z-50 h-5 w-5 animate-spin text-primary-foreground" />
          ) : (
            'Save'
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
