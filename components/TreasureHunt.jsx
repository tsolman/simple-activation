import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Trophy, Zap, Gamepad2, Shield, Vote, Network, Coins, Star, ChevronRight } from 'lucide-react';

const TreasureHuntGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [points, setPoints] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [completionCode, setCompletionCode] = useState('');

  const puzzles = [
    {
      id: 1,
      icon: <Network className="w-12 h-12" />,
      color: "from-pink-600 via-purple-600 to-indigo-600",
      title: "The Relay Chain",
      subtitle: "Core Architecture",
      clue: "In the heart of Polkadot lies a special chain that coordinates all parachains but runs no smart contracts. What is this chain called?",
      question: "What is the central coordinating chain in Polkadot?",
      options: [
        { id: 'a', text: "The Relay Chain", correct: true },
        { id: 'b', text: "The Main Chain", correct: false },
        { id: 'c', text: "The Hub Chain", correct: false },
        { id: 'd', text: "The Master Chain", correct: false }
      ],
      explanation: "The Relay Chain is Polkadot's heart! It coordinates consensus and communication between all parachains.",
      hint: "Think relay race... passing messages between runners"
    },
    {
      id: 2,
      icon: <Zap className="w-12 h-12" />,
      color: "from-cyan-600 via-blue-600 to-purple-600",
      title: "Cross-Chain Messages",
      subtitle: "Interoperability",
      clue: "Parachains need to talk to each other securely. What protocol makes this trustless communication possible?",
      question: "What protocol enables parachain communication?",
      options: [
        { id: 'a', text: "IBC Protocol", correct: false },
        { id: 'b', text: "XCM (Cross-Consensus Messaging)", correct: true },
        { id: 'c', text: "TCP/IP", correct: false },
        { id: 'd', text: "WebSocket", correct: false }
      ],
      explanation: "XCM is Polkadot's universal language for secure cross-chain communication!",
      hint: "X marks the spot... for Cross-chain messaging"
    },
    {
      id: 3,
      icon: <Shield className="w-12 h-12" />,
      color: "from-green-600 via-emerald-600 to-teal-600",
      title: "Identity System",
      subtitle: "Decentralized Verification",
      clue: "In Polkadot, you can verify your real identity on-chain. But who approves and verifies this information?",
      question: "Who verifies on-chain identities in Polkadot?",
      options: [
        { id: 'a', text: "Polkadot Foundation only", correct: false },
        { id: 'b', text: "Community-elected Registrars", correct: true },
        { id: 'c', text: "Wallet providers", correct: false },
        { id: 'd', text: "AI verification", correct: false }
      ],
      explanation: "Registrars are elected by the community to verify identities in a decentralized way!",
      hint: "Who registers official documents? Now make it decentralized..."
    },
    {
      id: 4,
      icon: <Vote className="w-12 h-12" />,
      color: "from-orange-600 via-red-600 to-pink-600",
      title: "Governance Power",
      subtitle: "Democracy in Action",
      clue: "Every DOT holder can vote on proposals. But there's a way to amplify your voting power by locking tokens longer...",
      question: "What mechanism gives more voting power for longer token locks?",
      options: [
        { id: 'a', text: "Time-Weighted Voting", correct: false },
        { id: 'b', text: "Conviction Voting", correct: true },
        { id: 'c', text: "Stake Multiplication", correct: false },
        { id: 'd', text: "Lock Bonding", correct: false }
      ],
      explanation: "Conviction Voting rewards commitment—lock longer, vote stronger (up to 6x power)!",
      hint: "Show your conviction... your strong belief in decisions"
    },
    {
      id: 5,
      icon: <Coins className="w-12 h-12" />,
      color: "from-yellow-600 via-amber-600 to-orange-600",
      title: "Treasury Economics",
      subtitle: "Sustainable Funding",
      clue: "Polkadot's treasury funds ecosystem projects. But what happens to DOT that sits unspent in the treasury?",
      question: "What happens to unspent treasury funds?",
      options: [
        { id: 'a', text: "Accumulate forever", correct: false },
        { id: 'b', text: "1% is burned each period", correct: true },
        { id: 'c', text: "Sent to validators", correct: false },
        { id: 'd', text: "Returned to users", correct: false }
      ],
      explanation: "The treasury burns 1% of unspent funds each period to encourage active spending!",
      hint: "Use it or lose it... to the burn mechanism"
    }
  ];

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const startGame = () => {
    if (playerName.trim()) {
      setGameStarted(true);
      setCurrentPuzzle(0);
    }
  };

  const handleAnswerSelect = (optionId) => {
    if (!showFeedback) {
      setSelectedAnswer(optionId);
    }
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
        setCompletionCode(generateCode());
      }
    }, 3500);
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setPoints(0);
    setPlayerName('');
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameStarted(false);
    setCompletionCode('');
  };

  const isGameComplete = completionCode !== '';
  const currentPuzzleData = puzzles[currentPuzzle];
  const progress = ((currentPuzzle + 1) / puzzles.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 flex items-center justify-center">
        <div className="w-full max-w-5xl">

          {/* Header */}
          {!isGameComplete && (
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600  backdrop-blur-xl rounded-3xl p-4 border border-white/10 inline-block">
                <img src="/images/pba-logo.png" alt="Polkadot Blockchain Academy Logo" className="w-64 h-24 text-white object-contain" />
                
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
                Unlock the Chain
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {gameStarted && !isGameComplete && (
            <div className="mb-8 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xl">{playerName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5" />
                    <span className="font-bold text-xl text-black">{points}</span>
                  </div>
                </div>
              </div>

              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between mt-3 text-sm text-gray-400">
                <span>Level {currentPuzzle + 1} of {puzzles.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">

            {/* Welcome Screen */}
            {!gameStarted && (
              <div className="p-12 text-center space-y-8">
                <div className="inline-block p-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30">
                  <Gamepad2 className="w-24 h-24 text-pink-500 mx-auto" />
                </div>

                <div>
                  <h2 className="text-5xl font-black mb-4">Ready Player One?</h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    <b>Your journey into Web3 starts here.</b>
                    <br />
                    Test your blockchain knowledge, claim your reward, and take your first step into the <b>Polkadot Blockchain Academy</b>
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <input
                    type="text"
                    placeholder="ENTER PLAYER NAME"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && playerName.trim() && startGame()}
                    className="w-full px-8 py-5 rounded-2xl bg-white/10 border-2 border-white/20 focus:border-pink-500 focus:outline-none text-xl text-center font-bold placeholder-gray-500 transition-all"
                  />
                  <button
                    onClick={startGame}
                    disabled={!playerName.trim()}
                    className="w-full py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:from-gray-800 disabled:to-gray-900 rounded-2xl font-black text-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    START GAME
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-lg">5 Levels</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-lg">100 Points</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-lg">Win Code</p>
                  </div>
                </div>
              </div>
            )}

            {/* Puzzle Screens */}
            {gameStarted && !isGameComplete && (
              <div className="p-8 space-y-6">

                {/* Puzzle Header */}
                <div className={`rounded-2xl p-6 bg-gradient-to-r ${currentPuzzleData.color}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center">
                      {currentPuzzleData.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold opacity-80 mb-1">{currentPuzzleData.subtitle}</div>
                      <h2 className="text-3xl font-black">{currentPuzzleData.title}</h2>
                    </div>
                    <div className="text-5xl font-black opacity-20">
                      0{currentPuzzle + 1}
                    </div>
                  </div>
                </div>

                {/* Clue */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-sm font-bold text-cyan-400 mb-2">🎯 OBJECTIVE</div>
                  <p className="text-lg leading-relaxed text-gray-300">{currentPuzzleData.clue}</p>
                </div>

                {!showFeedback ? (
                  <>
                    {/* Question */}
                    <div className="text-center py-4">
                      <h3 className="text-2xl font-bold">{currentPuzzleData.question}</h3>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentPuzzleData.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.id)}
                          className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 ${selectedAnswer === option.id
                              ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-cyan-400 shadow-lg shadow-pink-500/50'
                              : 'bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/30'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${selectedAnswer === option.id ? 'bg-black/30' : 'bg-white/10'
                              }`}>
                              {option.id.toUpperCase()}
                            </div>
                            <span className="text-lg font-semibold">{option.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Hint */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                      <div className="text-sm font-bold text-yellow-400 mb-1">💡 HINT</div>
                      <p className="text-gray-400">{currentPuzzleData.hint}</p>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-800 disabled:to-gray-900 rounded-2xl font-black text-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      SUBMIT ANSWER
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    {puzzles[currentPuzzle].options.find(opt => opt.id === selectedAnswer)?.correct ? (
                      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500 rounded-2xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10" />
                          </div>
                          <div>
                            <p className="text-3xl font-black text-green-400">CORRECT!</p>
                            <p className="text-xl text-green-300">+20 Points</p>
                          </div>
                        </div>
                        <p className="text-lg text-gray-300">{currentPuzzleData.explanation}</p>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500 rounded-2xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                            <X className="w-10 h-10" />
                          </div>
                          <div>
                            <p className="text-3xl font-black text-red-400">NOT QUITE!</p>
                            <p className="text-xl text-red-300">Try Again Next Time</p>
                          </div>
                        </div>
                        <p className="text-lg text-gray-300">{currentPuzzleData.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Completion Screen */}
            {isGameComplete && (
              <div className="p-12 text-center space-y-8">
                <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30">
                  <Trophy className="w-32 h-32 text-yellow-500 mx-auto animate-bounce" />
                </div>

                <div>
                  <h2 className="text-6xl font-black mb-4">VICTORY!</h2>
                  <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text">
                    {points} / 100 POINTS
                  </p>
                </div>

                <div className="max-w-2xl mx-auto bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-3xl p-8 border-4 border-pink-500">
                  <p className="text-lg font-bold text-pink-400 mb-4">YOUR REWARD CODE</p>
                  <div className="bg-black/50 rounded-2xl p-8 mb-4">
                    <div className="text-7xl font-black font-mono tracking-widest bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      {completionCode}
                    </div>
                  </div>
                  <p className="text-cyan-400 font-semibold">Present this code to claim your prize!</p>
                </div>

                <div className="max-w-2xl mx-auto bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-lg font-bold text-cyan-400 mb-4">KNOWLEDGE UNLOCKED:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Relay Chain Architecture</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>XCM Protocol</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Identity Verification</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Conviction Voting</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Treasury Economics</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="px-12 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all border border-white/20"
                >
                  PLAY AGAIN
                </button>
              </div>
            )}

          </div>

          {/* Footer */}
          {!isGameComplete && (
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                Powered by  <span className="text-purple-500 font-bold">Polkadot Blockchain Academy</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TreasureHuntGame;