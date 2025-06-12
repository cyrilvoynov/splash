## 🧭 MVP User Flow

### 🎬 Entry Point

- App opens to `Start Splash!` screen
    
- Optionally shows summary card from previous session
    

### 🚀 Start Splash

- Tap `Start Splash!`
    
- Timer begins (visible in Dynamic Island)
    
- UI transitions to background state
    

### ⏱️ Ongoing Session

- Timer ticks in top zone (island or fixed header)
    
- `End Splash!` accessible from top
    

### 🛑 End Splash

- Tap `End Splash!`
    
- Timer drops visually into center of screen
    
- Splash animation plays
    

### 🧾 Input Form

- After animation ends:
    
    - Color → Size → Shape → Notes
        
    - Tap `Save`
        

### 📓 History

- Return to main view
    
- Latest log item added to top of list
    
- Tap on entry → see **Splash Analytics** screen
    

### 📈 Analytics Screen

- View per-entry metrics, charts, and insights
    
- Tips + medical disclaimer block
    

### 🔔 Reminder Cycle

- Based on last sessions → app schedules next ping
    
- Sends push/local notification like:
    
    - `"It’s been 26h since your last Splash 💧"`
        

---

**Status:** User flow defined. Next → component map → development sprint planning.