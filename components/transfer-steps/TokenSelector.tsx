import React, { FormEvent } from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";
import {
  BLOCKCHAIN_NAME,
  BLOCKCHAIN_OPTIONS,
  Blockchain,
  TransferState,
} from "components/SwingTransfer";

type Props = {
  readonly state: TransferState;
  readonly setState: React.Dispatch<React.SetStateAction<TransferState>>;
};

function TokenSelector(props: Props) {
  const { state, setState } = props;
  const { sourceChain, sourceToken, destinationChain, destinationToken } = state;
  const formatOnInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const formattedValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\.[0-9]{1})./g, "$1");
    target.value = formattedValue;
  };

  return (
    <section className={clsx(styles.swingTransfer)}>
      <h4>Select Token</h4>
      <div className={clsx(styles.tokenSelector)}>
        <div>
          <div>Source</div>
          <div className={styles.inputCombo}>
            <input type="text" placeholder="0.0" inputMode="numeric" onInput={formatOnInput} />
            <div className={styles.unit}>units in WEI</div>
            <select
              value={sourceChain}
              className={styles.addonTopRight}
              onChange={(e) => {
                setState({
                  ...state,
                  sourceChain: e.target.value as Blockchain,
                });
              }}
            >
              <option disabled>Select blockchain</option>
              {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                <option key={blockchain} value={blockchain}>
                  {BLOCKCHAIN_NAME[blockchain]}
                </option>
              ))}
            </select>
            <select
              value={sourceToken}
              className={styles.addonBottomRight}
              onChange={(e) => {
                setState({
                  ...state,
                  sourceToken: e.target.value,
                });
              }}
            >
              <option value="">Select token</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="MATIC">MATIC</option>
              <option value="BNB">BNB</option>
            </select>
          </div>
        </div>
        <div style={{ margin: "5px 0" }}>---</div>
        <div>
          <div>Destination</div>
          <div className={styles.inputCombo}>
            <input type="text" placeholder="0" readOnly />
            <div className={styles.unit}>units in WEI</div>
            <select
              value={destinationChain}
              className={styles.addonTopRight}
              onChange={(e) => {
                setState({
                  ...state,
                  destinationChain: e.target.value as Blockchain,
                });
              }}
            >
              <option disabled>Select blockchain</option>
              {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                <option key={blockchain} value={blockchain}>
                  {BLOCKCHAIN_NAME[blockchain]}
                </option>
              ))}
            </select>
            <select
              value={destinationToken}
              className={styles.addonBottomRight}
              onChange={(e) => {
                setState({
                  ...state,
                  destinationToken: e.target.value,
                });
              }}
            >
              <option value="">Select token</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="MATIC">MATIC</option>
              <option value="BNB">BNB</option>
            </select>
          </div>
        </div>
        <br />
        <button type="submit">Get Quotes</button>
      </div>
    </section>
  );
}

export default TokenSelector;
