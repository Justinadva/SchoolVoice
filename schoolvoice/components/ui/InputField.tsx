'use client';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, icon, rightElement, className, type, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#d1fae5]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-[#6b8f82] pointer-events-none z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              'w-full h-11 rounded-xl border border-[#1a3a2e] bg-[#0d1a16] text-[#d1fae5] placeholder:text-[#6b8f82]',
              'text-sm transition-all duration-200',
              'focus:border-[#34d399] focus:bg-[#0d1a16]',
              'hover:border-[#2a5a46]',
              icon ? 'pl-10 pr-4' : 'px-4',
              (isPassword || rightElement) ? '!pr-11' : '',
              error && 'border-[#fb7185] focus:border-[#fb7185]',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 text-[#6b8f82] hover:text-[#34d399] transition-colors z-10"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          {!isPassword && rightElement && (
            <div className="absolute right-3.5 z-10">{rightElement}</div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#fb7185] flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-[#6b8f82]">{hint}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
