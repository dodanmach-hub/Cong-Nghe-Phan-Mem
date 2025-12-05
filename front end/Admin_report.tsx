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
    
    

  
