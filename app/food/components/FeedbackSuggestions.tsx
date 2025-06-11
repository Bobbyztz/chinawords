"use client";

import React, { useState } from "react";

// Define types for our suggestions
interface Suggestion {
  id: string;
  content: string;
  votes: number;
  team?: string; // Optional team assigned to the suggestion
}

const FeedbackSuggestions: React.FC = () => {
  // State for each column
  const [todoSuggestions, setTodoSuggestions] = useState<Suggestion[]>([
    { id: "1", content: "增加更多地方菜系的介绍", votes: 15 },
    { id: "2", content: "添加传统节日食品专题", votes: 12 },
    { id: "3", content: "提供食材营养成分对比", votes: 8 },
  ]);

  const [inProgressSuggestions, setInProgressSuggestions] = useState<
    Suggestion[]
  >([
    {
      id: "4",
      content: "完善八大菜系的筛选功能",
      votes: 23,
      team: "前端开发组",
    },
    { id: "5", content: "优化图片加载速度", votes: 18, team: "性能优化组" },
  ]);

  const [completedSuggestions, setCompletedSuggestions] = useState<
    Suggestion[]
  >([
    { id: "6", content: "修复移动端导航栏显示问题", votes: 7, team: "UI/UX组" },
    { id: "7", content: "添加食品图片墙功能", votes: 31, team: "内容组" },
  ]);

  // State for new suggestion input
  const [newSuggestion, setNewSuggestion] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Handle adding a new suggestion
  const handleAddSuggestion = () => {
    if (newSuggestion.trim() === "") return;

    const suggestion: Suggestion = {
      id: Date.now().toString(), // Simple unique ID
      content: newSuggestion,
      votes: 0,
    };

    setTodoSuggestions([...todoSuggestions, suggestion]);
    setNewSuggestion("");
    setShowInput(false);
  };

  // Handle upvoting a suggestion
  const handleUpvote = (
    id: string,
    column: "todo" | "inProgress" | "completed"
  ) => {
    if (column === "todo") {
      setTodoSuggestions(
        todoSuggestions.map((suggestion) =>
          suggestion.id === id
            ? { ...suggestion, votes: suggestion.votes + 1 }
            : suggestion
        )
      );
    } else if (column === "inProgress") {
      setInProgressSuggestions(
        inProgressSuggestions.map((suggestion) =>
          suggestion.id === id
            ? { ...suggestion, votes: suggestion.votes + 1 }
            : suggestion
        )
      );
    } else {
      setCompletedSuggestions(
        completedSuggestions.map((suggestion) =>
          suggestion.id === id
            ? { ...suggestion, votes: suggestion.votes + 1 }
            : suggestion
        )
      );
    }
  };

  // Render a suggestion item
  const renderSuggestionItem = (
    suggestion: Suggestion,
    column: "todo" | "inProgress" | "completed"
  ) => (
    <div
      key={suggestion.id}
      className="bg-white rounded-lg shadow-sm p-4 mb-3 flex items-start"
    >
      <div
        className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mr-3 cursor-pointer group relative"
        onClick={() => handleUpvote(suggestion.id, column)}
      >
        <span className="text-gray-700 font-medium">{suggestion.votes}</span>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-jade-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-gray-800">{suggestion.content}</p>
        {suggestion.team && (
          <p className="text-sm text-jade-green mt-1">
            负责团队: {suggestion.team}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="w-full overflow-y-auto  rounded-lg max-w-6xl mx-auto px-4 py-8 font-sans-sc"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      {/* 介绍文字 */}
      <div className="rounded-lg p-6 shadow-sm mb-8">
        <p className="text-md font-medium  leading-relaxed text-gray-800">
          我们非常重视您的反馈和建议。在这里，您可以查看当前的项目进展，提出新的建议，或者为您喜欢的建议投票。您的参与将帮助我们不断改进和完善网站内容。
        </p>
      </div>

      {/* 三列布局 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 待做列 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">待做</h2>
            <button
              onClick={() => setShowInput(true)}
              className="w-8 h-8 bg-jade-green text-white rounded-full flex items-center justify-center shadow-sm hover:bg-jade-green/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* 新建议输入框 */}
          {showInput && (
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
              <textarea
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                placeholder="请输入您的建议..."
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-jade-green resize-none placeholder:text-gray-500 placeholder:opacity-100"
                rows={3}
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => setShowInput(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
                <button
                  onClick={handleAddSuggestion}
                  className="px-3 py-1 text-sm bg-jade-green text-white rounded-md hover:bg-jade-green/90"
                >
                  提交
                </button>
              </div>
            </div>
          )}

          {/* 待做建议列表 */}
          <div className="space-y-2">
            {todoSuggestions.map((suggestion) =>
              renderSuggestionItem(suggestion, "todo")
            )}
          </div>
        </div>

        {/* 正在进行列 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">正在进行</h2>
          <div className="space-y-2">
            {inProgressSuggestions.map((suggestion) =>
              renderSuggestionItem(suggestion, "inProgress")
            )}
          </div>
        </div>

        {/* 已完成列 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">已完成</h2>
          <div className="space-y-2">
            {completedSuggestions.map((suggestion) =>
              renderSuggestionItem(suggestion, "completed")
            )}
          </div>
        </div>
      </div>

      {/* 说明文字 */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>点击建议左侧的数字可以为该建议投票，表示您支持这个建议</p>
        <p className="mt-1">
          目前所有功能均为前端实现，后续将接入数据库实现数据持久化
        </p>
      </div>
    </div>
  );
};

export default FeedbackSuggestions;
