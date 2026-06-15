import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { DocumentProvider } from '@/context/DocumentContext'
import LandingLayout from '@/components/layout/LandingLayout'
import AppLayout from '@/components/layout/AppLayout'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Upload from '@/pages/Upload'
import Documents from '@/pages/Documents'
import Settings from '@/pages/Settings'

export default function App() {
  return (
    <ThemeProvider>
      <DocumentProvider>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </DocumentProvider>
    </ThemeProvider>
  )
}
