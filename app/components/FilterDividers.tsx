import React from 'react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterDividersProps {
  options: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
}

const FilterDividers: React.FC<FilterDividersProps> = ({
  options,
  selectedFilter,
  onFilterChange
}) => {
  return (
    <div className="filter-dividers flex flex-wrap gap-2 my-4">
      {options.map((option) => (
        <button
          key={option.id}
          className={`filter-tab relative px-4 py-2 handwritten rounded-tr-md rounded-br-md ${
            selectedFilter === option.id
              ? 'bg-amber-200 shadow-md'
              : 'bg-amber-50'
          }`}
          onClick={() => onFilterChange(option.id)}
        >
          <div className="relative z-10">{option.label}</div>
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 bg-amber-300"
            style={{
              boxShadow: selectedFilter === option.id 
                ? '1px 0 3px rgba(0,0,0,0.1)' 
                : 'none'
            }}
          ></div>
        </button>
      ))}
    </div>
  );
};

export default FilterDividers;
