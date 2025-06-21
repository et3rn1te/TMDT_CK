import React from 'react';
import { X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

interface MobileFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedLevels: string[];
    selectedPriceTypes: string[];
    onLevelChange: (level: string) => void;
    onPriceTypeChange: (priceType: string) => void;
}

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 selectedLevels,
                                                                 selectedPriceTypes,
                                                                 onLevelChange,
                                                                 onPriceTypeChange
                                                             }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 overflow-y-auto p-4 bg-gray-500 bg-opacity-75 lg:hidden">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Bộ lọc</h2>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <FilterSidebar
                    isMobile={true}
                    selectedLevels={selectedLevels}
                    selectedPriceTypes={selectedPriceTypes}
                    onLevelChange={onLevelChange}
                    onPriceTypeChange={onPriceTypeChange}
                />
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={onClose}
                    >
                        Áp dụng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileFilterModal;