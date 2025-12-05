import React, { useState, useMemo } from 'react';
import { MessageSquare, LayoutList, User, Briefcase, BarChart, Settings, CheckCheck, X, Calendar, Search, Send, Facebook, Zap, Mail, LogOut, Phone, AtSign, CalendarCheck, Users } from 'lucide-react';

// =================================================================
// I. TYPESCRIPT INTERFACES
// =================================================================

/** Định nghĩa Vai trò người dùng */
type UserRole = 'Staff' | 'Manager' | 'Admin';
/** Định nghĩa Kênh liên lạc */
type Channel = 'Facebook' | 'Zalo' | 'Email' | 'Website';

/** Định nghĩa tin nhắn */
interface Message {
  id: number;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

/** Định nghĩa cuộc trò chuyện (Chat) */
interface Chat {
  id: number;
  customerName: string;
  platform: Channel;
  lastMessage: string;
  isCompleted: boolean;
  phone: string; 
  email: string; 
  customerDetails: { 
      joinedDate: string;
      totalOrders: number;
      city: string;
  };
  messages: Message[];
}

/** Định nghĩa Biểu mẫu */
interface Form {
  id: number;
  type: string;
  submittedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

/** Định nghĩa Từ khóa */
interface Keyword {
  id: number;
  word: string;
  count: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}

// =================================================================
// II. DỮ LIỆU MOCK (Dữ liệu giả lập)
// =================================================================

const mockChats: Chat[] = [
  {
    id: 1,
    customerName: 'Nguyễn Văn A',
    platform: 'Facebook',
    lastMessage: 'Vui lòng xác nhận đơn hàng của tôi.',
    isCompleted: false,
    phone: '0901 234 567',
    email: 'vana@example.com',
    customerDetails: { joinedDate: '15/05/2023', totalOrders: 5, city: 'Hà Nội' },
    messages: [
      { id: 101, sender: 'user', text: 'Chào, tôi muốn hỏi về sản phẩm X.', timestamp: '10:00 AM' },
      { id: 102, sender: 'agent', text: 'Chào bạn, chúng tôi có thể giúp gì?', timestamp: '10:01 AM' },
      { id: 103, sender: 'user', text: 'Tôi muốn mua một chiếc áo phông size L và hỏi về chương trình khuyến mãi tháng này.', timestamp: '10:05 AM' },
    ],
  },
  {
    id: 2,
    customerName: 'Lê Thị B',
    platform: 'Zalo',
    lastMessage: 'Yêu cầu hỗ trợ kỹ thuật gấp!',
    isCompleted: false,
    phone: '0987 654 321',
    email: 'thib@zalo.vn',
    customerDetails: { joinedDate: '01/01/2024', totalOrders: 1, city: 'TP. Hồ Chí Minh' },
    messages: [
      { id: 201, sender: 'user', text: 'Ứng dụng của tôi bị lỗi.', timestamp: '09:30 AM' },
      { id: 202, sender: 'agent', text: 'Xin lỗi vì sự bất tiện này. Bạn có thể mô tả chi tiết lỗi không?', timestamp: '09:32 AM' },
    ],
  },
  {
    id: 3,
    customerName: 'Trần Văn C',
    platform: 'Email',
    lastMessage: 'Đã thanh toán thành công.',
    isCompleted: true,
    phone: '0912 345 678',
    email: 'vanc@mail.com',
    customerDetails: { joinedDate: '20/11/2022', totalOrders: 12, city: 'Đà Nẵng' },
    messages: [],
  },
];

const mockForms: Form[] = [
    { id: 1, type: 'Đơn xin nghỉ phép', submittedBy: 'Nguyễn Văn A', status: 'Pending' },
    { id: 2, type: 'Yêu cầu tăng lương', submittedBy: 'Trần Thị H', status: 'Rejected' },
    { id: 3, type: 'Đề xuất dự án', submittedBy: 'Lê Văn T', status: 'Approved' },
];

const mockKeywords: Keyword[] = [
    { id: 1, word: 'hỗ trợ', count: 450, sentiment: 'Neutral' },
    { id: 2, word: 'đơn hàng', count: 320, sentiment: 'Neutral' },
    { id: 3, word: 'thanh toán', count: 280, sentiment: 'Positive' },
    { id: 4, word: 'bị lỗi', count: 190, sentiment: 'Negative' },
    { id: 5, word: 'khiếu nại', count: 110, sentiment: 'Negative' },
    { id: 6, word: 'tuyệt vời', count: 85, sentiment: 'Positive' },
];

// =================================================================
// III. COMPONENTS CHUNG VÀ NAVIGATION (Sidebar, Wrapper)
// =================================================================

/**
 * Component hiển thị Sidebar điều hướng chính.
 */
const Sidebar: React.FC<{ currentRole: UserRole, activeScreen: string, setActiveScreen: (screen: string) => void }> = ({ currentRole, activeScreen, setActiveScreen }) => {
  
  // Định nghĩa các mục menu dựa trên vai trò (Đã cập nhật theo yêu cầu của người dùng)
  const menuItems = useMemo(() => {
    const allItems = [
      // Staff
      { id: 'Chat', name: 'Hộp thư đến', icon: MessageSquare, roles: ['Staff'] },
      { id: 'Forms', name: 'Biểu mẫu cá nhân', icon: LayoutList, roles: ['Staff'] },
      { id: 'SelfTracking', name: 'Theo dõi cá nhân', icon: User, roles: ['Staff'] },

      // Manager
      { id: 'StaffManagement', name: 'Quản lý Nhân viên', icon: Briefcase, roles: ['Manager'] },
      { id: 'KPIStats', name: 'Thống kê KPI', icon: BarChart, roles: ['Manager'] },
      { id: 'FormApproval', name: 'Duyệt Biểu mẫu', icon: CheckCheck, roles: ['Manager'] },
      { id: 'Schedule', name: 'Lịch làm việc', icon: Calendar, roles: ['Manager'] },
      
      // Shared (Manager/Admin) or Admin Specific
      { id: 'KeywordList', name: 'Danh sách Từ khóa', icon: Search, roles: ['Manager', 'Admin'] }, 
      { id: 'OverviewReports', name: 'Báo cáo Tổng quan', icon: BarChart, roles: ['Admin'] },
      { id: 'AccountManagement', name: 'Quản lý Tài khoản', icon: Users, roles: ['Admin'] },
    ];

    // Lọc menu theo yêu cầu cuối cùng:
    // Manager: Bỏ Chat, Forms, SelfTracking. Giữ KPI, FormApproval, Schedule, StaffManagement, KeywordList.
    // Admin: Chỉ giữ OverviewReports, AccountManagement, KeywordList.
    
    return allItems.filter(item => {
        if (currentRole === 'Staff') {
            return item.roles.includes('Staff');
        }
        if (currentRole === 'Manager') {
            return ['StaffManagement', 'KPIStats', 'FormApproval', 'Schedule', 'KeywordList'].includes(item.id);
        }
        if (currentRole === 'Admin') {
            return ['OverviewReports', 'AccountManagement', 'KeywordList'].includes(item.id);
        }
        return false;
    });

  }, [currentRole]);

  const MenuItem: React.FC<{ id: string, name: string, Icon: React.ElementType, active: boolean }> = ({ id, name, Icon, active }) => (
    <button
      onClick={() => setActiveScreen(id)}
      className={`flex items-center p-3 w-full text-left rounded-lg transition-colors duration-200 ${
        active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="text-sm font-medium">{name}</span>
    </button>
  );

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2" /> OmniChat
        </h1>
        <p className="text-xs text-gray-500 mb-6 uppercase tracking-wider dark:text-gray-400">
            Vai trò: {currentRole === 'Staff' ? 'Nhân viên' : currentRole === 'Manager' ? 'Quản lý' : 'Quản trị viên'}
        </p>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <MenuItem 
              key={item.id} 
              id={item.id}
              name={item.name} 
              Icon={item.icon} 
              active={activeScreen === item.id} 
            />
          ))}
        </nav>
      </div>
      <button className="flex items-center p-3 w-full text-left rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200">
        <LogOut className="w-5 h-5 mr-3" />
        <span className="text-sm font-medium">Đăng xuất</span>
      </button>
    </div>
  );
};

/** Component Wrapper chung cho các màn hình (trừ Chat) */
const ScreenWrapper: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">{title}</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            {children}
        </div>
    </div>
);

/** Màn hình chung cho các mục Placeholder */
const PlaceholderScreen: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <ScreenWrapper title={title}>
        <div className="text-center py-20">
            <Settings className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</p>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">{description}</p>
            <p className="mt-4 text-sm text-blue-500">Chức năng đang được phát triển.</p>
        </div>
    </ScreenWrapper>
);


// =================================================================
// IV. CÁC MÀN HÌNH CHÍNH (ROLE-SPECIFIC SCREENS)
// =================================================================

// --- 4.1. Staff Screens ---

/**
 * Component hiển thị chi tiết thông tin khách hàng (Cột 3 của ChatInterface).
 */
const CustomerDetailsPanel: React.FC<{ chat: Chat }> = ({ chat }) => {
    const Field: React.FC<{ icon: React.ElementType, label: string, value: string | number }> = ({ icon: Icon, label, value }) => (
        <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Icon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white break-words">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="w-72 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Thông tin Khách hàng
            </h3>

            <div className="space-y-4">
                {/* Tên khách hàng (được nhắc lại cho rõ ràng) */}
                <div className="text-center pb-2 border-b dark:border-gray-700">
                    <User className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{chat.customerName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Từ kênh: {chat.platform}</p>
                </div>
                
                {/* Thông tin liên hệ cơ bản */}
                <Field icon={AtSign} label="Email" value={chat.email} />
                <Field icon={Phone} label="Số điện thoại" value={chat.phone} />

                {/* Chi tiết liên quan khác */}
                <div className="pt-2">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Chi tiết Khác
                    </h4>
                    <div className="space-y-3">
                        <Field icon={CalendarCheck} label="Ngày tham gia" value={chat.customerDetails.joinedDate} />
                        <Field icon={LayoutList} label="Tổng đơn hàng" value={chat.customerDetails.totalOrders} />
                        <Field icon={Zap} label="Thành phố" value={chat.customerDetails.city} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Màn hình Chat cốt lõi cho Nhân viên Dịch vụ (Hộp thư đến).
 */
const ChatInterface: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0] || null);
  const [newMessage, setNewMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredChats = chats.filter(chat => 
    chat.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlatformIcon = (platform: Channel) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook className="w-4 h-4 text-blue-500" />;
      case 'Zalo':
        return <Zap className="w-4 h-4 text-sky-500" />;
      case 'Email':
        return <Mail className="w-4 h-4 text-red-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'agent',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, messages: [...chat.messages, newMsg], lastMessage: newMessage }
        : chat
    );
    setChats(updatedChats);
    setSelectedChat(prev => prev ? { ...prev, messages: [...prev.messages, newMsg], lastMessage: newMessage } : null);
    setNewMessage('');
  };
  
  // Tính năng đánh dấu hoàn thành/mở lại
  const handleMarkComplete = (chatId: number) => {
    const updatedChats = chats.map(chat =>
      chat.id === chatId
        ? { ...chat, isCompleted: !chat.isCompleted }
        : chat
    );
    setChats(updatedChats);
    if (selectedChat && selectedChat.id === chatId) {
        setSelectedChat(prev => prev ? { ...prev, isCompleted: !prev.isCompleted } : null);
    }
  };

  return (
    // Bố cục 3 cột: Danh sách Chat (w-80), Khung Chat (flex-1), Chi tiết KH (w-72)
    <div className="flex h-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      
      {/* 1. Thanh danh sách cuộc trò chuyện */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b dark:border-gray-700 cursor-pointer transition-colors duration-150 ${
                  selectedChat?.id === chat.id 
                  ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getPlatformIcon(chat.platform)}
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">{chat.customerName}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${chat.isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {chat.isCompleted ? 'Hoàn thành' : 'Đang xử lý'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                  {chat.lastMessage}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Từ {chat.platform}
                </p>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500 dark:text-gray-400">Không tìm thấy cuộc trò chuyện nào.</p>
          )}
        </div>
      </div>

      {/* 2. Màn hình chat chi tiết */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header chat */}
            <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedChat.customerName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                  <span className="mr-1">{getPlatformIcon(selectedChat.platform)}</span> Kênh: {selectedChat.platform}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMarkComplete(selectedChat.id)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    selectedChat.isCompleted
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedChat.isCompleted ? 'Mở lại' : 'Đánh dấu Hoàn thành'}
                </button>
              </div>
            </div>

            {/* Khu vực Tin nhắn */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900">
              {selectedChat.messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                    msg.sender === 'agent'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-600'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${msg.sender === 'agent' ? 'text-blue-200' : 'text-gray-400 dark:text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input gửi tin nhắn */}
            <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  disabled={newMessage.trim() === ''}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Chọn một cuộc trò chuyện để bắt đầu.
          </div>
        )}
      </div>

      {/* 3. Panel Thông tin Khách hàng */}
      {selectedChat && <CustomerDetailsPanel chat={selectedChat} />}

    </div>
  );
};

/** Màn hình Biểu mẫu cá nhân (Staff) */
const FormsScreen: React.FC = () => {
    return (
        <ScreenWrapper title="Biểu mẫu cá nhân">
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Đây là nơi bạn có thể gửi và theo dõi các yêu cầu nghiệp vụ cá nhân (xin nghỉ phép, tăng lương,...).
            </p>
            <div className="space-y-4">
                {mockForms.map(form => (
                    <div key={form.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">{form.type}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gửi bởi: {form.submittedBy}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {form.status === 'Approved' && <CheckCheck className="w-5 h-5 text-green-500" />}
                            {form.status === 'Rejected' && <X className="w-5 h-5 text-red-500" />}
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                form.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                form.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                                {form.status === 'Pending' ? 'Đang chờ duyệt' : form.status === 'Approved' ? 'Đã Phê duyệt' : 'Đã Từ chối'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </ScreenWrapper>
    );
};

// --- 4.2. Manager Screens ---

/** Màn hình Duyệt Biểu mẫu (Manager) */
const FormApprovalScreen: React.FC = () => {
    const [forms, setForms] = useState<Form[]>(mockForms);

    const handleAction = (id: number, status: 'Approved' | 'Rejected') => {
        setForms(forms.map(form => form.id === id ? { ...form, status } : form));
    };

    return (
        <ScreenWrapper title="Duyệt Biểu mẫu Nhân viên">
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Xem xét và phê duyệt hoặc từ chối các yêu cầu do Nhân viên gửi lên.
            </p>
            <div className="space-y-4">
                {forms.map(form => (
                    <div key={form.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">{form.type} - Gửi bởi: {form.submittedBy}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Trạng thái: 
                                <span className={`ml-1 font-semibold ${
                                    form.status === 'Approved' ? 'text-green-600' :
                                    form.status === 'Rejected' ? 'text-red-600' :
                                    'text-yellow-600'
                                }`}>{form.status === 'Pending' ? 'Đang chờ' : form.status === 'Approved' ? 'Đã Duyệt' : 'Đã Từ chối'}</span>
                            </p>
                        </div>
                        {form.status === 'Pending' ? (
                            <div className="space-x-2">
                                <button 
                                    onClick={() => handleAction(form.id, 'Approved')} 
                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition"
                                >
                                    <CheckCheck className="w-4 h-4 inline mr-1" /> Phê duyệt
                                </button>
                                <button 
                                    onClick={() => handleAction(form.id, 'Rejected')} 
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition"
                                >
                                    <X className="w-4 h-4 inline mr-1" /> Từ chối
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">Đã xử lý</p>
                        )}
                    </div>
                ))}
            </div>
        </ScreenWrapper>
    );
};

// --- 4.3. Shared/Admin Screens ---

/** Màn hình Danh sách Từ khóa (Manager/Admin) */
const KeywordListScreen: React.FC = () => {
    const getSentimentColor = (sentiment: Keyword['sentiment']) => {
        switch (sentiment) {
            case 'Positive': return 'bg-green-100 text-green-700';
            case 'Negative': return 'bg-red-100 text-red-700';
            default: return 'bg-yellow-100 text-yellow-700';
        }
    };

    return (
        <ScreenWrapper title="Danh sách Từ khóa Phổ biến">
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                Phân tích các từ khóa được sử dụng nhiều nhất trong các cuộc trò chuyện với khách hàng.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockKeywords.sort((a, b) => b.count - a.count).map(keyword => (
                    <div key={keyword.id} className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 border-blue-500">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{keyword.word}</span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getSentimentColor(keyword.sentiment)}`}>
                                {keyword.sentiment === 'Positive' ? 'Tích cực' : keyword.sentiment === 'Negative' ? 'Tiêu cực' : 'Trung tính'}
                            </span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            <span className="text-sm">Số lần đề cập: </span>
                            <span className="ml-1 text-lg font-extrabold text-blue-600 dark:text-blue-400">{keyword.count}</span>
                        </div>
                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-3">
                            <div 
                                className="h-1 bg-blue-500 rounded-full" 
                                style={{ width: `${(keyword.count / 500) * 100}%` }} // Max count is assumed around 500 for visualization
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t dark:border-gray-700">
                *Dữ liệu từ khóa được tính toán từ nội dung tin nhắn của khách hàng.
            </p>
        </ScreenWrapper>
    );
};


// =================================================================
// V. ỨNG DỤNG CHÍNH (MAIN APP)
// =================================================================

const App: React.FC = () => {
  // Giả lập trạng thái người dùng (Có thể thay đổi để kiểm tra giao diện)
  const [currentRole, setCurrentRole] = useState<UserRole>('Staff'); // 'Staff', 'Manager', 'Admin'
  const [activeScreen, setActiveScreen] = useState<string>('Chat');
  
  // Hàm chuyển đổi vai trò (chỉ để demo)
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    // Khi chuyển vai trò, chuyển đến màn hình đầu tiên của vai trò đó 
    if (role === 'Staff') setActiveScreen('Chat');
    if (role === 'Manager') setActiveScreen('StaffManagement'); 
    if (role === 'Admin') setActiveScreen('OverviewReports'); 
  };

  /** Render màn hình chính dựa trên activeScreen */
  const renderMainContent = () => {
    switch (activeScreen) {
      case 'Chat':
        return <ChatInterface />;
      case 'Forms':
        return <FormsScreen />;
      case 'SelfTracking':
        return <PlaceholderScreen title="Theo dõi cá nhân" description="Xem thông tin cơ bản và dữ liệu hiệu suất cá nhân của bạn." />;
      case 'StaffManagement':
        return <PlaceholderScreen title="Quản lý Nhân viên" description="Tạo, cập nhật, xóa và giám sát thông tin của tất cả Nhân viên trong phòng ban." />;
      case 'KPIStats':
        return <PlaceholderScreen title="Thống kê KPI Phòng ban" description="Giám sát số liệu thống kê và hiệu suất KPI của phòng ban." />;
      case 'FormApproval':
        return <FormApprovalScreen />;
      case 'Schedule':
        return <PlaceholderScreen title="Lịch làm việc" description="Quản lý và chỉ định ca làm việc cho nhân viên." />;
      case 'KeywordList': 
        return <KeywordListScreen />;
      case 'OverviewReports':
        return <PlaceholderScreen title="Báo cáo Tổng quan" description="Xem báo cáo thống kê đa chiều theo phòng ban, nhân viên và khoảng thời gian." />;
      case 'AccountManagement':
        return <PlaceholderScreen title="Quản lý Tài khoản" description="Quản lý (tạo, cập nhật, xóa) tài khoản của cả Nhân viên và Quản lý." />;
      default:
        return <PlaceholderScreen title="Chào mừng đến với OmniChat" description="Sử dụng thanh điều hướng bên trái để chọn chức năng." />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      
      {/* Thanh công cụ chuyển đổi vai trò (chỉ để demo) */}
      <div className="bg-gray-100 dark:bg-gray-900 p-2 flex items-center justify-center space-x-4 border-b dark:border-gray-700">
        <span className="text-sm text-gray-700 dark:text-gray-300">Chọn Vai trò Demo:</span>
        {(['Staff', 'Manager', 'Admin'] as UserRole[]).map(role => (
          <button
            key={role}
            onClick={() => switchRole(role)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              currentRole === role 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {role === 'Staff' ? 'Nhân viên' : role === 'Manager' ? 'Quản lý' : 'Quản trị viên'}
          </button>
        ))}
      </div>

      <div className="flex h-[calc(100vh-44px)]"> 
        {/* Sidebar Điều hướng */}
        <Sidebar 
          currentRole={currentRole} 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
        />

        {/* Nội dung chính */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default App;