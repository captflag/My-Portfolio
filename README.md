<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1nEJrEBH93vG2H96Ge8ff8IviOB7tA3n9

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/YOUR-REPO)

### Quick Deploy

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click **"New Project"**
   - Import your GitHub repository
   
3. **Configure Environment Variables**:
   - In the Vercel project settings, add:
     - `GEMINI_API_KEY` = Your Gemini API key
   - See [.env.example](.env.example) for all required variables

4. **Deploy**:
   - Click **"Deploy"**
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Files for Deployment

This project includes all necessary Vercel configuration:
- ✅ `vercel.json` - Vercel configuration with SPA routing
- ✅ `.vercelignore` - Excludes unnecessary files from deployment
- ✅ `.env.example` - Template for environment variables

### Get Your Gemini API Key

Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

