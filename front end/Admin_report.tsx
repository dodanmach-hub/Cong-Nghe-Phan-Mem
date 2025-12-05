//Admin_report.tsx
import React, { useState } from 'react';
import { Calendar, Chevronleft, ChevronRight, Download, HelpCircle, BarChart3, Users, Mail, Phone, MessageSquare } from 'lucide-react';

//Types
type ReportType = 'Agent Performance' | 'Customer Sastifaction' | 'Revenue Analysis' | 'Response Time' | 'Ticket Volume';
type Department = 'All Departments' | 'Sales' | 'Support' | 'Marketing' | 'Technical';
type Channel = 'All Channels' | 'Email' | 'Phone' | 'Chat' | 'Social Media' | 'Website';

interface ReportData {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const AdminReport: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('Agent Performance');
  const [department, setDepartment] = useState<Department>('All Departments');
  const [channel, setChannel] = useState<Channel>('All Channels');
  const [currentMonth, setCurrentMonth] = useState<'October 2023' | 'November 2023' | 'December 2023'>('October 2023');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null;
    end: null;
});

const reportTypes: ReportType[] = [
  'Agent Performance',
  'Customer Sastification',
  'Revenue Analysis',
  'Respone Time',
  'Ticket Volume'
  ];

cons departments: Department[] = [
  'All Departments',
  'Sales', 
  'Support', 
  'Marketing',
  'Technical'
  ];

const channels: Channel[] = [
  'All Channels',
  'Email',
  'Phone',
  'Chat',
  'Social Media',
  'Website'
  ];

const reportTemplates: ReportData[] = [
  {
    id: 1,
    name: 'Daily Performance',
    description: 'Agent productivity and metrics',
    icon: <BarChart3 size={24} />,
    corlor: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Team Analytics',
    description: 'Department-wide statistics',
    icon: <User siz= {24} />,
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Channel Report',
    descriptio: 'Communication channel insights',
    icon: <MessageSquare size={24} />,
    color : 'bg-purple-500'
  }
];

const quickStats = [
  { label: 'Total Agents', value: '24', change: '+2.5%'},
  { label: 'Avg Respone Time', value: '2.4m', change: '-0.3m'},
  { label: 'Customer Satisfication', value: '94.2%', change: '+1.2%'},
  { label: 'Tickets Resolved', valu: '1,842', change: '+15%'}
];

const octoberDays = Array.({ length: 31 }, (_, i) => i + 1);
const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1);
const decemberDays = Array.from({ length: 31 }, (_, i) => i + 1);

const handleExport = (format: 'pdf' | 'csv' | 'excel' = 'pdf') => {
  alert(`Exporting ${reportType} report for ${department} and ${channel} as ${format.toUpperCase()}`);
  //Implement actual export Logic here
};

const handleQuickReport = (temmplateName: string) => {
  arlet(`Generating quick report: ${templateName}`);
  //Auto-fill setting based on template
};

const handleDateSelect = (day: number) => {
  // Simple date selection logic 
  const selectDate = new Date(2023, currentMonth === 'October 2023' ? 9 :
                              currentMonth === 'November 2023' ? 10 : 11, day);
  if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: selectedDate, end: null });
    } else {
      setDateRange({ ...dateRange, end: selectedDate });
    }
};
const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Reports Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-gray-600">admin@business.com</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">Last updated: Today 10:30 AM</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium">
              Save Template
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
              Schedule Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Report Configuration */}
          <div className="lg:w-2/3">
            <section className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Reports & Data Export</h2>
                  <p className="text-gray-600 mt-1">Generate and export various statistical reports.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
                  >
                    <Download size={20} />
                    Export PDF
                  </button>
                  <div className="relative group">
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold">
                      More
                    </button>
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block z-10">
                      <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Export CSV
                      </button>
                      <button onClick={() => handleExport('excel')} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Export Excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              

  
  
