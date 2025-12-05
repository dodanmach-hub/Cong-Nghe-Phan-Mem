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

              {/* Quick Report Templates */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Report Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reportTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleQuickReport(template.name)}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className={`${template.color} p-3 rounded-lg text-white`}>
                        {template.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{template.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customize Report Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Report Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value as ReportType)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {reportTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filter by Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as Department)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filter by Channel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Channel</label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as Channel)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {channels.map((ch) => (
                        <option key={ch} value={ch}>{ch}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Date Range Display */}
                {dateRange.start && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Selected Date Range: {formatDate(dateRange.start)} 
                      {dateRange.end ? ` - ${formatDate(dateRange.end)}` : ' (Select end date)'}
                    </p>
                  </div>
                )}
              </div>

              <hr className="my-6 border-gray-200" />

              {/* Date Range Selector */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Select Date Range</h3>
                
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="text-gray-600" />
                  </button>
                  
                  <div className="flex flex-wrap gap-2">
                    {['October 2023', 'November 2023', 'December 2023'].map((month) => (
                      <button
                        key={month}
                        onClick={() => setCurrentMonth(month as any)}
                        className={`px-4 py-2 rounded-lg font-medium ${currentMonth === month ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="text-gray-600" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                      <div key={day} className="text-center font-semibold text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {currentMonth === 'October 2023' && octoberDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`text-center p-3 rounded-lg transition-colors ${
                          dateRange.start?.getDate() === day || dateRange.end?.getDate() === day
                            ? 'bg-blue-600 text-white'
                            : day <= 10 
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                    
                    {currentMonth === 'November 2023' && novemberDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`text-center p-3 rounded-lg transition-colors ${
                          dateRange.start?.getDate() === day || dateRange.end?.getDate() === day
                            ? 'bg-blue-600 text-white'
                            : day <= 8 
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                    
                    {currentMonth === 'December 2023' && decemberDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`text-center p-3 rounded-lg transition-colors ${
                          dateRange.start?.getDate() === day || dateRange.end?.getDate() === day
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            {/* Recent Reports */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Reports</h3>
              <div className="space-y-4">
                {[
                  { name: 'Weekly Performance', date: 'Nov 15, 2023', type: 'PDF' },
                  { name: 'Customer Feedback', date: 'Nov 12, 2023', type: 'CSV' },
                  { name: 'Sales Analysis', date: 'Nov 8, 2023', type: 'Excel' },
                  { name: 'Support Metrics', date: 'Nov 5, 2023', type: 'PDF' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{report.name}</h4>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>PDF (Recommended)</option>
                    <option>CSV</option>
                    <option>Excel</option>
                    <option>JSON</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include Charts</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center">
                      <input type="radio" name="charts" className="text-blue-600" defaultChecked />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="charts" className="text-blue-600" />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Granularity</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>Detailed (All data)</option>
                    <option>Summary Only</option>
                    <option>Aggregated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleQuickReport}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-700">Generate Monthly Report</span>
                  <Calendar size={18} className="text-gray-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="font-medium text-gray-700">Email Report to Team</span>
                  <Mail size={18} className="text-gray-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="font-medium text-gray-700">Download All Data</span>
                  <Download size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
          <button
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Calendar size={20} />
            Schedule Report
          </button>
          
          <div className="flex gap-4">
            <button
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Reset Filters
            </button>
            <button
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <HelpCircle size={20} />
              Help Center
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReport;

              

  
  
