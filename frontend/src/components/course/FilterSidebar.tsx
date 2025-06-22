import React from 'react';
import {LevelResponse} from '../../types/levelTypes'; // Đảm bảo import LevelResponse

interface FilterSidebarProps {
    isMobile?: boolean;
    selectedLevels: string[];
    selectedPriceTypes: string[];
    onLevelChange: (level: string) => void;
    onPriceTypeChange: (priceType: string) => void;
    allLevels: LevelResponse[]; // THÊM DÒNG NÀY VÀO INTERFACE PROPS
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
                                                         isMobile = false,
                                                         selectedLevels,
                                                         selectedPriceTypes,
                                                         onLevelChange,
                                                         onPriceTypeChange,
                                                         allLevels // Destructure allLevels từ props
                                                     }) => {
    const idPrefix = isMobile ? 'mobile-' : '';

    const getLocalizedLevel = (level: string): string => {
        switch (level) {
            case 'Beginner':
                return 'Cơ bản';
            case 'Intermediate':
                return 'Trung cấp';
            case 'Advanced':
                return 'Nâng cao';
            case 'All Levels':
                return 'Tất cả cấp độ';
            default:
                return level; // Trả về tên gốc nếu không khớp
        }
    };

    return (
        <div className="space-y-6">
            {/* Level filter */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Trình độ</h3>
                <div className="space-y-2">
                    {/* Đảm bảo bạn đang map qua allLevels và dùng level.id làm key */}
                    {allLevels.map(level => (
                        <div key={level.id} className="flex items-center"> {/* Dòng 30: Đảm bảo là key={level.id} */}
                            <input
                                id={`${idPrefix}level-${level.id}`}
                                name={`${idPrefix}level`}
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                checked={selectedLevels.includes(level.name)}
                                onChange={() => onLevelChange(level.name)}
                            />
                            <label htmlFor={`${idPrefix}level-${level.id}`} className="ml-3 text-sm text-gray-700">
                                {getLocalizedLevel(level.name)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price type filter */}
            {/*<div>*/}
            {/*    <h3 className="font-semibold text-gray-900 mb-3">Loại giá</h3>*/}
            {/*    <div className="space-y-2">*/}
            {/*        {[*/}
            {/*            {id: 'free', label: 'Miễn phí'},*/}
            {/*            {id: 'paid', label: 'Có phí'},*/}
            {/*            {id: 'discount', label: 'Đang giảm giá'}*/}
            {/*        ].map(item => (*/}
            {/*            <div key={item.id} className="flex items-center">*/}
            {/*                <input*/}
            {/*                    id={`${idPrefix}price-${item.id}`}*/}
            {/*                    name={`${idPrefix}price-type`}*/}
            {/*                    type="checkbox"*/}
            {/*                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"*/}
            {/*                    checked={selectedPriceTypes.includes(item.id)}*/}
            {/*                    onChange={() => onPriceTypeChange(item.id)}*/}
            {/*                />*/}
            {/*                <label htmlFor={`${idPrefix}price-${item.id}`} className="ml-3 text-sm text-gray-700">*/}
            {/*                    {item.label}*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default FilterSidebar;