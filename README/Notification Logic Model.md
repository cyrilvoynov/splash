# 🔔 Splash! – Notification Logic Model

This document describes the logic and timing model for all user-facing notifications in the **Splash!** mobile app. Notifications are tailored to each user's bowel movement history, optimized for personalization, minimal disruption, and clear health-related intent.

---

## 🧠 Notification Types

### 1. **Reminder Notification**

- Triggered when user hasn't logged a session for X hours
    
- Uses baseline interval (24h) or personal average cycle
    
- Example:
    
    > "It’s been 26h since your last Splash! 💩 Want to log one?"
    

### 2. **Streak Encouragement** _(Optional future)_

- Sent if user logs 3+ sessions regularly
    
- Reinforces healthy habits
    
- Example:
    
    > "You've kept a 4-day streak! Stay regular, Splash Master 💧"
    

### 3. **Inactivity Alert**

- Sent if no activity for more than 3 days
    
- Offers quick access to log manually or adjust reminder interval
    
- Example:
    
    > "Noticed you haven’t Splashed in a while. Everything OK?"
    

### 4. **Post-Save Acknowledgement** _(local only)_

- Shown after session is saved successfully
    
- Example:
    
    > "Splash logged! Thanks for keeping it regular 🧻"
    

---

## 📊 Timing & Frequency

|Type|Timing Logic|Delivery|
|---|---|---|
|Reminder|avgCycle + 1–2h buffer (min 18h, max 36h)|Push|
|Streak Encouragement|After 3, 5, 7 logs within daily cycle|Push|
|Inactivity Alert|No activity ≥ 72h|Push|
|Acknowledgement|Instant after save|Local|

---

## ⚙️ Personalization Engine

- Uses user's poop log timestamps
    
- Calculates moving average between sessions (`avgCycle`)
    
- Stores lastSessionTimestamp
    
- Adjusts reminder timer dynamically:
    
    ```ts
    const nextReminder = lastSession + avgCycle + buffer;
    ```
    

---

## 🔐 Privacy & Opt-In

- All push notifications are opt-in
    
- Users can:
    
    - Enable/disable all
        
    - Adjust frequency (Low / Medium / High)
        
    - Mute during nighttime hours
        

---

## 🔧 Tech Stack

|Feature|Tool|
|---|---|
|Local Notifications|`expo-notifications`|
|Push Delivery|`Expo Push` / `OneSignal`|
|Scheduling|Background tasks (via `expo-task-manager`)|
|Storage|Secure async storage or local SQLite / Supabase sync|

---

All reminders aim to be **respectful**, **semi-playful**, and **medically conscious** (with disclaimers when needed). They reinforce habit loops without being intrusive.