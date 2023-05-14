import { entity } from "simpler-state";
import { BlockchainSlug, Chain, SwingApiError } from "@/schema/types";
import toast from "react-hot-toast";
import swingSDK from "@/utils/swingSDK";
import { publicRuntimeConfig } from "@/config";

export type TransferStep = "SELECT_TOKEN" | "SELECT_QUOTE" | "TRANSFER_STATUS" | "COMPLETION";

export type TransferState = {
  connectingWallet: boolean;
  configIsSet: boolean;
  chains: ReadonlyArray<Chain>;
  step: TransferStep;
  sourceChain: BlockchainSlug;
  sourceToken: string;
  destinationChain: BlockchainSlug;
  destinationToken: string;
  amount: string;
  gettingQuotes: boolean;
};

// initial state
const initialState: TransferState = {
  connectingWallet: false,
  configIsSet: false,
  chains: [],
  step: "SELECT_TOKEN",
  sourceChain: "polygon",
  sourceToken: "USDC",
  destinationChain: "bsc",
  destinationToken: "USDC",
  amount: "",
  gettingQuotes: false,
};

// entity
export const transfer = entity(initialState);

// entity updaters
export const setTransferState = (value: Partial<TransferState> = initialState) => {
  return transfer.set((state) => ({
    ...state,
    ...value,
  }));
};

// entity actions
export const getConfig = async () => {
  const { configIsSet } = transfer.get();
  if (configIsSet) return;

  try {
    const { data } = await swingSDK.api["v0.transfer.getConfig"]();
    setTransferState({ chains: data.chains as ReadonlyArray<Chain> });
    setTransferState({ configIsSet: true });
  } catch (error) {
    console.error(error);
  }
};

export const connectWallet = async () => {
  try {
    setTransferState({ connectingWallet: true });
    const res = await swingSDK.wallet.connect("metamask", "ethereum");
    console.log("connect wallet res", res);
  } catch (error) {
    handleSwingApiError(error as SwingApiError);
  } finally {
    setTransferState({ connectingWallet: false });
  }
};

export const getQuotes = async () => {
  const { sourceChain, sourceToken, destinationChain, destinationToken, amount } = transfer.get();
  try {
    setTransferState({ gettingQuotes: true });
    // @ts-ignore
    const { data } = await swingSDK.api["v0.transfer.getQuote"]({
      tokenSymbol: sourceToken,
      toTokenSymbol: destinationToken,
      tokenAmount: amount,
      fromTokenAddress: "",
      fromChain: sourceChain,
      fromChainId: "",
      toChain: destinationChain,
      toChainId: "",
      fromUserAddress: "",
      // maxSlippage?: "",
      // toUserAddress?: "",
      projectId: publicRuntimeConfig.SWING_PROJECT_ID,
      toTokenAddress: "",
    });

    console.log("data", data);
  } catch (error) {
    handleSwingApiError(error as SwingApiError);
  } finally {
    setTransferState({ gettingQuotes: false });
  }
};

const handleSwingApiError = (error: SwingApiError) => {
  const { message } = error?.response?.data || {};
  if (message && message[0]) toast.error(message[0]);
};
