import React from 'react';
import {
  Search,
  X,
  BookOpen,
  LayoutDashboard,
  Menu,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Topbar({
  syllabus,
  progress,
  searchQuery,
  onSearchChange,
  onGoToDashboard,
  currentView,
  onToggleSidebar,
  sidebarOpen
}) {
  // Calculate completion percentage
  const totalTopics = syllabus?.totalTopics || 116;
  const completedCount = Object.values(progress || {}).filter(
    (p) => p?.status === 'completed'
  ).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-btn"
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="brand-badge" onClick={onGoToDashboard} title="Go to Dashboard">
          <div className="brand-icon-box">
            <BookOpen size={18} />
          </div>
          <div className="brand-title">
            <span className="brand-name">DevPath</span>
            <span className="brand-sub">.NET Full Stack Mastery</span>
          </div>
        </div>
      </div>

      <div className="topbar-search">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search 116 topics, C#, ASP.NET, SQL, Docker..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search syllabus topics"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="topbar-right">
        <div className="offline-badge" title="All 116 lessons are preloaded locally for offline study">
          <Sparkles size={13} color="#563E51" />
          <span>Preloaded & Offline</span>
        </div>

        {totalTopics > 0 && (
          <div className="syllabus-pill" title="Overall course completion progress">
            <CheckCircle2 size={14} color="#10b981" />
            <span>
              <strong>{completedCount}</strong> / {totalTopics} ({progressPercent}%)
            </span>
          </div>
        )}

        <button
          className={`btn-secondary ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={onGoToDashboard}
          title="Overview Dashboard"
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </button>
      </div>
    </header>
  );
}
