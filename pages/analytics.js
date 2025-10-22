import React, { useState, useEffect } from 'react';
import { Trophy, Users, Target, TrendingUp, Calendar, Award, BarChart3, Activity, Trash2, AlertTriangle } from 'lucide-react';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.data);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch analytics');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDatabase = async () => {
    setResetting(true);
    try {
      const response = await fetch('/api/reset-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmationCode: 'RESET_ALL_DATA'
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Database reset successfully!\n${data.deletedRecords} records deleted.`);
        setShowResetConfirm(false);
        fetchAnalytics(); // Refresh the analytics
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      alert(`❌ Failed to reset database: ${err.message}`);
      console.error('Reset error:', err);
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    // Auto-refresh every 30 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchAnalytics, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-xl">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-500 text-xl mb-4">Error: {error}</p>
          <p className="text-gray-400 mb-6">Make sure your DATABASE_URL is set in .env.local</p>
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const winRate = analytics.totalGames > 0
    ? ((analytics.wins / analytics.totalGames) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Game Analytics
              </h1>
              <p className="text-gray-400">Unlock the Chain - Live Statistics</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg border ${
                  autoRefresh
                    ? 'bg-green-600 border-green-500'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                {autoRefresh ? '🔄 Auto-refresh ON' : '⏸️ Auto-refresh OFF'}
              </button>
              <button
                onClick={fetchAnalytics}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Refresh Now
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 border border-red-500"
              >
                <Trash2 className="w-4 h-4" />
                Reset DB
              </button>
            </div>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-red-400">Reset Database?</h2>
              </div>

              <div className="mb-6 space-y-3">
                <p className="text-gray-300">
                  This will <span className="text-red-400 font-bold">permanently delete ALL game data</span>:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                  <li>All game sessions ({analytics?.totalGames || 0} total)</li>
                  <li>Player statistics and leaderboards</li>
                  <li>Historical data and daily records</li>
                  <li>Reward codes issued</li>
                </ul>
                <p className="text-yellow-400 font-semibold mt-4">
                  ⚠️ This action cannot be undone!
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  disabled={resetting}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetDatabase}
                  disabled={resetting}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {resetting ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Yes, Reset All Data
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-gray-400 text-sm">Total Games</span>
            </div>
            <p className="text-4xl font-black">{analytics.totalGames}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-gray-400 text-sm">Wins</span>
            </div>
            <p className="text-4xl font-black text-green-400">{analytics.wins}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-gray-400 text-sm">Try Again</span>
            </div>
            <p className="text-4xl font-black text-orange-400">{analytics.losses}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-gray-400 text-sm">Win Rate</span>
            </div>
            <p className="text-4xl font-black text-cyan-400">{winRate}%</p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Average Score</h2>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-5xl font-black text-purple-400">{analytics.averageScore}</p>
            <p className="text-2xl text-gray-400 mb-2">/ 100</p>
          </div>
        </div>

        {/* Score Distribution */}
        {analytics.scoreDistribution && analytics.scoreDistribution.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              Score Distribution
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {analytics.scoreDistribution.map((item) => (
                <div
                  key={item.score_range}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 text-center"
                >
                  <p className="text-3xl font-black text-purple-400">{item.count}</p>
                  <p className="text-gray-400 text-sm mt-1">{item.score_range} pts</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Games by Day */}
        {analytics.gamesByDay && analytics.gamesByDay.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-pink-400" />
              Games by Day
            </h2>
            <div className="space-y-3">
              {analytics.gamesByDay.map((day) => (
                <div
                  key={day.date}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-lg">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-2xl font-bold">{day.games}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Wins</p>
                      <p className="text-2xl font-bold text-green-400">{day.wins}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Losses</p>
                      <p className="text-2xl font-bold text-orange-400">{day.losses}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Players */}
        {analytics.topPlayers && analytics.topPlayers.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-400" />
              Top Players
            </h2>
            <div className="space-y-3">
              {analytics.topPlayers.map((player, index) => (
                <div
                  key={player.player_name}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${
                        index === 0
                          ? 'bg-yellow-500 text-black'
                          : index === 1
                          ? 'bg-gray-400 text-black'
                          : index === 2
                          ? 'bg-orange-600 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{player.player_name}</p>
                      <p className="text-sm text-gray-400">
                        {player.games_played} {player.games_played === 1 ? 'game' : 'games'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Wins</p>
                      <p className="text-xl font-bold text-green-400">{player.wins}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Best Score</p>
                      <p className="text-xl font-bold text-purple-400">{player.best_score}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Avg Score</p>
                      <p className="text-xl font-bold text-cyan-400">{player.avg_score}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Games */}
        {analytics.recentGames && analytics.recentGames.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              Recent Games
            </h2>
            <div className="space-y-2">
              {analytics.recentGames.map((game, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        game.won ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    />
                    <span className="font-semibold">{game.player_name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400 font-bold">{game.score} pts</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(game.played_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
}
