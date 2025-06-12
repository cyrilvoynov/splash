# **🧭 Screen Interaction Map – Splash!(MVP)**

This document outlines how users interact across screens in the MVP of the “Splash!” app. It follows a Mobile First design philosophy, using Apple HIG-compliant UI and cross-compatible animation flows (Skia, Lottie, Reanimated).

---

## **1. Onboarding Flow**

  

**Screens:**

- WelcomeScreen → PermissionsScreen → NotificationOptIn → HomeScreen
    

  

**Flow:**

1. User opens app → Sees “Welcome to Splash!”
    
2. Proceeds → Sees permissions explanation (privacy disclaimer)
    
3. Enables notifications → Lands on HomeScreen
    

---

## **2. Core Poop Tracking Flow**

  

**Screens:**

- HomeScreen → SplashSessionActive (Dynamic Island + Overlay) → SessionComplete → PoopForm → EntrySavedModal
    

  

**Flow:**

1. User taps **Start Splash!** → Button animates to Dynamic Island, timer begins
    
2. While active:
    
    - Timer visible in Dynamic Island
        
    - Option to cancel session
        
    
3. User taps **Stop** → Splash animation triggered (Skia)
    
4. Auto-redirect to **PoopForm**:
    
    - Color (dropdown + emoji preview)
        
    - Size (slider)
        
    - Texture/shape (tags)
        
    - Optional notes
        
    
5. Submit → EntrySavedModal: “Splash saved! 🧻”
    

---

## **3. History Flow**

  

**Screens:**

- HomeScreen → PoopHistory → PoopEntryDetail (Analytics View)
    

  

**Flow:**

1. User taps **History** tab
    
2. Sees reverse chronological log of sessions
    
3. Taps any item → Opens PoopEntryDetail
    
4. EntryDetail includes:
    
    - Stats: duration, frequency score, average cycle deviation
        
    - Recommendations (e.g. hydration, fiber intake)
        
    - Disclaimer: Not a medical diagnosis
        
    

---

## **4. Notifications Flow**

  

**Screens:**

- (Push Notification) → SplashReminderScreen → HomeScreen
    

  

**Flow:**

1. App sends smart reminder (based on ML model)
    
2. User taps notification → Sees reminder screen
    
    - “It’s been 18h since your last splash 💩”
        
    - Button: **Start Splash!**
        
    
3. Tapping → resumes Core Flow
    

---

## **5. Settings Flow**

  

**Screens:**

- HomeScreen → SettingsScreen → NotificationPreferences / DataExport / AboutApp
    

  

**Flow:**

1. User taps **Gear icon**
    
2. Accesses subpages:
    
    - Toggle smart reminders
        
    - Export poop log (CSV/iCloud)
        
    - Learn about app, version, legal
        
    

---

## **Notes**

- All flows support iOS Dynamic Island.
    
- All animations are handled via Skia (native) + Lottie (decorative).
    
- All transitions follow Apple HIG for gesture-based navigation.
    

  