import React from 'react';
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Folder,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

export default function Dashboard({
  syllabus,
  progress = {},
  onSelectTopic
}) {
  const categories = syllabus?.categories || [];
  const totalTopics = syllabus?.totalTopics || 116;

  // Compute overall stats
  let completedCount = 0;
  let inProgressCount = 0;

  // Flatten all topics to find next topic to continue
  const allTopics = [];
  categories.forEach((cat) => {
    cat.topics.forEach((t) => {
      allTopics.push(t);
      const s = progress[t.id]?.status;
      if (s === 'completed') completedCount++;
      else if (s === 'in_progress') inProgressCount++;
    });
  });

  const remainingCount = Math.max(0, totalTopics - completedCount);
  const percentComplete = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Determine "Continue Learning" target topic:
  // First in-progress topic, or first uncompleted topic, or first topic
  const continueTargetTopic =
    allTopics.find((t) => progress[t.id]?.status === 'in_progress') ||
    allTopics.find((t) => progress[t.id]?.status !== 'completed') ||
    allTopics[0];

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="curriculum-badge">
            <Sparkles size={14} color="var(--accent-cyan)" />
            <span>Official Curriculum • 100% Preloaded & Offline Ready</span>
          </div>
          <h1>.NET Full Stack Developer Mastery 🚀</h1>
          <p>
            Welcome! All 23 modules and 116 topics from your syllabus are researched, fully populated with industry-grade lessons, practical code examples, common pitfalls, and self-test practice questions. Learn at your own pace without requiring an internet connection.
          </p>

          <div className="welcome-actions">
            {continueTargetTopic && (
              <button
                className="continue-btn"
                onClick={() => onSelectTopic(continueTargetTopic.id)}
              >
                <span>Continue Learning: {continueTargetTopic.title}</span>
                <ArrowRight size={16} />
              </button>
            )}
            {allTopics[0] && continueTargetTopic?.id !== allTopics[0]?.id && (
              <button
                className="btn-secondary"
                onClick={() => onSelectTopic(allTopics[0].id)}
              >
                <span>Start from Module 1</span>
              </button>
            )}
          </div>
        </div>

        <div className="welcome-progress-circle">
          <span className="progress-number">{percentComplete}%</span>
          <span className="progress-label">Course Progress</span>
        </div>
      </section>

      {/* Top Stat Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{ background: 'rgba(86, 62, 81, 0.1)', color: '#563E51' }}
          >
            <BookOpen size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalTopics}</span>
            <span className="stat-title">Total Lessons</span>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{ background: 'rgba(5, 150, 105, 0.12)', color: '#059669' }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-title">Completed Lessons</span>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{ background: 'rgba(199, 163, 189, 0.35)', color: '#563E51' }}
          >
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{inProgressCount}</span>
            <span className="stat-title">In Progress</span>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{ background: 'rgba(234, 220, 231, 0.8)', color: '#563E51' }}
          >
            <ListTodo size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{remainingCount}</span>
            <span className="stat-title">Lessons Remaining</span>
          </div>
        </div>
      </section>

      {/* Course Categories Grid */}
      <section>
        <div className="section-header">
          <h2 className="section-title">
            <Folder size={20} color="#563E51" />
            <span>Course Modules ({categories.length} Modules)</span>
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Click any module card to start learning
          </span>
        </div>

        <div className="category-cards-grid">
          {categories.map((category) => {
            const catTotal = category.topics.length;
            const catCompleted = category.topics.filter(
              (t) => progress[t.id]?.status === 'completed'
            ).length;
            const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
            const firstTopic = category.topics[0];

            return (
              <div
                key={category.id}
                className="course-card"
                onClick={() => firstTopic && onSelectTopic(firstTopic.id)}
              >
                <div className="course-card-top">
                  <div className="course-card-header">
                    <h3 className="course-card-title">{category.name}</h3>
                  </div>

                  <div className="course-card-meta">
                    <span>{catTotal} Lessons</span>
                    <span>•</span>
                    <span>{catPct}% Completed</span>
                  </div>

                  <div className="progress-bar-container">
                    <div className="progress-bar-track">
                      <div
                        className={`progress-bar-fill ${catPct === 100 ? 'complete' : ''}`}
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="course-card-footer">
                  <span className="fraction-text">
                    {catCompleted} of {catTotal} completed
                  </span>
                  <span className="card-action-link">
                    <span>Study Module</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
