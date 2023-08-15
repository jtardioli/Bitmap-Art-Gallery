-include .env

build:
	forge build

deploy:
	forge script src/scripts/DeployBitmap.s.sol:DeployBitmap \
	--rpc-url http://localhost:8545 \
	--broadcast \
	--private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

deploy-sepolia:
	forge script src/scripts/DeployBitmap.s.sol:DeployBitmap \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--broadcast \
	--verify \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	-vvvv

deploy-optimism:
	forge script src/scripts/DeployBitmap.s.sol:DeployBitmap \
	--rpc-url $(OPTIMISM_RPC_URL) \
	--broadcast \
	--verify \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(OPTIMISM_API_KEY) \
	-vvvv 

deploy-base:
	forge script src/scripts/DeployBitmap.s.sol:DeployBitmap \
	--rpc-url $(BASE_RPC_URL) \
	--broadcast \
	--verify \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(BASE_API_KEY) \
	-vvvv 
