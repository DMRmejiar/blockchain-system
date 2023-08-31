import { buildBlock, mineBlock } from './functions/block';
import { addBlock, getLastestBlock, initBlockchain } from './functions/blockchain';
import { createTransaction } from './functions/transaction';
import { getWalletBalance } from './utils/wallets';

const blockchain = initBlockchain(4);

console.log('Initial state');
console.log({
  lasBlockHeader: getLastestBlock(blockchain.chain).header,
  minerWallerBalance: getWalletBalance(
    '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601'
  ),
  wallet0Balance: getWalletBalance('0x0000'),
  wallet1Balance: getWalletBalance('0x0001'),
});

const transactions = [
  createTransaction({
    sender: '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601',
    reciver: '0x0000',
    amount: 1,
  }),
  createTransaction({
    sender: '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601',
    reciver: '0x0001',
    amount: 1,
  }),
  createTransaction({
    sender: '0x0000',
    reciver: '0x0001',
    amount: 0.125,
  }),
  createTransaction({
    sender: '0x0000',
    reciver: '0x0001',
    amount: 1.02,
  }),
  createTransaction({
    sender: '0x0001',
    reciver: '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601',
    amount: 0.02,
  }),
];

const myBlock = buildBlock({
  previousHash: getLastestBlock(blockchain.chain).hash,
  transactions: transactions,
  timestamp: Date.now(),
});

mineBlock(myBlock, blockchain.difficulty);

addBlock(blockchain, myBlock);

console.log('After mining');
console.log({
  lastBlockHash: getLastestBlock(blockchain.chain).hash,
  lasBlockHeader: getLastestBlock(blockchain.chain).header,
  minerWallerBalance: getWalletBalance(
    '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601'
  ),
  wallet0Balance: getWalletBalance('0x0000'),
  wallet1Balance: getWalletBalance('0x0001'),
});
