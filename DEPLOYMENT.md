# Deployment Guide for Render

## Prerequisites

- GitHub repository connected to Render
- MongoDB Atlas URI (cloud database)
- All API keys from `.env` (Resend, Cloudinary, Arcjet)

## Environment Variables to Set in Render

### Backend Service

Set these in the Render dashboard:

```
PORT=5000
NODE_ENV=production
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<strong-random-secret>
RESEND_API_KEY=<your-resend-key>
EMAIL_FROM=<your-sender-email>
EMAIL_FROM_NAME=Chatify
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
ARCJET_KEY=<your-arcjet-key>
ARCJET_ENV=production
CLIENT_URL=<your-frontend-url>
```

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Deploy configs for Render"
git push origin main
```

### 2. Create Backend Service on Render

- Go to [render.com/dashboard](https://render.com/dashboard)
- Click "New +" → "Web Service"
- Connect your GitHub repo
- Name: `chatsite-backend`
- Runtime: Node
- Build Command: `cd backend && npm install && npm run build`
- Start Command: `cd backend && npm start`
- Instance Type: Free (or paid for production)
- Add all environment variables (see above)
- Click "Create Web Service"

### 3. Get Backend URL

- Once deployed, Render will provide a URL like: `https://chatsite-backend.onrender.com`
- Copy this URL

### 4. Create Frontend Service on Render

- Click "New +" → "Static Site"
- Connect your GitHub repo
- Name: `chatsite-frontend`
- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`
- Click "Create Static Site"

### 5. Update Backend URL in Frontend

- In your code, update the API base URL to use the backend Render URL
- Or set an environment variable in the static site:
  - Add build-time environment: `VITE_API_URL=https://chatsite-backend.onrender.com/api`

## Troubleshooting

### Backend won't start

- Check logs: Render dashboard → Service logs
- Verify `NODE_ENV=production` is set
- Ensure all required env vars are present

### Frontend can't reach backend

- Verify `CLIENT_URL` is set to your frontend URL
- Check CORS settings in backend (should be enabled)
- Verify backend is running

### Database connection fails

- Test MongoDB URI locally
- Ensure IP whitelist includes Render servers (or use 0.0.0.0)

## Notes

- Free tier services sleep after 15 minutes of inactivity
- For production, upgrade to paid tier
- SSL/HTTPS is automatic on Render
