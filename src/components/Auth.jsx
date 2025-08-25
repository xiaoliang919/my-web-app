import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    let error;
    if (view === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      error = signInError;
    } else if (view === 'signup') {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      error = signUpError;
      if (!error) setMessage({ type: 'success', content: '注册成功！请联系管理员激活账号。' });
    } else if (view === 'forgot') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin,
        });
        error = resetError;
        if (!error) setMessage({ type: 'success', content: '密码重置链接已发送至您的邮箱。' });
    }

    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 text-slate-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {view === 'login' && '登录系统'}
            {view === 'signup' && '注册新账号'}
            {view === 'forgot' && '重置密码'}
          </h2>
        </div>
        
        <form onSubmit={handleAuthAction} className="space-y-4">
          <div className="field">
            <label className="text-sm font-medium text-slate-600">邮箱</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="you@example.com"
            />
          </div>
          {view !== 'forgot' && (
            <div className="field">
              <label className="text-sm font-medium text-slate-600">密码</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="******"
              />
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? '处理中...' : (
              view === 'login' ? '登录' : (view === 'signup' ? '注册' : '发送链接')
            )}
          </button>
        </form>

        {message.content && (
          <p className={`mt-4 text-sm text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.content}
          </p>
        )}

        <div className="mt-6 text-sm text-center">
          {view === 'login' && (
            <div className="flex justify-between">
                <a href="#" onClick={(e) => { e.preventDefault(); setView('forgot'); }} className="text-blue-600 hover:underline">忘记密码?</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setView('signup'); }} className="text-blue-600 hover:underline">没有账号? 注册</a>
            </div>
          )}
          {view === 'signup' && (
             <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }} className="text-blue-600 hover:underline">已有账号? 登录</a>
          )}
          {view === 'forgot' && (
             <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); }} className="text-blue-600 hover:underline">返回登录</a>
          )}
        </div>
      </div>
    </div>
  );
}