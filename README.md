# 🚽 Splash!

A beautiful, iOS-first bowel movement tracker with a playful, Liquid-Glass aesthetic.

## 🚀 Features

- Track your bowel movements with elegant UI
- Beautiful animations and haptic feedback
- Dynamic Island integration (iOS)
- Analytics and insights
- Smart reminders
- Cross-platform support (iOS, Android, Web)

## 🛠 Tech Stack

- React Native + TypeScript
- Expo
- React Navigation
- Shopify Skia
- React Native Reanimated
- Lottie Animations
- Native Modules (iOS)

## 🔧 Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on iOS:
```bash
npx expo run:ios
```

## 🌳 Branching Strategy

We follow a modified Git Flow strategy:

- `main` - Production releases
- `develop` - Main development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation
- `hotfix/*` - Production hotfixes

### Branch Naming Convention

- Features: `feature/splash-animation`
- Bugfixes: `bugfix/timer-crash`
- Releases: `release/1.0.0`
- Hotfixes: `hotfix/notification-fix`

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

Example: `feat: add splash animation component`

## 📱 App Store Release Process

1. Create a release branch: `release/x.y.z`
2. Update version numbers
3. Run final tests
4. Create PR to `main`
5. After merge, tag the release
6. Merge back to `develop`

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Implement your changes
3. Write/update tests
4. Create a PR to `develop`
5. Get code review
6. Merge after approval 