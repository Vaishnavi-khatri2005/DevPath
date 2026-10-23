import React from 'react';
import { Layers, ChevronDown, ChevronUp, X, FolderTree } from 'lucide-react';
import TopicTree from './TopicTree';

export default function Sidebar({
  syllabus,
  progress,
  activeTopicId,
  onSelectTopic,
  searchQuery,
  expandedCategories,
  onToggleCategory,
  onExpandAll,
  onCollapseAll,
  isOpen,
  onCloseMobile
}) {
  const categories = syllabus?.categories || [];
  const totalTopics = syllabus?.totalTopics || 0;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${!isOpen ? 'mobile-closed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title-box">
            <FolderTree size={18} color="var(--accent-cyan)" />
            <span className="sidebar-title">Syllabus Outline</span>
            <span className="sidebar-badge">{categories.length} Modules</span>
          </div>

          <button
            className="icon-btn mobile-only"
            onClick={onCloseMobile}
            title="Close sidebar"
            style={{ display: 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-controls">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {totalTopics} total topics
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              className="sidebar-quick-btn"
              onClick={onExpandAll}
              title="Expand all modules"
            >
              <ChevronDown size={13} />
              Expand
            </button>
            <button
              className="sidebar-quick-btn"
              onClick={onCollapseAll}
              title="Collapse all modules"
            >
              <ChevronUp size={13} />
              Collapse
            </button>
          </div>
        </div>

        <TopicTree
          categories={categories}
          progress={progress}
          activeTopicId={activeTopicId}
          onSelectTopic={(topicId) => {
            onSelectTopic(topicId);
            if (window.innerWidth <= 1024) {
              onCloseMobile();
            }
          }}
          searchQuery={searchQuery}
          expandedCategories={expandedCategories}
          onToggleCategory={onToggleCategory}
        />
      </aside>
    </>
  );
}
