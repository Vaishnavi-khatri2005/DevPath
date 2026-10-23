import React from 'react';
import { ChevronDown, ChevronRight, Bookmark } from 'lucide-react';

export default function TopicTree({
  categories = [],
  progress = {},
  activeTopicId,
  onSelectTopic,
  searchQuery = '',
  expandedCategories = new Set(),
  onToggleCategory
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Filter categories and topics based on search query
  const filteredCategories = categories.map((cat) => {
    const catMatches = cat.name.toLowerCase().includes(normalizedQuery);
    const matchingTopics = cat.topics.filter((topic) => {
      if (!normalizedQuery) return true;
      return (
        topic.title.toLowerCase().includes(normalizedQuery) ||
        (topic.description && topic.description.toLowerCase().includes(normalizedQuery)) ||
        catMatches
      );
    });

    return {
      ...cat,
      isCatMatch: catMatches,
      matchingTopics
    };
  }).filter((cat) => cat.matchingTopics.length > 0);

  if (filteredCategories.length === 0) {
    return (
      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.85rem' }}>No topics match "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="tree-container">
      {filteredCategories.map((category) => {
        // If there's an active search query, keep categories expanded by default
        const isExpanded = normalizedQuery ? true : expandedCategories.has(category.id);

        const totalInCat = category.topics.length;
        const completedInCat = category.topics.filter(
          (t) => progress[t.id]?.status === 'completed'
        ).length;
        const allDone = totalInCat > 0 && completedInCat === totalInCat;

        return (
          <div key={category.id} className="category-group">
            <button
              className="category-header"
              onClick={() => onToggleCategory(category.id)}
              aria-expanded={isExpanded}
            >
              <div className="category-left">
                {isExpanded ? (
                  <ChevronDown size={16} color="var(--accent-cyan)" />
                ) : (
                  <ChevronRight size={16} color="var(--text-muted)" />
                )}
                <span className="category-name" title={category.name}>
                  {category.name}
                </span>
              </div>

              <span
                className={`category-progress-pill ${allDone ? 'done' : ''}`}
                title={`${completedInCat} of ${totalInCat} topics completed`}
              >
                {completedInCat}/{totalInCat}
              </span>
            </button>

            {isExpanded && (
              <div className="topics-list">
                {category.matchingTopics.map((topic) => {
                  const topicProgress = progress[topic.id] || {};
                  const status = topicProgress.status || 'not_started';
                  const isBookmarked = !!topicProgress.bookmarked;
                  const isActive = activeTopicId === topic.id;

                  return (
                    <button
                      key={topic.id}
                      className={`topic-item ${isActive ? 'active' : ''}`}
                      onClick={() => onSelectTopic(topic.id)}
                      title={topic.title}
                    >
                      <span
                        className={`topic-status-dot ${status}`}
                        title={`Status: ${status.replace('_', ' ')}`}
                      />
                      <span className="topic-text">{topic.title}</span>
                      {isBookmarked && (
                        <Bookmark
                          size={12}
                          fill="var(--accent-cyan)"
                          color="var(--accent-cyan)"
                          style={{ marginLeft: 'auto', flexShrink: 0 }}
                          title="Bookmarked"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
