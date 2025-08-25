// src/components/TaskModal.jsx

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
    INITIAL_TASK_TYPES, 
    INITIAL_REGIONS, 
    INITIAL_DEPARTMENTS, 
    INITIAL_SALES_PERSONS,
} from '../config';
import ComboBox from './ComboBox.jsx';
import { X } from './Icons.jsx';

export default function TaskModal({ taskData, onDataChange, onClose, onSaveSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isEditMode = taskData && taskData.id;

  const handleInputChange = (e) => {
    onDataChange(e.target.name, e.target.value);
  };
  
  const handleComboChange = (name, value) => {
    onDataChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.projectName || !taskData.taskType) {
        setErrorMessage('项目名称和任务类型为必填项。');
        return;
    }
    setLoading(true);
    setErrorMessage('');

    const dataToSubmit = {
      customTaskId: taskData.customTaskId || null,
      projectName: taskData.projectName,
      taskType: taskData.taskType,
      region: taskData.region,
      department: taskData.department,
      contractAmount: taskData.contractAmount ? Number(taskData.contractAmount) : null,
      salesPerson: taskData.salesPerson,
      contractualDueDate: taskData.contractualDueDate || null,
      created_at: taskData.createdAt ? new Date(taskData.createdAt).toISOString() : new Date().toISOString(),
    };
    
    try {
      let error;
      if (isEditMode) {
        const { error: updateError } = await supabase.from('tasks').update(dataToSubmit).eq('id', taskData.id);
        error = updateError;
      } else {
        dataToSubmit.status = 'reviewing';
        const { error: insertError } = await supabase.from('tasks').insert([dataToSubmit]);
        error = insertError;
      }
      if (error) throw error;
      onSaveSuccess(isEditMode ? '任务更新成功！' : '任务创建成功！');
    } catch (error) {
      console.error('保存任务失败:', error);
      setErrorMessage(`保存失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-600 dark:text-gray-200";

  if (!taskData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col dark:bg-slate-900">
        <header className="flex-shrink-0 flex justify-between items-center p-6 border-b dark:border-slate-700">
           <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
             {isEditMode ? '编辑任务' : '创建新任务'}
           </h2>
           <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
             <X className="text-gray-500 dark:text-gray-400" />
           </button>
        </header>
        
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">任务编号</label>
               <input type="text" name="customTaskId" value={taskData.customTaskId} onChange={handleInputChange} className={`mt-1 ${inputStyle}`} disabled={isEditMode} />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">所属地区</label>
               <ComboBox options={INITIAL_REGIONS} value={taskData.region} onChange={(v) => handleComboChange('region', v)} placeholder="搜索或选择所属地区" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">项目名称 <span className="text-red-500">*</span></label>
               <input type="text" name="projectName" value={taskData.projectName} onChange={handleInputChange} className={`mt-1 ${inputStyle}`} required />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">业务人员</label>
               <ComboBox options={INITIAL_SALES_PERSONS} value={taskData.salesPerson} onChange={(v) => handleComboChange('salesPerson', v)} placeholder="搜索或选择业务人员" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">任务类型 <span className="text-red-500">*</span></label>
               <ComboBox options={INITIAL_TASK_TYPES} value={taskData.taskType} onChange={(v) => handleComboChange('taskType', v)} placeholder="搜索或选择任务类型" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">所属部门</label>
               <ComboBox options={INITIAL_DEPARTMENTS} value={taskData.department} onChange={(v) => handleComboChange('department', v)} placeholder="搜索或选择所属部门" />
             </div>
             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 border-t border-gray-200 dark:border-gray-700 pt-5 mt-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">合同金额 (元)</label>
                  <input type="number" name="contractAmount" value={taskData.contractAmount} onChange={handleInputChange} className={`mt-1 ${inputStyle}`} placeholder="请输入金额" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">任务下达日期</label>
                  <input type="date" name="createdAt" value={taskData.createdAt} onChange={handleInputChange} className={`mt-1 ${inputStyle}`} />
                </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">合同规定完成日期</label>
                  <input type="date" name="contractualDueDate" value={taskData.contractualDueDate} onChange={handleInputChange} className={`mt-1 ${inputStyle}`} />
                </div>
             </div>
          </div>
        </form>

        <footer className="p-4 flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-4 rounded-b-lg border-t dark:border-slate-700">
            {errorMessage && <p className="text-sm text-red-600 mr-auto self-center">{errorMessage}</p>}
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 font-semibold" disabled={loading}>
              取消
            </button>
            <button type="button" onClick={handleSubmit} className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-400 font-semibold" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </button>
        </footer>
      </div>
    </div>
  );
}