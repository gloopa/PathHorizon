🧩 SaferSteps — MVP Scope (context.md version)
🎯 Goal
To build a functional and visually impressive MVP that lets users:
Search any location
See a safety score + AI-generated summary
Plan a safer walking route
(Optional if time) Submit a community safety report
That’s it — simple, demoable, and directly aligned with the Social Good theme.

🚀 MVP Core Features (Keep These)
Feature
Description
Why It’s Essential
🗺️ Safety Heatmap
Color-coded map overlay (green = safe, red = risky). Pulls live data for crime and offender density.
Judges see your innovation instantly — visual + emotional impact.
💬 AI Safety Summary
Clicking a block/address triggers a short LLM summary (e.g., “2 thefts in the last week, low lighting nearby.”)
Gives personality + intelligence. Distinguishes you from just another map.
🚶 Safer Route Planner
Compare “fastest route” vs “safest route” using a simple weighted score.
Real-world utility + “wow” factor.
⚠️ Report Button (optional)
Quick “Report unsafe area” form adds a marker on the map.
Community-driven touch (if time permits).

That’s 3–4 features total — all achievable without hardware, and each can demo visually in 15 seconds.

⚙️ Simplified Tech Stack
Layer
Tech
Reason
Frontend
Next.js + Mapbox GL JS
Fast to prototype, beautiful UI with minimal code.
Backend
Node.js (Express) or Supabase Edge Functions
Simple REST endpoints for safety data + AI summaries.
Database
Supabase (PostgreSQL)
Free, easy auth + data storage.
AI
OpenAI API (GPT-4 Turbo)
Fast, low-latency summaries.
Data Sources
One city’s Open Crime Data API (e.g., NYC or SF) + 1 registry dataset
Lightweight and consistent.


🧠 MVP Data Model (only 2 tables!)
Table
Columns
Purpose
safety_tiles
id, lat, lon, crime_density, offender_density, safety_score
Store computed safety per tile.
reports (optional)
id, lat, lon, category, comment, timestamp
Store community inputs.


🔧 MVP Development Plan (Hour-by-Hour)
Phase 1 — Base Map + Heatmap (4–6 hrs)
Set up Next.js + Mapbox.
Add basic color overlay (green–red) with mock data.
Replace with live API calls from one dataset (crime API).
✅ Visible progress, great morale boost.

Phase 2 — AI Summary Popup (4 hrs)
On click, fetch location’s nearby incidents.
Send to OpenAI API:
prompt = f"""
Summarize this area’s safety in 2 sentences:
Crime incidents nearby: {summary}
Registered offenders: {count}
Lighting quality: {lighting}
Community comments: {comments}
"""

Display the generated text in the popup.
✅ Instant “wow moment” for judges.

Phase 3 — Safer Route (6–8 hrs)
Use Mapbox Directions API.
Reweight cost by safety_score (lower = riskier).
Draw two routes:
Fastest (gray/red)
Safest (green)
Label: “+3 minutes, but 25% safer.”
✅ Real-world value + clear story.

Phase 4 — Community Reports (Stretch Goal, 3–4 hrs)
“⚠️ Report Area” button → form → save to Supabase.
Display pins with icons and tooltips.
✅ Adds social layer if you finish early.

Phase 5 — UI Polish + Demo Script (2–3 hrs)
Add logo + tagline.
Write the 90-second pitch script.
Screen record demo with voiceover.
(“Here’s how you can instantly see which route home is safest.”)

🧱 MVP Architecture Overview
Frontend (Next.js)
 ├── MapPage.jsx – displays Mapbox map + heatmap
 ├── Popup.jsx – AI summary modal
 ├── ReportModal.jsx (optional)
Backend (Node/Supabase)
 ├── /api/safety?lat=x&lon=y – returns safety score
 ├── /api/summary?lat=x&lon=y – calls Gemini + returns text
 ├── /api/route?start&end – calls Mapbox + weights safety
DB (Supabase)
 ├── safety_tiles
 └── reports (optional)


🧩 MVP Demo Flow (What to Show)
Search any location
→ Map zooms, safety colors appear.
Click an area
→ Popup: “Safety Score: 72/100” + AI summary text.
Plan a route
→ Two paths appear: red (fastest) vs green (safest).
(Optional) Submit a “Poor lighting” report.
Time: 90 seconds total — clean, visual, story-driven.

🏆 Why This MVP Can Win
✅ Visual wow factor — live heatmap + routes.
✅ Human story — everyone relates to safety.
✅ Feasible in 36 hours.
✅ Clear social impact — helps students, travelers, women, and communities.
✅ AI + community blend — exactly what Social Good judges love.

🔮 Stretch Goals (if ahead of schedule)
SMS safety alerts for saved routes.
Multi-language summaries.
Simple “Safety Pulse” dashboard showing trending reports.

💬 Tagline (for Devpost + demo)
Know before you go.
SaferSteps helps you walk smarter — combining data, community, and AI for safer daily journeys.
