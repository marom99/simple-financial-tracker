# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## Cursor Cloud specific instructions

Single Expo SDK 54 / React Native app (`simple-financial-tracker`). It is **local-only** — no backend, database, or auxiliary services. Data persists on-device via AsyncStorage. Scripts live in `package.json`.

- Run: on this headless Linux VM there is no iOS/Android simulator, so use `npm run web` (Metro serves at http://localhost:8081). This is a long-lived dev server — start it in the background/tmux, not as a blocking command.
- Test: `npm test` (Jest via `jest-expo`, runs fully offline; AsyncStorage and `expo-blur` are mocked). The `act(...)` console warning from `HomeScreen` is benign — tests still pass.
- Type-check: `npx tsc --noEmit` (strict). No ESLint/Prettier and no `lint` script are configured. No production build script — day-to-day "build" is the Metro bundler in `expo start`.
- Installs must tolerate `legacy-peer-deps` (set in `.npmrc`) because of React 19 peer ranges; plain `npm install` respects it.
