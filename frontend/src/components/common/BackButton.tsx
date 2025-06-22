import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    /** Văn bản hiển thị trên button */
    text?: string;
    /** Variant của button - ảnh hưởng đến màu sắc và style */
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'minimal';
    /** Kích thước của button */
    size?: 'sm' | 'md' | 'lg';
    /** Vị trí icon - trước hoặc sau text */
    iconPosition?: 'left' | 'right';
    /** Custom className */
    className?: string;
    /** Custom onClick handler - nếu không cung cấp sẽ dùng navigate(-1) */
    onClick?: () => void;
    /** Có hiển thị icon hay không */
    showIcon?: boolean;
    /** Disabled state */
    disabled?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
                                                   text = 'Quay lại',
                                                   variant = 'primary',
                                                   size = 'md',
                                                   iconPosition = 'left',
                                                   className = '',
                                                   onClick,
                                                   showIcon = true,
                                                   disabled = false
                                               }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled) return;
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    };

    // Variant styles
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm',
        ghost: 'bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        minimal: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500'
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    // Icon size based on button size
    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    // Disabled styles
    const disabledStyles = disabled
        ? 'opacity-50 cursor-not-allowed pointer-events-none'
        : 'cursor-pointer';

    const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabledStyles}
    ${className}
  `;

    const ArrowIcon = () => (
        <svg
            className={`${iconSizes[size]} ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={iconPosition === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            />
        </svg>
    );

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={baseStyles}
        >
            {showIcon && iconPosition === 'left' && <ArrowIcon />}
            <span>{text}</span>
            {showIcon && iconPosition === 'right' && <ArrowIcon />}
        </button>
    );
};

export default BackButton;

// Các ví dụ sử dụng:

// 1. Default
// <BackButton />

// 2. Với text custom
// <BackButton text="Trở về trang chủ" />

// 3. Variant khác nhau
// <BackButton variant="ghost" />
// <BackButton variant="outline" />
// <BackButton variant="minimal" />

// 4. Kích thước khác nhau
// <BackButton size="sm" />
// <BackButton size="lg" />

// 5. Icon ở bên phải
// <BackButton iconPosition="right" />

// 6. Không hiển thị icon
// <BackButton showIcon={false} />

// 7. Custom onClick
// <BackButton onClick={() => navigate('/dashboard')} />

// 8. Disabled
// <BackButton disabled />

// 9. Kết hợp nhiều props
// <BackButton
//   text="Quay lại danh sách"
//   variant="outline"
//   size="lg"
//   className="mb-4"
// />