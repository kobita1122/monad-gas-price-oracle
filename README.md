# Monad High-Frequency Gas Price Oracle

In the ultra-high throughput paradigm of **Monad** in 2026, market volatility can cause rapid fluctuations in priority fee margins. Standard EVM gas estimation loops often fallback on delayed averages, causing high-frequency algorithmic routing suites to underprice or overpay for transaction inclusions.

This repository features a professional reference implementation for an **Automated Gas Price Oracle**. It listens directly to raw block headers from Monad execution clients, computes dynamic rolling averages of transaction base fees, and maintains an on-chain tracker contract to supply instant, highly accurate pricing feeds.

## Functional Core
- **Mempool-Agnostic Sampling:** Computes rolling fee limits across a dynamic window of consecutive finalized blocks.
- **Asymmetric Update Windows:** Protects against drastic systemic jumps by adjusting broadcast thresholds based on priority queues.

## Setup & Ingest
1. Install project dependencies: `npm install`
2. Define provider nodes, contract addresses, and private authorization keys in `.env`.
3. Launch the live oracle indexer node: `node oracleIndexer.js`
