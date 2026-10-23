import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  X,
  Check,
  AlertTriangle,
  Layers,
  ArrowRight,
  Settings2,
  Table,
  Sparkles
} from 'lucide-react';
import {
  readExcelWorkbook,
  analyzeSheetHeaders,
  parseSyllabusData
} from '../utils/excelParser';

export default function ExcelImporter({
  isOpen,
  onClose,
  onImportSuccess
}) {
  const fileInputRef = useRef(null);

  // Importer state
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState('');
  const [sheetsData, setSheetsData] = useState({});

  // Sheet configuration
  const [headers, setHeaders] = useState([]);
  const [headerRowIndex, setHeaderRowIndex] = useState(0);
  const [categoryCol, setCategoryCol] = useState(-1);
  const [topicCol, setTopicCol] = useState(-1);
  const [descriptionCol, setDescriptionCol] = useState(-1);
  const [hoursCol, setHoursCol] = useState(-1);
  const [levelCol, setLevelCol] = useState(-1);

  // Hierarchy and parsing options
  const [hierarchyMode, setHierarchyMode] = useState('category_subtopic');
  const [dotDelimiter, setDotDelimiter] = useState('.');
  const [carryDownCategory, setCarryDownCategory] = useState(true);
  const [splitColonTitle, setSplitColonTitle] = useState(true);
  const [syllabusTitle, setSyllabusTitle] = useState('');

  // Status and preview
  const [previewResult, setPreviewResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Process loaded workbook data
  const handleWorkbookLoaded = (name, sheets, sheetList) => {
    setFileName(name);
    setSheetsData(sheets);
    setSheetNames(sheetList);
    setErrorMessage('');

    const initialSheet = sheetList[0];
    setActiveSheet(initialSheet);
    initializeSheetConfig(sheets[initialSheet], name);
  };

  // Configure column mapping suggestions for the active sheet
  const initializeSheetConfig = (rows, fallbackName = '') => {
    if (!rows || rows.length === 0) {
      setErrorMessage('The selected worksheet contains no data.');
      setPreviewResult(null);
      return;
    }

    const { headerRowIndex: hIdx, headers: hdrs, columnSuggestions } = analyzeSheetHeaders(rows);
    setHeaders(hdrs);
    setHeaderRowIndex(hIdx);

    const catCol = columnSuggestions.categoryCol;
    const topCol = columnSuggestions.topicCol;
    const descCol = columnSuggestions.descriptionCol;
    const hrsCol = columnSuggestions.hoursCol;
    const lvlCol = columnSuggestions.levelCol;

    setCategoryCol(catCol);
    setTopicCol(topCol);
    setDescriptionCol(descCol);
    setHoursCol(hrsCol);
    setLevelCol(lvlCol);

    const title = fallbackName.replace(/\.[^/.]+$/, '') || 'Full Stack Syllabus';
    setSyllabusTitle(title);

    // Initial parse for preview
    generatePreview(rows, {
      headerRowIndex: hIdx,
      categoryCol: catCol,
      topicCol: topCol,
      descriptionCol: descCol,
      hoursCol: hrsCol,
      levelCol: lvlCol,
      hierarchyMode: 'category_subtopic',
      dotDelimiter: '.',
      carryDownCategory: true,
      splitColonTitle: true,
      syllabusName: title
    });
  };

  const generatePreview = (rows, config) => {
    try {
      const result = parseSyllabusData(rows, config);
      if (result.success) {
        setPreviewResult(result);
        setErrorMessage('');
      } else {
        setPreviewResult(null);
        setErrorMessage(result.error || 'Failed to extract topics with the current column mappings.');
      }
    } catch (err) {
      console.error(err);
      setPreviewResult(null);
      setErrorMessage(err.message || 'Error parsing sheet structure.');
    }
  };

  // Trigger preview update when any config dropdown changes
  const handleConfigChange = (updates) => {
    const nextConfig = {
      headerRowIndex,
      categoryCol,
      topicCol,
      descriptionCol,
      hoursCol,
      levelCol,
      hierarchyMode,
      dotDelimiter,
      carryDownCategory,
      splitColonTitle,
      syllabusName: syllabusTitle,
      ...updates
    };

    if (updates.categoryCol !== undefined) setCategoryCol(updates.categoryCol);
    if (updates.topicCol !== undefined) setTopicCol(updates.topicCol);
    if (updates.descriptionCol !== undefined) setDescriptionCol(updates.descriptionCol);
    if (updates.hoursCol !== undefined) setHoursCol(updates.hoursCol);
    if (updates.levelCol !== undefined) setLevelCol(updates.levelCol);
    if (updates.hierarchyMode !== undefined) setHierarchyMode(updates.hierarchyMode);
    if (updates.dotDelimiter !== undefined) setDotDelimiter(updates.dotDelimiter);
    if (updates.carryDownCategory !== undefined) setCarryDownCategory(updates.carryDownCategory);
    if (updates.splitColonTitle !== undefined) setSplitColonTitle(updates.splitColonTitle);
    if (updates.syllabusTitle !== undefined) setSyllabusTitle(updates.syllabusTitle);

    if (sheetsData[activeSheet]) {
      generatePreview(sheetsData[activeSheet], nextConfig);
    }
  };

  const handleSheetTabClick = (sheetName) => {
    setActiveSheet(sheetName);
    initializeSheetConfig(sheetsData[sheetName], fileName);
  };

  // Handle file drop / input
  const processFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setErrorMessage('');
    try {
      const { sheetNames: sNames, sheets } = await readExcelWorkbook(file);
      handleWorkbookLoaded(file.name, sheets, sNames);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Could not parse this file. Ensure it is a valid .xlsx, .xls, or .csv.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click quick load of bundled default syllabus
  const handleLoadDefaultSyllabus = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('/default-syllabus.xlsx');
      if (!response.ok) {
        throw new Error('Default syllabus file not found in public directory.');
      }
      const buffer = await response.arrayBuffer();
      const { sheetNames: sNames, sheets } = await readExcelWorkbook(buffer);
      handleWorkbookLoaded('TOC MAS - .Net FS.xlsx', sheets, sNames);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error loading default syllabus.');
    } finally {
      setLoading(false);
    }
  };

  // Confirm import and apply
  const handleConfirmImport = () => {
    if (!previewResult || !previewResult.syllabus) {
      setErrorMessage('Please resolve errors and generate a valid preview before confirming.');
      return;
    }

    onImportSuccess(previewResult.syllabus);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">
            <FileSpreadsheet size={20} color="var(--accent-cyan)" />
            <span>Import Excel Syllabus (.xlsx, .xls, .csv)</span>
          </div>
          <button className="icon-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Preload Card for TOC MAS - .Net FS */}
          <div className="quick-load-box">
            <div className="quick-load-info">
              <h4>Direct Quick Load: .NET Full Stack Syllabus</h4>
              <p>One-click load for your uploaded "TOC MAS - .Net FS.xlsx" syllabus (23 Modules, 116 Topics)</p>
            </div>
            <button
              className="btn-primary"
              onClick={handleLoadDefaultSyllabus}
              disabled={loading}
              title="Load TOC MAS - .Net FS.xlsx"
            >
              <Sparkles size={15} />
              <span>Load .NET Syllabus</span>
            </button>
          </div>

          {/* Drag & Drop File Zone */}
          <div
            className={`dropzone ${isDragActive ? 'drag-active' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".xlsx, .xls, .csv"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processFile(e.target.files[0]);
                }
              }}
            />
            <div className="dropzone-icon">
              <UploadCloud size={24} />
            </div>
            <div>
              <div className="dropzone-title">
                {loading
                  ? 'Reading workbook...'
                  : fileName
                  ? `Loaded File: ${fileName}`
                  : 'Click to select or drag and drop your Excel syllabus'}
              </div>
              <div className="dropzone-hint">
                Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv)
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="error-banner">
              <AlertTriangle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Worksheet Selector Tabs */}
          {sheetNames.length > 0 && (
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                DETECTED WORKSHEETS ({sheetNames.length})
              </div>
              <div className="worksheet-tabs">
                {sheetNames.map((sName) => (
                  <button
                    key={sName}
                    className={`ws-tab-btn ${activeSheet === sName ? 'active' : ''}`}
                    onClick={() => handleSheetTabClick(sName)}
                  >
                    {sName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flexible Column Mapping & Hierarchy Configuration */}
          {headers.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Settings2 size={16} color="var(--accent-cyan)" />
                <span>Column Mappings & Hierarchy Configuration</span>
              </div>

              <div className="mapping-grid">
                <div className="form-group">
                  <label>Syllabus Name</label>
                  <input
                    type="text"
                    value={syllabusTitle}
                    onChange={(e) => handleConfigChange({ syllabusTitle: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Category / Module Column</label>
                  <select
                    value={categoryCol}
                    onChange={(e) => handleConfigChange({ categoryCol: parseInt(e.target.value, 10) })}
                  >
                    <option value={-1}>-- None (No Category) --</option>
                    {headers.map((hdr, idx) => (
                      <option key={idx} value={idx}>
                        {hdr} (Col {idx + 1})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Topic / Subtopic Column *</label>
                  <select
                    value={topicCol}
                    onChange={(e) => handleConfigChange({ topicCol: parseInt(e.target.value, 10) })}
                  >
                    <option value={-1}>-- Select Column --</option>
                    {headers.map((hdr, idx) => (
                      <option key={idx} value={idx}>
                        {hdr} (Col {idx + 1})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Hours / Duration Column (Optional)</label>
                  <select
                    value={hoursCol}
                    onChange={(e) => handleConfigChange({ hoursCol: parseInt(e.target.value, 10) })}
                  >
                    <option value={-1}>-- None --</option>
                    {headers.map((hdr, idx) => (
                      <option key={idx} value={idx}>
                        {hdr} (Col {idx + 1})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Hierarchy Parsing Mode</label>
                  <select
                    value={hierarchyMode}
                    onChange={(e) => handleConfigChange({ hierarchyMode: e.target.value })}
                  >
                    <option value="category_subtopic">Category + Subtopic (Module Header Rows)</option>
                    <option value="dot_notation">Dot / Delimiter Notation (e.g. 1.1 Topic)</option>
                    <option value="level_column">Hierarchy Level Column</option>
                    <option value="flat">Flat List (Preserve all as topics)</option>
                  </select>
                </div>

                {hierarchyMode === 'dot_notation' && (
                  <div className="form-group">
                    <label>Delimiter</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={dotDelimiter}
                      onChange={(e) => handleConfigChange({ dotDelimiter: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Parsing Checkboxes */}
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={carryDownCategory}
                    onChange={(e) => handleConfigChange({ carryDownCategory: e.target.checked })}
                  />
                  <span>
                    Carry-down category for subtopics (blank parent cells inherit previous module name)
                  </span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={splitColonTitle}
                    onChange={(e) => handleConfigChange({ splitColonTitle: e.target.checked })}
                  />
                  <span>
                    Split topic title from description on colon separator (e.g. "Title : Description Details")
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Interactive Preview Section */}
          {previewResult && previewResult.syllabus && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="preview-summary-bar">
                <span>
                  <strong>✓ Preview Ready:</strong> {previewResult.stats.totalCategories} Modules detected •{' '}
                  {previewResult.stats.totalTopics} Topics extracted
                </span>
                <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                  {previewResult.stats.totalRowsProcessed} raw rows scanned
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                SAMPLE PARSED STRUCTURE PREVIEW:
              </div>

              <div className="preview-list">
                {previewResult.syllabus.categories.slice(0, 5).map((cat) => (
                  <div key={cat.id} className="preview-item">
                    <div>
                      <strong style={{ color: '#fff' }}>{cat.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        First topic: {cat.topics[0]?.title || 'None'}
                      </div>
                    </div>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {cat.topics.length} topics
                    </span>
                  </div>
                ))}
                {previewResult.syllabus.categories.length > 5 && (
                  <div className="preview-item" style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    + {previewResult.syllabus.categories.length - 5} more modules ready to import...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleConfirmImport}
            disabled={!previewResult || !previewResult.syllabus}
          >
            <Check size={16} />
            <span>Confirm & Apply Syllabus</span>
          </button>
        </div>
      </div>
    </div>
  );
}
