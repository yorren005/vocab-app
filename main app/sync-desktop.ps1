<#
.SYNOPSIS
  Continuous Bi-directional Vault Sync Daemon for Windows Desktop (D:\Language)
.DESCRIPTION
  Automatically synchronizes your local Obsidian vault with your private GitHub repository,
  enabling real-time two-way synchronization between your desktop Obsidian app, mobile PWA,
  and remote devices.
.PARAMETER VaultPath
  Absolute path to the local Obsidian vault. Defaults to D:\Language.
.PARAMETER IntervalSec
  Sync check interval in seconds. Defaults to 300 (5 minutes).
.PARAMETER Once
  Run a single sync check and exit.
#>
param(
  [string]$VaultPath = "D:\Language",
  [int]$IntervalSec = 300,
  [switch]$Once
)

$ErrorActionPreference = "Continue"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 🏛️  Obsidian Desktop Vault Git Synchronizer" -ForegroundColor Cyan
Write-Host "    Vault: $VaultPath" -ForegroundColor DarkGray
Write-Host "    Interval: Every $IntervalSec seconds" -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path -Path (Join-Path $VaultPath ".git"))) {
  Write-Error "❌ Error: '$VaultPath' is not a Git repository."
  exit 1
}

function Invoke-VaultSync {
  $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
  Push-Location $VaultPath
  try {
    # 1. Fetch remote updates
    git fetch origin 2>$null

    # 2. Check for incoming remote commits
    $currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
    $incomingCount = [int](git rev-list HEAD..origin/$currentBranch --count 2>$null)

    if ($incomingCount -gt 0) {
      Write-Host "[$timestamp] 📥 Pulling $incomingCount new commit(s) from GitHub ($currentBranch)..." -ForegroundColor Yellow
      $pullRes = git pull --rebase --autostash origin $currentBranch 2>&1
      if ($LASTEXITCODE -eq 0) {
        Write-Host "[$timestamp] ✅ Successfully updated local vault from mobile/cloud edits!" -ForegroundColor Green
      } else {
        Write-Host "[$timestamp] ⚠️ Rebase warning: $pullRes" -ForegroundColor DarkYellow
      }
    }

    # 3. Check for local modifications
    $changes = git status --porcelain 2>$null
    if ($changes) {
      $changeCount = ($changes -split "`n").Count
      Write-Host "[$timestamp] 💾 Local edits detected ($changeCount files). Staging & committing..." -ForegroundColor Cyan
      git add -A
      $commitMsg = "sync: desktop vault update [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
      git commit -m $commitMsg 2>$null
      
      Write-Host "[$timestamp] 🚀 Pushing local changes to GitHub..." -ForegroundColor Cyan
      $pushRes = git push origin $currentBranch 2>&1
      if ($LASTEXITCODE -eq 0) {
        Write-Host "[$timestamp] ✅ Pushed local updates to GitHub successfully!" -ForegroundColor Green
      } else {
        Write-Host "[$timestamp] ⚠️ Push error: $pushRes" -ForegroundColor Red
      }
    } else {
      if ($incomingCount -eq 0) {
        Write-Host "[$timestamp] 🟢 Vault in sync. (No pending local or remote changes)" -ForegroundColor DarkGray
      }
    }
  } finally {
    Pop-Location
  }
}

if ($Once) {
  Invoke-VaultSync
  exit 0
}

while ($true) {
  Invoke-VaultSync
  Start-Sleep -Seconds $IntervalSec
}
