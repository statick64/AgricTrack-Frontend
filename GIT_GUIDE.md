# Git Guide for AgriTrack

This guide will help you push your AgriTrack project to a Git repository (GitHub, GitLab, Bitbucket, etc.).

## Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- A GitHub/GitLab/Bitbucket account
- PowerShell or terminal access

## Quick Start (Already Have a Repository)

If you already have a remote repository set up:

```powershell
# Navigate to project directory
cd c:\Users\Kenne\Documents\school\School_courses\400l\project2\implimentation\agrictrack

# Check what files changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Improve project structure and modernize React setup"

# Push to remote
git push origin main
```

---

## First Time Setup

### Step 1: Check if Git is Initialized

```powershell
cd c:\Users\Kenne\Documents\school\School_courses\400l\project2\implimentation\agrictrack
git status
```

**If you see:** `fatal: not a git repository`
- Continue to Step 2

**If you see:** A list of files
- Skip to Step 3

### Step 2: Initialize Git Repository

```powershell
git init
```

This creates a `.git` folder in your project.

### Step 3: Configure Git (First Time Only)

Set your name and email:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Create .gitignore File

Your project should already have a `.gitignore` file. If not, create one:

```powershell
New-Item -Path ".gitignore" -ItemType File
```

Add this content to `.gitignore`:

```
# Dependencies
node_modules/
package-lock.json

# Build output
dist/
build/
.vite/

# Environment variables
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Misc
*.tsbuildinfo
```

### Step 5: Stage Your Files

Add all files to staging:

```powershell
git add .
```

Check what will be committed:

```powershell
git status
```

### Step 6: Create Your First Commit

```powershell
git commit -m "Initial commit: AgriTrack frontend with improved structure"
```

---

## Creating a Remote Repository

### Option A: GitHub

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `agrictrack` (or your preferred name)
4. Description: `Livestock management system frontend`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**
8. Copy the repository URL (e.g., `https://github.com/yourusername/agrictrack.git`)

### Option B: GitLab

1. Go to [gitlab.com](https://gitlab.com)
2. Click **"New project"** → **"Create blank project"**
3. Project name: `agrictrack`
4. Choose visibility level
5. **Uncheck** "Initialize repository with a README"
6. Click **"Create project"**
7. Copy the repository URL

### Option C: Bitbucket

1. Go to [bitbucket.org](https://bitbucket.org)
2. Click **"Create"** → **"Repository"**
3. Repository name: `agrictrack`
4. Choose access level
5. Click **"Create repository"**
6. Copy the repository URL

---

## Connecting to Remote Repository

### Add Remote Origin

Replace `<your-repo-url>` with the URL you copied:

```powershell
git remote add origin <your-repo-url>
```

**Example:**
```powershell
git remote add origin https://github.com/yourusername/agrictrack.git
```

### Verify Remote

```powershell
git remote -v
```

You should see:
```
origin  https://github.com/yourusername/agrictrack.git (fetch)
origin  https://github.com/yourusername/agrictrack.git (push)
```

---

## Pushing to Remote

### First Push

```powershell
# Rename branch to main (if needed)
git branch -M main

# Push and set upstream
git push -u origin main
```

### Subsequent Pushes

After the first push, you can simply use:

```powershell
git push
```

---

## Daily Git Workflow

### Making Changes

1. **Make your code changes**

2. **Check what changed:**
   ```powershell
   git status
   ```

3. **See detailed changes:**
   ```powershell
   git diff
   ```

4. **Stage changes:**
   ```powershell
   # Stage all changes
   git add .
   
   # Or stage specific files
   git add src/components/NewComponent.tsx
   ```

5. **Commit changes:**
   ```powershell
   git commit -m "Add new livestock tracking feature"
   ```

6. **Push to remote:**
   ```powershell
   git push
   ```

---

## Writing Good Commit Messages

### Format

```
Short summary (50 characters or less)

More detailed explanation if needed (wrap at 72 characters).
Explain what and why, not how.

- Bullet points are okay
- Use present tense ("Add feature" not "Added feature")
```

### Examples

**Good:**
```powershell
git commit -m "Add livestock health tracking dashboard

- Create HealthDashboard component
- Add vaccination schedule table
- Implement health status filters"
```

**Bad:**
```powershell
git commit -m "changes"
git commit -m "fixed stuff"
git commit -m "asdfasdf"
```

### Common Commit Types

```powershell
git commit -m "feat: Add user authentication"
git commit -m "fix: Resolve livestock table sorting bug"
git commit -m "docs: Update README with setup instructions"
git commit -m "style: Format code with Prettier"
git commit -m "refactor: Extract API calls to services"
git commit -m "test: Add unit tests for livestock service"
git commit -m "chore: Update dependencies"
```

---

## Useful Git Commands

### Viewing History

```powershell
# View commit history
git log

# View compact history
git log --oneline

# View last 5 commits
git log -5

# View changes in a commit
git show <commit-hash>
```

### Undoing Changes

```powershell
# Discard changes in a file (before staging)
git checkout -- filename.tsx

# Unstage a file (keep changes)
git reset HEAD filename.tsx

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - DANGEROUS!
git reset --hard HEAD~1
```

### Branching

```powershell
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# List all branches
git branch

# Delete branch
git branch -d feature-name

# Push branch to remote
git push origin feature-name
```

### Pulling Changes

```powershell
# Pull latest changes from remote
git pull

# Pull with rebase (cleaner history)
git pull --rebase
```

---

## Troubleshooting

### Authentication Issues

**Problem:** Git asks for username/password repeatedly

**Solution:** Use a Personal Access Token (PAT)

**GitHub:**
1. Go to Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when prompted

**Or use SSH:**
```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

### Merge Conflicts

**Problem:** `CONFLICT (content): Merge conflict in file.tsx`

**Solution:**
1. Open the conflicting file
2. Look for conflict markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```
3. Edit to keep the correct version
4. Remove conflict markers
5. Stage and commit:
   ```powershell
   git add file.tsx
   git commit -m "Resolve merge conflict in file.tsx"
   ```

### Push Rejected

**Problem:** `! [rejected] main -> main (fetch first)`

**Solution:**
```powershell
# Pull changes first
git pull origin main --rebase

# Then push
git push origin main
```

### Wrong Commit Message

**Problem:** Made a typo in the last commit message

**Solution:**
```powershell
git commit --amend -m "Corrected commit message"

# If already pushed, force push (use carefully!)
git push --force
```

---

## Best Practices

### ✅ Do's

- ✅ Commit often with meaningful messages
- ✅ Pull before you push
- ✅ Use `.gitignore` to exclude unnecessary files
- ✅ Write descriptive commit messages
- ✅ Create branches for new features
- ✅ Review changes before committing (`git diff`)

### ❌ Don'ts

- ❌ Don't commit `node_modules/`
- ❌ Don't commit `.env` files with secrets
- ❌ Don't use `git push --force` on shared branches
- ❌ Don't commit large binary files
- ❌ Don't commit commented-out code
- ❌ Don't make huge commits (break them up)

---

## Quick Reference Cheat Sheet

```powershell
# Setup
git init                          # Initialize repository
git clone <url>                   # Clone repository

# Daily workflow
git status                        # Check status
git add .                         # Stage all changes
git add <file>                    # Stage specific file
git commit -m "message"           # Commit changes
git push                          # Push to remote
git pull                          # Pull from remote

# Branching
git branch                        # List branches
git branch <name>                 # Create branch
git checkout <name>               # Switch branch
git checkout -b <name>            # Create and switch
git merge <branch>                # Merge branch

# History
git log                           # View history
git log --oneline                 # Compact history
git diff                          # View changes

# Undo
git reset HEAD <file>             # Unstage file
git checkout -- <file>            # Discard changes
git reset --soft HEAD~1           # Undo last commit

# Remote
git remote -v                     # List remotes
git remote add origin <url>       # Add remote
git push -u origin main           # First push
```

---

## Getting Help

```powershell
# Get help for any command
git help <command>
git <command> --help

# Examples
git help commit
git push --help
```

---

## Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

---

**Happy coding! 🚀**
