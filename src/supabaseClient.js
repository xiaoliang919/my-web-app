import { createClient } from '@supabase/supabase-js'

// 从环境变量中读取 Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 创建并导出 Supabase 客户端单例
export const supabase = createClient(supabaseUrl, supabaseKey);