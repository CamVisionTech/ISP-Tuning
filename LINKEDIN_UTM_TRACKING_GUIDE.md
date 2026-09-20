# CamVision Tech: Website Visitor & Lead Tracking Guide

Welcome to your complete analytics and visitor tracking guide. This document explains how you can see who is visiting [camvisiontech.github.io/ISP-Tuning](https://camvisiontech.github.io/ISP-Tuning/), where they came from on LinkedIn, and what actions they take on your site.

---

## 1. How to Check Visitors Right Now (Instant — No Setup Needed)

GitHub Pages automatically tracks basic visitor traffic for your repository.

👉 **Direct Link:** [https://github.com/CamVisionTech/ISP-Tuning/graphs/traffic](https://github.com/CamVisionTech/ISP-Tuning/graphs/traffic)

### What you will see:
* **Views & Unique Visitors:** Total pageviews and how many individual people visited over the last 14 days.
* **Referring Sites:** Tells you if visitors came from `linkedin.com`, `t.co` (X/Twitter), Google, or typed the URL directly.
* **Popular Content:** Which files and assets are accessed most.

*(Note: You must be logged into your GitHub account `CamVisionTech` to view this private analytics dashboard).*

---

## 2. Google Analytics 4 (GA4) — Real-Time Live Traffic & Heatmaps

We have already integrated Google Analytics 4 telemetry into `index.html` and `js/app.js`. To start seeing live visitors on a 3D world map, follow these steps:

### Step 1: Create your free Google Analytics account
1. Go to [analytics.google.com](https://analytics.google.com/) and sign in with your Google account.
2. Click **Start measuring**.
3. Account name: `CamVision Tech` -> click **Next**.
4. Property name: `CamVision Tech Website` -> Set your timezone and currency -> click **Next**.
5. Choose your industry (e.g. *Technology / Hardware*) and business size -> click **Next**.
6. Select your objective: *Generate leads* or *Examine user behavior*.
7. Platform: Choose **Web**.
8. Website URL: `https://camvisiontech.github.io/ISP-Tuning/`  
   Stream name: `CamVision Tech Live Site` -> click **Create stream**.

### Step 2: Copy your Measurement ID
You will see a **Measurement ID** starting with `G-`, for example:
```
G-ABC123XYZ4
```

### Step 3: Activate it in your code
Open `index.html` and replace `G-XXXXXXXXXX` (around line 35) with your real ID:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  const GA_MEASUREMENT_ID = 'G-ABC123XYZ4';
  if (GA_MEASUREMENT_ID !== 'G-' + 'XXXXXXXXXX') {
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }
</script>
```
Then commit and push (or run `update-site.bat`).

### What GA4 tracks automatically on your site:
- **Realtime Globe / Map:** See active visitors by country and city in real-time.
- **`scenario_switched`:** Tracks when visitors toggle between *Factory / Lab* and *Night Mobility* comparison photos.
- **`pricing_plan_selected`:** Tracks when someone clicks *"Get $250 Quick IQ Triage"* or the Full IQ Tuning tier.
- **`lead_inquiry_submitted`:** Tracks when a visitor submits your email inquiry form.
- **`linkedin_click`:** Tracks when someone clicks your LinkedIn company page link.

---

## 3. LinkedIn Tracking URLs (Know Exactly Which Post Brought a Visitor)

When you share your website on LinkedIn, add **UTM tags** to the URL. This tells Google Analytics and GitHub precisely which post or button brought the visitor.

### Pre-formatted URLs to copy and use:

| Location on LinkedIn | URL to Use | What GA4 Will Show |
|---|---|---|
| **LinkedIn Company Page Website Button** | `https://camvisiontech.github.io/ISP-Tuning/?utm_source=linkedin&utm_medium=company_page&utm_campaign=profile_cta` | Source: `linkedin`, Medium: `company_page` |
| **Personal Profile "Featured" Link** | `https://camvisiontech.github.io/ISP-Tuning/?utm_source=linkedin&utm_medium=personal_profile&utm_campaign=featured_section` | Source: `linkedin`, Medium: `personal_profile` |
| **Technical Post / IQ Case Study** | `https://camvisiontech.github.io/ISP-Tuning/?utm_source=linkedin&utm_medium=feed_post&utm_campaign=night_vision_case_study` | Source: `linkedin`, Campaign: `night_vision_case_study` |
| **Direct Message / InMail Outreach** | `https://camvisiontech.github.io/ISP-Tuning/?utm_source=linkedin&utm_medium=inmail&utm_campaign=founder_outreach` | Source: `linkedin`, Medium: `inmail` |

---

## 4. LinkedIn Insight Tag (See Visitor Companies & Job Titles)

If you want to know **what companies** are viewing your website (e.g. Sony, Ambarella, Verkada, or early-stage robotics startups):

1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/).
2. Click **Analyze** -> **Insight Tag**.
3. Choose **I will use Tag Manager / I will install the tag myself**.
4. LinkedIn will give you a Partner ID (e.g., `1234567`).
5. Send that ID to me or add the snippet provided by LinkedIn to `index.html`.
6. Once active, LinkedIn will populate the **Website Demographics** tab with:
   - **Job Functions:** (e.g. 45% Engineering, 25% Product Management)
   - **Job Seniorities:** (e.g. 30% Director/VP, 25% Founder/C-Suite)
   - **Company Names:** Top companies where your visitors work!

---

## Summary Checklist

- [x] GitHub basic traffic is active right now: [View Traffic](https://github.com/CamVisionTech/ISP-Tuning/graphs/traffic).
- [x] GA4 and custom conversion event tracking code is built into your site.
- [ ] Create a free property at [analytics.google.com](https://analytics.google.com/) to get your `G-XXXXXXXXXX` ID.
- [ ] Paste your ID in `index.html` and run `update-site.bat` (or let me update it for you).
- [ ] Use UTM tags when posting on LinkedIn to track traffic sources.
