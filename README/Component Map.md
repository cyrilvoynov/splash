# **🧩 Splash! App – Component Map

  

This component map outlines reusable UI and logical components for the **Splash** mobile app (iOS-first strategy, Mobile-First Design, React + Node.js stack). All components follow Apple Human Interface Guidelines and support future Android/Web fallback.

---

## **🎨 UI / Atomic Components**

|**Component**|**Purpose**|**Usage Examples**|
|---|---|---|
|Button|Primary, Secondary, Icon, Ghost|StartSplash, EndSplash, SubmitForm, FilterToggle|
|Card|Content container with shadow & radius|SummaryCard, HistoryItem, TipsBlock|
|Typography|H1–H6, Body, Caption, Label|Everywhere: headings, descriptions, analytics|
|Modal|Overlay for forms or actions|Onboarding, PoopForm, ConfirmationPrompt|
|Toast|Floating alert notification|ReminderSent, EntrySaved|
|Divider|Separator between visual sections|In analytics, history list|
|Badge|Status or small counter|ColorTag, FrequencyIndicator|
|Switch|Toggle element|Notifications on/off, Reminder types|
|TextField|Input field for form data|PoopForm inputs|
|Icon|Visual symbols|Timer icon, Poop icon, Analytics symbol|

---

## **🧠 Logical Components (Controllers, State, Hooks)**

|**Component/Hook**|**Purpose**|**Description**|
|---|---|---|
|usePoopSession()|Handle session lifecycle|Starts/stops timer, saves state|
|usePoopAnalytics()|Aggregates user data & builds insights|Used for recommendations & stats|
|useReminderEngine()|Controls push logic & notification scheduling|Based on last session + personal frequency|
|PoopContext|Global poop data provider|Available across app|
|SplashSyncManager|Sync data with iCloud / local cache fallback|Keeps offline-first UX|
|SessionTimer|Countdown component for active poop|Linked to UI and Dynamic Island|
|PoopHistoryManager|CRUD for user sessions|Filter, sort, and retrieve entries|

---

## **🧱 Screens (Views)**

|**Screen**|**Components Used**|**Description**|
|---|---|---|
|HomeScreen|Button, Timer, StatsCard|Entry point + active session|
|PoopFormScreen|TextField, Card, Button|Fill in color, size, shape|
|PoopHistoryScreen|Card, Filter, List, Badge|List of all past sessions|
|AnalyticsScreen|ChartCard, Recommendations, Divider|Personalized analytics|
|SettingsScreen|Switch, ListItem, Modal|Enable notifications, reset data|
|OnboardingScreen|Card, Button, Modal|Initial user setup|

---

## **🌐 Backend-Linked Components**

|**Module**|**Role**|**Stack**|
|---|---|---|
|UserProfileAPI|Store user metadata|Node.js, PostgreSQL|
|PoopSessionAPI|Store & retrieve poop sessions|Node.js, PostgreSQL|
|ReminderAPI|Schedule & send push notifications|Node.js, OneSignal|
|AnalyticsEngine|Process historical data to give recommendations|Node.js (or Python)|
|SyncService|iCloud / Web fallback sync handler|Node.js, Supabase (alt)|

---

## **📦 Animations & Effects**

|**Tool/Lib**|**Purpose**|**Status**|
|---|---|---|
|Reanimated|Smooth UI transitions & gestures|Primary|
|Lottie|Poop splash / drop animations (vector-based)|Optional|
|Skia|Advanced visual effects (ripples, particles)|Optional|
|Dynamic Island API|iOS-specific session timer floating display|iOS only|

---

> ✅ All components are designed to support future theming (light/dark), localization, and scalable performance across devices.