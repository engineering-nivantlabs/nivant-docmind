import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Key, Palette, BarChart3, Save, Eye, EyeOff } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { mockUsageStats } from '@/data/mockData'
import { useTheme } from '@/context/ThemeContext'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts'

export default function Settings() {
  useTheme()
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [saved, setSaved] = useState(false)
  const [accountForm, setAccountForm] = useState({
    name: 'Demo User',
    email: 'demo@docuchat.ai',
    company: 'Acme Corp',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const statCards = [
    { label: 'Documents', value: mockUsageStats.documentsUploaded, icon: BarChart3 },
    { label: 'Questions Asked', value: mockUsageStats.questionsAsked, icon: BarChart3 },
    { label: 'Pages Processed', value: mockUsageStats.pagesProcessed, icon: BarChart3 },
    { label: 'AI Responses', value: mockUsageStats.aiResponses, icon: BarChart3 },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <PageHeader title="Settings" description="Manage your account, preferences, and API configuration." />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-4 max-w-lg">
            <TabsTrigger value="account" className="gap-1.5 text-xs sm:text-sm">
              <User size={14} className="hidden sm:block" />
              Account
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-1.5 text-xs sm:text-sm">
              <Key size={14} className="hidden sm:block" />
              API Key
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-1.5 text-xs sm:text-sm">
              <Palette size={14} className="hidden sm:block" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-1.5 text-xs sm:text-sm">
              <BarChart3 size={14} className="hidden sm:block" />
              Usage
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Account Information</CardTitle>
                <CardDescription>Update your profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={accountForm.name}
                      onChange={e => setAccountForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={accountForm.email}
                      onChange={e => setAccountForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={accountForm.company}
                    onChange={e => setAccountForm(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[hsl(158,64%,40%)] flex items-center justify-center text-white font-bold text-sm">
                      DU
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile Picture</p>
                      <p className="text-xs text-muted-foreground">Manage your avatar</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                <div className="pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white gap-2"
                  >
                    <Save size={14} />
                    {saved ? 'Saved!' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Key Tab */}
          <TabsContent value="api">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">API Configuration</CardTitle>
                <CardDescription>Manage your API keys for programmatic access.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="api-key"
                        type={apiKeyVisible ? 'text' : 'password'}
                        value="sk-docuchat-demo-7f8a9b2c3d4e5f60718293a4"
                        readOnly
                        className="font-mono text-sm pr-10"
                      />
                      <button
                        onClick={() => setApiKeyVisible(!apiKeyVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {apiKeyVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">AI Model</Label>
                  <Input id="model" value="gpt-4o" readOnly className="bg-muted/50" />
                  <p className="text-xs text-muted-foreground">The AI model used for document processing and chat responses.</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">Rate Limiting</p>
                    <p className="text-xs text-muted-foreground">100 requests per minute</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                    Regenerate API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Customize how DocuChat looks for you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Theme</p>
                    <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Compact Mode</p>
                    <p className="text-xs text-muted-foreground">Reduce spacing for denser layout</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Show Citations</p>
                    <p className="text-xs text-muted-foreground">Display source citations in AI responses</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-save Chats</p>
                    <p className="text-xs text-muted-foreground">Automatically save conversation history</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage">
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center">
                            <stat.icon size={16} className="text-[hsl(158,64%,40%)]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Daily Activity</CardTitle>
                    <CardDescription>Questions asked per day this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={mockUsageStats.dailyActivity}>
                        <defs>
                          <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(158,64%,40%)" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="hsl(158,64%,40%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="questions"
                          stroke="hsl(158,64%,40%)"
                          fillOpacity={1}
                          fill="url(#colorQuestions)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Monthly Growth</CardTitle>
                    <CardDescription>Documents and questions over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={mockUsageStats.monthlyUsage}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="documents" fill="hsl(158,64%,40%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="questions" fill="hsl(158,64%,70%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
