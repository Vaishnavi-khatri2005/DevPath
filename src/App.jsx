import React, { useState, useEffect } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TopicViewer from './components/TopicViewer';
import ErrorBoundary from './components/ErrorBoundary';
import { DOTNET_FULLSTACK_SYLLABUS } from './data/syllabus';
import {
  loadProgress,
  updateTopicProgress,
  loadSettings,
  saveSettings
} from './utils/storage';

export default function App() {
  // Initialize UI settings from local storage
  const initialSettings = loadSettings();

  // Preloaded .NET Full Stack Syllabus (23 modules, 116 topics)
  const [syllabus] = useState(DOTNET_FULLSTACK_SYLLABUS);

  const [progress, setProgress] = useState(() => loadProgress());
  const [currentView, setCurrentView] = useState(initialSettings.currentView || 'dashboard');
  const [activeTopicId, setActiveTopicId] = useState(initialSettings.activeTopicId || null);
  const [sidebarOpen, setSidebarOpen] = useState(
    initialSettings.sidebarOpen !== undefined ? initialSettings.sidebarOpen : true
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Set of expanded category IDs in the sidebar
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initialSet = new Set();
    const categories = DOTNET_FULLSTACK_SYLLABUS?.categories || [];
    // Expand the first 3 categories by default for clean initial view
    categories.slice(0, 3).forEach((c) => initialSet.add(c.id));
    return initialSet;
  });

  // Persist settings whenever view or active topic changes
  useEffect(() => {
    saveSettings({
      currentView,
      activeTopicId,
      sidebarOpen
    });
  }, [currentView, activeTopicId, sidebarOpen]);

  // Handlers
  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleToggleCategory = (categoryId) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const next = new Set();
    syllabus?.categories?.forEach((c) => next.add(c.id));
    setExpandedCategories(next);
  };

  const handleCollapseAll = () => {
    setExpandedCategories(new Set());
  };

  const handleSelectTopic = (topicId) => {
    setActiveTopicId(topicId);
    setCurrentView('topic');

    // Automatically ensure the selected topic's category is expanded
    if (syllabus?.categories) {
      for (const cat of syllabus.categories) {
        if (cat.topics.some((t) => t.id === topicId)) {
          setExpandedCategories((prev) => new Set(prev).add(cat.id));
          break;
        }
      }
    }

    // Scroll main content to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateTopicProgress = (topicId, updates) => {
    const newProgress = updateTopicProgress(topicId, updates);
    setProgress({ ...newProgress });
  };

  return (
    <div className="app-container">
      {/* Collapsible Left Sidebar */}
      <Sidebar
        syllabus={syllabus}
        progress={progress}
        activeTopicId={activeTopicId}
        onSelectTopic={handleSelectTopic}
        searchQuery={searchQuery}
        expandedCategories={expandedCategories}
        onToggleCategory={handleToggleCategory}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className={`main-wrapper ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        {/* Top Navigation Bar */}
        <Topbar
          syllabus={syllabus}
          progress={progress}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onGoToDashboard={handleGoToDashboard}
          currentView={currentView}
          onToggleSidebar={handleToggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Content Area: Dashboard or TopicViewer */}
        <main className="content-area">
          <ErrorBoundary onReset={handleGoToDashboard}>
            {currentView === 'dashboard' ? (
              <Dashboard
                syllabus={syllabus}
                progress={progress}
                onSelectTopic={handleSelectTopic}
              />
            ) : (
              <TopicViewer
                syllabus={syllabus}
                topicId={activeTopicId}
                progress={progress}
                onUpdateProgress={handleUpdateTopicProgress}
                onSelectTopic={handleSelectTopic}
                onGoToDashboard={handleGoToDashboard}
              />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
