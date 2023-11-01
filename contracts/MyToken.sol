// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import {LSP7DigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract MyToken is LSP7DigitalAsset {
    constructor() LSP7DigitalAsset("Token", "TKN", msg.sender, false) {}

    function mint(address recipient) public {
        _mint(recipient, 10, true, "");
    }
}
