// src/components/TaskRow.jsx

import React, { useMemo } from 'react';
import { TASK_STATUS, ALL_COLUMNS, VIEW_COLUMNS, GRID_LAYOUTS } from '../config';
import { formatDate, formatAmount, formatDuration } from '../utils.js';
import { MessageSquare, MoreHorizontal, CheckCircle, Archive } from './Icons.jsx';

// 从 props 中接收 onOpenActionModal 函数
export default function TaskRow({ task, currentView, index, onOpenActionModal }) {
    const columnsToShow = VIEW_COLUMNS[currentView] || [];
    const gridLayoutClass = GRID_LAYOUTS[currentView] || 'grid-cols-1';

    let rowBgColor = index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/50';
    if (task.contractualDueDate && task.status !== 'done' && task.status !== 'void') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(task.contractualDueDate);
        dueDate.setHours(0, 0, 0, 0);
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            rowBgColor = 'bg-rose-50 dark:bg-rose-900/20';
        } else if (diffDays <= 7) {
            rowBgColor = 'bg-amber-50 dark:bg-amber-900/20';
        } else {
            rowBgColor = 'bg-emerald-50 dark:bg-emerald-900/20';
        }
    }

    const cellClass = "flex items-center justify-center text-center whitespace-nowrap break-words";
    const truncateClass = "truncate";

    const renderCell = (columnKey) => {
        switch (columnKey) {
            case 'checkbox':
                return <div className={cellClass}><input type="checkbox" className="form-checkbox h-4 w-4" /></div>;
            case 'status':
                return <div className={cellClass}><span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 dark:bg-slate-700">{TASK_STATUS[task.status]}</span></div>;
            case 'createdAt':
                return <div className={cellClass}>{formatDate(task.created_at)}</div>;
            case 'customTaskId':
                return <div className={`${cellClass} font-mono`}>{task.customTaskId}</div>;
            case 'projectName':
                return <div className={`${cellClass} text-slate-800 dark:text-slate-200 justify-start text-left ${truncateClass}`} title={task.projectName}>{task.projectName}</div>;
            case 'taskType':
                return <div className={`${cellClass} ${truncateClass}`} title={task.taskType}>{task.taskType}</div>;
            case 'department':
                return <div className={`${cellClass} ${truncateClass}`} title={task.department}>{task.department}</div>;
            case 'contractAmount':
                return <div className={cellClass}>{formatAmount(task.contractAmount)}</div>;
            case 'salesPerson':
                return <div className={cellClass}>{task.salesPerson || 'N/A'}</div>;
            case 'projectManager':
                return <div className={cellClass}>{task.projectManager}</div>;
            case 'contractualDueDate':
                return <div className={cellClass}>{formatDate(task.contractualDueDate)}</div>;
            case 'actualCompletionDate':
                return <div className={cellClass}>{formatDate(task.actualCompletionDate)}</div>;
            case 'timeOrCompletionDate':
                if (task.status === 'done') {
                    return <div className={cellClass}>{formatDate(task.actualCompletionDate)}</div>;
                }
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const dueDate = task.contractualDueDate ? new Date(task.contractualDueDate) : null;
                if (dueDate) dueDate.setHours(0, 0, 0, 0);
                if (!dueDate) return <div className={cellClass}>-</div>;
                
                const diffTime = dueDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const timeRemaining = formatDuration(diffDays);
                return (
                    <div className={`${cellClass} font-medium text-xs`}>
                        <div className="flex flex-col">
                            <span>{timeRemaining.status}</span>
                            <span>{timeRemaining.time}</span>
                        </div>
                    </div>
                );
            case 'progressDetails':
                const latestProgress = task.progressDetails?.[0]?.text || '暂无进展';
                return (
                    <div className={`${cellClass} text-gray-500 dark:text-gray-400 gap-2 cursor-pointer hover:text-emerald-500 justify-start text-left`} title={latestProgress}>
                        <MessageSquare size={14} className="flex-shrink-0" />
                        <span className={truncateClass}>{latestProgress}</span>
                    </div>
                );
            case 'isArchived':
                return (
                     <div className={cellClass}>
                        {task.isArchived ? ( <span className="flex items-center text-green-600"><CheckCircle size={14} className="mr-1"/> 已存档</span> ) : ( <span className="flex items-center text-gray-500"><Archive size={14} className="mr-1"/> 未存档</span> )}
                    </div>
                );
            case 'region':
                 return <div className={cellClass}>{task.region}</div>;
            case 'actions':
                return (
                    <div className={`${cellClass} action-column`}>
                        <button 
                            onClick={() => onOpenActionModal(task)}
                            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700" 
                            title="更多操作"
                        >
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                );
            default:
                return <div key={columnKey}>Unknown Column</div>;
        }
    };
    
    return (
        <div className={`grid ${gridLayoutClass} gap-x-2 px-3 py-1.5 items-center ${rowBgColor} border-b border-gray-100 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors`}>
            {columnsToShow.map(columnKey => (
                <React.Fragment key={columnKey}>
                    {renderCell(columnKey)}
                </React.Fragment>
            ))}
        </div>
    );
};