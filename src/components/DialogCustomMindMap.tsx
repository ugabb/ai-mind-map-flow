import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNodeStore } from '@/store/NodeStore'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

function DialogCustomMindMap() {
  const [mindMapData, setMindMapData] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { setMindMapToGenerate } = useNodeStore()

  const handleSubmit = () => {
    if (!mindMapData.trim()) {
      toast.error('Please enter mind map data')
      return
    }

    try {
      // Validate JSON format
      const data = JSON.parse(mindMapData)
      setMindMapToGenerate(data)
      setIsOpen(false)
      setMindMapData('')
      toast.success('Mind map data applied successfully!')
    } catch (_error) {
      toast.error('Invalid JSON format. Please check your input.')
    }
  }

  const exampleData = {
    name: 'Root Topic',
    children: [
      {
        name: 'Subtopic 1',
        children: [{ name: 'Detail 1.1' }, { name: 'Detail 1.2' }],
      },
      {
        name: 'Subtopic 2',
        children: [{ name: 'Detail 2.1' }, { name: 'Detail 2.2' }],
      },
    ],
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Custom Mind Map</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-lg">Custom Mind Map Data</h2>
            <p className="text-muted-foreground text-sm">
              Enter your mind map data in JSON format
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-sm" htmlFor="mindMapData">
              Mind Map JSON:
            </label>
            <textarea
              className="h-64 w-full resize-none rounded-md border border-gray-300 p-3 font-mono text-sm"
              id="mindMapData"
              onChange={(e) => setMindMapData(e.target.value)}
              placeholder={`Example format:\n${JSON.stringify(
                exampleData,
                null,
                2
              )}`}
              value={mindMapData}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => {
                setIsOpen(false)
                setMindMapData('')
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Apply Mind Map</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustomMindMap
