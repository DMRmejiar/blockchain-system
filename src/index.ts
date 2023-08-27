import { buildGenesisBlock } from './functions/block';
import Blockchain from './types/blockchain';

const difficulty = 2;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blockchain = {
  difficulty,
  chain: [buildGenesisBlock(difficulty)],
} as Blockchain;
