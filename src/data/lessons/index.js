import { MODULE_01_LESSONS } from './module01_csharp_fundamentals.js';
import { MODULE_02_LESSONS } from './module02_modern_csharp.js';
import { MODULE_03_LESSONS } from './module03_git.js';
import { MODULE_04_LESSONS } from './module04_build_tools.js';
import { MODULE_05_LESSONS } from './module05_sql_database.js';
import { MODULE_06_LESSONS } from './module06_aspnet_core.js';
import { MODULE_07_LESSONS } from './module07_aspnet_security.js';
import { MODULE_08_LESSONS } from './module08_testing_code_quality.js';
import { MODULE_09_LESSONS } from './module09_logging.js';
import { MODULE_10_LESSONS } from './module10_design_patterns_solid.js';
import { MODULE_11_LESSONS } from './module11_html_css.js';
import { MODULE_12_LESSONS } from './module12_javascript.js';
import { MODULE_13_LESSONS } from './module13_typescript.js';
import { MODULE_14_LESSONS } from './module14_angular.js';
import { MODULE_15_LESSONS } from './module15_angular_testing.js';
import { MODULE_16_LESSONS } from './module16_fullstack_integration.js';
import { MODULE_17_LESSONS } from './module17_microservices.js';
import { MODULE_18_LESSONS } from './module18_docker_cicd.js';
import { MODULE_19_LESSONS } from './module19_cloud_awareness.js';
import { MODULE_20_LESSONS } from './module20_security_practices.js';
import { MODULE_21_LESSONS } from './module21_ai_augmented_dev.js';
import { MODULE_22_LESSONS } from './module22_agile_readiness.js';
import { MODULE_23_LESSONS } from './module23_capstone_project.js';

/**
 * Complete collection of pre-researched, offline lessons for the .NET Full Stack Developer course.
 * All 116 topics across 23 modules are mapped by their unique topic ID.
 */
export const ALL_LESSONS = {
  ...MODULE_01_LESSONS,
  ...MODULE_02_LESSONS,
  ...MODULE_03_LESSONS,
  ...MODULE_04_LESSONS,
  ...MODULE_05_LESSONS,
  ...MODULE_06_LESSONS,
  ...MODULE_07_LESSONS,
  ...MODULE_08_LESSONS,
  ...MODULE_09_LESSONS,
  ...MODULE_10_LESSONS,
  ...MODULE_11_LESSONS,
  ...MODULE_12_LESSONS,
  ...MODULE_13_LESSONS,
  ...MODULE_14_LESSONS,
  ...MODULE_15_LESSONS,
  ...MODULE_16_LESSONS,
  ...MODULE_17_LESSONS,
  ...MODULE_18_LESSONS,
  ...MODULE_19_LESSONS,
  ...MODULE_20_LESSONS,
  ...MODULE_21_LESSONS,
  ...MODULE_22_LESSONS,
  ...MODULE_23_LESSONS,
};

/**
 * Retrieve the comprehensive lesson for a specific topic ID.
 * Returns null if no lesson is found.
 */
export function getLesson(topicId) {
  if (!topicId) return null;
  return ALL_LESSONS[topicId] || null;
}

/**
 * Retrieve total number of available preloaded lessons.
 */
export function getLessonCount() {
  return Object.keys(ALL_LESSONS).length;
}
