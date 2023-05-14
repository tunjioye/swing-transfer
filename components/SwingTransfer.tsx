import React, { useEffect } from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";
import TokenSelector from "components/transfer-steps/TokenSelector";
import QuoteSelector from "components/transfer-steps/QuoteSelector";
import TransferStatus from "components/transfer-steps/TransferStatus";
import Completion from "components/transfer-steps/Completion";
import swingSDK from "@/utils/swingSDK";
import { transfer, getConfig, TransferStep, setTransferState } from "@/store/transfer";

const transferSteps: ReadonlyArray<TransferStep> = [
  "SELECT_TOKEN",
  "SELECT_QUOTE",
  "TRANSFER_STATUS",
  "COMPLETION",
];

function SwingTransfer() {
  const { step, configIsSet } = transfer.use();

  useEffect(() => {
    getConfig();
  }, []);
  console.log("swingSDK", swingSDK);

  const renderStep = (step: TransferStep) => {
    switch (step) {
      case "SELECT_TOKEN":
        return <TokenSelector />;
      case "SELECT_QUOTE":
        return <QuoteSelector />;
      case "TRANSFER_STATUS":
        return <TransferStatus />;
      case "COMPLETION":
        return <Completion />;
      default:
        return null;
    }
  };

  if (!configIsSet) return null;

  return (
    <div className={clsx(styles.swingTransfer)}>
      <h3>Swing Transfer Code Challenge</h3>

      <nav className={styles.stepsNav}>
        <ul>
          {transferSteps.map((stepName, index) => (
            <li key={stepName} className={clsx({ [styles.currentStep]: step === stepName })}>
              <button type="button" onClick={() => setTransferState({ step: stepName })}>
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
