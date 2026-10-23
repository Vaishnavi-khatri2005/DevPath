/**
 * Local storage utility for persisting syllabus, progress, and UI preferences.
 */

const STORAGE_KEYS = {
  SYLLABUS: 'devpath_syllabus',
  PROGRESS: 'devpath_progress',
  SETTINGS: 'devpath_settings'
};

/**
 * Load the saved syllabus from local storage.
 * @returns {Object|null}
 */
export function loadSyllabus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SYLLABUS);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Error loading syllabus from localStorage:', err);
    return null;
  }
}

/**
 * Save syllabus data to local storage.
 * @param {Object} syllabus
 */
export function saveSyllabus(syllabus) {
  try {
    localStorage.setItem(STORAGE_KEYS.SYLLABUS, JSON.stringify(syllabus));
  } catch (err) {
    console.error('Error saving syllabus to localStorage:', err);
  }
}

/**
 * Clear the saved syllabus from local storage.
 */
export function clearSyllabus() {
  try {
    localStorage.removeItem(STORAGE_KEYS.SYLLABUS);
  } catch (err) {
    console.error('Error clearing syllabus from localStorage:', err);
  }
}

/**
 * Load progress map: { [topicId]: { status, notes, lastAccessed, completedAt } }
 * @returns {Object}
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Error loading progress from localStorage:', err);
    return {};
  }
}

/**
 * Save the entire progress map to local storage.
 * @param {Object} progress
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.error('Error saving progress to localStorage:', err);
  }
}

/**
 * Update progress for an individual topic.
 * @param {string} topicId
 * @param {Object} updates
 * @returns {Object} updated progress map
 */
export function updateTopicProgress(topicId, updates) {
  const current = loadProgress();
  const existing = current[topicId] || {
    status: 'not_started',
    notes: '',
    completedAt: null,
    lastAccessed: null
  };

  const updatedTopic = {
    ...existing,
    ...updates,
    lastAccessed: new Date().toISOString()
  };

  if (updates.status === 'completed' && !existing.completedAt) {
    updatedTopic.completedAt = new Date().toISOString();
  } else if (updates.status && updates.status !== 'completed') {
    updatedTopic.completedAt = null;
  }

  const newProgress = {
    ...current,
    [topicId]: updatedTopic
  };

  saveProgress(newProgress);
  return newProgress;
}

/**
 * Load UI settings & preferences.
 * @returns {Object}
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw
      ? JSON.parse(raw)
      : {
          currentView: 'dashboard',
          activeTopicId: null,
          sidebarOpen: true,
          expandedCategories: []
        };
  } catch (err) {
    console.error('Error loading settings from localStorage:', err);
    return {
      currentView: 'dashboard',
      activeTopicId: null,
      sidebarOpen: true,
      expandedCategories: []
    };
  }
}

/**
 * Save UI settings to local storage.
 * @param {Object} settings
 */
export function saveSettings(settings) {
  try {
    const current = loadSettings();
    localStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify({ ...current, ...settings })
    );
  } catch (err) {
    console.error('Error saving settings to localStorage:', err);
  }
}
