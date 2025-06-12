# 💥 Splash! – Feature Breakdown

> 🚽 A minimalist, Liquid Glass–style mobile-first application for tracking bowel movements, with a playful and elegant UX. Based on iOS guidelines and built with a React Native fullstack architecture.

---

## 🧩 Core Features

### 1. **Start Splash! Session**

- Button: `Start Splash!`
    
- Launches session timer
    
- UI shifts button to Dynamic Island or upper fixed zone
    
- Main screen cleared for visuals/stats
    

### 2. **Dynamic Island Timer**

- Timer floats in iOS 17+ Dynamic Island
    
- Button to `End Splash!`
    
- Drops back to center when tapped
    

### 3. **Splash Animation**

- After timer ends, central animation plays:
    
    - Dropping poop + splash effect
        
    - Skia or Lottie-based animation
        

### 4. **Poop Input Form**

- Appears after splash animation
    
- Inputs:
    
    - Color selector (from presets)
        
    - Size: Small / Medium / Large
        
    - Shape (Bristol Stool Scale 1–7)
        
    - Optional: Smell rating, texture
        
    - Notes field (optional)
        

### 5. **Poop History (Logbook)**

- List of entries:
    
    - Timestamp
        
    - Poop icon (based on metadata)
        
    - Quick view of shape + color
        

### 6. **Splash Analytics**

- Opens detailed stats per log item
    
- Charts:
    
    - Average interval between sessions
        
    - Most frequent stool type/color
        
    - Duration trends (long vs short)
        
- Recommendations:
    
    - "You’re pooping less than avg."
        
    - "Hydration may be low."
        
    - "Color suggests irregularity."
        
- Includes medical disclaimer
    

### 7. **Reminders Engine**

- Smart prediction model (based on past behavior)
    
- Adjustable baseline (e.g. 24h default interval)
    
- Sends local or push notification: `"Time for a Splash?"`
    

### 8. **Settings & Customization**

- Reminder timing preferences
    
- Enable/disable splash animation
    
- Dark mode toggle (iOS native toggle respect)
    

### 9. **iOS Design Compliance**

- Dynamic Island API support
    
- Transparent Liquid Glass panels
    
- Native haptics & gestures
    
- Font size, spacing and corner radius per Apple HIG
    

---

## 🧠 Future Considerations

- HealthKit integration
    
- Streaks & gamification (Poop Pets?)
    
- Export to PDF or CSV
    
- Sharing logs with doctors
    
- Cloud sync (iCloud / Supabase backup)
    

---

**Status:** v0.2 design confirmed, UI iteration done.  
Next → User Flow → Development board → Build.