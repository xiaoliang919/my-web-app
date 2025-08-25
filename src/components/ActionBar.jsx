// src/components/ActionBar.jsx

import React from 'react';
import { Plus, Upload, Download, BarChart2, Settings, Users } from './Icons.jsx';

// 1. 从 props 中接收 onCreateTask 函数
export default function ActionBar({ onCreateTask }) {
  return (
    <div className="flex-shrink-0 flex flex-wrap items-center justify-between gap-4 p-4">
      {/* 左侧主要功能按钮 */}
      <div className="flex gap-2 flex-wrap">
        {/* 2. 为“创建任务”按钮添加 onClick 事件 */}
        <button 
          onClick={onCreateTask} 
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold shadow-sm hover:bg-emerald-600">
          <Plus size={18}/>创建任务
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold shadow-sm hover:bg-sky-600"><Upload size={16}/>导入</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-600"><Download size={16}/>导出</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-lg font-semibold shadow-sm hover:bg-violet-600"><BarChart2 size={16}/>统计</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg font-semibold shadow-sm hover:bg-slate-600"><Settings size={16}/>管理配置</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold shadow-sm hover:bg-cyan-700">
          <Users size={16}/>
          团队管理
        </button>
      </div>

      {/* 右侧图标功能按钮 (未来功能占位) */}
      <div className="flex items-center gap-2 ml-auto">
        {/* 例如：<button className="p-2 text-slate-600 hover:bg-slate-200 rounded-full"><Bell size={20}/></button> */}
      </div>
    </div>
  );
}