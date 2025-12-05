import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged,
    User, // Import User type từ Firebase Auth
    // Thêm các hàm cần thiết cho Đăng nhập thực tế
    // signInWithEmailAndPassword,
    // signOut 
} from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// ------------------------------------------------------------------
// ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPESCRIPT INTERFACES/TYPES)
// ------------------------------------------------------------------

type StatusType = 'success' | 'error' | '';

interface StatusState {
    message: string;
    type: StatusType;
}

// Các biến toàn cục được cung cấp bởi môi trường
const appId: string = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// TypeScript yêu cầu kiểm tra kiểu dữ liệu cho JSON.parse
const firebaseConfig: object = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken: string | null = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Khởi tạo các instance của Firebase (sẽ được khởi tạo trong useEffect)
let app: any, auth: any, db: any; // Sử dụng any cho các biến Firebase instance tạm thời

/**
 * Component chính cho Màn hình Đăng nhập.
 * Lưu ý: Toàn bộ ứng dụng được gói gọn trong component App này.
 */
const App = () => {
    // State cho form
    const [username, setUsername] = useState<string>('nhanvien.a');
    const [password, setPassword] = useState<string>('password123');
    // State cho trạng thái UI
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<StatusState>({ message: '', type: '' });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    // State cho thông tin người dùng Firebase
    const [userId, setUserId] = useState<string | null>(null);

    // ------------------------------------------------------------------
    // 1. KHỞI TẠO VÀ XÁC THỰC FIREBASE
    // ------------------------------------------------------------------
    useEffect(() => {
        setLogLevel('Debug');
        
        const initializeFirebase = async () => {
            if (Object.keys(firebaseConfig).length > 0) {
                try {
                    // Cần kiểm tra kiểu trước khi gọi initializeApp
                    app = initializeApp(firebaseConfig as any); 
                    auth = getAuth(app);
                    db = getFirestore(app);

                    // Đăng nhập ban đầu bằng token tùy chỉnh hoặc ẩn danh
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                        console.log("Đăng nhập thành công bằng Custom Token.");
                    } else {
                        await signInAnonymously(auth);
                        console.log("Đăng nhập thành công ẩn danh.");
                    }
                    
                    // Lắng nghe thay đổi trạng thái đăng nhập
                    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
                        if (user) {
                            setUserId(user.uid);
                            console.log("Người dùng đã đăng nhập. UID:", user.uid);
                        } else {
                            setUserId(null);
                            console.log("Người dùng đã đăng xuất.");
                        }
                        setIsLoading(false); // Sẵn sàng sau khi Auth State được kiểm tra lần đầu
                    });

                    return () => unsubscribe(); // Cleanup listener khi component unmount
                } catch (error) {
                    console.error("Lỗi khi khởi tạo hoặc đăng nhập Firebase:", error);
                    setStatus({ message: 'Lỗi hệ thống: Không thể kết nối dịch vụ.', type: 'error' });
                    setIsLoading(false);
                }
            } else {
                console.warn("Firebase config không hợp lệ. Chỉ chạy mô phỏng.");
                setIsLoading(false);
            }
        };

        initializeFirebase();
    }, []);

    // ------------------------------------------------------------------
    // 2. LOGIC XỬ LÝ ĐĂNG NHẬP
    // ------------------------------------------------------------------
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ message: '', type: '' });

        if (!username || !password) {
            setStatus({ message: 'Vui lòng điền đầy đủ Tên đăng nhập và Mật khẩu.', type: 'error' });
            setIsLoading(false);
            return;
        }

        // --- Mô phỏng Đăng nhập thành công (thay thế bằng Firebase Auth thật) ---
        try {
            // Trong ứng dụng thực tế, đoạn này sẽ là:
            // await signInWithEmailAndPassword(auth, username, password); 
            
            // Hiện tại là mô phỏng:
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            console.log(`Mô phỏng đăng nhập cho: ${username}`);
            setStatus({ message: 'Đăng nhập thành công! Đang chuyển hướng...', type: 'success' });
            
            // Giả lập chuyển hướng sau 1 giây
            setTimeout(() => {
                setIsLoggedIn(true);
            }, 1000);

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            setStatus({ 
                message: `Đăng nhập thất bại: Tên đăng nhập hoặc mật khẩu không đúng.`, 
                type: 'error' 
            });
            setIsLoading(false);
        }
        // Lưu ý: Nếu dùng Firebase Auth thật, setIsLoading(false) sẽ nằm trong onAuthStateChanged
    };

    // ------------------------------------------------------------------
    // 3. RENDER UI
    // ------------------------------------------------------------------

    // Nếu đã đăng nhập thành công, hiển thị màn hình chuyển hướng mô phỏng
    if (isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-2xl text-center">
                    <h2 className="text-2xl font-semibold text-green-600">
                        Xin Chào, {username}!
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Bạn đã đăng nhập thành công vào hệ thống.
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        (UID của bạn: {userId || 'Đang tải...'})
                    </p>
                    <p className="text-sm text-red-500 mt-2"> 
                        (Trong ứng dụng thật, trang này sẽ chuyển hướng đến Dashboard)
                    </p>
                </div>
            </div>
        );
    }

    // Hiển thị màn hình đăng nhập
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div id="login-card" className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-2xl transition-all duration-300">
                <div className="text-center">
                    {/* Icon/Logo Placeholder (dùng lucide-react nếu có) */}
                    <svg className="w-12 h-12 mx-auto text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                        Đăng Nhập
                    </h1>
                    <p className="text-gray-500">
                        Chào mừng trở lại hệ thống quản lý nội bộ.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Tên đăng nhập hoặc Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-700 focus:border-blue-700 transition duration-150"
                            placeholder="Ví dụ: nhanvien.a"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-700 focus:border-blue-700 transition duration-150"
                            placeholder="********"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Thông báo Lỗi/Trạng thái */}
                    {status.message && (
                        <div
                            className={`p-3 text-sm rounded-lg text-center ${
                                status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}
                            role="alert"
                        >
                            {status.message}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                className="h-4 w-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700"
                                disabled={isLoading}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Nhớ mật khẩu
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-700 hover:text-blue-500 transition duration-150">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        id="login-button"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Đăng Nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default App;