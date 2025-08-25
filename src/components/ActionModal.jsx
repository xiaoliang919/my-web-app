// src/components/ActionModal.jsx

import React from 'react';
import { Edit, Trash2, X } from './Icons.jsx';

export default function ActionModal({ state, onClose, onActionSelect }) {
    if (!state.isOpen || !state.task) return null;

    const { task } = state;

    const actions = [
        { 
            label: '编辑', 
            icon: <Edit size={16} />, 
            action: () => onActionSelect('edit', task),
            className: 'text-blue-600 hover:bg-blue-50 border-blue-200 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:border-blue-800',
            show: true
        },
        { 
            label: '删除', 
            icon: <Trash2 size={16} />, 
            action: () => onActionSelect('delete', task),
            className: 'text-red-600 hover:bg-red-50 border-red-200 dark:text-red-400 dark:hover:bg-red-900/50 dark:border-red-800',
            show: true
        },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md">
                <header className="flex justify-between items-center p-4 border-b dark:border-slate-700">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">任务操作</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <X className="text-gray-500 dark:text-gray-400" />
                    </button>
                </header>
                
                {/* 核心修改：为这个 div 添加了 space-y-1 类来增加行距 */}
                <div className="p-4 bg-gray-50 dark:bg-slate-800 text-sm text-gray-600 dark:text-gray-300 border-b dark:border-slate-700 space-y-1">
                    <p><span className="font-semibold w-20 inline-block text-gray-500 dark:text-gray-400">任务编号:</span> <span className="font-mono">{task.customTaskId}</span></p>
                    <p><span className="font-semibold w-20 inline-block text-gray-500 dark:text-gray-400">项目名称:</span> {task.projectName}</p>
                    <p><span className="font-semibold w-20 inline-block text-gray-500 dark:text-gray-400">任务类型:</span> {task.taskType}</p>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {actions.filter(a => a.show).map(item => (
                        <button 
                            key={item.label} 
                            onClick={item.action} 
                            className={`w-full flex items-center justify-center gap-3 px-3 py-2 text-sm rounded-md border font-semibold ${item.className}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};