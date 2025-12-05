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
    
    

  
