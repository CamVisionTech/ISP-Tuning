# 🚀 How to Host Your CamVision Tech Website 100% Free Forever

This guide provides 4 foolproof ways to publish your newly built **CamVision Tech** website online with **zero monthly hosting fees**, plus how to link it directly to your **LinkedIn Page and Profile**.

---

## 🎯 Option 1: GitHub Pages (Recommended — 3 Minutes)

GitHub Pages gives you free, enterprise-grade static hosting with automatic SSL (`https://`) and 0 maintenance.

### Step-by-Step Instructions:
1. **Create a Free GitHub Account**: Go to [github.com](https://github.com/) if you don't already have one.
2. **Create a New Repository**:
   - Click the **+** (plus) icon in the top right &rarr; **New repository**.
   - Name it: `ISP-Tuning` (or `username.github.io` if you want it on your root domain).
   - Set visibility to **Public**.
   - Click **Create repository**.
3. **Push / Upload your code**:
   - In your workspace terminal, run:
     ```bash
     git init
     git add .
     git commit -m "Launch CamVision Tech website"
     git branch -M main
     git remote add origin https://github.com/<YOUR-USERNAME>/ISP-Tuning.git
     git push -u origin main
     ```
   - *Alternative (No Git command line)*: You can click **"Upload an existing file"** in GitHub and drag the workspace files (`index.html`, `css/`, `js/`, `assets/`) straight into the browser.
4. **Turn On GitHub Pages**:
   - Go to your repository on GitHub &rarr; click **Settings** &rarr; select **Pages** in the left sidebar.
   - Under **Build and deployment** &rarr; **Source**: select **Deploy from a branch**.
   - Under **Branch**: select `main` and folder `/ (root)`, then click **Save**.
5. **Done!** Within 60 seconds, your site will be live at:
   `https://<YOUR-USERNAME>.github.io/ISP-Tuning/`

*(Optional Free Custom Domain)*: If you purchase a domain like `camvisiontech.com` ($10/yr on Cloudflare/Namecheap), enter it under **Custom domain** in GitHub Pages settings, and GitHub will automatically generate a free SSL certificate!

---

## ⚡ Option 2: Cloudflare Pages (Fastest Global CDN — Drag & Drop)

Cloudflare Pages offers unlimited bandwidth and 100% free hosting.

1. Create a free account at [pages.cloudflare.com](https://pages.cloudflare.com/).
2. Click **Create a project** &rarr; **Direct Upload**.
3. Name your project: `camvision-tech`.
4. Drag and drop your project folder (containing `index.html`, `css`, `js`, and `assets`) into Cloudflare.
5. Click **Deploy Site**.
6. Your site is instantly live at `https://camvision-tech.pages.dev` with free SSL and worldwide DDoS protection.

---

## 🌐 Option 3: Netlify Drop (Instant 20-Second Deployment)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Simply drag your folder onto the browser page.
3. Netlify immediately generates a live URL (e.g., `https://camvision-tech.netlify.app`).
4. You can customize the subdomain name for free in Site Settings &rarr; Change site name.

---

## 🔗 How to Connect the Website to Your LinkedIn Page

Now that your website has a free live URL (e.g. `https://<YOUR-USERNAME>.github.io/ISP-Tuning/` or `https://camvisiontech.com`), add it to LinkedIn to maximize inbound leads:

### 1. Add to your LinkedIn Company Page:
1. Open LinkedIn and go to your **CamVision Tech** Company Page admin view.
2. Click **Edit Page** in the left menu.
3. Click **Page info**:
   - In the **Website** field, paste your new live website URL.
4. Click **Buttons**:
   - Toggle the custom button to **On**.
   - Set **Button name** to: **Visit website** or **Contact us**.
   - Paste your website URL in the **URL** field (you can even link directly to the triage section: `https://.../#contact`).
5. Click **Save**.

### 2. Add to your Anonymous Consultant Profile:
1. Go to your personal profile (e.g., Alex Vance / Consultant persona).
2. Click the pencil icon on your intro card.
3. Scroll down to **Custom link**:
   - Link URL: `https://your-site-url/`
   - Link text: `🔬 Get $250 Camera IQ Triage` or `CamVision Tech Engineering Lab`
4. In the **Featured** section:
   - Click **+** &rarr; **Add a link** &rarr; paste your website URL.
   - LinkedIn will automatically generate a preview card with your banner image and headline!

---

## 🛠️ Testing Locally on Your Computer

Before deploying, you can preview the website locally at any time:
- In your terminal:
  ```powershell
  python -m http.server 8080
  ```
- Then open your browser at:
  `http://localhost:8080`
