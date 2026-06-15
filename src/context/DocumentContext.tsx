import { createContext, useContext, useState, type ReactNode } from 'react'
import { mockDocuments, mockChatSessions } from '@/data/mockData'
import type { Document, ChatSession, ChatMessage } from '@/data/mockData'

interface DocumentContextType {
  documents: Document[]
  chatSessions: ChatSession[]
  activeDocumentId: string | null
  activeSessionId: string | null
  addDocument: (doc: Document) => void
  removeDocument: (id: string) => void
  setActiveDocumentId: (id: string | null) => void
  setActiveSessionId: (id: string | null) => void
  addMessage: (sessionId: string, message: ChatMessage) => void
  createSession: (documentId: string, title: string) => string
  deleteSession: (sessionId: string) => void
}

const DocumentContext = createContext<DocumentContextType>({
  documents: [],
  chatSessions: [],
  activeDocumentId: null,
  activeSessionId: null,
  addDocument: () => {},
  removeDocument: () => {},
  setActiveDocumentId: () => {},
  setActiveSessionId: () => {},
  addMessage: () => {},
  createSession: () => '',
  deleteSession: () => {},
})

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(mockChatSessions)
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>('1')
  const [activeSessionId, setActiveSessionId] = useState<string | null>('1')

  const addDocument = (doc: Document) => {
    setDocuments(prev => [doc, ...prev])
  }

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
    setChatSessions(prev => prev.filter(s => s.documentId !== id))
    if (activeDocumentId === id) {
      setActiveDocumentId(null)
      setActiveSessionId(null)
    }
  }

  const addMessage = (sessionId: string, message: ChatMessage) => {
    setChatSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, messages: [...session.messages, message], updatedAt: message.timestamp }
          : session
      )
    )
  }

  const createSession = (documentId: string, title: string) => {
    const id = Date.now().toString()
    const newSession: ChatSession = {
      id,
      documentId,
      title,
      messages: [],
      updatedAt: new Date().toISOString(),
    }
    setChatSessions(prev => [newSession, ...prev])
    setActiveSessionId(id)
    return id
  }

  const deleteSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId))
    if (activeSessionId === sessionId) {
      setActiveSessionId(null)
    }
  }

  return (
    <DocumentContext.Provider value={{
      documents,
      chatSessions,
      activeDocumentId,
      activeSessionId,
      addDocument,
      removeDocument,
      setActiveDocumentId,
      setActiveSessionId,
      addMessage,
      createSession,
      deleteSession,
    }}>
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocuments = () => useContext(DocumentContext)
