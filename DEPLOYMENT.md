# Deployment Guide

## 🚀 Tech Stack Overview

### Frontend
- **Next.js 14** - React framework with App Router (perfect for Vercel!)
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **React 18** - UI library
- **Mapbox GL** - Interactive maps
- **Supabase Client** - Database and authentication
- **Axios** - HTTP client
- **date-fns** - Date utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Supabase** - PostgreSQL database + Auth
- **OpenAI API** - GPT-4 for AI features
- **LangChain** - AI orchestration

## 📍 Quick Start - Run Locally

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (in a new terminal)
cd backend
npm install
```

### 2. Set Up Environment Variables

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend** (`backend/.env`):
```env
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token
GOOGLE_MAPS_API_KEY=your_google_maps_key
DEEPL_API_KEY=your_deepl_key
```

### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit: **http://localhost:3000**

## 🌐 Deploy to Vercel (Frontend)

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **japan-itinerary-system**
   - Directory? **./frontend**
   - Override settings? **No**

5. **Add Environment Variables in Vercel Dashboard:**
   - Go to your project on Vercel
   - Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_MAPBOX_TOKEN`
     - `NEXT_PUBLIC_API_URL` (your backend URL)

6. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - **IMPORTANT:** Configure:
     - **Framework Preset:** Next.js (auto-detected)
     - **Root Directory:** `frontend` ⚠️ **This is critical!**
     - Build settings will auto-detect from `frontend/vercel.json`

3. **Add Environment Variables** (same as above)

4. **Deploy!**

## 🔧 Deploy Backend (Railway/Render)

### Option 1: Railway (Recommended)

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Deploy**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Add Environment Variables in Railway Dashboard**

4. **Get your backend URL** and update frontend's `NEXT_PUBLIC_API_URL`

### Option 2: Render

1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables
6. Deploy!

### Option 3: Vercel Serverless Functions

You can also convert backend routes to Vercel serverless functions in `frontend/app/api/`

## 📝 Vercel Configuration

The `vercel.json` file is already configured. Key settings:

- **Framework:** Next.js (auto-detected)
- **Build Directory:** `frontend/.next`
- **API Rewrites:** Routes `/api/*` to your backend

## 🔐 Environment Variables Checklist

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `NEXT_PUBLIC_MAPBOX_TOKEN`
- [ ] `NEXT_PUBLIC_API_URL`

### Backend (Railway/Render)
- [ ] `PORT`
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `OPENAI_API_KEY`
- [ ] `MAPBOX_ACCESS_TOKEN`
- [ ] `GOOGLE_MAPS_API_KEY`
- [ ] `DEEPL_API_KEY`

## 🎯 Quick Deploy Commands

```bash
# Deploy frontend to Vercel
cd frontend
vercel --prod

# Deploy backend to Railway
cd backend
railway up
```

## 🐛 Troubleshooting

### Build Fails
- Check all environment variables are set
- Ensure `node_modules` are installed
- Check build logs in Vercel dashboard

### API Calls Fail
- Verify `NEXT_PUBLIC_API_URL` points to your backend
- Check CORS settings in backend
- Ensure backend is deployed and running

### Mapbox Not Working
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set
- Check Mapbox account has credits
- Verify token has correct permissions

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

