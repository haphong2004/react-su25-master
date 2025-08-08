import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = (action: 'login' | 'register') => {
    const nav = useNavigate();
    
    const authUser = async (values: any) => {
        if (action === 'register') {
            // For registration, we'll add the user to the users array
            const userData = {
                ...values,
                id: Date.now().toString(),
                role: 'user',
                status: 'active',
                username: values.email.split('@')[0] // Generate username from email
            };
            const res = await axios.post('http://localhost:3001/users', userData);
            return { user: res.data };
        } else {
            // For login, we'll find the user by email and password
            const { data: users } = await axios.get('http://localhost:3001/users');
            const user = users.find((u: any) => u.email === values.email && u.password === values.password);
            
            if (!user) {
                throw new Error('Invalid credentials');
            }
            
            return { 
                user,
                accessToken: 'dummy-jwt-token' // In a real app, this would come from your backend
            };
        }
    };

    const authMutation = useMutation({
        mutationFn: authUser,
        onSuccess: (data) => {
            message.success(action === 'register' ? 'Đăng ký thành công' : 'Đăng nhập thành công');
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                nav('/');
            } else if (action === 'register') {
                nav('/login');
            }
        },
        onError: (error: any) => {
            message.error(error.message || 'Có lỗi xảy ra');
        },
    });

    return authMutation;
};