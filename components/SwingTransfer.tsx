import React, { useEffect } from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";
import TokenSelector from "components/transfer-steps/TokenSelector";
import QuoteSelector from "components/transfer-steps/QuoteSelector";
import TransferStatus from "components/transfer-steps/TransferStatus";
import Completion from "components/transfer-steps/Completion";

export type TransferStep = "SELECT_TOKEN" | "SELECT_QUOTE" | "TRANSFER_STATUS" | "COMPLETION";
const transferSteps: ReadonlyArray<TransferStep> = [
  "SELECT_TOKEN",
  "SELECT_QUOTE",
  "TRANSFER_STATUS",
  "COMPLETION",
];

export type Blockchain = "BLOCKCHAIN_POLYGON" | "BLOCKCHAIN_BSC";
export const BLOCKCHAIN_OPTIONS: ReadonlyArray<Blockchain> = [
  "BLOCKCHAIN_POLYGON",
  "BLOCKCHAIN_BSC",
];
export const BLOCKCHAIN_NAME = {
  BLOCKCHAIN_POLYGON: "Polygon",
  BLOCKCHAIN_BSC: "Binance Smart Chain",
};

export type TransferState = {
  step: TransferStep;
  sourceChain: Blockchain;
  sourceToken: string;
  destinationChain: Blockchain;
  destinationToken: string;
};
const initialState: TransferState = {
  step: "SELECT_TOKEN",
  sourceChain: "BLOCKCHAIN_POLYGON",
  sourceToken: "",
  destinationChain: "BLOCKCHAIN_BSC",
  destinationToken: "",
};

function SwingTransfer() {
  const [state, setState] = React.useState<TransferState>(initialState);

  const { step } = state;
  const setStep = (step: TransferStep) => setState((state) => ({ ...state, step }));
  const renderStep = (step: TransferStep) => {
    switch (step) {
      case "SELECT_TOKEN":
        return <TokenSelector state={state} setState={setState} />;
      case "SELECT_QUOTE":
        return <QuoteSelector state={state} setState={setState} />;
      case "TRANSFER_STATUS":
        return <TransferStatus state={state} setState={setState} />;
      case "COMPLETION":
        return <Completion state={state} setState={setState} />;
      default:
        return null;
    }
  };

  return (
    <div className={clsx(styles.swingTransfer)}>
      <h3>Swing Transfer Code Challenge</h3>

      <nav className={styles.stepsNav}>
        <ul>
          {transferSteps.map((stepName, index) => (
            <li key={stepName} className={clsx({ [styles.currentStep]: step === stepName })}>
              <button type="button" onClick={() => setStep(stepName)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {renderStep(step)}
    </div>
  );
}

export default SwingTransfer;
