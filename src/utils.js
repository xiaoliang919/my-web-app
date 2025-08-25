// src/utils.js

export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
    } catch (e) {
        return '';
    }
};

export const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleString('zh-CN', { hour12: false });
    } catch (e) {
        return '';
    }
};

export const formatAmount = (amount) => {
    if (amount === null || amount === undefined || amount === '' || isNaN(Number(amount))) return 'N/A';
    return `${Number(amount).toLocaleString('zh-CN')} 元`;
};

export const formatDuration = (totalDays) => {
    if (totalDays === null || isNaN(totalDays)) return { status: '-', time: ''};
    if (totalDays === 0) return { status: '今天截止', time: '' };
    const status = totalDays < 0 ? '已逾期' : '剩余';
    const absDays = Math.abs(totalDays);
    if (absDays < 30) return { status, time: `${absDays}天` };
    const years = Math.floor(absDays / 365);
    const months = Math.floor((absDays % 365) / 30);
    const days = (absDays % 365) % 30;
    let parts = [];
    if (years > 0) parts.push(`${years}年`);
    if (months > 0) parts.push(months > 0 ? `${months}月` : '');
    if (days > 0) parts.push(days > 0 ? `${days}天` : '');
    return { status, time: parts.join('') };
};