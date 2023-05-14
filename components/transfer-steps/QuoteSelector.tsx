import React from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";

function QuoteSelector() {
  return (
    <section className={clsx(styles.swingTransfer)}>
      <h4>Select Quote</h4>
    </section>
  );
}

export default QuoteSelector;
