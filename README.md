# SaferSteps MVP

**Know before you go.** SaferSteps helps you walk smarter — combining data, community, and AI for safer daily journeys.

## 🎯 MVP Features

- **🗺️ Safety Heatmap**: Color-coded map overlay showing safety scores
- **💬 AI Safety Summary**: Click any area for AI-generated safety insights
- **🚶 Safer Route Planner**: Compare fastest vs safest routes
- **⚠️ Community Reports**: Submit and view community safety reports

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Mapbox account and API token
- Supabase account
- OpenAI API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your API keys in `.env.local`:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `OPENAI_API_KEY`: Your OpenAI API key

3. **Set up the database:**
   - Create a new Supabase project
   - Run the SQL schema from `database/schema.sql` in your Supabase SQL editor

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Mapbox GL JS** for interactive maps
- **Lucide React** for icons

### Backend
- **Next.js API Routes** for serverless functions
- **Supabase** for database and auth
- **OpenAI API** for AI summaries

### Database
- **PostgreSQL** via Supabase
- Two main tables: `safety_tiles` and `reports`

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── safety-data/   # Safety heatmap data
│   │   ├── safety-summary/ # AI safety summaries
│   │   └── route/         # Route planning
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # App header
│   ├── MapComponent.tsx   # Main map with heatmap
│   ├── SafetySummary.tsx  # Safety analysis popup
│   └── RoutePlanner.tsx   # Route comparison
├── lib/                   # Utilities
│   └── supabase.ts        # Supabase client
├── database/              # Database schema
│   └── schema.sql         # SQL schema
└── public/               # Static assets
```

## 🎨 Demo Flow

1. **Search any location** → Map zooms, safety colors appear
2. **Click an area** → Popup shows safety score + AI summary
3. **Plan a route** → Two paths: red (fastest) vs green (safest)
4. **Submit reports** → Community-driven safety updates

## 🔧 Development

### Adding Real Data Sources

Replace mock data in API routes with real crime data APIs:

```typescript
// Example: NYC Open Data
const response = await fetch('https://data.cityofnewyork.us/resource/5uac-w243.json')
```

### Customizing Safety Scoring

Modify the safety score calculation in `app/api/safety-summary/route.ts`:

```typescript
const safetyScore = Math.max(0, Math.min(100, 
  100 - (crime_incidents * 8) - (offender_density * 5) - 
  (lighting_quality === 'Poor' ? 20 : 0)
))
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Netlify**: Use `npm run build` and deploy `out/` folder
- **Railway**: Connect GitHub repo and add environment variables

## 🎯 Hackathon Demo Script

**90-second pitch:**

1. "Here's how you can instantly see which route home is safest"
2. Show heatmap colors and click for AI summary
3. Demonstrate route comparison: "This route takes 3 minutes longer but is 25% safer"
4. "Community reports help keep everyone informed"

## 📊 Data Sources

- **Crime Data**: City open data APIs (NYC, SF, etc.)
- **Offender Registry**: Public sex offender databases
- **Community Reports**: User-submitted safety concerns

## 🤝 Contributing

This is a hackathon MVP. For production use, consider:

- Real-time data integration
- User authentication
- Mobile app development
- Advanced routing algorithms
- Machine learning for safety prediction

## 📄 License

MIT License - feel free to use for your own projects!
