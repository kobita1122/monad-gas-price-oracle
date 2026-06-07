const { ethers } = require("ethers");
require("dotenv").config();

class MonadGasIndexer {
    constructor() {
        this.historicalFees = [];
        this.samplingWindowSize = 10;
    }

    /**
     * Processes incoming block headers to extract and compute the rolling base fee.
     * @param {object} mockBlockHeader Object containing simulated block fee fields.
     */
    processInboundBlockFee(mockBlockHeader) {
        console.log(`[Oracle Daemon] Ingested Block #${mockBlockHeader.number} | Base Fee: ${mockBlockHeader.baseFee} Gwei`);
        
        this.historicalFees.push(mockBlockHeader.baseFee);
        
        if (this.historicalFees.length > this.samplingWindowSize) {
            this.historicalFees.shift(); // Evict old data fields out of the sampling range
        }

        const aggregateSum = this.historicalFees.reduce((acc, val) => acc + val, 0);
        const rollingAverage = (aggregateSum / this.historicalFees.length).toFixed(2);

        console.log(` -> Aggregated Window Mean: ${rollingAverage} Gwei | Active Window Samples: ${this.historicalFees.length}`);
        console.log(`[Action] Transmitting data payload targets to MonadGasOracle contract...`);
    }
}

const indexerInstance = new MonadGasIndexer();

// Simulate consecutive high-frequency block emissions
indexerInstance.processInboundBlockFee({ number: 55001, baseFee: 42 });
indexerInstance.processInboundBlockFee({ number: 55002, baseFee: 45 });
indexerInstance.processInboundBlockFee({ number: 55003, baseFee: 39 });

module.exports = MonadGasIndexer;
