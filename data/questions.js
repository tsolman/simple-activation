import React from 'react';
import { Network, Zap, Shield, Vote, Coins, Star, Trophy, Gamepad2 } from 'lucide-react';

export const allPuzzles = [
  // Original 5 questions
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
  },

  // New questions (30 more)
  {
    id: 6,
    icon: <Network className="w-12 h-12" />,
    color: "from-blue-600 via-indigo-600 to-purple-600",
    title: "Parachains",
    subtitle: "Parallel Chains",
    clue: "Polkadot's architecture allows multiple blockchains to run in parallel. What are these specialized chains called?",
    question: "What are the parallel blockchains in Polkadot's ecosystem called?",
    options: [
      { id: 'a', text: "Sidechains", correct: false },
      { id: 'b', text: "Parachains", correct: true },
      { id: 'c', text: "Subchains", correct: false },
      { id: 'd', text: "Layer 2s", correct: false }
    ],
    explanation: "Parachains are sovereign blockchains that run parallel to each other on Polkadot!",
    hint: "Para means 'beside' or 'alongside'..."
  },
  {
    id: 7,
    icon: <Shield className="w-12 h-12" />,
    color: "from-purple-600 via-pink-600 to-red-600",
    title: "Validator Selection",
    subtitle: "Consensus Security",
    clue: "Polkadot uses a unique consensus mechanism. What is it called?",
    question: "What is Polkadot's consensus mechanism?",
    options: [
      { id: 'a', text: "Proof of Work (PoW)", correct: false },
      { id: 'b', text: "Nominated Proof of Stake (NPoS)", correct: true },
      { id: 'c', text: "Delegated Proof of Stake (DPoS)", correct: false },
      { id: 'd', text: "Proof of Authority (PoA)", correct: false }
    ],
    explanation: "NPoS allows token holders to nominate validators, creating a more democratic and secure network!",
    hint: "Nominators choose the validators they trust..."
  },
  {
    id: 8,
    icon: <Zap className="w-12 h-12" />,
    color: "from-green-600 via-teal-600 to-cyan-600",
    title: "Smart Contract Platform",
    subtitle: "Development Framework",
    clue: "Polkadot parachains are built using a modular framework. What is this framework called?",
    question: "What is the blockchain framework for building Polkadot parachains?",
    options: [
      { id: 'a', text: "Ethereum Virtual Machine", correct: false },
      { id: 'b', text: "Substrate", correct: true },
      { id: 'c', text: "Cosmos SDK", correct: false },
      { id: 'd', text: "Hyperledger Fabric", correct: false }
    ],
    explanation: "Substrate is the modular framework that makes building custom blockchains easier!",
    hint: "Like a substrate in biology... the foundation layer"
  },
  {
    id: 9,
    icon: <Star className="w-12 h-12" />,
    color: "from-yellow-600 via-orange-600 to-red-600",
    title: "Runtime Execution",
    subtitle: "Virtual Machine",
    clue: "Polkadot uses a specific technology for executing smart contracts and runtime logic. What is it?",
    question: "What technology does Polkadot use for executing its runtime?",
    options: [
      { id: 'a', text: "Java Virtual Machine", correct: false },
      { id: 'b', text: "WebAssembly (WASM)", correct: true },
      { id: 'c', text: "EVM (Ethereum Virtual Machine)", correct: false },
      { id: 'd', text: "Native x86", correct: false }
    ],
    explanation: "WebAssembly provides fast, secure, and platform-independent execution for Polkadot!",
    hint: "It's the same tech browsers use for fast web apps..."
  },
  {
    id: 10,
    icon: <Coins className="w-12 h-12" />,
    color: "from-pink-600 via-purple-600 to-blue-600",
    title: "Token Economics",
    subtitle: "Native Asset",
    clue: "Every blockchain has a native token. What is Polkadot's native token?",
    question: "What is the native token of the Polkadot network?",
    options: [
      { id: 'a', text: "ETH", correct: false },
      { id: 'b', text: "DOT", correct: true },
      { id: 'c', text: "KSM", correct: false },
      { id: 'd', text: "ATOM", correct: false }
    ],
    explanation: "DOT is used for governance, staking, and bonding parachains to the Relay Chain!",
    hint: "Connect the dots... literally!"
  },
  {
    id: 11,
    icon: <Network className="w-12 h-12" />,
    color: "from-cyan-600 via-blue-600 to-indigo-600",
    title: "Block Finality",
    subtitle: "Consensus Algorithm",
    clue: "Polkadot uses a finality gadget to ensure blocks cannot be reverted. What is it called?",
    question: "What is Polkadot's finality mechanism called?",
    options: [
      { id: 'a', text: "Casper FFG", correct: false },
      { id: 'b', text: "GRANDPA", correct: true },
      { id: 'c', text: "Tendermint", correct: false },
      { id: 'd', text: "PBFT", correct: false }
    ],
    explanation: "GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement) finalizes blocks efficiently!",
    hint: "The oldest generation in your family tree..."
  },
  {
    id: 12,
    icon: <Zap className="w-12 h-12" />,
    color: "from-orange-600 via-red-600 to-pink-600",
    title: "Block Production",
    subtitle: "Consensus Protocol",
    clue: "Polkadot uses a specific mechanism for producing blocks. What is this algorithm called?",
    question: "What is the block production mechanism in Polkadot?",
    options: [
      { id: 'a', text: "Proof of Work", correct: false },
      { id: 'b', text: "BABE (Blind Assignment for Blockchain Extension)", correct: true },
      { id: 'c', text: "Round Robin", correct: false },
      { id: 'd', text: "Aura", correct: false }
    ],
    explanation: "BABE randomly assigns block production slots to validators in a verifiable way!",
    hint: "Like a baby... something new is born each slot"
  },
  {
    id: 13,
    icon: <Shield className="w-12 h-12" />,
    color: "from-green-600 via-emerald-600 to-cyan-600",
    title: "Parachain Nodes",
    subtitle: "Network Infrastructure",
    clue: "Parachains have special nodes that collect transactions and produce blocks. What are these nodes called?",
    question: "What are the nodes that produce parachain blocks called?",
    options: [
      { id: 'a', text: "Miners", correct: false },
      { id: 'b', text: "Collators", correct: true },
      { id: 'c', text: "Validators", correct: false },
      { id: 'd', text: "Fishermen", correct: false }
    ],
    explanation: "Collators collect transactions and produce parachain blocks for validators to validate!",
    hint: "They collate (collect and arrange) information..."
  },
  {
    id: 14,
    icon: <Vote className="w-12 h-12" />,
    color: "from-purple-600 via-pink-600 to-red-600",
    title: "Governance Evolution",
    subtitle: "OpenGov",
    clue: "Polkadot's governance system evolved to be more decentralized. What is the new system called?",
    question: "What is Polkadot's current governance system called?",
    options: [
      { id: 'a', text: "Council Governance", correct: false },
      { id: 'b', text: "OpenGov (Governance v2)", correct: true },
      { id: 'c', text: "Democracy v1", correct: false },
      { id: 'd', text: "Tech Committee", correct: false }
    ],
    explanation: "OpenGov removed the council and made governance more open and parallel!",
    hint: "Open and accessible to all..."
  },
  {
    id: 15,
    icon: <Star className="w-12 h-12" />,
    color: "from-yellow-600 via-amber-600 to-orange-600",
    title: "Testnet Environment",
    subtitle: "Canary Network",
    clue: "Polkadot has a 'canary network' where features are tested before mainnet. What is it called?",
    question: "What is Polkadot's canary network?",
    options: [
      { id: 'a', text: "Westend", correct: false },
      { id: 'b', text: "Kusama", correct: true },
      { id: 'c', text: "Rococo", correct: false },
      { id: 'd', text: "Paseo", correct: false }
    ],
    explanation: "Kusama is a live network with real economic value where new features are tested!",
    hint: "Named after Yayoi Kusama, the Japanese artist..."
  },
  {
    id: 16,
    icon: <Coins className="w-12 h-12" />,
    color: "from-blue-600 via-purple-600 to-pink-600",
    title: "Staking Rewards",
    subtitle: "Token Economics",
    clue: "When you stake DOT, you earn rewards. What is the typical annual return (APY)?",
    question: "What is the approximate staking APY on Polkadot?",
    options: [
      { id: 'a', text: "2-4%", correct: false },
      { id: 'b', text: "10-15%", correct: true },
      { id: 'c', text: "25-30%", correct: false },
      { id: 'd', text: "50%+", correct: false }
    ],
    explanation: "Polkadot offers competitive staking rewards around 10-15% annually!",
    hint: "Higher than traditional banking, lower than risky DeFi..."
  },
  {
    id: 17,
    icon: <Network className="w-12 h-12" />,
    color: "from-cyan-600 via-teal-600 to-green-600",
    title: "Slot Auctions",
    subtitle: "Parachain Leasing",
    clue: "Parachains compete for slots on the Relay Chain. How do they secure these slots?",
    question: "How do parachains secure their slot on Polkadot?",
    options: [
      { id: 'a', text: "Pay monthly fees", correct: false },
      { id: 'b', text: "Win slot auctions by bonding DOT", correct: true },
      { id: 'c', text: "Submit application forms", correct: false },
      { id: 'd', text: "First come, first served", correct: false }
    ],
    explanation: "Parachains win slots through candle auctions, bonding DOT for a lease period!",
    hint: "Highest bidder wins in an auction..."
  },
  {
    id: 18,
    icon: <Zap className="w-12 h-12" />,
    color: "from-pink-600 via-purple-600 to-indigo-600",
    title: "Crowdfunding",
    subtitle: "Community Support",
    clue: "Communities can help parachains win auctions by contributing DOT. What is this mechanism?",
    question: "What is the mechanism for community funding parachain auctions?",
    options: [
      { id: 'a', text: "ICO (Initial Coin Offering)", correct: false },
      { id: 'b', text: "Crowdloan", correct: true },
      { id: 'c', text: "Airdrop", correct: false },
      { id: 'd', text: "Token Sale", correct: false }
    ],
    explanation: "Crowdloans allow communities to contribute DOT to help parachains win auctions!",
    hint: "Like crowdfunding, but on-chain..."
  },
  {
    id: 19,
    icon: <Shield className="w-12 h-12" />,
    color: "from-green-600 via-emerald-600 to-teal-600",
    title: "Runtime Upgrades",
    subtitle: "Forkless Evolution",
    clue: "Polkadot can upgrade its blockchain logic without hard forks. How?",
    question: "How does Polkadot upgrade without hard forks?",
    options: [
      { id: 'a', text: "Manual node updates", correct: false },
      { id: 'b', text: "On-chain runtime upgrades via WASM", correct: true },
      { id: 'c', text: "Coordinated shutdowns", correct: false },
      { id: 'd', text: "It requires hard forks", correct: false }
    ],
    explanation: "The runtime is stored as WASM on-chain and can be upgraded via governance!",
    hint: "The code lives on the blockchain itself..."
  },
  {
    id: 20,
    icon: <Vote className="w-12 h-12" />,
    color: "from-orange-600 via-red-600 to-pink-600",
    title: "Proposal Tracks",
    subtitle: "OpenGov Features",
    clue: "In OpenGov, different types of proposals follow different tracks. Which is NOT a track?",
    question: "Which is NOT a governance track in OpenGov?",
    options: [
      { id: 'a', text: "Root Track", correct: false },
      { id: 'b', text: "Lightning Track", correct: true },
      { id: 'c', text: "Treasurer Track", correct: false },
      { id: 'd', text: "Whitelisted Caller Track", correct: false }
    ],
    explanation: "OpenGov has Root, Treasurer, and other tracks, but no 'Lightning Track'!",
    hint: "Think about what's fast but doesn't exist..."
  },
  {
    id: 21,
    icon: <Coins className="w-12 h-12" />,
    color: "from-yellow-600 via-amber-600 to-orange-600",
    title: "Transaction Costs",
    subtitle: "Fee Mechanism",
    clue: "Polkadot transactions have fees. What are these fees measured in?",
    question: "How are transaction fees calculated in Polkadot?",
    options: [
      { id: 'a', text: "Gas (like Ethereum)", correct: false },
      { id: 'b', text: "Weights (computational resources)", correct: true },
      { id: 'c', text: "Bandwidth (data size)", correct: false },
      { id: 'd', text: "Fixed fee per transaction", correct: false }
    ],
    explanation: "Weights measure computational resources needed, determining transaction fees!",
    hint: "Heavy operations cost more..."
  },
  {
    id: 22,
    icon: <Network className="w-12 h-12" />,
    color: "from-blue-600 via-indigo-600 to-purple-600",
    title: "Smart Contracts",
    subtitle: "Development Language",
    clue: "Polkadot has its own smart contract language for WASM. What is it called?",
    question: "What is Polkadot's smart contract language?",
    options: [
      { id: 'a', text: "Solidity", correct: false },
      { id: 'b', text: "ink!", correct: true },
      { id: 'c', text: "Vyper", correct: false },
      { id: 'd', text: "Move", correct: false }
    ],
    explanation: "ink! is an embedded domain-specific language for writing WASM smart contracts!",
    hint: "Written with an exclamation mark..."
  },
  {
    id: 23,
    icon: <Zap className="w-12 h-12" />,
    color: "from-cyan-600 via-blue-600 to-purple-600",
    title: "Common Good Chains",
    subtitle: "System Parachains",
    clue: "Some parachains serve the entire ecosystem without auction. What are they called?",
    question: "What are system-level parachains for the common good called?",
    options: [
      { id: 'a', text: "Free Chains", correct: false },
      { id: 'b', text: "Common Good Parachains", correct: true },
      { id: 'c', text: "Public Parachains", correct: false },
      { id: 'd', text: "Foundation Chains", correct: false }
    ],
    explanation: "Common Good Parachains serve the whole ecosystem and don't need to win auctions!",
    hint: "For the common good of all..."
  },
  {
    id: 24,
    icon: <Shield className="w-12 h-12" />,
    color: "from-purple-600 via-pink-600 to-red-600",
    title: "Asset Management",
    subtitle: "Token Hub",
    clue: "There's a specific parachain for managing assets and tokens. What is it called?",
    question: "What is the name of Polkadot's asset management parachain?",
    options: [
      { id: 'a', text: "Token Hub", correct: false },
      { id: 'b', text: "Asset Hub", correct: true },
      { id: 'c', text: "DeFi Chain", correct: false },
      { id: 'd', text: "Swap Chain", correct: false }
    ],
    explanation: "Asset Hub (formerly Statemint) is the common good parachain for assets!",
    hint: "A hub for all your assets..."
  },
  {
    id: 25,
    icon: <Star className="w-12 h-12" />,
    color: "from-green-600 via-teal-600 to-cyan-600",
    title: "Nomination Pools",
    subtitle: "Accessible Staking",
    clue: "Small token holders can pool together to stake. What is this feature called?",
    question: "What allows smaller DOT holders to participate in staking?",
    options: [
      { id: 'a', text: "Staking Clubs", correct: false },
      { id: 'b', text: "Nomination Pools", correct: true },
      { id: 'c', text: "Delegated Staking", correct: false },
      { id: 'd', text: "Micro Staking", correct: false }
    ],
    explanation: "Nomination Pools let users pool DOT together to meet minimum staking requirements!",
    hint: "Pool your resources together..."
  },
  {
    id: 26,
    icon: <Vote className="w-12 h-12" />,
    color: "from-orange-600 via-red-600 to-pink-600",
    title: "Bounties Program",
    subtitle: "Treasury Spending",
    clue: "The treasury can fund ongoing work through a specific mechanism. What is it?",
    question: "What mechanism allows the treasury to fund ongoing work?",
    options: [
      { id: 'a', text: "Grants", correct: false },
      { id: 'b', text: "Bounties", correct: true },
      { id: 'c', text: "Subscriptions", correct: false },
      { id: 'd', text: "Contracts", correct: false }
    ],
    explanation: "Bounties allow curators to manage treasury funds for specific ongoing objectives!",
    hint: "Like a reward for completing a task..."
  },
  {
    id: 27,
    icon: <Coins className="w-12 h-12" />,
    color: "from-yellow-600 via-amber-600 to-orange-600",
    title: "Validator Requirements",
    subtitle: "Network Security",
    clue: "Running a validator requires technical setup. What's the minimum DOT requirement?",
    question: "What is required to become a validator on Polkadot?",
    options: [
      { id: 'a', text: "Exactly 1,000 DOT", correct: false },
      { id: 'b', text: "Variable based on network (currently 1.8M+ DOT)", correct: true },
      { id: 'c', text: "No minimum", correct: false },
      { id: 'd', text: "10 DOT", correct: false }
    ],
    explanation: "The validator set is limited, so you need enough stake to be in the active set!",
    hint: "It's competitive and changes with the market..."
  },
  {
    id: 28,
    icon: <Network className="w-12 h-12" />,
    color: "from-pink-600 via-purple-600 to-blue-600",
    title: "Bridge Technology",
    subtitle: "External Connectivity",
    clue: "Polkadot can connect to other blockchains like Ethereum. What enables this?",
    question: "What technology connects Polkadot to external blockchains?",
    options: [
      { id: 'a', text: "Centralized exchanges", correct: false },
      { id: 'b', text: "Bridge parachains", correct: true },
      { id: 'c', text: "APIs", correct: false },
      { id: 'd', text: "Oracles only", correct: false }
    ],
    explanation: "Bridge parachains create trustless connections to external networks like Ethereum!",
    hint: "A bridge connects two separate places..."
  },
  {
    id: 29,
    icon: <Zap className="w-12 h-12" />,
    color: "from-cyan-600 via-teal-600 to-green-600",
    title: "Transaction Types",
    subtitle: "Blockchain Operations",
    clue: "In Polkadot, what are transactions called?",
    question: "What are transactions called in the Polkadot ecosystem?",
    options: [
      { id: 'a', text: "Messages", correct: false },
      { id: 'b', text: "Extrinsics", correct: true },
      { id: 'c', text: "Actions", correct: false },
      { id: 'd', text: "Calls", correct: false }
    ],
    explanation: "Extrinsics are pieces of information that come from outside the chain!",
    hint: "Something coming from the outside (extrinsic)..."
  },
  {
    id: 30,
    icon: <Shield className="w-12 h-12" />,
    color: "from-purple-600 via-pink-600 to-red-600",
    title: "Data Availability",
    subtitle: "Parachain Security",
    clue: "How does Polkadot ensure parachain data is available and secure?",
    question: "What mechanism ensures parachain data availability?",
    options: [
      { id: 'a', text: "Full replication", correct: false },
      { id: 'b', text: "Erasure coding", correct: true },
      { id: 'c', text: "Sharding", correct: false },
      { id: 'd', text: "IPFS storage", correct: false }
    ],
    explanation: "Erasure coding splits data into chunks so it can be recovered even if pieces are lost!",
    hint: "Even if some is erased, you can recover it..."
  },
  {
    id: 31,
    icon: <Star className="w-12 h-12" />,
    color: "from-blue-600 via-indigo-600 to-purple-600",
    title: "Technical Fellowship",
    subtitle: "Expert Governance",
    clue: "There's a body of technical experts who guide protocol development. What is it called?",
    question: "What is the technical expert body in Polkadot?",
    options: [
      { id: 'a', text: "Core Developers", correct: false },
      { id: 'b', text: "Technical Fellowship", correct: true },
      { id: 'c', text: "Protocol Council", correct: false },
      { id: 'd', text: "Chain Architects", correct: false }
    ],
    explanation: "The Technical Fellowship is a ranked group of experts who guide technical decisions!",
    hint: "A fellowship of technical wizards..."
  },
  {
    id: 32,
    icon: <Vote className="w-12 h-12" />,
    color: "from-green-600 via-emerald-600 to-teal-600",
    title: "Referendum Voting",
    subtitle: "Democratic Process",
    clue: "In OpenGov, how many referenda can be voted on simultaneously?",
    question: "How many referenda can run at the same time in OpenGov?",
    options: [
      { id: 'a', text: "Only one at a time", correct: false },
      { id: 'b', text: "Multiple (unlimited parallelization)", correct: true },
      { id: 'c', text: "Maximum of 5", correct: false },
      { id: 'd', text: "One per track", correct: false }
    ],
    explanation: "OpenGov allows unlimited parallel referenda, making governance much more scalable!",
    hint: "Open means no limits..."
  },
  {
    id: 33,
    icon: <Coins className="w-12 h-12" />,
    color: "from-orange-600 via-red-600 to-pink-600",
    title: "Slashing Risk",
    subtitle: "Security Mechanism",
    clue: "Validators can lose stake for misbehavior. What is this punishment called?",
    question: "What happens to validators who misbehave?",
    options: [
      { id: 'a', text: "Timeout", correct: false },
      { id: 'b', text: "Slashing", correct: true },
      { id: 'c', text: "Banning", correct: false },
      { id: 'd', text: "Warning", correct: false }
    ],
    explanation: "Slashing removes a portion of a validator's stake as punishment for malicious behavior!",
    hint: "Like slashing a price... cutting it down"
  },
  {
    id: 34,
    icon: <Network className="w-12 h-12" />,
    color: "from-yellow-600 via-amber-600 to-orange-600",
    title: "Session Keys",
    subtitle: "Validator Operations",
    clue: "Validators use special keys for consensus operations. What are these keys called?",
    question: "What keys do validators use for consensus?",
    options: [
      { id: 'a', text: "Private Keys", correct: false },
      { id: 'b', text: "Session Keys", correct: true },
      { id: 'c', text: "Master Keys", correct: false },
      { id: 'd', text: "Signing Keys", correct: false }
    ],
    explanation: "Session Keys are hot keys used for validator operations, separate from stash keys!",
    hint: "Keys that change each session..."
  },
  {
    id: 35,
    icon: <Zap className="w-12 h-12" />,
    color: "from-pink-600 via-purple-600 to-indigo-600",
    title: "Polkadot Academy",
    subtitle: "Education Initiative",
    clue: "What is the intensive educational program for blockchain developers called?",
    question: "What is Polkadot's premier educational program?",
    options: [
      { id: 'a', text: "Polkadot School", correct: false },
      { id: 'b', text: "Polkadot Blockchain Academy (PBA)", correct: true },
      { id: 'c', text: "Substrate University", correct: false },
      { id: 'd', text: "Web3 Institute", correct: false }
    ],
    explanation: "PBA is an intensive program teaching blockchain development and Polkadot technology!",
    hint: "You're playing this game at a PBA event!"
  }
];

// Function to randomly select N puzzles
export const getRandomPuzzles = (count = 5) => {
  const shuffled = [...allPuzzles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
