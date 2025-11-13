# 🚀 Quick Start Guide

## See Your Site Locally (Right Now!)

### Step 1: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend (in a new terminal)
cd backend
npm install
```

### Step 2: Create Environment Files

**Create `frontend/.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Create `backend/.env`:**
```env
PORT=3001
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
OPENAI_API_KEY=your_openai_key_here
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

### Step 3: Run the App

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Open Your Browser

Visit: **http://localhost:3000** 🎉

---

## 📦 Tech Stack Summary

### Frontend
- **Next.js 14** - React framework (deploy to Vercel)
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React 18** - UI library
- **Mapbox** - Maps
- **Supabase** - Database & Auth

### Backend
- **Node.js + Express** - API server
- **TypeScript** - Type safety
- **Supabase** - Database
- **OpenAI** - AI features
- **LangChain** - AI orchestration

---

## 🌐 Deploy to Vercel (5 Minutes)

### Method 1: Vercel CLI (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from frontend folder
cd frontend
vercel

# Follow prompts, then:
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repo
5. **IMPORTANT:** Configure:
   - **Root Directory:** `frontend` ⚠️ **Set this in project settings!**
   - **Framework:** Next.js (auto-detected from `frontend/vercel.json`)
6. Add environment variables in Vercel dashboard
7. Deploy!

### Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_API_URL` (your backend URL)

---

## 🔧 Deploy Backend

### Option 1: Railway (Recommended)

```bash
npm i -g @railway/cli
railway login
cd backend
railway init
railway up
```

### Option 2: Render

1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build: `npm install && npm run build`
6. Start: `npm start`
7. Add environment variables
8. Deploy!

---

## ✅ Checklist

- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Environment variables set
- [ ] Backend running on port 3001
- [ ] Frontend running on port 3000
- [ ] Site loads at localhost:3000
- [ ] Deployed to Vercel
- [ ] Backend deployed (Railway/Render)
- [ ] Environment variables added to Vercel

---

## 🆘 Need Help?

- Check `DEPLOYMENT.md` for detailed instructions
- Check Vercel logs in dashboard
- Check backend logs in Railway/Render
- Verify all environment variables are set

