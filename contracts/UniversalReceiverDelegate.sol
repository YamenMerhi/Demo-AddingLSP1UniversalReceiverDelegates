// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

// 0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c

import {ILSP1UniversalReceiverDelegate} from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiverDelegate.sol";

contract UniversalReceiverDelegate is ILSP1UniversalReceiverDelegate {
    mapping(address => bool) public isWhitelisted;

    function changeWhitelisting(address token, bool status) public {
        isWhitelisted[token] = status;
    }

    function universalReceiverDelegate(
        address sender,
        uint256 /*value*/,
        bytes32 typeId,
        bytes memory /*data*/
    ) public view returns (bytes memory) {
        if (
            typeId ==
            0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c
        ) {
            require(isWhitelisted[sender]);
        }

        return "";
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return interfaceId == type(ILSP1UniversalReceiverDelegate).interfaceId;
    }
}
