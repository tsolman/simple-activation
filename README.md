# Unlock the Chain

Polkadot treasure hunt game for sub0 events.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy
4. Done!

## Game Flow

1. Player enters name
2. Answers 5 randomly selected Polkadot knowledge puzzles
3. Must score 60+ points (3+ correct answers) to win
4. Winners get a QR code (scannable) + 6-digit backup code
5. Scan QR code or show code to claim prize
6. Players scoring < 60 points are encouraged to try again

## Display Features

- **Square Layout**: Optimized 1:1 aspect ratio for arcade displays
- **QR Code Rewards**: Winners receive a scannable QR code with backup text code
- **Touch-Optimized**: Perfect for arcade machine touchscreens
- **Responsive**: Automatically scales to fit screen (max 1080x1080px)

## Topics Covered

35+ questions covering:
- Relay Chain & Parachains
- XCM (Cross-Consensus Messaging)
- On-chain Identity & Registrars
- Conviction Voting & OpenGov
- Treasury & Economics
- Substrate & WASM
- NPoS & Consensus (GRANDPA, BABE)
- Smart Contracts (ink!)
- And more...

## Analytics & Tracking

The game includes a built-in analytics dashboard that tracks:
- Total games, wins, and losses
- Win rates and average scores
- Daily statistics
- Top players and leaderboards
- Player retry attempts
- Recent game activity

**Setup:** See [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) for detailed instructions.

**Quick Setup:**
1. Create a free [Neon Postgres](https://neon.tech) database
2. Add `DATABASE_URL` to `.env.local`
3. Run the app and visit `/analytics`

**View Dashboard:** Visit `https://your-app.vercel.app/analytics`

**Reset Database:**
```bash
npm run reset-db  # Interactive CLI with confirmations
```
Or use the "Reset DB" button in the analytics dashboard.

## Arcade Machine Setup

### Browser Configuration

**Chromium/Chrome (Linux):**
```bash
chromium-browser --kiosk --noerrdialogs YOUR_VERCEL_URL
```

**Firefox:**
```bash
firefox --kiosk YOUR_VERCEL_URL
```

**Edge (Windows):**
```bash
msedge --kiosk YOUR_VERCEL_URL
```

## Customization

### Change Questions

Edit the questions in `data/questions.js`:

```javascript
const puzzles = [
  {
    id: 1,
    title: "Your Title",
    clue: "Your clue text",
    question: "Your question?",
    options: [
      { id: 'a', text: "Option A", correct: true },
      { id: 'b', text: "Option B", correct: false },
      // ...
    ],
    explanation: "Your explanation",
    hint: "Your hint"
  },
  // ... more puzzles
];
```

### Change Colors

Edit puzzle colors in `TreasureHunt.jsx`:

```javascript
color: "from-blue-500 to-cyan-600"    // Puzzle 1
color: "from-purple-500 to-pink-600"  // Puzzle 2
```

### Change Scoring

Edit points in `submitAnswer` function:

```javascript
if (selected && selected.correct) {
  setPoints(points + 20); // Change 20 to your desired points
}
```

## Features

✅ **Square 1:1 layout** - Perfect for arcade displays
✅ **QR code rewards** - Scannable codes with text backup
✅ 35+ educational Polkadot questions with random selection
✅ 60+ point win threshold (encourages learning)
✅ Real-time analytics dashboard
✅ Player tracking and leaderboards
✅ Daily statistics and retry tracking
✅ Touch-optimized interface for arcade machines
✅ Works in any modern browser
✅ Easy to deploy on Vercel
✅ Generates unique 6-digit reward codes
✅ Beautiful gradients and animations
✅ Serverless architecture with Neon Postgres
✅ Auto-refresh analytics (every 30 seconds)

## Event Usage

### Setup
1. Deploy app to Vercel
2. Configure arcade machine browser to open your URL
3. Set browser to fullscreen/kiosk mode

### During Event
1. Participant approaches arcade machine
2. Enters their name
3. Answers 5 Polkadot puzzles
4. Gets a 6-digit code
5. Shows code to staff
6. Claims reward!

## Troubleshooting

**App won't deploy on Vercel**
- Check all files are committed to Git
- Verify package.json has all dependencies
- Check Vercel build logs

**Arcade machine browser shows blank screen**
- Check browser console for errors
- Try different browser
- Verify internet connection
- Hard refresh (Ctrl+F5)

**Touch isn't working**
- Verify touch drivers installed
- Test with mouse first
- Check CSS `touch-action` properties

## License

MIT
