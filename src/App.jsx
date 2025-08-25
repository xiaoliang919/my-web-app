// src/App.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabaseClient';
import './app.css';
import { formatDate } from './utils.js';

import Header from './components/Header';
import ActionBar from './components/ActionBar';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal.jsx';
import ActionModal from './components/ActionModal.jsx';
import Toast from './components/Toast.jsx';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.error_description || error.message);
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-200">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">登录系统</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">邮箱</label>
          <input id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">密码</label>
          <input id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={loading}>
            {loading ? '登录中...' : '登 录'}
          </button>
        </div>
      </form>
    </div>
  );
};

const initialCreateState = {
  customTaskId: 'HB',
  projectName: '',
  taskType: '',
  region: '',
  department: '',
  contractAmount: '',
  salesPerson: '',
  contractualDueDate: '',
  createdAt: formatDate(new Date()),
};

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('overview');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [actionModalState, setActionModalState] = useState({ isOpen: false, task: null });
  const [toast, setToast] = useState({ show: false, message: '' });
  const appRef = useRef(null);

  const fetchProfile = useCallback(async (user) => {
    try {
        const { data, error } = await supabase.from('profiles').select('username, avatar_url').eq('id', user.id).single();
        if (error) throw error;
        setProfile(data);
    } catch (error) {
        console.error('获取用户档案失败:', error);
    }
  }, []);

  useEffect(() => {
    setAppLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user);
      setAppLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user);
      else setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, [fetchProfile]);
  
  const fetchTasks = useCallback(async () => {
    setTasksLoading(true);
    try {
        const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setTasks(data || []);
    } catch (error) {
        alert('获取任务数据失败: ' + error.message);
    } finally {
        setTasksLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchTasks();
  }, [session, fetchTasks]);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  }, []);
  
  const handleTaskDataChange = useCallback((field, value) => {
    setEditingTask(prevTask => ({ ...prevTask, [field]: value }));
  }, []);

  const handleCloseModals = useCallback(() => {
    setIsTaskModalOpen(false);
    setActionModalState({ isOpen: false, task: null });
    setEditingTask(null);
  }, []);

  const handleSaveSuccess = useCallback((message) => {
    fetchTasks();
    showToast(message);
    handleCloseModals();
  }, [fetchTasks, showToast, handleCloseModals]);

  const handleOpenCreateModal = useCallback(() => {
    setEditingTask(initialCreateState);
    setIsTaskModalOpen(true);
  }, []);
  
  const handleOpenEditModal = useCallback((task) => {
    const formattedTask = {
        ...task,
        contractualDueDate: formatDate(task.contractualDueDate),
        createdAt: formatDate(task.created_at),
    };
    setEditingTask(formattedTask);
    setIsTaskModalOpen(true);
  }, []);

  const handleOpenActionModal = useCallback((task) => {
    setActionModalState({ isOpen: true, task });
  }, []);
  
  const handleTaskAction = useCallback((actionType, task) => {
    handleCloseModals();
    if (actionType === 'edit') {
      setTimeout(() => handleOpenEditModal(task), 100);
    }
    if (actionType === 'delete') {
      alert(`删除功能待实现 (任务: ${task.projectName})`);
    }
  }, [handleCloseModals, handleOpenEditModal]);
  
  if (appLoading) return <div className="w-screen h-screen flex items-center justify-center text-lg">正在加载应用...</div>;
  if (!session) return <Auth />;

  return (
    <div ref={appRef} className="h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 p-4 lg:p-6 flex flex-col gap-4">
      <Header session={session} profile={profile} />
      <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col flex-grow min-h-0">
        <ActionBar onCreateTask={handleOpenCreateModal} />
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} tasks={tasks} />
        <TaskList isLoading={tasksLoading} tasks={tasks} currentView={currentView} onOpenActionModal={handleOpenActionModal} />
      </div>
      {isTaskModalOpen && (
        <TaskModal 
          taskData={editingTask}
          onDataChange={handleTaskDataChange} 
          onClose={handleCloseModals}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
      <ActionModal state={actionModalState} onClose={handleCloseModals} onActionSelect={handleTaskAction} />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}

export default App;