import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { 
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  FileText, Upload, Activity, Download, Search, Menu, X, LogOut, Settings, 
  Bell, ChevronDown, RefreshCw, MessageSquare, Briefcase, Mail, Eye, Trash2, Lock
} from 'lucide-react';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  experience: string;
  startDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

interface Project {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resumeUrl?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected';
  createdAt: string;
}

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch { return 'Invalid Date'; }
};

const formatDateTime = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch { return 'Invalid Date'; }
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (username === 'admin' && password === '123456789') {
        onLogin();
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170961] to-[#2d1b69] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#170961] rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent transition-all"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent transition-all"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#170961] text-white py-3 rounded-lg font-semibold hover:bg-[#120747] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Protected admin access only</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'applications' | 'projects' | 'messages' | 'jobs'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentUser] = useState({ name: 'Admin User', role: 'admin', email: 'admin@example.com' });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const { data: applications = [], isLoading: loadingApps, refetch: refetchApps } = useQuery<Application[]>({
    queryKey: ['applications', filterStatus],
    queryFn: async () => {
      let q;
      if (filterStatus === 'all') {
        q = query(collection(db, 'academy_applications'), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'academy_applications'), where('status', '==', filterStatus), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data() as Partial<Application>;
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          program: data.program || '',
          experience: data.experience || '',
          startDate: data.startDate || '',
          reason: data.reason || '',
          status: data.status || 'pending',
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || data.createdAt || new Date().toISOString()
        } as Application;
      });
    },
    staleTime: 30000,
    enabled: isAuthenticated,
  });

  const { data: projects = [], isLoading: loadingProjects, refetch: refetchProjects } = useQuery<Project[]>({
    queryKey: ['projects', filterStatus],
    queryFn: async () => {
      let q;
      if (filterStatus === 'all') {
        q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'projects'), where('status', '==', filterStatus), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data() as Partial<Project>;
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          company: data.company || '',
          projectType: data.projectType || '',
          budget: data.budget || '',
          timeline: data.timeline || '',
          description: data.description || '',
          status: data.status || 'pending',
          createdAt: data.createdAt || new Date().toISOString()
        } as Project;
      });
    },
    staleTime: 30000,
    enabled: isAuthenticated,
  });

  const { data: messages = [], isLoading: loadingMessages, refetch: refetchMessages } = useQuery<Message[]>({
    queryKey: ['messages', filterStatus],
    queryFn: async () => {
      let q;
      if (filterStatus === 'all') {
        q = query(collection(db, 'contactMessages'), orderBy('timestamp', 'desc'));
      } else {
        q = query(collection(db, 'contactMessages'), where('status', '==', filterStatus), orderBy('timestamp', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data() as any;
        let createdAt = new Date().toISOString();
        if (data.timestamp) {
          if (typeof data.timestamp.toDate === 'function') {
            createdAt = data.timestamp.toDate().toISOString();
          } else if (data.timestamp instanceof Date) {
            createdAt = data.timestamp.toISOString();
          } else if (typeof data.timestamp === 'string') {
            createdAt = data.timestamp;
          }
        }
        
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          subject: data.subject || '',
          message: data.message || '',
          status: data.status || 'unread',
          createdAt: createdAt
        } as Message;
      });
    },
    staleTime: 30000,
    enabled: isAuthenticated,
  });

  const { data: jobApplications = [], isLoading: loadingJobs, refetch: refetchJobs } = useQuery<JobApplication[]>({
    queryKey: ['jobApplications', filterStatus],
    queryFn: async () => {
      let q;
      if (filterStatus === 'all') {
        q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'applications'), where('status', '==', filterStatus), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          position: data.role || data.position || '',
          experience: data.experience || 'Not specified',
          coverLetter: data.coverLetter || `LinkedIn: ${data.linkedin || 'N/A'}\nGitHub: ${data.github || 'N/A'}\nPortfolio: ${data.portfolio || 'N/A'}`,
          resumeUrl: data.resumeUrl || '',
          status: data.status || 'pending',
          createdAt: data.createdAt || new Date().toISOString()
        } as JobApplication;
      });
    },
    staleTime: 30000,
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowUserMenu(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchApps(), refetchProjects(), refetchMessages(), refetchJobs()]);
    setIsRefreshing(false);
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return alert('No data to export');
    const headers = Object.keys(data[0]);
    const csv = [headers.join(','), ...data.map(row => headers.map(h => JSON.stringify((row[h] || '').toString())).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const filteredApplications = applications.filter(app =>
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.program?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.projectType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(m =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobApplications = jobApplications.filter(j =>
    j.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const metrics = [
    { title: 'Course Applications', value: applications.length, change: 12.5, icon: <FileText className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Unread Messages', value: messages.filter(m => m.status === 'unread').length, change: 8.2, icon: <MessageSquare className="w-6 h-6" />, color: 'bg-yellow-500' },
    { title: 'Job Applications', value: jobApplications.length, change: 15.3, icon: <Briefcase className="w-6 h-6" />, color: 'bg-green-500' },
    { title: 'Active Projects', value: projects.filter(p => p.status === 'approved').length, change: -3.1, icon: <Upload className="w-6 h-6" />, color: 'bg-purple-500' },
  ];

  const COLORS = ['#170961', '#4338ca', '#7c3aed', '#a78bfa'];

  if (loadingApps || loadingProjects || loadingMessages || loadingJobs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#170961] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className={`fixed left-0 top-0 h-full bg-[#170961] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden z-40`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Portal</h2>
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: <Activity /> },
              { id: 'messages', label: `Messages (${messages.length})`, icon: <MessageSquare />, badge: messages.filter(m => m.status === 'unread').length },
              { id: 'jobs', label: `Job Applications (${jobApplications.length})`, icon: <Briefcase />, badge: jobApplications.filter(j => j.status === 'pending').length },
              { id: 'applications', label: `Course Applications (${applications.length})`, icon: <FileText />, badge: applications.filter(a => a.status === 'pending').length },
              { id: 'projects', label: `Projects (${projects.length})`, icon: <Activity /> },
            ].map(item => (
              <button key={item.id} onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${activeView === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                {item.icon}
                <span className="text-sm flex-1 text-left">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-[#170961]">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleRefresh} disabled={isRefreshing} className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50">
                <RefreshCw className={`w-6 h-6 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {(messages.filter(m => m.status === 'unread').length > 0 || applications.filter(a => a.status === 'pending').length > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-[#170961] rounded-full flex items-center justify-center text-white font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                      <Settings className="w-4 h-4" />Settings
                    </button>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {activeView === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((m, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${m.color} p-3 rounded-lg text-white`}>{m.icon}</div>
                      <span className={`text-sm font-semibold ${m.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {m.change >= 0 ? '+' : ''}{m.change}%
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{m.title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{m.value}</p>
                  </div>
                ))}
              </div>
              {applications.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Application Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={[
                          { name: 'Pending', value: applications.filter(a => a.status === 'pending').length },
                          { name: 'Approved', value: applications.filter(a => a.status === 'approved').length },
                          { name: 'Rejected', value: applications.filter(a => a.status === 'rejected').length },
                        ].filter(d => d.value > 0)}
                          cx="50%" cy="50%" labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100} dataKey="value">
                          {COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Programs Applied For</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={applications.reduce((acc, app) => {
                        const existing = acc.find(item => item.program === app.program);
                        if (existing) existing.count += 1;
                        else acc.push({ program: app.program, count: 1 });
                        return acc;
                      }, [] as { program: string; count: number }[])}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="program" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#170961" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
                  <p className="text-gray-500">Once you receive applications, analytics will appear here.</p>
                </div>
              )}
            </>
          )}

          {activeView === 'messages' && (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent" />
                  </div>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
                <button onClick={() => exportToCSV(filteredMessages, 'messages')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#170961] text-white rounded-lg hover:bg-[#120747] transition-colors">
                  <Download className="w-4 h-4" />Export CSV
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden max-h-[calc(100vh-250px)] overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Found</h3>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredMessages.map((msg) => (
                        <button key={msg.id} onClick={() => setSelectedMessage(msg)}
                          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-blue-50' : ''} ${msg.status === 'unread' ? 'bg-yellow-50' : ''}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 truncate flex-1">{msg.name}</h4>
                            {msg.status === 'unread' && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>}
                          </div>
                          <p className="text-sm text-gray-600 truncate mb-1">{msg.subject}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(msg.createdAt)}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                  {selectedMessage ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {selectedMessage.email}
                            </span>
                            <span>{formatDateTime(selectedMessage.createdAt)}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedMessage.status === 'unread' ? 'bg-blue-100 text-blue-800' :
                          selectedMessage.status === 'read' ? 'bg-gray-100 text-gray-800' :
                          'bg-green-100 text-green-800'
                        }`}>{selectedMessage.status}</span>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">From:</h3>
                        <p className="text-gray-900">{selectedMessage.name}</p>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Message:</h3>
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-[#170961] text-white rounded-lg hover:bg-[#120747] transition-colors">
                          Reply
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Mark as Read
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Mail className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600">Select a message to view</h3>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeView === 'jobs' && (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search job applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent" />
                  </div>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={() => exportToCSV(filteredJobApplications, 'job-applications')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#170961] text-white rounded-lg hover:bg-[#120747] transition-colors">
                  <Download className="w-4 h-4" />Export CSV
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden max-h-[calc(100vh-250px)] overflow-y-auto">
                  {filteredJobApplications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredJobApplications.map((job) => (
                        <button key={job.id} onClick={() => setSelectedJob(job)}
                          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedJob?.id === job.id ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 truncate flex-1">{job.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              job.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                              job.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>{job.status}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-700 truncate mb-1">{job.position}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(job.createdAt)}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                  {selectedJob ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.position}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{selectedJob.email}</span>
                            <span>{selectedJob.phone}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedJob.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedJob.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                          selectedJob.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>{selectedJob.status}</span>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Applicant Name:</h3>
                          <p className="text-gray-900">{selectedJob.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Experience Level:</h3>
                          <p className="text-gray-900">{selectedJob.experience}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Applied On:</h3>
                          <p className="text-gray-900">{formatDateTime(selectedJob.createdAt)}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">Cover Letter:</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-900 whitespace-pre-wrap">{selectedJob.coverLetter}</p>
                          </div>
                        </div>
                        {selectedJob.resumeUrl && (
                          <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Resume:</h3>
                            <a href={selectedJob.resumeUrl} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              <Eye className="w-4 h-4" />View Resume
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Shortlist
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Mark as Reviewing
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Briefcase className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600">Select an application to view details</h3>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          {activeView === 'applications' && (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search course applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent" />
                  </div>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961] focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={() => exportToCSV(filteredApplications, 'course-applications')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#170961] text-white rounded-lg hover:bg-[#120747] transition-colors">
                  <Download className="w-4 h-4" />Export CSV
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden max-h-[calc(100vh-250px)] overflow-y-auto">
                  {filteredApplications.length === 0 ? (
                    <div className="p-8 text-center">
                      <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredApplications.map((app) => (
                        <button key={app.id} onClick={() => setSelectedApplication(app)}
                          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedApplication?.id === app.id ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 truncate flex-1">{app.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>{app.status}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-700 truncate mb-1">{app.program}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(app.createdAt)}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                  {selectedApplication ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedApplication.program}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{selectedApplication.email}</span>
                            <span>{selectedApplication.phone}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedApplication.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>{selectedApplication.status}</span>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Applicant Name:</h3>
                          <p className="text-gray-900">{selectedApplication.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Email:</h3>
                          <p className="text-gray-900">{selectedApplication.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Phone:</h3>
                          <p className="text-gray-900">{selectedApplication.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Experience Level:</h3>
                          <p className="text-gray-900">{selectedApplication.experience}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Preferred Start Date:</h3>
                          <p className="text-gray-900">{formatDate(selectedApplication.startDate)}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Applied On:</h3>
                          <p className="text-gray-900">{formatDateTime(selectedApplication.createdAt)}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">Why They Want to Join:</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.reason}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Reject
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Mark as Pending
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <FileText className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600">Select an application to view details</h3>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          {activeView === 'projects' && (
            <>
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#170961]" />
                  </div>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={() => exportToCSV(filteredProjects, 'projects')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#170961] text-white rounded-lg hover:bg-[#120747]">
                  <Download className="w-4 h-4" />Export CSV
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredProjects.length === 0 ? (
                  <div className="p-8 text-center">
                    <Activity className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {['Name', 'Company', 'Type', 'Budget', 'Timeline', 'Status', 'Date'].map(h => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProjects.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.company}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.projectType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.budget}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.timeline}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                p.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                p.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>{p.status}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDateTime(p.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      {showUserMenu && <div className="fixed inset-0 z-20" onClick={() => setShowUserMenu(false)} />}
    </div>
  );
}