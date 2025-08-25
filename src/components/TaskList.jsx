// src/components/TaskList.jsx

import React from 'react';
import ListHeader from './ListHeader';
import TaskRow from './TaskRow';

// 从 props 中接收 onOpenActionModal 函数
export default function TaskList({ isLoading, tasks, currentView, onOpenActionModal }) {
  // 根据当前选择的视图，过滤出需要显示的任务
  const filteredTasks = tasks.filter(task => {
    if (currentView === 'overview') {
      return !['deleted'].includes(task.status);
    }
    if (currentView === 'deleted') {
      return [];
    }
    return task.status === currentView;
  });

  return (
    <div className="flex-grow overflow-auto">
      <div className="min-w-[2000px] xl:min-w-full">
        <ListHeader currentView={currentView} />

        {isLoading ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 animate-pulse">正在从数据库加载任务...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400">此视图下没有任务。</div>
        ) : (
          <div>
            {filteredTasks.map((task, index) => (
              <TaskRow 
                key={task.id} 
                task={task} 
                currentView={currentView} 
                index={index} 
                // 将函数继续传递给每一个 TaskRow 组件
                onOpenActionModal={onOpenActionModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}