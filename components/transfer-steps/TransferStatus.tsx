import React from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";

function TransferStatus() {
  return (
    <section className={clsx(styles.swingTransfer)}>
      <h4>Transfer Status</h4>
    </section>
  );
}

export default TransferStatus;
