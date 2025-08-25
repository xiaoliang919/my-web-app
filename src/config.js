// src/config.js

export const TASK_STATUS = {
    overview: '总览',
    reviewing: '评审中',
    assigning: '待分配',
    inprogress: '进行中',
    auditing: '审核中',
    rechecking: '复核中',
    issuing: '签发中',
    done: '已完成',
    void: '已作废',
    deleted: '回收站'
};

// --- 被意外删除的 FIELD_LABELS 常量已恢复 ---
export const FIELD_LABELS = {
    projectName: "项目名称", region: "所属地区", taskType: "任务类型", department: "所属部门",
    salesPerson: "业务人员", projectManager: "项目负责人", contractAmount: "合同金额",
    contractualDueDate: "合同规定完成日期", actualCompletionDate: "实际完成日期",
    isArchived: "存档状态", createdAt: "任务下达日期"
};

export const ALL_COLUMNS = {
    checkbox: { key: 'checkbox', label: '复选框' },
    status: { key: 'status', label: '任务状态' },
    createdAt: { key: 'createdAt', label: '任务下达日期' },
    customTaskId: { key: 'customTaskId', label: '任务编号' },
    projectName: { key: 'projectName', label: '项目名称' },
    taskType: { key: 'taskType', label: '任务类型' },
    region: { key: 'region', label: '所属地区' },
    department: { key: 'department', label: '所属部门' },
    contractAmount: { key: 'contractAmount', label: '合同金额' },
    salesPerson: { key: 'salesPerson', label: '业务人员' },
    projectManager: { key: 'projectManager', label: '项目负责人' },
    contractualDueDate: { key: 'contractualDueDate', label: '合同规定完成日期' },
    timeOrCompletionDate: { key: 'timeOrCompletionDate', label: '剩余/完成日期' },
    progressDetails: { key: 'progressDetails', label: '项目进展情况' },
    isArchived: { key: 'isArchived', label: '存档' },
    actualCompletionDate: { key: 'actualCompletionDate', label: '实际完成日期' },
    actions: { key: 'actions', label: '操作' },
};

export const VIEW_COLUMNS = {
    overview: ['status', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'timeOrCompletionDate', 'progressDetails', 'isArchived'],
    reviewing: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'actions'],
    assigning: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'actions'],
    inprogress: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'timeOrCompletionDate', 'progressDetails', 'actions'],
    auditing: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'timeOrCompletionDate', 'progressDetails', 'actions'],
    rechecking: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'timeOrCompletionDate', 'progressDetails', 'actions'],
    issuing: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'timeOrCompletionDate', 'progressDetails', 'actions'],
    done: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'actualCompletionDate', 'progressDetails', 'isArchived', 'actions'],
    void: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'progressDetails', 'actions'],
    deleted: ['checkbox', 'createdAt', 'customTaskId', 'projectName', 'taskType', 'region', 'department', 'contractAmount', 'salesPerson', 'projectManager', 'contractualDueDate', 'progressDetails', 'actions'],
};

export const GRID_LAYOUTS = {
    overview: "grid-cols-[1fr_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_2fr_3fr_1fr]",
    reviewing: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_1.5fr]",
    assigning: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_1.5fr]",
    inprogress: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_2fr_3fr_1.5fr]",
    auditing: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_2fr_3fr_1.5fr]",
    rechecking: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_2fr_3fr_1.5fr]",
    issuing: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_2fr_3fr_1.5fr]",
    done: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_2fr_3fr_1fr_1.5fr]",
    void: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_3fr_1.5fr]",
    deleted: "grid-cols-[auto_1.5fr_1.5fr_4fr_2.5fr_1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_3fr_1.5fr]",
};

export const INITIAL_DEPARTMENTS = ["环保技术咨询事业部", "水土技术咨询事业部", "能源双碳技术咨询事业部"];
export const INITIAL_SALES_PERSONS = ["吕鹏", "程晨", "王光耀", "张维杰", "张志鑫", "李锦钊", "刘亚杰", "张鹏航", "韩开峰", "樊常府", "王少楠", "董强", "李猛森"];
export const INITIAL_PROJECT_MANAGERS = ["郭亮", "李海清", "范顺丽", "王安龙", "郭贝贝", "魏进宇", "苏新为", "冯腾波", "牛晓龙", "苌晓林", "谷春超", "翟绰", "王伯勋", "冯腾腾", "李世博", "程苗苗", "刘鹏飞"];
export const INITIAL_REGIONS = ["武安市", "复兴区", "丛台区", "肥乡区", "永年区", "邯山区", "冀南新区", "成安县", "临漳县", "馆陶县", "邱县", "鸡泽县", "广平县", "大名县", "磁县", "曲周县", "涉县", "石家庄市", "沧州市"];
export const INITIAL_TASK_TYPES = ["环评报告表", "环评报告书", "环评登记表", "排污许可证申请", "排污许可证变更", "排污许可证延续", "排污许可登记", "突发环境应急预案", "执行报告", "污染源数据填报", "环评验收", "清洁生产审核", "清洁生产验收", "一厂一策", "设备拆除污染防治方案", "设备拆除污染防治应急预案", "设备拆除污染防治报告", "土壤隐患排查方案", "土壤隐患排查报告", "土壤自行监测方案", "土壤自行监测报告", "土壤污染状况调查方案", "土壤污染状况调查报告", "土壤污染风险评估报告", "土壤修复方案", "土壤修复工程", "矿山修复方案", "危废鉴别", "水土保持方案报告表", "水土保持方案报告书", "水土保持监测", "水土保持验收", "水平衡报告表", "水平衡报告书", "水资源论证", "排污口论证", "社稳评估", "节能评估", "能源审计", "可研报告", "备案报告", "碳排放核算", "碳排放核查", "碳排放源清单"];