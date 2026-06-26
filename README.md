# Deutsch Tracker — German A1→A2 SRS + Habit Tracker

A local-first, offline-capable PWA for self-studying German. Uses spaced repetition (FSRS) for flashcards and an output-based habit log to track real progress.

## Setup

```bash
npm install
npm run dev      # development server at http://localhost:3000
npm test         # unit tests
npm run build    # production build
```

## Architecture

The codebase follows a strict layered dependency rule: **UI → application → domain; domain depends on nothing external.**

```
/domain          # pure functions + types, zero framework imports
  card.ts        # Card entity, FsrsState shape
  scheduler.ts   # SchedulerPort interface + FSRS adapter
  grading.ts     # grade() pure function
  habit.ts       # DailyLog, calcStreak, totalVideoMin, date helpers
  uid.ts         # randomUUID helper

/application     # use-cases, orchestrate domain + repos
  review.ts      # getDueCards, gradeCard
  deck.ts        # addCard, editCard, deleteCard
  log.ts         # upsertDailyLog, getStreak, getProgress

/infra
  db.ts          # Dexie (IndexedDB) schema + CardRepo/ReviewLogRepo/DailyLogRepo

/components
  review/        # FlashCard, ReviewSession
  cards/         # CardForm, CardList
  habit/         # HabitLogForm, ProgressView
  ui/            # Nav, ServiceWorkerRegistrar

/app             # Next.js App Router pages (thin wrappers)
```

### Key decision 1: FSRS instead of SM-2

The scheduler uses **FSRS** (`ts-fsrs` v5) — Anki's modern default algorithm. It outperforms SM-2 on retention efficiency by modeling memory stability and difficulty independently. The algorithm is isolated behind a `SchedulerPort` interface in `domain/scheduler.ts`; the rest of the app never imports `ts-fsrs` directly, so the algorithm is swappable without touching domain or application code.

### Key decision 2: Review Queue and Habit Log are separate subsystems

These two subsystems solve different problems and must not be coupled:

- **Review Queue** (SRS engine): Cards have FSRS state. The queue surfaces what's due. Grading updates the schedule and appends a `ReviewLog` entry.
- **Habit Log**: One `DailyLog` per calendar day capturing *output* — cards reviewed, sentences written, dialogues spoken, video minutes, level. Drives streak and lecture-progress views.

The Habit Log is not derived from the Review Queue in real time (beyond a read-only "cards reviewed" counter you fill in manually). Keeping them separate means each can evolve independently and neither's correctness depends on the other.

### Persistence

All data is stored in **IndexedDB via Dexie**. Three tables:
- `cards` — the flashcard deck with embedded FSRS state
- `reviewLogs` — append-only grading history (needed for future FSRS optimizer)
- `dailyLogs` — one row per date, the habit tracker

Repos are behind interfaces (`CardRepo`, `ReviewLogRepo`, `DailyLogRepo`), so a Supabase-backed implementation can drop in later without touching domain or application code.

### PWA / offline

A hand-written service worker (`public/sw.js`) caches the app shell on install. After first load the daily review works with zero network. The app is installable via the browser's "Add to home screen" prompt.

### Date handling

All date math goes through `domain/habit.ts`. "Today" uses local timezone (`todayLocal()`). Streak calc and day arithmetic use UTC timestamps (`prevDay()` operates on ISO date strings via `Date.UTC`) so DST never shifts a day boundary.

## Running tests

```bash
npm test                  # run once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

Tests cover:
- **FSRS adapter** (`__tests__/scheduler.test.ts`) — correct state transitions for each rating, stability monotonicity
- **Grading function** (`__tests__/grading.test.ts`) — snapshot isolation, updatedAt, log ID uniqueness
- **Streak + habit math** (`__tests__/habit.test.ts`) — streak counting, gap detection, month/year/leap-year boundaries

## Lecture progress targets

| Level | Total video | Field |
|-------|-------------|-------|
| A1    | 9.5 h = **570 min** | A1 bar |
| A2    | 11 h = **660 min**  | A2 bar |
