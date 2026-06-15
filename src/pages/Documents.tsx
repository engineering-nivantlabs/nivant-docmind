import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, FileText, Trash2, MessageSquare, Link2, Clock, ChevronDown, LayoutGrid, List } from 'lucide-react'
import { useDocuments } from '@/context/DocumentContext'
import PageHeader from '@/components/shared/PageHeader'
import DocumentCard from '@/components/documents/DocumentCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'name' | 'pages'

export default function Documents() {
  const { documents, setActiveDocumentId, createSession, setActiveSessionId, removeDocument } = useDocuments()
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const navigate = useNavigate()

  const handleChat = (docId: string) => {
    setActiveDocumentId(docId)
    const doc = documents.find(d => d.id === docId)
    if (doc) {
      const sessionId = createSession(docId, `Chat about ${doc.name}`)
      setActiveSessionId(sessionId)
      navigate('/dashboard')
    }
  }

  const filtered = documents
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name': return a.name.localeCompare(b.name)
        case 'pages': return b.pages - a.pages
        default: return 0
      }
    })

  const statusColors: Record<string, string> = {
    ready: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <PageHeader
        title="Documents"
        description={`${documents.length} document${documents.length !== 1 ? 's' : ''} in your library`}
      >
        <Button
          onClick={() => navigate('/upload')}
          size="sm"
          className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white"
        >
          Upload New
        </Button>
      </PageHeader>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6"
      >
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                Sort: {sortBy}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(['newest', 'oldest', 'name', 'pages'] as SortOption[]).map(option => (
                <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid view */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              index={i}
              onChat={handleChat}
            />
          ))}
        </div>
      ) : (
        /* List view */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Name</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(doc => (
                  <TableRow key={doc.id} className="group hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center flex-shrink-0">
                          {doc.type === 'url' ? (
                            <Link2 size={16} className="text-[hsl(158,64%,40%)]" />
                          ) : (
                            <FileText size={16} className="text-[hsl(158,64%,40%)]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {doc.pages}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('text-xs', statusColors[doc.status])}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock size={12} />
                        {formatDate(doc.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => handleChat(doc.id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MessageSquare size={14} />
                        </Button>
                        <Button
                          onClick={() => removeDocument(doc.id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search size={32} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">No documents found matching "{search}"</p>
        </div>
      )}
    </div>
  )
}
