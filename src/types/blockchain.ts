import Block from './block';

type Blockchain = {
  difficulty: number;
  chain: Block[];
};

export default Blockchain;
