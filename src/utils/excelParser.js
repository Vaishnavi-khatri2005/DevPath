import * as XLSX from 'xlsx';

/**
 * Reads an Excel file (.xlsx, .xls, .csv) and returns workbook details,
 * sheet names, and raw row preview for all sheets.
 * @param {File|ArrayBuffer} fileOrBuffer
 * @returns {Promise<{ sheetNames: string[], sheets: Object, rawWorkbook: any }>}
 */
export async function readExcelWorkbook(fileOrBuffer) {
  let arrayBuffer;
  if (fileOrBuffer instanceof ArrayBuffer) {
    arrayBuffer = fileOrBuffer;
  } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(fileOrBuffer)) {
    arrayBuffer = fileOrBuffer.buffer.slice(fileOrBuffer.byteOffset, fileOrBuffer.byteOffset + fileOrBuffer.byteLength);
  } else if (fileOrBuffer && typeof fileOrBuffer.arrayBuffer === 'function') {
    arrayBuffer = await fileOrBuffer.arrayBuffer();
  } else {
    throw new Error('Invalid file format. Please provide a valid Excel or CSV file.');
  }

  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    throw new Error('No worksheets found in this Excel file.');
  }

  const sheets = {};
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    // Convert to 2D array: header: 1
    const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    sheets[sheetName] = rawRows;
  }

  return {
    sheetNames: workbook.SheetNames,
    sheets,
    rawWorkbook: workbook
  };
}

/**
 * Detects potential headers and candidate column indices.
 * @param {Array<Array>} rows
 * @returns {{ headerRowIndex: number, headers: string[], columnSuggestions: Object }}
 */
export function analyzeSheetHeaders(rows) {
  if (!rows || rows.length === 0) {
    return { headerRowIndex: -1, headers: [], columnSuggestions: {} };
  }

  // Find the first row that has at least 1 non-empty string cell
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const row = rows[i];
    if (row && row.some(cell => typeof cell === 'string' && cell.trim().length > 0)) {
      headerRowIndex = i;
      break;
    }
  }

  const rawHeaders = rows[headerRowIndex] || [];
  // Ensure every column has a name (Col A, Col B, etc. if empty header)
  const headers = rawHeaders.map((h, idx) => {
    const val = (h !== null && h !== undefined) ? String(h).trim() : '';
    return val || `Column ${String.fromCharCode(65 + (idx % 26))}${idx >= 26 ? Math.floor(idx / 26) : ''}`;
  });

  // Suggest mappings by analyzing header text
  const suggestions = {
    categoryCol: -1,
    topicCol: -1,
    descriptionCol: -1,
    hoursCol: -1,
    levelCol: -1
  };

  headers.forEach((hdr, idx) => {
    const lower = hdr.toLowerCase();
    // Prioritize specific module/category header
    if (lower.includes('module name') || lower.includes('module')) {
      suggestions.categoryCol = idx;
    } else if (suggestions.categoryCol === -1 && (lower.includes('category') || lower.includes('track') || lower.includes('chapter') || lower.includes('unit'))) {
      suggestions.categoryCol = idx;
    }

    if (lower.includes('sub topic') || lower.includes('subtopic') || lower.includes('sub-topic')) {
      suggestions.topicCol = idx;
    } else if (suggestions.topicCol === -1 && (lower.includes('topic') || lower.includes('title') || lower.includes('lesson'))) {
      suggestions.topicCol = idx;
    }

    if (suggestions.descriptionCol === -1 && (lower.includes('desc') || lower.includes('detail') || lower.includes('content') || lower.includes('overview') || lower.includes('summary'))) {
      suggestions.descriptionCol = idx;
    }

    if (lower.includes('total hr') || lower.includes('total hours')) {
      suggestions.hoursCol = idx;
    } else if (suggestions.hoursCol === -1 && (lower.includes('hour') || lower.includes('duration') || lower.includes('hrs') || lower.includes('time'))) {
      suggestions.hoursCol = idx;
    }

    if (suggestions.levelCol === -1 && (lower.includes('level') || lower.includes('tier') || lower.includes('depth') || lower.includes('hierarchy'))) {
      suggestions.levelCol = idx;
    }
  });

  // If topic col was not found, fall back to first text column
  if (suggestions.topicCol === -1) {
    if (suggestions.categoryCol !== 0 && headers.length > 0) {
      suggestions.topicCol = 0;
    } else if (headers.length > 1) {
      suggestions.topicCol = 1;
    }
  }

  return {
    headerRowIndex,
    headers,
    columnSuggestions: suggestions
  };
}

/**
 * Parses raw worksheet data according to user configuration.
 *
 * @param {Array<Array>} rows - Raw 2D array of rows
 * @param {Object} config - Parsing options
 * @param {number} config.headerRowIndex - Row index of headers (data starts after)
 * @param {number} config.topicCol - Column index for topic titles
 * @param {number} [config.categoryCol] - Column index for categories/modules (-1 if none)
 * @param {number} [config.descriptionCol] - Column index for topic description (-1 if none)
 * @param {number} [config.hoursCol] - Column index for duration/hours (-1 if none)
 * @param {number} [config.levelCol] - Column index for hierarchy levels (-1 if none)
 * @param {string} [config.hierarchyMode] - 'category_subtopic' | 'dot_notation' | 'level_column' | 'flat'
 * @param {string} [config.dotDelimiter] - Delimiter for dot notation, e.g. '.'
 * @param {boolean} [config.carryDownCategory] - If true, blank category rows inherit previous category
 * @param {boolean} [config.splitColonTitle] - If true, "Title : Description" in topic column splits automatically
 * @param {string} [config.syllabusName] - Name of syllabus
 * @returns {Object} { success: boolean, syllabus: Object, stats: Object, warnings: string[] }
 */
export function parseSyllabusData(rows, config = {}) {
  const {
    headerRowIndex = 0,
    topicCol = 0,
    categoryCol = -1,
    descriptionCol = -1,
    hoursCol = -1,
    levelCol = -1,
    hierarchyMode = 'category_subtopic',
    dotDelimiter = '.',
    carryDownCategory = true,
    splitColonTitle = true,
    syllabusName = 'Full Stack Developer Syllabus'
  } = config;

  const warnings = [];
  const categoriesMap = new Map(); // categoryName -> categoryObject
  let currentCategoryName = 'General';
  let categoryOrder = 1;
  let topicOrder = 1;

  const dataRows = rows.slice(headerRowIndex + 1);

  if (dataRows.length === 0) {
    return {
      success: false,
      error: 'The selected worksheet has no data rows after the header.',
      syllabus: null
    };
  }

  // Helper to get or create category
  const getOrCreateCategory = (name) => {
    const cleanName = (name || 'General').trim();
    if (!categoriesMap.has(cleanName)) {
      const catId = `cat-${categoriesMap.size + 1}`;
      categoriesMap.set(cleanName, {
        id: catId,
        name: cleanName,
        order: categoryOrder++,
        topics: []
      });
    }
    return categoriesMap.get(cleanName);
  };

  for (let rowIndex = 0; rowIndex < dataRows.length; rowIndex++) {
    const row = dataRows[rowIndex];
    if (!row || row.length === 0) continue;

    // Check if entire row is empty/null/whitespace
    const hasAnyContent = row.some(
      cell => cell !== null && cell !== undefined && String(cell).trim().length > 0
    );
    if (!hasAnyContent) continue;

    const rawCategory = categoryCol >= 0 && row[categoryCol] !== undefined ? String(row[categoryCol]).trim() : '';
    const rawTopic = topicCol >= 0 && row[topicCol] !== undefined ? String(row[topicCol]).trim() : '';
    const rawDesc = descriptionCol >= 0 && row[descriptionCol] !== undefined ? String(row[descriptionCol]).trim() : '';
    const rawHours = hoursCol >= 0 && row[hoursCol] !== undefined ? String(row[hoursCol]).trim() : '';
    const rawLevel = levelCol >= 0 && row[levelCol] !== undefined ? String(row[levelCol]).trim() : '';

    // Collect extra hours columns if this is the standard TOC MAS table
    // (Track, Module, Subtopic, SME Hours, Hands-on, E-Learning, Total)
    let hoursMetadata = null;
    if (row.length >= 7 && (row[3] || row[4] || row[5] || row[6])) {
      hoursMetadata = {
        sme: row[3] || null,
        handsOn: row[4] || null,
        elearn: row[5] || null,
        total: row[6] || rawHours || null
      };
    } else if (rawHours) {
      hoursMetadata = { total: rawHours };
    }

    // --- Mode 1: Category + Subtopic (with carry-down) ---
    if (hierarchyMode === 'category_subtopic') {
      // Case A: Module row (category is present, but subtopic is empty)
      // Example: Row has [".Net Fullstack", "1. C# Fundamentals", null, 2, 4, 2]
      if (rawCategory && !rawTopic) {
        currentCategoryName = rawCategory;
        getOrCreateCategory(currentCategoryName);
        continue;
      }

      // Case B: Subtopic row under current category
      if (rawTopic) {
        let categoryName = currentCategoryName;
        if (rawCategory) {
          // Both category and subtopic present in the row
          categoryName = rawCategory;
          if (carryDownCategory) {
            currentCategoryName = rawCategory;
          }
        }

        const categoryObj = getOrCreateCategory(categoryName);
        addParsedTopic(categoryObj, rawTopic, rawDesc, hoursMetadata, splitColonTitle, topicOrder++);
        continue;
      }

      // Neither category nor topic had meaningful content
      continue;
    }

    // --- Mode 2: Dot Notation Hierarchy (e.g. 1.1 Topic or HTML.Basics) ---
    if (hierarchyMode === 'dot_notation') {
      const targetText = rawTopic || rawCategory;
      if (!targetText) continue;

      let catName = 'General';
      let topicTitle = targetText;

      if (targetText.includes(dotDelimiter)) {
        const parts = targetText.split(dotDelimiter).map(p => p.trim()).filter(Boolean);
        if (parts.length > 1) {
          catName = parts.slice(0, -1).join(' / ');
          topicTitle = parts[parts.length - 1];
        }
      } else if (rawCategory) {
        catName = rawCategory;
      }

      const categoryObj = getOrCreateCategory(catName);
      addParsedTopic(categoryObj, topicTitle, rawDesc, hoursMetadata, splitColonTitle, topicOrder++);
      continue;
    }

    // --- Mode 3: Explicit Level Column ---
    if (hierarchyMode === 'level_column') {
      const level = parseInt(rawLevel, 10);
      const text = rawTopic || rawCategory;
      if (!text) continue;

      if (level === 1) {
        currentCategoryName = text;
        getOrCreateCategory(currentCategoryName);
      } else {
        const categoryObj = getOrCreateCategory(currentCategoryName);
        addParsedTopic(categoryObj, text, rawDesc, hoursMetadata, splitColonTitle, topicOrder++);
      }
      continue;
    }

    // --- Mode 4: Flat List ---
    if (hierarchyMode === 'flat') {
      const text = rawTopic || rawCategory;
      if (!text) continue;
      const catName = rawCategory || 'Curriculum Topics';
      const categoryObj = getOrCreateCategory(catName);
      addParsedTopic(categoryObj, text, rawDesc, hoursMetadata, splitColonTitle, topicOrder++);
    }
  }

  // Filter out any completely empty categories if they somehow have 0 topics
  // (unless it's the only category)
  const categories = Array.from(categoriesMap.values()).filter(cat => cat.topics.length > 0);

  if (categories.length === 0) {
    return {
      success: false,
      error: 'No topics could be extracted with the selected column mappings.',
      syllabus: null,
      warnings
    };
  }

  let totalTopics = 0;
  categories.forEach(cat => {
    totalTopics += cat.topics.length;
  });

  const syllabus = {
    id: `syllabus-${Date.now()}`,
    name: syllabusName || 'Full Stack Developer Syllabus',
    importedAt: new Date().toISOString(),
    totalCategories: categories.length,
    totalTopics,
    categories
  };

  return {
    success: true,
    syllabus,
    stats: {
      totalCategories: categories.length,
      totalTopics,
      totalRowsProcessed: dataRows.length
    },
    warnings
  };
}

/**
 * Helper to split "Title : Description" and push topic to category
 */
function addParsedTopic(categoryObj, rawTopic, rawDesc, hoursMetadata, splitColonTitle, order) {
  let title = rawTopic.trim();
  let description = rawDesc ? rawDesc.trim() : '';

  // Handle format like "Language Basics : Variables, data types, constants; operators..."
  if (splitColonTitle && title.includes(' : ')) {
    const parts = title.split(' : ');
    title = parts[0].trim();
    const remainingDesc = parts.slice(1).join(' : ').trim();
    if (!description) {
      description = remainingDesc;
    } else {
      description = `${remainingDesc}\n\n${description}`;
    }
  }

  const topicId = `topic-${categoryObj.id}-${categoryObj.topics.length + 1}`;

  categoryObj.topics.push({
    id: topicId,
    title,
    description,
    categoryId: categoryObj.id,
    categoryName: categoryObj.name,
    order,
    hours: hoursMetadata,
    originalText: rawTopic
  });
}
