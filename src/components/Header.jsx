// src/components/Header.jsx

import React from 'react';
import { supabase } from '../supabaseClient';

// 新增一个用户卡片组件
const UserCard = ({ session, profile }) => {
    if (!session?.user) return null;

    // 从邮箱生成首字母作为头像
    const getInitials = (email) => {
        const parts = email.split('@')[0].split(/[._-]/);
        return parts.map(p => p[0] || '').join('').toUpperCase().slice(0, 2);
    };

    const initials = getInitials(session.user.email);
    const username = profile?.username || session.user.email.split('@')[0];
    
    return (
        <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{username}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{session.user.email}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {/* 未来这里可以替换为真实的头像图片 */}
                {initials}
            </div>
            <button 
                onClick={() => supabase.auth.signOut()}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 text-xs font-semibold rounded-lg"
            >
                退出
            </button>
        </div>
    );
};

export default function Header({ session, profile }) {
  return (
    <header className="flex-shrink-0 flex items-center justify-between pb-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">咨询任务管理系统</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">版本 5.0 - 重构版</p>
      </div>
      
      <UserCard session={session} profile={profile} />

    </header>
  );
}