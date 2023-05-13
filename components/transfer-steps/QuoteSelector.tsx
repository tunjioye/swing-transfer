import React from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";

function QuoteSelector() {
  return (
    <div className={clsx(styles.swingTransfer)}>
      <h4>Select Quote</h4>
    </div>
  );
}

export default QuoteSelector;
