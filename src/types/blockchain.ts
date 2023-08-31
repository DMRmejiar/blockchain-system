import Block from './block';

type Blockchain = {
  difficulty: number;
  chain: Block[];
  lock: boolean;
};

export default Blockchain;
