import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Clock3,
  Bookmark,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Layers,
  Code2,
  Terminal,
  Compass,
  CheckSquare,
  ListOrdered
} from 'lucide-react';
import { getLesson } from '../data/lessons/index.js';

/**
 * Interactive CodeBlock component with language badge and Copy to Clipboard
 */
function CodeBlock({ code, language = 'csharp' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-lang-badge">
          <Code2 size={13} />
          <span>{language.toUpperCase()}</span>
        </div>
        <button
          className={`copy-code-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} color="#10b981" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Interactive Practice Question with option selection and expandable answer reveal
 */
function PracticeQuestionItem({ question, index }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsRevealed(false);
  }, [question]);

  const options = Array.isArray(question.options) ? question.options : [];

  return (
    <div className="practice-q-card">
      <div className="practice-q-header">
        <span className="q-badge">Question {index + 1}</span>
        <h4 className="q-text">{question.question}</h4>
      </div>

      <div className="options-list">
        {options.map((opt, optIdx) => {
          const isSelected = selectedOption === optIdx;
          const isCorrect = isRevealed && optIdx === question.answerIndex;
          const isWrong = isRevealed && isSelected && optIdx !== question.answerIndex;

          let optionClass = 'option-btn';
          if (isSelected) optionClass += ' selected';
          if (isCorrect) optionClass += ' correct';
          if (isWrong) optionClass += ' wrong';

          return (
            <button
              key={optIdx}
              className={optionClass}
              onClick={() => setSelectedOption(optIdx)}
            >
              <span className="option-marker">
                {String.fromCharCode(65 + optIdx)}
              </span>
              <span className="option-text">{opt}</span>
              {isCorrect && <CheckCircle2 size={16} color="#10b981" className="option-state-icon" />}
            </button>
          );
        })}
      </div>

      <div className="q-action-row">
        <button
          className="reveal-answer-btn"
          onClick={() => setIsRevealed((prev) => !prev)}
        >
          <HelpCircle size={14} />
          <span>{isRevealed ? 'Hide Answer & Explanation' : 'Show Answer & Explanation'}</span>
        </button>
      </div>

      {isRevealed && (
        <div className="answer-explanation-box">
          <div className="correct-answer-label">
            <CheckCircle2 size={16} color="#10b981" />
            <span>
              Correct Answer: <strong>Option {String.fromCharCode(65 + question.answerIndex)}</strong> (
              {options[question.answerIndex]})
            </span>
          </div>
          <p className="explanation-text">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default function TopicViewer({
  syllabus,
  topicId,
  progress = {},
  onUpdateProgress,
  onSelectTopic,
  onGoToDashboard
}) {
  // Find current topic and category from syllabus
  let currentTopic = null;
  let currentCategory = null;
  const allTopics = [];

  if (syllabus && syllabus.categories) {
    for (const cat of syllabus.categories) {
      for (const t of cat.topics) {
        allTopics.push(t);
        if (t.id === topicId) {
          currentTopic = t;
          currentCategory = cat;
        }
      }
    }
  }

  // Preloaded lesson lookup
  const lesson = getLesson(topicId);

  // Sequential navigation
  const currentIndex = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex >= 0 && currentIndex < allTopics.length - 1
      ? allTopics[currentIndex + 1]
      : null;

  // Local state for personal notes scratchpad
  const topicProgress = (topicId && progress[topicId]) || {
    status: 'not_started',
    notes: '',
    bookmarked: false
  };
  const [notes, setNotes] = useState(topicProgress.notes || '');

  useEffect(() => {
    setNotes(topicProgress.notes || '');
  }, [topicId, topicProgress.notes]);

  const handleNotesBlur = () => {
    if (currentTopic && notes !== topicProgress.notes) {
      onUpdateProgress(currentTopic.id, { notes });
    }
  };

  const handleStatusChange = (newStatus) => {
    if (currentTopic) {
      onUpdateProgress(currentTopic.id, { status: newStatus });
    }
  };

  const handleToggleBookmark = () => {
    if (currentTopic) {
      onUpdateProgress(currentTopic.id, {
        bookmarked: !topicProgress.bookmarked
      });
    }
  };

  const handleMarkCompleteAndNext = () => {
    if (currentTopic) {
      onUpdateProgress(currentTopic.id, { status: 'completed' });
    }
    if (nextTopic) {
      onSelectTopic(nextTopic.id);
    } else {
      onGoToDashboard();
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!currentTopic) {
    return (
      <div className="topic-viewer" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <BookOpen size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
        <h2>No Topic Selected</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Choose a lesson from the sidebar outline or explore modules from the dashboard.
        </p>
        <button className="btn-primary" onClick={onGoToDashboard}>
          <ArrowLeft size={16} />
          <span>Return to Dashboard</span>
        </button>
      </div>
    );
  }

  const currentStatus = topicProgress.status || 'not_started';
  const isBookmarked = !!topicProgress.bookmarked;

  return (
    <div className="topic-viewer">
      {/* Top Breadcrumb Bar */}
      <div className="topic-nav-bar">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <span className="crumb-link" onClick={onGoToDashboard}>
            Dashboard
          </span>
          <ChevronRight size={14} />
          <span>{currentCategory?.name || 'Curriculum'}</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>
            {currentTopic.title}
          </span>
        </nav>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={handleToggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Lesson'}
          >
            <Bookmark
              size={15}
              fill={isBookmarked ? 'var(--accent-cyan)' : 'none'}
              color={isBookmarked ? 'var(--accent-cyan)' : 'currentColor'}
            />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button className="btn-secondary" onClick={onGoToDashboard}>
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* Topic Header Card */}
      <div className="topic-header-card">
        <div className="topic-header-top">
          <div>
            <div className="topic-category-badge">
              <BookOpen size={12} />
              <span>{currentCategory?.name}</span>
            </div>
            <h1 className="topic-main-title">{currentTopic.title}</h1>
            <p className="topic-header-sub">
              {lesson?.description || currentTopic.description}
            </p>
          </div>

          {/* Status Switcher Buttons */}
          <div className="status-button-group" role="group" aria-label="Learning status">
            <button
              className={`status-toggle-btn ${currentStatus === 'not_started' ? 'active not_started' : ''}`}
              onClick={() => handleStatusChange('not_started')}
              title="Mark as To Do"
            >
              <Circle size={14} />
              <span>To Do</span>
            </button>

            <button
              className={`status-toggle-btn ${currentStatus === 'in_progress' ? 'active in_progress' : ''}`}
              onClick={() => handleStatusChange('in_progress')}
              title="Mark as In Progress"
            >
              <Clock size={14} />
              <span>In Progress</span>
            </button>

            <button
              className={`status-toggle-btn ${currentStatus === 'completed' ? 'active completed' : ''}`}
              onClick={() => handleStatusChange('completed')}
              title="Mark as Completed"
            >
              <CheckCircle2 size={14} />
              <span>Completed</span>
            </button>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="topic-meta-row">
          <div className="meta-pill" title="Preloaded offline lesson available">
            <Sparkles size={14} color="var(--accent-cyan)" />
            <span>100% Preloaded & Offline</span>
          </div>

          <div className="meta-pill" title="Estimated reading and study time">
            <Clock3 size={14} />
            <span>~15-20 min read</span>
          </div>

          {currentTopic.hours?.total && (
            <div className="meta-pill" title="Syllabus Allocated Hours">
              <span>Allocated: {currentTopic.hours.total} hrs</span>
            </div>
          )}

          <div className="meta-pill" style={{ marginLeft: 'auto' }}>
            <span>Module Order #{currentTopic.order}</span>
          </div>
        </div>
      </div>

      {/* In-Page Quick Table of Contents Jump Links */}
      <nav className="toc-nav-bar" aria-label="Table of Contents">
        <span className="toc-title">Jump to section:</span>
        <div className="toc-pills">
          {Array.isArray(lesson?.objectives) && lesson.objectives.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-objectives')}>
              Objectives
            </button>
          )}
          {lesson?.prerequisites && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-prereq')}>
              Prerequisites
            </button>
          )}
          {Array.isArray(lesson?.terminology) && lesson.terminology.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-terms')}>
              Terminology
            </button>
          )}
          {Array.isArray(lesson?.concepts) && lesson.concepts.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-concepts')}>
              Core Concepts & Code
            </button>
          )}
          {lesson?.diagram && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-diagram')}>
              Architecture
            </button>
          )}
          {lesson?.realWorldApplication && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-realworld')}>
              Real-World Use
            </button>
          )}
          {Array.isArray(lesson?.commonErrors) && lesson.commonErrors.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-pitfalls')}>
              Pitfalls & Debugging
            </button>
          )}
          {Array.isArray(lesson?.bestPractices) && lesson.bestPractices.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-practices')}>
              Best Practices
            </button>
          )}
          {Array.isArray(lesson?.practiceQuestions) && lesson.practiceQuestions.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-practice')}>
              Self-Test Q&A
            </button>
          )}
          {lesson?.revisionSummary && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-revision')}>
              Summary
            </button>
          )}
          {Array.isArray(lesson?.references) && lesson.references.length > 0 && (
            <button className="toc-pill" onClick={() => scrollToSection('sec-references')}>
              References
            </button>
          )}
          <button className="toc-pill" onClick={() => scrollToSection('sec-notes')}>
            Study Notes
          </button>
        </div>
      </nav>

      {/* 1. Learning Objectives */}
      {Array.isArray(lesson?.objectives) && lesson.objectives.length > 0 && (
        <section id="sec-objectives" className="lesson-section-card">
          <h2 className="section-heading">
            <CheckSquare size={18} color="#563E51" />
            <span>Learning Objectives</span>
          </h2>
          <p className="section-lead">By completing this lesson, you will be able to:</p>
          <ul className="objectives-list">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="objective-item">
                <CheckCircle2 size={16} color="#059669" className="objective-icon" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 2. Prerequisites (Supports both string and array) */}
      {lesson?.prerequisites && (
        <section id="sec-prereq" className="lesson-section-card">
          <h2 className="section-heading">
            <Compass size={18} color="#563E51" />
            <span>Prerequisites</span>
          </h2>
          <p className="section-lead">Before diving into this topic, it helps to be comfortable with:</p>
          {Array.isArray(lesson.prerequisites) ? (
            <div className="prereq-tags">
              {lesson.prerequisites.map((p, i) => (
                <span key={i} className="prereq-chip">
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <div className="prereq-box">
              <p className="prereq-text">{lesson.prerequisites}</p>
            </div>
          )}
        </section>
      )}

      {/* 3. Key Terminology */}
      {Array.isArray(lesson?.terminology) && lesson.terminology.length > 0 && (
        <section id="sec-terms" className="lesson-section-card">
          <h2 className="section-heading">
            <BookOpen size={18} color="#563E51" />
            <span>Key Terminology & Definitions</span>
          </h2>
          <div className="terminology-grid">
            {lesson.terminology.map((item, i) => (
              <div key={i} className="term-card">
                <span className="term-name">{item.term}</span>
                <p className="term-def">{item.definition}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Core Concepts & Practical Code Examples */}
      {Array.isArray(lesson?.concepts) && lesson.concepts.length > 0 && (
        <section id="sec-concepts" className="lesson-section-card">
          <h2 className="section-heading">
            <Layers size={18} color="#563E51" />
            <span>Core Concepts & Practical Implementation</span>
          </h2>

          <div className="concepts-container">
            {lesson.concepts.map((concept, i) => (
              <div key={i} className="concept-block">
                <h3 className="concept-title">
                  <span className="concept-index">{i + 1}</span>
                  <span>{concept.title}</span>
                </h3>
                <div className="concept-text">
                  <p>{concept.explanation}</p>
                </div>

                {/* Practical Code Snippet */}
                {concept.codeSnippet && (
                  <div className="code-example-section">
                    <span className="snippet-lead-label">Code Example:</span>
                    <CodeBlock
                      code={concept.codeSnippet}
                      language={concept.language || 'csharp'}
                    />
                  </div>
                )}

                {/* Expected Output */}
                {concept.output && (
                  <div className="output-box">
                    <div className="output-header">
                      <Terminal size={14} color="#C7A3BD" />
                      <span>Expected Output / Terminal Result</span>
                    </div>
                    <pre className="output-pre">
                      <code>{concept.output}</code>
                    </pre>
                  </div>
                )}

                {/* Line by line explanation */}
                {concept.lineExplanation && (
                  <div className="line-explanation-box">
                    <div className="line-explanation-header">
                      <ListOrdered size={14} color="#563E51" />
                      <span>Code Walkthrough & Line Explanation</span>
                    </div>
                    <ul className="line-explanation-list">
                      {Array.isArray(concept.lineExplanation) ? (
                        concept.lineExplanation.map((line, lIdx) => (
                          <li key={lIdx}>{line}</li>
                        ))
                      ) : (
                        <li>{concept.lineExplanation}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Architectural Diagram / Visual Representation */}
      {lesson?.diagram && (
        <section id="sec-diagram" className="lesson-section-card">
          <h2 className="section-heading">
            <Layers size={18} color="#563E51" />
            <span>Architecture & Workflow Diagram</span>
          </h2>
          <div className="diagram-box">
            <pre className="diagram-pre">{lesson.diagram}</pre>
          </div>
        </section>
      )}

      {/* 6. Real-World Application */}
      {lesson?.realWorldApplication && (
        <section id="sec-realworld" className="lesson-section-card">
          <h2 className="section-heading">
            <Lightbulb size={18} color="#563E51" />
            <span>Production & Real-World Application</span>
          </h2>
          <div className="realworld-box">
            <p>{lesson.realWorldApplication}</p>
          </div>
        </section>
      )}

      {/* 7. Common Pitfalls & Debugging Guidance */}
      {Array.isArray(lesson?.commonErrors) && lesson.commonErrors.length > 0 && (
        <section id="sec-pitfalls" className="lesson-section-card">
          <h2 className="section-heading">
            <AlertTriangle size={18} color="#dc2626" />
            <span>Common Pitfalls & Debugging Guidance</span>
          </h2>
          <div className="errors-grid">
            {lesson.commonErrors.map((err, i) => (
              <div key={i} className="error-card">
                <div className="error-badge">
                  <AlertTriangle size={14} color="#dc2626" />
                  <span>Pitfall:</span>
                </div>
                <div className="error-msg">{err.error}</div>
                <div className="solution-box">
                  <strong style={{ color: '#059669' }}>How to fix:</strong> {err.solution}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Industry Best Practices */}
      {Array.isArray(lesson?.bestPractices) && lesson.bestPractices.length > 0 && (
        <section id="sec-practices" className="lesson-section-card">
          <h2 className="section-heading">
            <ShieldCheck size={18} color="#059669" />
            <span>Industry Best Practices</span>
          </h2>
          <ul className="best-practices-list">
            {lesson.bestPractices.map((bp, i) => (
              <li key={i} className="practice-item">
                <CheckCircle2 size={16} color="#059669" className="practice-icon" />
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 9. Self-Test Practice Questions (Interactive) */}
      {Array.isArray(lesson?.practiceQuestions) && lesson.practiceQuestions.length > 0 && (
        <section id="sec-practice" className="lesson-section-card">
          <div className="section-heading-row">
            <h2 className="section-heading">
              <HelpCircle size={18} color="#563E51" />
              <span>Self-Test Practice Questions ({lesson.practiceQuestions.length})</span>
            </h2>
            <span className="practice-hint">Select your answer, then reveal the explanation</span>
          </div>

          <div className="practice-questions-wrapper">
            {lesson.practiceQuestions.map((q, qIdx) => (
              <PracticeQuestionItem key={qIdx} question={q} index={qIdx} />
            ))}
          </div>
        </section>
      )}

      {/* 10. Revision Summary */}
      {lesson?.revisionSummary && (
        <section id="sec-revision" className="lesson-section-card revision-card">
          <h2 className="section-heading">
            <Sparkles size={18} color="#563E51" />
            <span>Key Takeaways & Quick Revision</span>
          </h2>
          <div className="revision-content">
            {Array.isArray(lesson.revisionSummary) ? (
              <ul className="revision-list">
                {lesson.revisionSummary.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{lesson.revisionSummary}</p>
            )}
          </div>
        </section>
      )}

      {/* 11. Official References & Documentation */}
      {Array.isArray(lesson?.references) && lesson.references.length > 0 && (
        <section id="sec-references" className="lesson-section-card">
          <h2 className="section-heading">
            <ExternalLink size={18} color="#563E51" />
            <span>Official Documentation & References</span>
          </h2>
          <div className="references-grid">
            {lesson.references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reference-link-card"
              >
                <div className="ref-info">
                  <span className="ref-title">{ref.title}</span>
                  <span className="ref-url">{ref.url}</span>
                </div>
                <ExternalLink size={15} className="ref-ext-icon" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 12. Personal Study Notes Scratchpad */}
      <section id="sec-notes" className="lesson-section-card">
        <h2 className="section-heading">
          <FileText size={18} color="#563E51" />
          <span>Personal Study Notes & Scratchpad</span>
        </h2>
        <p className="section-lead">
          Jot down code snippets, reminders, or questions. Notes are automatically saved in local storage.
        </p>
        <textarea
          className="notes-textarea"
          placeholder="Write your study notes, reminders, or key insights for this topic... (automatically preserved)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={handleNotesBlur}
        />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem', display: 'block' }}>
          ✓ Notes are preserved locally across browser refreshes and sessions.
        </span>
      </section>

      {/* Footer Navigation */}
      <footer className="viewer-footer-nav">
        {prevTopic ? (
          <button
            className="btn-secondary"
            onClick={() => {
              onSelectTopic(prevTopic.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title={`Previous: ${prevTopic.title}`}
          >
            <ArrowLeft size={16} />
            <span>Previous: {prevTopic.title}</span>
          </button>
        ) : (
          <div />
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn-success"
            onClick={handleMarkCompleteAndNext}
            title="Mark this lesson completed and proceed"
          >
            <CheckCircle2 size={16} />
            <span>{nextTopic ? 'Mark Complete & Next' : 'Mark Complete & Finish'}</span>
          </button>

          {nextTopic && (
            <button
              className="btn-primary"
              onClick={() => {
                onSelectTopic(nextTopic.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={`Next: ${nextTopic.title}`}
            >
              <span>Next: {nextTopic.title}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
