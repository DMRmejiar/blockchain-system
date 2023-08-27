import Transaction from '../types/transaction';
import { SHA256 } from 'crypto-js';
import { calculateTransactionHash } from '../functions/transaction';

export const calculateHash = (
  message: string,
  hex: boolean = false
): string => {
  const hash = SHA256(message);
  return hex ? hash.toString(CryptoJS.enc.Hex) : hash.toString();
};

export const calculateHashRoot = (transactions: Transaction[]): string => {
  const hashes = transactions.map((transaction) =>
    calculateTransactionHash(transaction)
  );
  return calculateMerkleRoot(hashes);
};

const calculateMerkleRoot = (hashes: string[]): string => {
  if (hashes.length === 1) return hashes[0];
  const newHashes = [];
  for (let i = 0; i < hashes.length; i += 2) {
    const hash1 = hashes[i];
    const hash2 = i + 1 === hashes.length ? hash1 : hashes[i + 1];
    newHashes.push(calculateHash(hash1 + hash2));
  }
  return calculateMerkleRoot(newHashes);
};
