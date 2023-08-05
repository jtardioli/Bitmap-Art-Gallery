// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Bitmap} from "../Bitmap.sol";

contract DeployBitmap is Script {
    function run() external returns (Bitmap) {
        vm.startBroadcast();
        Bitmap bitmap = new Bitmap();
        vm.stopBroadcast();
        return bitmap;
    }
}
