// src/components/Sidebar.jsx

import React, { useMemo } from 'react';
import { TASK_STATUS } from '../config';

export default function Sidebar({ currentView, setCurrentView, tasks }) {
  const views = ['overview', 'reviewing', 'assigning', 'inprogress', 'auditing', 'rechecking', 'issuing', 'done', 'void', 'deleted'];

  // 使用 useMemo 来优化任务数量的计算
  const taskCounts = useMemo(() => {
    const validTasks = Array.isArray(tasks) ? tasks : [];
    const counts = {};
    
    views.forEach(view => {
      if (view === 'overview') {
        counts[view] = validTasks.filter(t => ['reviewing', 'assigning', 'inprogress', 'auditing', 'rechecking', 'issuing'].includes(t.status)).length;
      } else if (view === 'deleted') {
        counts[view] = 0;
      } else {
        counts[view] = validTasks.filter(t => t.status === view).length;
      }
    });
    return counts;
  }, [tasks]); // 关键：仅当 tasks 数组本身发生变化时，才重新计算

  return (
    <div className="flex-shrink-0 p-2 bg-slate-100/70 dark:bg-slate-800 rounded-t-xl border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-1">
        {views.map(view => {
          const count = taskCounts[view] || 0;
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
      <div className="flex items-center gap-2 ml-auto">
        <div className="w-64 h-9 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" title="搜索和筛选功能区占位"></div>
      </div>
    </div>
  );
}