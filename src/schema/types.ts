export type BlockchainSlug = "polygon" | "bsc";

export type Token = {
  address: string;
  symbol: string;
};

export type Chain = {
  slug: BlockchainSlug;
  name: string;
  tokens: Token[];
};

export type SwingApiError = {
  response: {
    data: {
      message: string[];
    };
  };
};
