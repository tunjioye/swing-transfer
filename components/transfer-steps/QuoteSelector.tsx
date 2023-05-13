import React from "react";
import styles from "src/style/swingTransfer.module.scss";
import clsx from "clsx";
import { TransferState } from "components/SwingTransfer";

type Props = {
  readonly state: TransferState;
  readonly setState: React.Dispatch<React.SetStateAction<TransferState>>;
}

function QuoteSelector(props: Props) {
  return (
    <section className={clsx(styles.swingTransfer)}>
      <h4>Select Quote</h4>
    </section>
  );
}

export default QuoteSelector;
