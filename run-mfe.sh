#!/bin/bash
# ==============================================================
# Nx Angular Micro-Frontend Runner
# Runs shell + selected remotes (or all) using `nx serve`
# ==============================================================

set -e

# ---- App -> Port map (from apps/*/project.json) ----
declare -A APPS=(
  ["shell"]="4200"
  ["oms"]="4201"
  ["online-account"]="4202"
  ["bta-portal"]="4203"
  ["offers-portal"]="4204"
  ["supplementary-portal"]="4205"
  ["wearables-portal"]="4206"
  ["pay-with-points-portal"]="4207"
  ["bcrb"]="4208"
  ["lounge"]="4209"
  ["cen-lcy-exc"]="4210"
  ["centurion-portal"]="4211"
  ["statement"]="4212"
  ["vat_invoice"]="4213"
  ["change-password-portal"]="4214"
  ["soc-roc"]="4215"
  ["Login-Logout-auth-app"]="4216"
)

# ---- 1. Install dependencies if node_modules missing ----
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules not found. Running npm install..."
  npm install
fi

# ---- 2. Kill any process already using our ports (avoid EADDRINUSE) ----
free_ports() {
  for port in "${APPS[@]}"; do
    pid=$(lsof -ti tcp:"$port" 2>/dev/null || true)
    if [ -n "$pid" ]; then
      echo "⚠️  Port $port busy (pid $pid). Killing it..."
      kill -9 "$pid" 2>/dev/null || true
    fi
  done
}

# ---- 3. Function to serve one app ----
run_app() {
  local project=$1
  local port=$2
  echo "🚀 Starting '$project' on http://localhost:$port ..."
  npx nx serve "$project" --port "$port" &
}

# ---- 4. Decide what to run ----
# Usage:
#   ./run-mfe.sh                -> runs shell + ALL remotes
#   ./run-mfe.sh shell oms      -> runs only shell and oms
#   ./run-mfe.sh --list         -> just prints app/port table

if [ "$1" == "--list" ]; then
  echo "Available apps:"
  for app in "${!APPS[@]}"; do
    echo "  $app -> ${APPS[$app]}"
  done
  exit 0
fi

free_ports

if [ "$#" -eq 0 ]; then
  echo "▶️  No app names given, starting ALL micro frontends..."
  for app in "${!APPS[@]}"; do
    run_app "$app" "${APPS[$app]}"
  done
else
  echo "▶️  Starting selected apps: $*"
  for app in "$@"; do
    if [ -n "${APPS[$app]}" ]; then
      run_app "$app" "${APPS[$app]}"
    else
      echo "❌ Unknown app: $app (use --list to see valid names)"
    fi
  done
fi

echo ""
echo "✅ All requested apps launching. Press Ctrl+C to stop everything."
wait