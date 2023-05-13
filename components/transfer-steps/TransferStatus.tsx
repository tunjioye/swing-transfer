import React from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";

function TransferStatus() {
  return (
    <div className={clsx(styles.swingTransfer)}>
      <h4>Transfer Status</h4>
    </div>
  );
}

export default TransferStatus;
