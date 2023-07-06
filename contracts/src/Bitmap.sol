// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {ERC721A} from "./lib/ERC721A.sol";
import {BitPackedMap} from "./lib/BitPackedMap.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

error Bitmap_FailedTransfer();

contract Bitmap is ERC721A, BitPackedMap, Ownable {
    string public s_baseURI;

    constructor() ERC721A("BitmapArt", "BA") {}

    /// @param  _bitmapHex 32 byte value containing all bitmap data.
    function mint(bytes32 _bitmapHex) external payable {
        bitmaps[_currentIndex] = _bitmapHex;
        _safeMint(msg.sender, 1);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseURI;
    }

    function updateBaseURI(string memory _newBaseURI) external onlyOwner {
        s_baseURI = _newBaseURI;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");

        if (!success) revert Bitmap_FailedTransfer();
    }
}
