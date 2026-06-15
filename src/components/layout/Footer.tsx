import { FileText, Github, Twitter, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(158,64%,40%)]">
                <FileText size={18} strokeWidth={2} className="text-white" />
              </div>
              <span className="font-bold text-lg">DocuChat</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Chat with your documents using AI. Extract answers, summarize content, and analyze PDFs in seconds.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/upload" className="text-sm text-gray-400 hover:text-white transition-colors">Upload</Link></li>
              <li><Link to="/documents" className="text-sm text-gray-400 hover:text-white transition-colors">Documents</Link></li>
              <li><Link to="/settings" className="text-sm text-gray-400 hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Resources</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">API Reference</span></li>
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Changelog</span></li>
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Legal</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DocuChat. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Github size={18} />
            </span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Twitter size={18} />
            </span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Mail size={18} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
