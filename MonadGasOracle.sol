// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MonadGasOracle
 * @dev Stores state-level rolling transaction fee parameters optimized for high-velocity lookups.
 */
contract MonadGasOracle is Ownable {

    uint256 public currentBaseFeeGwei;
    uint256 public recommendedPriorityFeeGwei;
    uint256 public lastUpdatedTimestamp;

    event OracleFeedUpdated(uint256 baseFee, uint256 priorityFee, uint256 timestamp);

    constructor() Ownable(msg.sender) {
        lastUpdatedTimestamp = block.timestamp;
    }

    /**
     * @notice Broadcasts updated gas pricing metrics into the storage layout.
     * @dev This execution occupies an isolated slot vector to minimize conflicts with secondary lookups.
     */
    function updateGasMetrics(uint256 newBase, uint256 newPriority) external onlyOwner {
        currentBaseFeeGwei = newBase;
        recommendedPriorityFeeGwei = newPriority;
        lastUpdatedTimestamp = block.timestamp;

        emit OracleFeedUpdated(newBase, newPriority, block.timestamp);
    }
}
