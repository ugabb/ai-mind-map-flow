'use client'

import { CheckCircle2, Copy, Download, Volume2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type SummaryItem = {
  content: string
  type: 'response' | 'source' | 'whiteboard'
  bbox?: any
  is_invalid?: boolean
  og_source?: string
  pre_delta?: any
  identifier?: string
  title?: string
  wtype?: string
}

type SummaryData = {
  summary: SummaryItem[]
}

type SummaryTabProps = {
  data?: SummaryData
}

export function SummaryTab({ data }: SummaryTabProps) {
  const [isReading, setIsReading] = useState(false)
  const [copiedItems, setCopiedItems] = useState<Set<number>>(new Set())

  // Parse the summary data or use default
  const summaryData = data || {
    summary: [
      {
        content:
          '## A Busca Pelo Foco Produtivo\n- O autor descreve um estado de foco e concentração intensa, onde o mundo desaparece e a pessoa apenas executa o que planejou, como a melhor sensação do mundo, que ele busca constantemente\n- Ele se identifica como alguém com **TDAH**, para quem momentos de foco são raros, ocorrendo talvez uma ou duas vezes por dia por mais de meia hora, e são considerados sagrados\n- Frequentemente, ele se sente culpado por não conseguir entrar nesse estado de foco, percebendo que confunde essa dificuldade com preguiça, mas na verdade é uma incapacidade de alcançar o estado de concentração',
        type: 'response',
      },
      {
        content: '【0.04】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【0】',
      },
      {
        content: '【29.24】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【1】',
      },
      {
        content: '【57.48】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【2】',
      },
      {
        content: '【83.88】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【3】',
      },
      {
        content:
          '## Diferenciando Cansaço e Preguiça\n- O autor percebeu que só consegue focar quando está **descansado**, o que geralmente ocorre por volta das 9h da manhã, uma hora e meia depois de acordar\n- Para que sua mente comece a funcionar, ele precisa de uma rotina matinal que inclui acordar, tomar banho, tomar café e comer algo\n- Para otimizar a produtividade, ele cria uma lista de tarefas diárias e começa pela mais difícil, comparando-a ao treino de pernas na segunda-feira, para aproveitar a mente fresca da manhã e evitar a procrastinação por cansaço posterior',
        type: 'response',
      },
      {
        content: '【115.759】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【4】',
      },
      {
        content: '【135.599】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【5】',
      },
      {
        content: '【153.72】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【6】',
      },
      {
        content:
          '## Rotina Idealizada\n- O autor idealiza uma rotina de acordar às 4h da manhã, trabalhar até as 15h ou 16h, e dormir às 20h30, assistindo a um filme até as 21h30\n- Ele acredita que seria muito feliz vivendo assim, apesar de reconhecer que é uma rotina um tanto egoísta para as pessoas ao seu redor e difícil de implementar devido a compromissos de trabalho e burocracias de visto no momento',
        type: 'response',
      },
      {
        content: '【393.759】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【17】',
      },
      {
        content: '【415.12】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【18】',
      },
      {
        content: '【436.12】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【19】',
      },
      {
        content: '【453.72】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【20】',
      },
      {
        content:
          '## Estratégias de Produtividade\n- O autor desenvolveu várias estratégias para maximizar seus momentos de foco, incluindo a criação de um ambiente de trabalho otimizado\n- Ele utiliza técnicas de pomodoro e intervalos regulares para manter a energia mental durante o dia\n- A meditação matinal tornou-se uma parte essencial de sua rotina, ajudando-o a entrar no estado de foco mais rapidamente',
        type: 'response',
      },
      {
        content: '【500.15】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【21】',
      },
      {
        content: '【520.30】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【22】',
      },
      {
        content: '【540.45】',
        type: 'source',
        bbox: null,
        is_invalid: false,
        og_source: '【23】',
      },
    ],
  }

  // Process content with inline timestamps
  const processSummaryData = () => {
    const processedItems: Array<{
      content: string
      timestamps: string[]
      type: 'text' | 'header'
    }> = []

    let currentText = ''
    let currentTimestamps: string[] = []

    summaryData.summary.forEach((item, _index) => {
      if (item.type === 'response') {
        // If we have accumulated text and timestamps, save them
        if (currentText.trim()) {
          processedItems.push({
            content: currentText.trim(),
            timestamps: [...currentTimestamps],
            type: 'text',
          })
        }

        // Start new text block
        currentText = item.content
        currentTimestamps = []
      } else if (item.type === 'source' && item.content.match(/【[\d.]+】/)) {
        // Add timestamp to current text block
        currentTimestamps.push(item.content)
      }
    })

    // Add the last text block
    if (currentText.trim()) {
      processedItems.push({
        content: currentText.trim(),
        timestamps: [...currentTimestamps],
        type: 'text',
      })
    }

    return processedItems
  }

  const processedData = processSummaryData()

  const formatTimestamp = (timestamp: string) => {
    const match = timestamp.match(/【([\d.]+)】/)
    if (!match) {
      return timestamp
    }

    const seconds = Number.parseFloat(match[1])
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleCopyToClipboard = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedItems((prev) => new Set(Array.from(prev).concat(index)))
      toast.success('Copied to clipboard!')

      // Remove the checkmark after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(Array.from(prev))
          newSet.delete(index)
          return newSet
        })
      }, 2000)
    } catch (_err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleReadAloud = async (content: string) => {
    if (isReading) {
      speechSynthesis.cancel()
      setIsReading(false)
      return
    }

    try {
      // Remove markdown formatting for better speech
      const cleanContent = content
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/- /g, '') // Remove bullet points
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .trim()

      const utterance = new SpeechSynthesisUtterance(cleanContent)
      utterance.lang = 'pt-BR' // Portuguese
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onerror = () => {
        setIsReading(false)
        toast.error('Error reading text aloud')
      }

      speechSynthesis.speak(utterance)
    } catch (_err) {
      toast.error('Text-to-speech not supported')
    }
  }

  const handleSaveSummary = () => {
    try {
      const fullContent = processedData.map((item) => item.content).join('\n\n')

      const blob = new Blob([fullContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'summary.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('Summary saved successfully!')
    } catch (_err) {
      toast.error('Failed to save summary')
    }
  }

  const handleTimestampClick = (timestamp: string) => {
    // Extract the time value and convert to seconds
    const match = timestamp.match(/【([\d.]+)】/)
    if (match) {
      const _seconds = Number.parseFloat(match[1])
      // This would typically trigger a video seek action
      // For now, we'll just show a toast
      toast.success(`Seek to ${formatTimestamp(timestamp)}`)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-shrink-0 items-center justify-between border-b p-4">
        <h2 className="font-semibold text-lg">Video Summary</h2>
        <div className="flex gap-2">
          <Button
            className="flex items-center gap-2"
            onClick={handleSaveSummary}
            size="sm"
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <ScrollArea className="h-full p-4">
          <Card className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">
                  Video Summary
                </CardTitle>
                <div className="ml-4 flex gap-2">
                  <Button
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      handleCopyToClipboard(
                        processedData.map((item) => item.content).join('\n\n'),
                        0
                      )
                    }
                    size="sm"
                    variant="ghost"
                  >
                    {copiedItems.has(0) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      handleReadAloud(
                        processedData.map((item) => item.content).join('\n\n')
                      )
                    }
                    size="sm"
                    variant="ghost"
                  >
                    <Volume2
                      className={`h-4 w-4 ${isReading ? 'text-primary' : ''}`}
                    />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-6">
                {/* Render each text block with its associated timestamps */}
                {processedData.map((item, itemIndex) => (
                  <div className="space-y-3" key={itemIndex}>
                    {/* Render content line by line */}
                    {item.content.split('\n').map((line, lineIndex) => {
                      // Handle headers
                      if (line.match(/^#{1,6}\s+/)) {
                        const level = line.match(/^(#{1,6})/)?.[1].length || 1
                        const text = line.replace(/^#{1,6}\s+/, '')
                        return (
                          <h3
                            className={`mt-6 mb-3 font-semibold text-foreground ${
                              level === 1
                                ? 'text-lg'
                                : level === 2
                                  ? 'text-base'
                                  : 'text-sm'
                            }`}
                            key={lineIndex}
                          >
                            {text}
                          </h3>
                        )
                      }

                      // Handle bullet points
                      if (line.trim().startsWith('- ')) {
                        return (
                          <div
                            className="mb-2 flex items-start gap-2"
                            key={lineIndex}
                          >
                            <span className="mt-1 text-muted-foreground text-sm">
                              •
                            </span>
                            <div className="flex-1">
                              <span className="text-sm leading-relaxed">
                                {line.replace(/^-\s*/, '')}
                              </span>
                              {/* Show timestamps for this text block */}
                              {item.timestamps.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {item.timestamps.map((timestamp, tsIndex) => (
                                    <Badge
                                      className="cursor-pointer text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                                      key={tsIndex}
                                      onClick={() =>
                                        handleTimestampClick(timestamp)
                                      }
                                      variant="outline"
                                    >
                                      {formatTimestamp(timestamp)}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      }

                      // Handle regular paragraphs
                      if (line.trim()) {
                        return (
                          <div className="mb-3" key={lineIndex}>
                            <p className="text-sm leading-relaxed">{line}</p>
                            {/* Show timestamps for this text block */}
                            {item.timestamps.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {item.timestamps.map((timestamp, tsIndex) => (
                                  <Badge
                                    className="cursor-pointer text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                                    key={tsIndex}
                                    onClick={() =>
                                      handleTimestampClick(timestamp)
                                    }
                                    variant="outline"
                                  >
                                    {formatTimestamp(timestamp)}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      }

                      // Handle empty lines
                      return <div className="h-2" key={lineIndex} />
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  )
}
