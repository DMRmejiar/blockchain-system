import Block from '../types/block';

export const getLastestBlock = (chain: Block[]): Block =>
  chain[chain.length - 1];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addBlock = (_chain: Block[], _block: Block): void => {};
