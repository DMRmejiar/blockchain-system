import Transaction from '../types/transaction';
import Wallet from '../types/wallet';

const WALLETS = [
  {
    address: '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601',
    balance: 0,
  },
  {
    address: '0x0000',
    balance: 2.125,
  },
  {
    address: '0x0001',
    balance: 0.125,
  },
] as Array<Wallet>;

export const getWalletBalance = (address: string): number => {
    const wallet = WALLETS.find((wallet) => wallet.address === address);
    if (!wallet) throw new Error('Wallet not found');
    return wallet.balance;
};

export const checkWallet = (address: string): void => {
  const wallet = WALLETS.find((wallet) => wallet.address === address);
  if (!wallet) throw new Error('Wallet not found');
};

export const checkWalletBalance = (address: string, amount: number): void => {
  const wallet = WALLETS.find((wallet) => wallet.address === address);
  if (!wallet) throw new Error('Wallet not found');
  if (wallet.balance < amount) throw new Error('Insufficient funds');
};

export const adjustBalance = (address: string, amount: number): void => {
  const wallet = WALLETS.find((wallet) => wallet.address === address);
  if (!wallet) throw new Error('Wallet not found');
  wallet.balance += amount;
};

/* Not used but depends the moment when adjust the balance of a transaction */
export const checkWalletBalanceStack = (
  transactions: Array<Transaction>
): void => {
  const wallets = [
    ...new Set([
      ...transactions.map((transaction) => transaction.sender),
      ...transactions.map((transaction) => transaction.reciver),
    ]),
  ];
  const walletBalances = wallets.map((wallet) => {
    const balance = WALLETS.find((w) => w.address === wallet)?.balance;
    return { wallet, balance };
  });
  const walletBalanceErrors = walletBalances.filter(
    (wallet) => wallet.balance === undefined
  );
  if (walletBalanceErrors.length > 0) throw new Error('Wallet not found');
  const walletBalanceInsufficient = walletBalances.filter(
    (wallet) => wallet.balance < 0
  );
  if (walletBalanceInsufficient.length > 0)
    throw new Error('Insufficient funds');
  return;
};
