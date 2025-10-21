import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock, Trophy, Zap, Map, Shield, Vote, Network, Coins } from 'lucide-react';

const TreasureHuntGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [points, setPoints] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [completionCode, setCompletionCode] = useState('');
  const [startTime, setStartTime] = useState(null);

  const puzzles = [
    {
      id: 1,
      icon: <Network className="w-16 h-16" />,
      color: "from-blue-500 to-cyan-600",
      title: "The Relay Chain Mystery",
      clue: "In the heart of Polkadot lies a special chain that doesn't run smart contracts but instead coordinates all the others. What is this chain called?",
      question: "What is the central coordinating chain in Polkadot called?",
      options: [
        { id: 'a', text: "The Relay Chain", correct: true },
        { id: 'b', text: "The Main Chain", correct: false },
        { id: 'c', text: "The Hub Chain", correct: false },
        { id: 'd', text: "The Master Chain", correct: false }
      ],
      explanation: "The Relay Chain is Polkadot's heart! It coordinates consensus and communication between all parachains without running smart contracts itself.",
      hint: "Think about what runners do in a relay race..."
    },
    {
      id: 2,
      icon: <Zap className="w-16 h-16" />,
      color: "from-purple-500 to-pink-600",
      title: "The Message Pathway",
      clue: "Parachains need to talk to each other securely. There's a special messaging format that makes this possible. Can you find its name?",
      question: "What protocol allows parachains to communicate with each other?",
      options: [
        { id: 'a', text: "IBC (Inter-Blockchain Communication)", correct: false },
        { id: 'b', text: "XCM (Cross-Consensus Messaging)", correct: true },
        { id: 'c', text: "TCP/IP", correct: false },
        { id: 'd', text: "WebSocket Protocol", correct: false }
      ],
      explanation: "XCM (Cross-Consensus Messaging) is Polkadot's language for parachains to communicate! It enables secure, trustless messages across chains.",
      hint: "The X stands for 'Cross'..."
    },
    {
      id: 3,
      icon: <Shield className="w-16 h-16" />,
      color: "from-green-500 to-emerald-600",
      title: "The Identity Quest",
      clue: "In Polkadot, you can attach real-world information to your address. But this info isn't just trusted by default...",
      question: "Who can verify and approve your on-chain identity in Polkadot?",
      options: [
        { id: 'a', text: "Only the Polkadot Foundation", correct: false },
        { id: 'b', text: "Community-elected Registrars", correct: true },
        { id: 'c', text: "Any wallet provider", correct: false },
        { id: 'd', text: "Automatic AI verification", correct: false }
      ],
      explanation: "Registrars are community-elected entities that verify identities! This creates a decentralized web of trust.",
      hint: "Think about who registers important documents in the real world..."
    },
    {
      id: 4,
      icon: <Vote className="w-16 h-16" />,
      color: "from-orange-500 to-red-600",
      title: "The Democracy Chamber",
      clue: "Every DOT holder has a voice in Polkadot's future. The governance system lets you vote, but there's a special mechanism that lets you vote with more power if you lock your tokens longer...",
      question: "What is the mechanism called where longer lock periods give you more voting power?",
      options: [
        { id: 'a', text: "Time-Weighted Voting", correct: false },
        { id: 'b', text: "Conviction Voting", correct: true },
        { id: 'c', text: "Stake Multiplication", correct: false },
        { id: 'd', text: "Lock Bonding", correct: false }
      ],
      explanation: "Conviction Voting rewards commitment! Lock your tokens for longer periods and your vote counts more—up to 6x the voting power!",
      hint: "It's about showing your strong belief or..."
    },
    {
      id: 5,
      icon: <Coins className="w-16 h-16" />,
      color: "from-yellow-500 to-amber-600",
      title: "The Treasury Vault",
      clue: "Polkadot has a community treasury filled with DOT from various sources. When someone wants funding for a project, they submit a proposal. But what happens to the treasury funds that aren't spent?",
      question: "What happens to unspent treasury funds over time?",
      options: [
        { id: 'a', text: "They accumulate forever", correct: false },
        { id: 'b', text: "A percentage is burned each period", correct: true },
        { id: 'c', text: "They're distributed to validators", correct: false },
        { id: 'd', text: "They're sent back to users", correct: false }
      ],
      explanation: "The treasury burns 1% of unspent funds each spending period! This encourages active governance and prevents infinite accumulation.",
      hint: "Think about what happens to unused resources to encourage their use..."
    }
  ];

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const startGame = () => {
    if (playerName.trim()) {
      setGameStarted(true);
      setStartTime(new Date());
      setCurrentPuzzle(0);
    }
  };

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const submitAnswer = () => {
    const current = puzzles[currentPuzzle];
    const selected = current.options.find(opt => opt.id === selectedAnswer);

    if (selected && selected.correct) {
      setPoints(points + 20);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        // Game complete - generate code
        setCompletionCode(generateCode());
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setPoints(0);
    setPlayerName('');
    setStartTime(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameStarted(false);
    setCompletionCode('');
  };

  const isGameComplete = completionCode !== '';
  const currentPuzzleData = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 overflow-auto">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Unlock the Chain
          </h1>
          <p className="text-xl text-purple-300">Polkadot Treasure Hunt</p>
        </div>

        {/* Progress Bar */}
        {gameStarted && !isGameComplete && (
          <div className="mb-6 bg-slate-800/50 rounded-2xl p-4 backdrop-blur">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">{playerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-xl">{points}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {puzzles.map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    idx < currentPuzzle ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                    idx === currentPuzzle ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
                    'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-purple-300">
              Challenge {currentPuzzle + 1} of {puzzles.length}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`bg-gradient-to-br ${!isGameComplete && gameStarted ? currentPuzzleData.color : 'from-yellow-500 to-amber-600'} p-1 rounded-3xl shadow-2xl`}>
          <div className="bg-slate-900/95 backdrop-blur rounded-3xl p-8">

            {/* Welcome Screen */}
            {!gameStarted && (
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <Map className="w-20 h-20 text-cyan-400" />
                </div>
                <h2 className="text-4xl font-bold">Welcome, Explorer!</h2>
                <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                  Embark on a treasure hunt through the Polkadot ecosystem. Answer 5 challenging puzzles to prove your knowledge and unlock your reward code!
                </p>

                <div className="max-w-md mx-auto space-y-4 mt-8">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && playerName.trim() && startGame()}
                    className="w-full px-6 py-4 rounded-xl bg-slate-800/80 border-2 border-purple-500/50 focus:border-cyan-400 focus:outline-none text-lg text-center"
                  />
                  <button
                    onClick={startGame}
                    disabled={!playerName.trim()}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 rounded-xl font-bold text-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    Start the Hunt
                  </button>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-4 text-sm max-w-2xl mx-auto">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                    <p className="font-semibold">5 Challenges</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <p className="font-semibold">100 Points Max</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <p className="font-semibold">Win Code</p>
                  </div>
                </div>
              </div>
            )}

            {/* Puzzle Screens */}
            {gameStarted && !isGameComplete && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  {currentPuzzleData.icon}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold">{currentPuzzleData.title}</h2>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/30">
                  <p className="text-sm text-purple-400 mb-2">🔍 Clue:</p>
                  <p className="text-lg leading-relaxed">{currentPuzzleData.clue}</p>
                </div>

                {!showFeedback ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-center mb-6">{currentPuzzleData.question}</h3>
                      {currentPuzzleData.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.id)}
                          className={`w-full p-5 rounded-xl text-left transition-all transform hover:scale-102 ${
                            selectedAnswer === option.id
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-cyan-400'
                              : 'bg-slate-800/80 hover:bg-slate-700/80 border-2 border-slate-700 hover:border-purple-500'
                          }`}
                        >
                          <span className="text-lg">{option.text}</span>
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 border-l-4 border-cyan-400">
                      <p className="text-sm text-cyan-400 mb-1">💡 Hint:</p>
                      <p className="text-purple-200">{currentPuzzleData.hint}</p>
                    </div>

                    <button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-800 rounded-xl font-bold text-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  </>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <div className={`p-6 rounded-xl ${
                      puzzles[currentPuzzle].options.find(opt => opt.id === selectedAnswer)?.correct
                        ? 'bg-green-900/50 border-2 border-green-400'
                        : 'bg-red-900/50 border-2 border-red-400'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        {puzzles[currentPuzzle].options.find(opt => opt.id === selectedAnswer)?.correct ? (
                          <>
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            <p className="text-2xl font-bold text-green-400">Correct! +20 Points</p>
                          </>
                        ) : (
                          <>
                            <Lock className="w-8 h-8 text-red-400" />
                            <p className="text-2xl font-bold text-red-400">Not quite right!</p>
                          </>
                        )}
                      </div>
                      <p className="text-lg">{currentPuzzleData.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Completion Screen */}
            {isGameComplete && (
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <Trophy className="w-24 h-24 text-yellow-400 animate-bounce" />
                </div>
                <h2 className="text-5xl font-bold">Treasure Found!</h2>
                <p className="text-2xl text-green-400 font-bold">Final Score: {points} / 100 points</p>

                <div className="bg-slate-800/80 rounded-2xl p-8 max-w-md mx-auto border-4 border-yellow-500">
                  <p className="text-lg text-purple-300 mb-4">Your Reward Code:</p>
                  <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-8 font-mono text-6xl font-bold border-4 border-yellow-400 tracking-wider">
                    {completionCode}
                  </div>
                  <p className="text-sm text-cyan-300 mt-4">Show this code to claim your reward!</p>
                </div>

                <div className="max-w-md mx-auto space-y-3 text-left bg-purple-900/30 rounded-xl p-6">
                  <p className="text-lg font-semibold text-cyan-400 mb-3">What you've learned:</p>
                  <div className="space-y-2 text-purple-200">
                    <p>✓ The Relay Chain coordinates Polkadot</p>
                    <p>✓ XCM enables cross-chain communication</p>
                    <p>✓ Registrars verify on-chain identities</p>
                    <p>✓ Conviction Voting rewards commitment</p>
                    <p>✓ Treasury burns encourage spending</p>
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="mt-8 px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-xl font-semibold transition-all"
                >
                  Play Again
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-6">
          <p className="text-purple-400 text-sm">
            Learn more at <span className="text-cyan-400 font-semibold">polkadot.academy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreasureHuntGame;
