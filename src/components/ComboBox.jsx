// src/components/ComboBox.jsx

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, Check } from './Icons.jsx';

// 下拉菜单的Portal组件
const DropdownPortal = ({ children, inputRef }) => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef(null);

    useLayoutEffect(() => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [inputRef]);

    return ReactDOM.createPortal(
        <div 
            ref={dropdownRef}
            style={{ 
                position: 'absolute', 
                top: `${position.top}px`, 
                left: `${position.left}px`,
                width: `${position.width}px`,
            }}
            className="z-50 mt-1"
        >
            {/* 核心：max-h-56 限制了最大高度，overflow-y-auto 提供了内部滚动条 */}
            <div className="bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto dark:bg-slate-700 dark:border-slate-600">
                {children}
            </div>
        </div>,
        document.body
    );
};


// 全新的 ComboBox 组件
export default function ComboBox({ options, value, onChange, placeholder }) {
    const [inputValue, setInputValue] = useState(value || '');
    const [isOpen, setIsOpen] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setInputValue(value || ''); // 点击外部时恢复为已选中的值
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef, value]);

    const filteredOptions = isFiltering ? 
        options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())) : 
        options;

    const handleSelect = (option) => {
        onChange(option);
        setInputValue(option);
        setIsOpen(false);
        setIsFiltering(false);
    };
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsFiltering(true); // 只有在用户输入时才开始筛选
        if (!isOpen) setIsOpen(true);
    };

    const handleInputClick = () => {
        setIsOpen(true);
        setIsFiltering(false); // 点击时，不筛选，显示全部
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    placeholder={placeholder}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 pr-8 dark:bg-slate-800 dark:border-slate-600 dark:text-gray-200"
                />
                <button
                    type="button"
                    onClick={() => { setIsOpen(!isOpen); setIsFiltering(false); }}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400"
                >
                    <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>
            
            {isOpen && (
                <DropdownPortal inputRef={inputRef}>
                     {filteredOptions.length > 0 ? (
                        <ul className="py-1">
                            {filteredOptions.map((option, index) => (
                                <li key={`${option}-${index}`}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={`w-full text-left flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer ${
                                            value === option ? 'font-semibold text-emerald-500' : 'dark:text-gray-200'
                                        }`}
                                    >
                                        <span>{option}</span>
                                        {value === option && <Check size={16} />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">无匹配项</div>
                    )}
                </DropdownPortal>
            )}
        </div>
    );
};