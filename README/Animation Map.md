# 🎞️ Splash! – Animation Map (MVP)

This document describes all key animations, transitions, and effects used across the MVP screens of the Splash! mobile app. Animations follow Apple HIG and leverage a combination of Skia (custom, performant), Reanimated (UI transitions), and Lottie (decorative vector).

---

## 🟢 Entry Animations

### App Launch:

- **Splash Fade-in**: Logo slowly fades and lifts → duration: 0.8s → easing: easeOutExpo
    
- **Background Blur Intro**: Liquid Glass panel slides up → opacity 0→1, scale 0.95→1
    
- Tech: `Reanimated` + `Skia background mask`
    

### Start Splash Button:

- Scale ripple on tap
    
- Skia pulse effect with wave ring (light)
    
- Moves to Dynamic Island (translateY, opacity 0.8→0)
    

---

## ⏱️ Active Session Animations

### Dynamic Island Timer:

- Appears with bounce → size animation (compact to expanded)
    
- Progress Ring (`Skia Arc`) updates over time
    
- Timer pulse every 5 seconds → subtle brightness change
    

---

## 🛑 End Splash Flow

### Splash Drop:

- Poop icon falls from top to center → scale 1.2 → 0.95 → 1
    
- Bounces and triggers **splash burst**
    
- Tech: `Skia particles + layered circles`
    

### Splash Effect:

- Ripple + droplet particles radiating outwards
    
- Water refractive ripple (centered)
    
- Sound effect optional
    
- Tech: `Skia` custom canvas scene (GPU)
    

---

## 🧾 Poop Form

- Fields slide in with staggered delay (0.1s per)
    
- Emojis fade/scale on selection
    
- Submit button: Spring scale bounce
    

---

## 📓 Poop History

- List items fade in on scroll (staggered reveal)
    
- Card press: expands with elastic scaling (Reanimated spring)
    
- Chevron rotates 90° → Detail View opens
    

---

## 📈 Analytics Screen

- Chart appears with vertical bar rise or line growth
    
- Score badge floats in from top
    
- Recommendation cards slide up + opacity fade
    
- Tech: `Skia` for charts + animated masks
    

---

## 🔔 Push Notification

- Local Notification triggers vibrate/haptic feedback
    
- App badge bounce (if supported)
    
- Tap-to-open → resumes standard Home → Timer flow
    

---

## 🔧 System Transitions

|Event|Type|Tech Used|Style|
|---|---|---|---|
|Modal open/close|Spring scale|Reanimated|Bottom sheet, blur bg|
|Screen transitions|Slide, fade|RN Navigation + Reanimated|Direction-aware|
|Dark mode switch|Crossfade|Theme switch|200ms, system toggle|

---

All animations are **interruptible**, **performance-tested**, and follow **native iOS motion preferences** where applicable (e.g., reduce motion).