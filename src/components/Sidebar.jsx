// src/components/Sidebar.jsx

import React from 'react';
import { TASK_STATUS } from '../config';

export default function Sidebar({ currentView, setCurrentView, tasks }) {
  // 我们暂时先展示所有视图，后续会根据用户权限来动态显示
  const views = ['overview', 'reviewing', 'assigning', 'inprogress', 'auditing', 'rechecking', 'issuing', 'done', 'void', 'deleted']; // 新增 'assigning'

  // 计算每个视图下的任务数量
  const getCount = (view) => {
    if (!tasks) return 0;
    if (view === 'overview') {
        // 总览视图现在也应该包含“待分配”的任务
        return tasks.filter(t => ['reviewing', 'assigning', 'inprogress', 'auditing', 'rechecking', 'issuing'].includes(t.status)).length;
    }
    // “回收站”功能我们后续再实现，暂时数量为0
    if (view === 'deleted') return 0; 
    return tasks.filter(t => t.status === view).length;
  };

  return (
    <div className="flex-shrink-0 p-2 bg-slate-100/70 dark:bg-slate-800 rounded-t-xl border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-1">
        {views.map(view => {
          const count = getCount(view);
          return (
            <button 
              key={view} 
              onClick={() => setCurrentView(view)} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                currentView === view 
                ? 'bg-emerald-500 text-white shadow' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {TASK_STATUS[view]} 
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                currentView === view 
                ? 'bg-white/20' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
      {/* 搜索框等控件的占位符，后续实现 */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="w-64 h-9 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" title="搜索和筛选功能区占位"></div>
      </div>
    </div>
  );
}