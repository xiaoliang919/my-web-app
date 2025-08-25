// src/components/Toast.jsx

import React, { useState, useEffect } from 'react';
import { CheckCircle } from './Icons.jsx';

export default function Toast({ message, show }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            // 添加一个延迟以便播放退场动画
            const timer = setTimeout(() => setIsVisible(false), 300); // 动画时长
            return () => clearTimeout(timer);
        }
    }, [show]);

    // 如果不需要渲染，则返回 null
    if (!isVisible) return null;

    return (
        // 核心修改：调整了定位和位移的 class，使其居中
        <div 
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
                show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
            } bg-emerald-500`}
        >
            <CheckCircle size={20} />
            <span className="font-semibold">{message}</span>
        </div>
    );
}