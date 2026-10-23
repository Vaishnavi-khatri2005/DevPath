/**
 * Pre-generated comprehensive lessons for MODULE_03_LESSONS
 * Sources: Microsoft Learn, official documentation, practical industry patterns.
 */

export const MODULE_03_LESSONS = {
  "topic-3-1": {
    "id": "topic-3-1",
    "title": "Git Fundamentals",
    "category": "3. Version Control – Git",
    "description": "Init, clone, add, commit, push, pull; .gitignore; SSH setup; branch strategy (feature branches, main/develop)",
    "objectives": [
      "Master the three-stage architecture of Git (Working Directory, Staging Area, Repository)",
      "Execute standard workflows: init, clone, add, commit, push, and pull",
      "Configure a bulletproof .gitignore for .NET and Angular projects",
      "Adopt professional branching strategies (Trunk-based development and GitHub Flow)"
    ],
    "prerequisites": "Terminal and file system navigation.",
    "terminology": [
      {
        "term": "Staging Area (Index)",
        "definition": "An intermediate buffer where changes are formatted and reviewed before being permanently recorded into a commit."
      },
      {
        "term": "Commit",
        "definition": "A cryptographic snapshot (SHA-1 hash) of the repository at a specific point in time containing author, timestamp, and message."
      },
      {
        "term": "Trunk-Based Development",
        "definition": "A branching model where developers merge small, frequent updates into a core 'main' branch, minimizing merge drift."
      }
    ],
    "concepts": [
      {
        "title": "The Standard Git Workflow",
        "explanation": "Git tracks snapshots, not file diffs. Files transition from Working Tree -> Staged (Index) -> Committed (HEAD).",
        "codeSnippet": "# 1. Initialize or Clone\ngit init\ngit clone git@github.com:myorg/fullstack-app.git\n\n# 2. Check status and stage modified files\ngit status\ngit add src/EnterpriseApp.Api/Controllers/WeatherController.cs\n\n# 3. Commit with semantic message\ngit commit -m \"feat(api): implement weather forecast endpoint with caching\"\n\n# 4. Push branch to remote\ngit checkout -b feature/weather-api\ngit push -u origin feature/weather-api",
        "language": "bash",
        "output": "Switched to a new branch 'feature/weather-api'\nBranch 'feature/weather-api' set up to track remote branch.",
        "lineExplanation": [
          "Line 7: 'git add' stages the specific file for inclusion in the upcoming commit.",
          "Line 10: Conventional Commit format ('feat(api): ...') standardizes change logs.",
          "Line 14: '-u origin' links the local branch to the remote upstream repository."
        ]
      },
      {
        "title": "Essential .gitignore for .NET & Modern Web",
        "explanation": "Never commit build artifacts (bin/, obj/), node_modules/, IDE configurations (.vs/, .vscode/), or local environment secrets.",
        "codeSnippet": "# Build outputs\n[Bb]in/\n[Oo]bj/\ndist/\nout/\n\n# Node modules & frontend artifacts\nnode_modules/\n.angular/cache/\n\n# User secrets & environment files\n.env\n.env.local\nappsettings.Development.json",
        "language": "gitignore",
        "output": "Prevents temporary binaries, gigabytes of node modules, and secrets from polluting Git.",
        "lineExplanation": [
          "Line 2-3: Excludes compiled .NET binaries and intermediate symbol files.",
          "Line 8: Excludes npm packages (which should be reinstalled via package-lock.json)."
        ]
      }
    ],
    "diagram": "The Three States of Git:\n[ Working Directory ] --(git add)--> [ Staging Area (Index) ] --(git commit)--> [ Local Repository (HEAD) ]\n                                                                                       |\n                                                                                  (git push)\n                                                                                       v\n                                                                            [ Remote (GitHub / Azure) ]",
    "realWorldApplication": "Enforcing atomic commits, linking pull requests to Jira issues, and triggering automated CI/CD builds upon pushing feature branches.",
    "commonErrors": [
      {
        "error": "Accidentally committing bin/ and obj/ folders to GitHub",
        "cause": "Creating the Git repository before adding a proper .gitignore file.",
        "fix": "Run 'git rm -r --cached .' followed by adding the .gitignore and committing."
      }
    ],
    "bestPractices": [
      "Write semantic commit messages following Conventional Commits (feat, fix, refactor, docs).",
      "Keep commits atomic: one logical change or bugfix per commit.",
      "Pull with rebase ('git pull --rebase') to maintain a clean, linear commit history."
    ],
    "practiceQuestions": [
      {
        "question": "What command removes a tracked file from Git without deleting it from your local disk?",
        "options": [
          "git rm file.txt",
          "git rm --cached file.txt",
          "git delete file.txt",
          "git ignore file.txt"
        ],
        "answerIndex": 1,
        "explanation": "'git rm --cached <file>' untracks the file from the repository while leaving the physical file untouched on disk."
      }
    ],
    "revisionSummary": [
      "Git uses Working Directory -> Staging Area -> Repository.",
      "A comprehensive .gitignore protects against committing binaries and secrets.",
      "Use feature branches and pull requests for collaborative code review."
    ],
    "references": [
      {
        "title": "Git Documentation",
        "url": "https://git-scm.com/doc",
        "source": "Official Git Docs"
      }
    ]
  },
  "topic-3-2": {
    "id": "topic-3-2",
    "title": "Branching & Merging",
    "category": "3. Version Control – Git",
    "description": "Branches, merge, rebase; resolving conflicts; pull requests; stash; cherry-pick; git log & diff",
    "objectives": [
      "Master branch creation, switching, and fast-forward vs three-way merges",
      "Understand the difference between git merge and git rebase",
      "Resolve merge conflicts systematically using VS Code diff editors",
      "Use advanced Git tools: git stash, git cherry-pick, and interactive rebase (rebase -i)"
    ],
    "prerequisites": "Git fundamentals (Topic 3-1).",
    "terminology": [
      {
        "term": "Fast-Forward Merge",
        "definition": "A merge that simply moves the branch pointer forward because no diverging commits occurred on the target branch."
      },
      {
        "term": "Rebase",
        "definition": "Reapplying commits from one branch on top of another base tip, creating a clean linear history."
      },
      {
        "term": "Cherry-Pick",
        "definition": "Applying a specific commit from one branch onto another branch by its SHA hash."
      }
    ],
    "concepts": [
      {
        "title": "Merge vs Rebase and Conflict Resolution",
        "explanation": "Merge preserves the complete historical timeline with a merge commit. Rebase rewrites history to place your feature branch directly atop the latest main branch.",
        "codeSnippet": "# 1. Rebase feature branch on latest main\ngit checkout feature/auth\ngit fetch origin\ngit rebase origin/main\n\n# If conflict occurs:\n# Fix conflicts in VS Code, then:\ngit add .\ngit rebase --continue\n\n# 2. Stashing uncommitted work to switch branches quickly\ngit stash save \"WIP: payment service integration\"\ngit checkout main\n# ...do urgent hotfix...\ngit checkout feature/auth\ngit stash pop\n\n# 3. Cherry-pick a specific hotfix commit onto main\ngit checkout main\ngit cherry-pick a8f3b21",
        "language": "bash",
        "output": "Successfully rebased and resolved conflicts without ugly tangled merge commits.",
        "lineExplanation": [
          "Line 4: Moves feature commits so they originate cleanly from the latest commit on origin/main.",
          "Line 12: 'git stash' saves uncommitted dirty work to a temporary shelf.",
          "Line 18: 'cherry-pick' isolates and applies a single commit by hash."
        ]
      }
    ],
    "diagram": "Merge vs Rebase Comparison:\nMERGE:\nMain:    ---o---o---o-------M (Merge commit created)\n                     \\     /\nFeature:              ---o---o\n\nREBASE (Linear history):\nMain:    ---o---o---o\n                     \\\nFeature:              ---o'---o' (Commits replayed linearly)",
    "realWorldApplication": "Maintaining a clean Git history in enterprise engineering teams so automated release notes and git bisect debugging remain readable and functional.",
    "commonErrors": [
      {
        "error": "Rebasing a public shared branch that teammates are actively working on",
        "cause": "Rebasing rewrites commit SHA hashes, causing divergence for everyone else on the branch.",
        "fix": "The Golden Rule of Rebase: Never rebase a public shared branch; only rebase your private local feature branches."
      }
    ],
    "bestPractices": [
      "Rebase local feature branches on 'main' before opening a Pull Request.",
      "Use 'git stash --include-untracked' to stash newly created files.",
      "Never force-push (git push -f) to main or develop; use --force-with-lease on personal branches."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary danger of rebasing a shared branch used by multiple developers?",
        "options": [
          "It permanently deletes all files in the repository.",
          "It rewrites commit history and hashes, desynchronizing everyone else's local copies.",
          "It breaks git clone for new users.",
          "Rebase only works on Windows."
        ],
        "answerIndex": 1,
        "explanation": "Rebasing rewrites commit hashes. Doing this on a shared branch creates conflicting duplicate commits for other collaborators."
      }
    ],
    "revisionSummary": [
      "Merge preserves true history with merge commits; rebase creates a linear history.",
      "Stash temporary changes to switch contexts cleanly.",
      "Resolve conflicts early by keeping branches updated with main."
    ],
    "references": [
      {
        "title": "Git Branching and Rebasing - Atlassian",
        "url": "https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase",
        "source": "Atlassian Git Tutorial"
      }
    ]
  }
};
