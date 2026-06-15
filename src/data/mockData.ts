export interface Document {
  id: string;
  name: string;
  pages: number;
  size: string;
  createdAt: string;
  status: 'ready' | 'processing' | 'error';
  type: 'pdf' | 'url';
  url?: string;
  content?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { page: number; text: string }[];
}

export interface ChatSession {
  id: string;
  documentId: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Q3_Financial_Report_2024.pdf',
    pages: 42,
    size: '3.2 MB',
    createdAt: '2024-10-15T10:30:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Quarterly financial report covering revenue growth, expense analysis, and forward-looking projections for Q3 2024.',
  },
  {
    id: '2',
    name: 'Machine_Learning_Research_Paper.pdf',
    pages: 28,
    size: '1.8 MB',
    createdAt: '2024-10-12T14:20:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Research paper on transformer architectures for natural language processing tasks.',
  },
  {
    id: '3',
    name: 'Employee_Handbook_2024.pdf',
    pages: 65,
    size: '4.5 MB',
    createdAt: '2024-10-10T09:00:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Complete employee handbook covering company policies, benefits, and procedures.',
  },
  {
    id: '4',
    name: 'Product_Roadmap_Q4.pdf',
    pages: 18,
    size: '1.2 MB',
    createdAt: '2024-10-08T16:45:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Product roadmap for Q4 2024 including feature releases and timeline.',
  },
  {
    id: '5',
    name: 'Customer_Survey_Results.pdf',
    pages: 35,
    size: '2.7 MB',
    createdAt: '2024-10-05T11:15:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Results from the annual customer satisfaction survey with detailed analysis.',
  },
  {
    id: '6',
    name: 'API_Documentation_v2.pdf',
    pages: 56,
    size: '3.9 MB',
    createdAt: '2024-10-01T08:30:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Complete API documentation for version 2.0 of the platform.',
  },
  {
    id: '7',
    name: 'Marketing_Strategy_2024.pdf',
    pages: 24,
    size: '1.6 MB',
    createdAt: '2024-09-28T13:00:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Annual marketing strategy document with campaign plans and budget allocation.',
  },
  {
    id: '8',
    name: 'Security_Audit_Report.pdf',
    pages: 31,
    size: '2.3 MB',
    createdAt: '2024-09-25T15:20:00Z',
    status: 'ready',
    type: 'pdf',
    content: 'Annual security audit report with findings and recommendations.',
  },
  {
    id: '9',
    name: 'Onboarding_Guide.pdf',
    pages: 22,
    size: '1.4 MB',
    createdAt: '2024-09-20T10:00:00Z',
    status: 'processing',
    type: 'pdf',
    content: 'New employee onboarding guide with step-by-step instructions.',
  },
  {
    id: '10',
    name: 'https://example.com/industry-report',
    pages: 1,
    size: '-',
    createdAt: '2024-09-18T09:30:00Z',
    status: 'ready',
    type: 'url',
    url: 'https://example.com/industry-report',
  },
];

export const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    documentId: '1',
    title: 'Q3 Financial Analysis',
    updatedAt: '2024-10-15T11:00:00Z',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'What was our total revenue in Q3 2024?',
        timestamp: '2024-10-15T10:35:00Z',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Based on the Q3 2024 Financial Report, your total revenue for Q3 2024 was $12.4 million, representing a 15.3% increase from Q2 2024 ($10.8 million) and a 28.7% year-over-year increase from Q3 2023 ($9.6 million).',
        timestamp: '2024-10-15T10:35:02Z',
        sources: [{ page: 3, text: 'Total Q3 2024 revenue: $12.4M (+15.3% QoQ, +28.7% YoY)' }],
      },
      {
        id: '3',
        role: 'user',
        content: 'What were the main expense categories?',
        timestamp: '2024-10-15T10:36:00Z',
      },
      {
        id: '4',
        role: 'assistant',
        content: 'The main expense categories in Q3 2024 were:\n\n1. **Research & Development** — $3.2M (25.8% of revenue)\n2. **Sales & Marketing** — $2.8M (22.6% of revenue)\n3. **General & Administrative** — $1.6M (12.9% of revenue)\n4. **Cost of Revenue** — $2.1M (16.9% of revenue)\n5. **Operations** — $1.4M (11.3% of revenue)\n\nTotal operating expenses were $11.1M, resulting in an operating income of $1.3M.',
        timestamp: '2024-10-15T10:36:03Z',
        sources: [
          { page: 7, text: 'R&D expenses: $3.2M' },
          { page: 8, text: 'S&M expenses: $2.8M' },
          { page: 9, text: 'G&A expenses: $1.6M' },
        ],
      },
      {
        id: '5',
        role: 'user',
        content: 'Summarize the cash flow statement',
        timestamp: '2024-10-15T10:38:00Z',
      },
      {
        id: '6',
        role: 'assistant',
        content: 'Here is a summary of the Q3 2024 cash flow statement:\n\n**Operating Activities:** +$2.4M\n- Positive cash flow driven by increased revenue collection and improved accounts receivable turnover\n\n**Investing Activities:** -$1.8M\n- Capital expenditures on server infrastructure: $1.2M\n- Acquisition of smaller tooling company: $0.6M\n\n**Financing Activities:** -$0.5M\n- Debt repayment: $0.5M\n\n**Net Change in Cash:** +$0.1M\n**Ending Cash Balance:** $8.7M\n\nThe company maintains a healthy cash position with strong operating cash flow generation.',
        timestamp: '2024-10-15T10:38:04Z',
        sources: [{ page: 15, text: 'Net cash increase: $0.1M, Ending balance: $8.7M' }],
      },
    ],
  },
  {
    id: '2',
    documentId: '2',
    title: 'ML Paper Deep Dive',
    updatedAt: '2024-10-14T16:00:00Z',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'What is the main contribution of this paper?',
        timestamp: '2024-10-14T15:00:00Z',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'The main contribution of this paper is a novel attention mechanism called "Adaptive Sparse Attention" (ASA) that reduces computational complexity from O(n^2) to O(n log n) while maintaining 98.5% of the performance of full attention on benchmark tasks.',
        timestamp: '2024-10-14T15:00:02Z',
      },
    ],
  },
  {
    id: '3',
    documentId: '3',
    title: 'Employee Benefits Q&A',
    updatedAt: '2024-10-13T11:00:00Z',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'How many PTO days do I get?',
        timestamp: '2024-10-13T10:00:00Z',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'According to the Employee Handbook, full-time employees receive 20 days of paid time off (PTO) per year, accrued at 1.67 days per month. After 2 years of service, this increases to 25 days per year.',
        timestamp: '2024-10-13T10:00:01Z',
      },
    ],
  },
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Financial Analyst',
    company: 'TechVentures Inc.',
    avatar: 'SC',
    text: 'DocuChat saved me hours of manual document review. I uploaded a 200-page financial report and got precise answers to my questions in seconds.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Research Director',
    company: 'Academic Labs',
    avatar: 'MJ',
    text: 'As a researcher, I work with dozens of papers weekly. DocuChat helps me extract key insights and cross-reference findings across multiple documents effortlessly.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'HR Manager',
    company: 'Global Solutions',
    avatar: 'ER',
    text: 'Our HR team uses DocuChat daily to answer employee questions about policies. It is like having an extra team member who knows every document inside and out.',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Product Manager',
    company: 'StartupXYZ',
    avatar: 'DP',
    text: 'The ability to chat with product specs and user research documents has transformed how our team makes decisions. Highly recommend for any product team.',
    rating: 5,
  },
];

export const mockPricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Perfect for individuals getting started',
    features: [
      '3 documents per month',
      '50 pages per document',
      'Basic Q&A functionality',
      'Community support',
    ],
    notIncluded: [
      'URL parsing',
      'Advanced analytics',
      'Team collaboration',
      'API access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    period: 'month',
    description: 'For professionals who need more power',
    features: [
      'Unlimited documents',
      '500 pages per document',
      'Advanced Q&A with citations',
      'URL parsing',
      'Document summarization',
      'Priority support',
    ],
    notIncluded: [
      'Team collaboration',
      'API access',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 49,
    period: 'month',
    description: 'For teams that need to collaborate',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Shared document library',
      'Team analytics dashboard',
      'API access',
      'SSO & advanced security',
      'Dedicated support',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const mockUsageStats = {
  documentsUploaded: 24,
  questionsAsked: 156,
  pagesProcessed: 1847,
  aiResponses: 312,
  dailyActivity: [
    { day: 'Mon', documents: 3, questions: 12 },
    { day: 'Tue', documents: 2, questions: 18 },
    { day: 'Wed', documents: 5, questions: 22 },
    { day: 'Thu', documents: 4, questions: 15 },
    { day: 'Fri', documents: 3, questions: 20 },
    { day: 'Sat', documents: 1, questions: 8 },
    { day: 'Sun', documents: 0, questions: 5 },
  ],
  monthlyUsage: [
    { month: 'Jul', documents: 8, questions: 45 },
    { month: 'Aug', documents: 12, questions: 78 },
    { month: 'Sep', documents: 18, questions: 120 },
    { month: 'Oct', documents: 24, questions: 156 },
  ],
};
