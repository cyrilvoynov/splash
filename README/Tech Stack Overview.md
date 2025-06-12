# 🧱 Splash! – Tech Stack Overview

> 🚽 Lightweight, natively-styled, mobile-first iOS app for bowel movement tracking. Push reminders, splash animations, data insights, and health-based feedback – all bundled in a fun Liquid Glass aesthetic.

---

## 🧠 Architecture Overview

|Layer|Stack / Tools|Notes|
|---|---|---|
|**Frontend**|React Native, TypeScript|Base UI layer|
||Expo / EAS|Build, test & publish to App Store & Google Play|
||React Navigation|Routing/navigation|
||**Skia for React Native**|Custom graphics, effects, particles (splash)|
||**Reanimated 3**|Interface animations (buttons, timers)|
||**Lottie (Bodymovin)**|Vector animations (poop drops, sparkles)|
||**Dynamic Island API (iOS 17+)**|Native bridge (for live timer in iOS system UI)|
|**Backend**|Node.js, Express.js|Main logic & API|
||PostgreSQL (via Neon or Supabase)|Data storage for poop sessions, analytics|
||Prisma ORM|Typed database access|
||node-cron|Scheduling reminders, time-based logic|
||Expo Push / Firebase Cloud Messaging|Push notification delivery|
|**Infra**|Vercel / Railway / Render|Hosting for backend/API|
||Supabase / Neon|Managed PostgreSQL|
|**Dev Tools**|Cursor, GitHub Copilot, Figma|AI + design system|

---

## 📦 Deployment Targets

- ✅ iOS (Primary)
    
- ✅ Android (Fallback via Expo)
    
- ✅ Web (Optional, via `react-native-web`)
    

---

## 🧾 Notes

- **Single-language stack (JS/TS)** ensures rapid development.
    
- Full **mobile-first** strategy, but not locked to platform.
    
- **Dynamic Island** support via native Swift module bridges.
    
- Modular backend lets us expand later with AI or ML-based health analytics.
    
- **Best Practices Focus:** modern animation (Skia + Lottie), typed DB access (Prisma), managed infra (Render/Vercel), and design consistency via Figma.
    

---

## 🛠️ Next Steps

1. Draw UI wireframes for:
    
    - Splash screen
        
    - Start poop session
        
    - Timer view
        
    - Finish + splash effect
        
    - Input form (color, size, etc.)
        
    - Stats screen
        
2. Feature breakdown
    
3. MVP user flow
    
4. Notification strategy table

![[Pasted image 20250612143311.png]]
![[Pasted image 20250612144925.png]]![[Pasted image 20250612150236.png]]