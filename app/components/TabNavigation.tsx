import React from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="tab-navigation relative flex">
      {tabs.map((tab, index) => (
        <div 
          key={tab.id}
          className={`tab-item relative cursor-pointer ${
            activeTab === tab.id ? 'active' : ''
          }`}
          style={{
            top: `${index * 5}px`,
            zIndex: activeTab === tab.id ? 10 : 5 - index
          }}
          onClick={() => onTabChange(tab.id)}
        >
          <div 
            className={`tab-content handwritten py-2 px-6 rounded-t-lg shadow-md transform -rotate-${index % 2 ? 1 : 0} ${
              activeTab === tab.id 
                ? 'bg-amber-100 font-bold' 
                : 'bg-amber-50'
            }`}
          >
            {tab.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
