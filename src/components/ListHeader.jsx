// src/components/ListHeader.jsx

import React from 'react';
import { ALL_COLUMNS, VIEW_COLUMNS, GRID_LAYOUTS } from '../config';

// 修改：减小了 padding 和字体大小
const HeaderCell = ({ label, className = '' }) => (<div className={`flex items-center justify-center ${className}`}>{label}</div>);

export default function ListHeader({ currentView }) {
    const columnsToShow = VIEW_COLUMNS[currentView] || [];
    const gridLayoutClass = GRID_LAYOUTS[currentView] || 'grid-cols-1';

    return (
        // 修改：减小了垂直方向的 padding (py-2) 和字体大小 (text-xs)
        <div className={`grid ${gridLayoutClass} gap-x-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 sticky top-0 z-10 text-center border-y-2 border-slate-200 dark:border-slate-700`}>
            {columnsToShow.map(columnKey => {
                const column = ALL_COLUMNS[columnKey];
                if (!column) return null;

                if (column.key === 'checkbox') {
                    return <div key={column.key} className="flex items-center justify-center"><input type="checkbox" className="form-checkbox h-4 w-4" /></div>
                }

                let label = column.label;
                if (currentView === 'overview' && column.key === 'timeOrCompletionDate') {
                    label = '剩余/完成日期';
                } else if (column.key === 'timeOrCompletionDate') {
                    label = '剩余时间';
                }

                return <HeaderCell key={column.key} label={label} />;
            })}
        </div>
    );
};