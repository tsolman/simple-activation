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
2. Answers 5 Polkadot knowledge puzzles
3. Gets a 6-digit reward code
4. Shows code to claim prize

## Topics Covered

- Relay Chain
- XCM (Cross-Consensus Messaging)
- On-chain Identity
- Conviction Voting
- Treasury Mechanism

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

Edit the `puzzles` array in `components/TreasureHunt.jsx`:

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

✅ No backend required
✅ No database needed
✅ Touch-optimized interface
✅ Works in any modern browser
✅ Easy to deploy on Vercel
✅ Generates random 6-digit codes
✅ 5 educational Polkadot puzzles
✅ Score tracking
✅ Beautiful gradients and animations

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
