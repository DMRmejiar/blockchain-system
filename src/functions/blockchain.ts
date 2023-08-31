import Block from '../types/block';
import Blockchain from '../types/blockchain';
import { adjustBalance } from '../utils/wallets';
import { buildBlock, calculateBlockHash, mineBlock } from './block';

export const getLastestBlock = (chain: Block[]): Block =>
  chain[chain.length - 1];

export const initBlockchain = (difficulty: number): Blockchain => {
  const blockchain = {
    difficulty,
    chain: [],
    lock: false,
  } as Blockchain;
  const genesisBlock = buildGenesisBlock(difficulty);
  blockchain.chain.push(genesisBlock);
  rewardMiner(genesisBlock);
  return blockchain;
}

export const addBlock = (blockchain: Blockchain, block: Block): void => {
  if (blockchain.lock) throw new Error('Blockchain is locked');
  blockchain.lock = true;
  const lastestBlock = getLastestBlock(blockchain.chain);
  if (
    !block.hash.startsWith('0'.repeat(blockchain.difficulty)) ||
    block.header.previousHash !== lastestBlock.hash ||
    block.hash !== calculateBlockHash(block.header)
  ) {
    blockchain.lock = false;
    throw new Error('Invalid block');
  }
  rewardMiner(block);
  blockchain.chain.push(block);
  blockchain.lock = false;
};

const buildGenesisBlock = (difficult: number): Block => {
  const genesisBlock = buildBlock({
    previousHash: '0',
    transactions: [],
  });
  mineBlock(genesisBlock, difficult);
  return genesisBlock;
};

const rewardMiner = (block: Block): void => {
  const coinbaseTransaction = block.body.transactions.find(
    (transaction) => transaction.coinbase
  );
  if (!coinbaseTransaction) throw new Error('Coinbase transaction not found');
  if (coinbaseTransaction.amount !== 6.25)
    throw new Error('Invalid coinbase transaction');
  adjustBalance(coinbaseTransaction.reciver, coinbaseTransaction.amount);
};
