import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Trophy, Zap, Gamepad2, Shield, Vote, Network, Coins, Star, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getRandomPuzzles } from '../data/questions';

const TreasureHuntGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [points, setPoints] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [completionCode, setCompletionCode] = useState('');
  const [puzzles, setPuzzles] = useState(() => getRandomPuzzles(5));

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const trackGameCompletion = async (finalPoints, won, code = null) => {
    try {
      await fetch('/api/track-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: playerName,
          score: finalPoints,
          won: won,
          rewardCode: code
        })
      });
    } catch (error) {
      console.error('Failed to track game:', error);
      // Don't show error to user, just log it
    }
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

    let finalPoints = points;
    if (selected && selected.correct) {
      finalPoints = points + 20;
      setPoints(finalPoints);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle(currentPuzzle + 1);
      } else {
        // Only generate code if player has 60+ points (won)
        const won = finalPoints >= 60;
        let code = null;

        if (won) {
          code = generateCode();
          setCompletionCode(code);
        } else {
          // Still mark game as complete, but without a code
          setCompletionCode('NO_WIN');
        }

        // Track the game completion
        trackGameCompletion(finalPoints, won, code);
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
    setPuzzles(getRandomPuzzles(5)); // Get new random questions for replay
  };

  const isGameComplete = completionCode !== '';
  const hasWon = points >= 60;
  const currentPuzzleData = puzzles[currentPuzzle];
  const progress = ((currentPuzzle + 1) / puzzles.length) * 100;

  return (
    <div className="min-h-screen w-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Square container */}
      <div className="relative z-10 w-[min(100vh,100vw)] h-[min(100vh,100vw)] max-w-[1080px] max-h-[1080px] p-6 overflow-y-auto">
        <div className="w-full min-h-full flex flex-col">

          {/* Header */}
          {!isGameComplete && (
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-4 mb-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 backdrop-blur-xl rounded-2xl p-3 border border-white/10 inline-block">
                <img src="/images/pba-logo.png" alt="Polkadot Blockchain Academy Logo" className="w-48 h-16 text-white object-contain" />
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
                Unlock the Chain
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {gameStarted && !isGameComplete && (
            <div className="mb-4 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
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
              <div className="p-8 text-center space-y-6">
                <div className="inline-block p-4 rounded-3xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30">
                  <Gamepad2 className="w-20 h-20 text-pink-500 mx-auto" />
                </div>

                <div>
                  <h2 className="text-4xl font-black mb-3">Ready Player One?</h2>
                  <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
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

                <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-4">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm">5 Levels</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center mx-auto mb-2">
                      <Star className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm">100 Points</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm">Win Code</p>
                  </div>
                </div>
              </div>
            )}

            {/* Puzzle Screens */}
            {gameStarted && !isGameComplete && (
              <div className="p-4 space-y-3">

                {/* Puzzle Header */}
                <div className={`rounded-2xl p-4 bg-gradient-to-r ${currentPuzzleData.color}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center">
                      {currentPuzzleData.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold opacity-80 mb-1">{currentPuzzleData.subtitle}</div>
                      <h2 className="text-2xl font-black">{currentPuzzleData.title}</h2>
                    </div>
                    <div className="text-4xl font-black opacity-20">
                      0{currentPuzzle + 1}
                    </div>
                  </div>
                </div>

                {/* Clue */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-xs font-bold text-cyan-400 mb-1">🎯 OBJECTIVE</div>
                  <p className="text-base leading-snug text-gray-300">{currentPuzzleData.clue}</p>
                </div>

                {!showFeedback ? (
                  <>
                    {/* Question */}
                    <div className="text-center py-2">
                      <h3 className="text-xl font-bold">{currentPuzzleData.question}</h3>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentPuzzleData.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.id)}
                          className={`p-4 rounded-xl text-left transition-all ${selectedAnswer === option.id
                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-cyan-400 shadow-lg shadow-pink-500/50'
                            : 'bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/30'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${selectedAnswer === option.id ? 'bg-black/30' : 'bg-white/10'
                              }`}>
                              {option.id.toUpperCase()}
                            </div>
                            <span className="text-base font-semibold">{option.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Hint */}
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-xs font-bold text-yellow-400 mb-1">💡 HINT</div>
                      <p className="text-sm text-gray-400">{currentPuzzleData.hint}</p>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-800 disabled:to-gray-900 rounded-xl font-black text-lg transition-all disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      SUBMIT ANSWER
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 animate-fadeIn">
                    {puzzles[currentPuzzle].options.find(opt => opt.id === selectedAnswer)?.correct ? (
                      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-green-400">CORRECT!</p>
                            <p className="text-base text-green-300">+20 Points</p>
                          </div>
                        </div>
                        <p className="text-base text-gray-300">{currentPuzzleData.explanation}</p>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                            <X className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-red-400">NOT QUITE!</p>
                            <p className="text-base text-red-300">Try Again Next Time</p>
                          </div>
                        </div>
                        <p className="text-base text-gray-300">{currentPuzzleData.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Completion Screen - Winner (60+ points) */}
            {isGameComplete && hasWon && completionCode !== 'NO_WIN' && (
              <div className="p-8 text-center space-y-6">
                <div className="inline-block p-6 rounded-3xl bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30">
                  <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
                </div>

                <div>
                  <h2 className="text-5xl font-black mb-3">VICTORY!</h2>
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text">
                    {points} / 100 POINTS
                  </p>
                </div>

                <div className="max-w-xl mx-auto bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-3xl p-8 border-4 border-pink-500">
                  <p className="text-lg font-bold text-pink-400 mb-6">YOUR REWARD QR CODE</p>
                  <div className="bg-white rounded-2xl p-8 mb-4 inline-block mx-auto">
                    <img src="/images/pba-qr-code.png" alt="Polkadot Blockchain Academy QR Code" className="w-40 h-40 text-white object-contain" />
                  </div>
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

            {/* Completion Screen - Try Again (< 60 points) */}
            {isGameComplete && (!hasWon || completionCode === 'NO_WIN') && (
              <div className="p-8 text-center space-y-6">
                <div className="inline-block p-6 rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                  <Gamepad2 className="w-24 h-24 text-blue-400 mx-auto" />
                </div>

                <div>
                  <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    KEEP GOING!
                  </h2>
                  <p className="text-2xl font-bold text-gray-300 mb-2">
                    {points} / 100 POINTS
                  </p>
                  <p className="text-lg text-gray-400">
                    You need 60+ points to claim your reward
                  </p>
                </div>

                <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border-2 border-purple-500">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-purple-400 mb-4">
                      Practice Makes Better! 💪
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      You're on the right path! Each attempt helps you learn more about Polkadot's ecosystem.
                      Take another shot and unlock your reward!
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-cyan-400 font-semibold mb-3">💡 Tips for Success:</p>
                    <ul className="text-left space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Read the clues and hints carefully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Each question teaches you something new</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Remember what you learned and try again!</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-lg font-bold text-cyan-400 mb-4">KNOWLEDGE GAINED:</p>
                  <p className="text-gray-400">Every question helps you understand Polkadot better. You're building your Web3 knowledge!</p>
                </div>

                <button
                  onClick={resetGame}
                  className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-black text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                >
                  TRY AGAIN
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

          </div>

          {/* Footer */}
          {!isGameComplete && (
            <div className="text-center mt-auto pt-4">
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