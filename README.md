# DevPath — .NET Full Stack Developer Learning Platform 🚀

An interactive, responsive developer learning dashboard that transforms the complete .NET Full Stack curriculum into an offline-ready study experience.

Built with **React**, **Vite**, and clean modern CSS.

---

## 🌟 Key Features

- **Complete Curriculum**: All 23 modules and 116 topics preloaded directly from the syllabus.
- **100% Offline Capable**: Zero runtime AI or external API dependencies. All lessons, code examples, questions, and reference links are pre-generated and stored locally.
- **Deep Technical Lessons**:
  - Learning objectives and prerequisite checks
  - Definitions of key terminology
  - Core concepts with practical, modern code snippets (C#, ASP.NET Core, EF Core, SQL, Angular, TypeScript, Docker, etc.)
  - Expected terminal/console outputs
  - Line-by-line code walkthroughs
  - Architectural and HTTP pipeline diagrams
  - Production and real-world scenarios
  - Common pitfalls and debugging guidance
  - Industry best practices
  - Self-test multiple-choice questions with expandable answers
  - Quick revision summaries
  - Verified reference links to official Microsoft Learn and MDN documentation
- **Student Productivity Tools**:
  - In-lesson Table of Contents jump links
  - Code blocks with one-click **Copy Code**
  - Interactive self-assessment Q&A (test yourself before revealing the answer)
  - Topic bookmarking with indicators in the sidebar
  - Personal study notes scratchpad autosaved to local storage
  - Sequential topic navigation (Previous / Next / Mark Complete & Next)
- **Dashboard & Progress Tracking**:
  - Live completion metrics (% completed, remaining topics, in-progress count)
  - Module cards with individual progress bars
  - Collapsible syllabus sidebar with live search and filter

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ES modules)
- **Icons**: `lucide-react`
- **Styling**: Vanilla CSS Design System (Dark Navy & Cyan/Blue Accent)
- **Persistence**: Browser `localStorage` (Preserves completed topics, bookmarks, study notes, and view state)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git

# Navigate to the project directory
cd fullstack-learning-platform

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The production output is generated in the `dist/` directory.

---

