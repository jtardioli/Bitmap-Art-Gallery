// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {IERC721Receiver} from "openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";

import {Bitmap} from "../src/Bitmap.sol";

contract BitmapTest is IERC721Receiver, Test {
    Bitmap bitmap;

    bytes32 constant BITMAP_HEX = 0x00;
    string constant BASE_URI = "https://ethereum.stackexchange.com/";

    function setUp() public {
        bitmap = new Bitmap();
    }

    function testUpdateBaseURI() public {
        bitmap.updateBaseURI(BASE_URI);
        assertEq(BASE_URI, bitmap.s_baseURI());
    }

    function testupdateBaseURINotOwner() public {
        vm.expectRevert(bytes("Ownable: caller is not the owner"));
        vm.prank(address(1));
        bitmap.updateBaseURI(BASE_URI);
    }

    function testTokenURI() public {
        bitmap.updateBaseURI(BASE_URI);
        bitmap.mint(BITMAP_HEX);

        string memory baseURIWithTokenURI = string(
            abi.encodePacked(bitmap.s_baseURI(), "0")
        );
        assertEq(bitmap.tokenURI(0), baseURIWithTokenURI);
    }

    function testWithdrawNotOwner() public {
        vm.expectRevert(bytes("Ownable: caller is not the owner"));
        vm.prank(address(1));
        bitmap.withdraw();
    }

    function testMint() public {
        assertEq(bitmap.balanceOf(address(this)), 0);
        bitmap.mint(BITMAP_HEX);
        assertEq(bitmap.balanceOf(address(this)), 1);
        assertEq(bitmap.ownerOf(0), address(this));
    }

    /* 
     Although the NFT is free make sure I can withdraw in case fallback() or recieve are activate() 
    */
    function testWithdraw() public {
        uint256 sentAmount = 100 ether;
        deal(address(bitmap), sentAmount);

        uint256 balanceBefore = address(this).balance;
        bitmap.withdraw();
        uint256 balanceAfter = address(this).balance;

        assertEq(balanceAfter - balanceBefore, sentAmount);
    }

    /* 
        Contract must be IERC721Receiver so that the test contract is able to mint
        Otherwise you will
    */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    fallback() external payable {}

    receive() external payable {}
}
