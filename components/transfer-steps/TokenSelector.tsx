import React, { FormEvent, useEffect, useMemo } from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";
import { transfer, setTransferState, getQuotes } from "@/store/transfer";
import { BlockchainSlug } from "@/schema/types";

type Token = {
  readonly symbol: string;
  readonly address: string;
};

export const BLOCKCHAIN_SLUG_OPTIONS: ReadonlyArray<BlockchainSlug> = ["polygon", "bsc"];

function TokenSelector() {
  const {
    chains = [],
    sourceChain,
    sourceToken,
    destinationChain,
    destinationToken,
    amount,
    gettingQuotes,
  } = transfer.use();
  const formatOnInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const formattedValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\.[0-9]{1})./g, "$1");
    target.value = formattedValue;
  };

  console.log("chains", chains);
  const supportedChains = useMemo(() => {
    return chains.filter((chain) => BLOCKCHAIN_SLUG_OPTIONS.includes(chain.slug));
  }, [chains]);
  const sourceTokenOptions: ReadonlyArray<Token> = useMemo(() => {
    return supportedChains.find((chain) => chain.slug === sourceChain)?.tokens || [];
  }, [supportedChains, sourceChain]);
  const destinationTokenOptions: ReadonlyArray<Token> = useMemo(() => {
    return supportedChains.find((chain) => chain.slug === destinationChain)?.tokens || [];
  }, [supportedChains, destinationChain]);

  // Reset destination token when destination chain changes
  useEffect(() => {
    const tokenOptions: ReadonlyArray<Token> =
      supportedChains.find((chain) => chain.slug === destinationChain)?.tokens || [];
    const currentTokenIsSupported = tokenOptions.some(({ symbol }) => symbol === destinationToken);
    if (currentTokenIsSupported) return;

    setTransferState({ destinationToken: "" });
  }, [destinationChain, destinationToken, supportedChains]);

  return (
    <section className={clsx(styles.swingTransfer)}>
      <h4>Select Token</h4>
      <div className={clsx(styles.tokenSelector)}>
        <div>
          <div>Source</div>
          <div className={styles.inputCombo}>
            <input
              type="text"
              placeholder="0.0"
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                setTransferState({
                  amount: e.target.value,
                });
              }}
              onInput={formatOnInput}
            />
            <div className={styles.unit}>units in WEI</div>
            <select
              disabled
              value={sourceChain}
              className={styles.addonTopRight}
              onChange={(e) => {
                setTransferState({
                  sourceChain: e.target.value as BlockchainSlug,
                });
              }}
            >
              <option disabled>Select blockchain</option>
              {supportedChains.map(({ slug, name }) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
            <select
              disabled
              value={sourceToken}
              className={styles.addonBottomRight}
              onChange={(e) => {
                setTransferState({
                  sourceToken: e.target.value,
                });
              }}
            >
              <option value="">Select token</option>
              {sourceTokenOptions.map(({ symbol, address }) => (
                <option key={address} value={symbol}>
                  {symbol}
                </option>
              ))}
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
                setTransferState({
                  destinationChain: e.target.value as BlockchainSlug,
                });
              }}
            >
              <option disabled>Select blockchain</option>
              {supportedChains.map(({ slug, name }) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={destinationToken}
              className={styles.addonBottomRight}
              onChange={(e) => {
                setTransferState({
                  destinationToken: e.target.value,
                });
              }}
            >
              <option value="">Select token</option>
              {destinationTokenOptions.map(({ symbol, address }) => (
                <option key={address} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <button type="submit" onClick={getQuotes} aria-busy={gettingQuotes}>
          {!gettingQuotes && <span>Get Quote</span>}
        </button>
      </div>
    </section>
  );
}

export default TokenSelector;
