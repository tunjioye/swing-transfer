import React from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";

function TokenSelector() {
  return (
    <div className={clsx(styles.swingTransfer)}>
      <h4>Select Token</h4>
    </div>
  );
}

export default TokenSelector;
