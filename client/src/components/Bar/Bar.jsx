import React from 'react';
import styles from './bar.module.css';

export function Bar({ label, percentage, maxWidth }) {
  const minWidth = 100;
  const calculatedWidth = percentage * maxWidth * 5;
  const width = percentage > 0 ? Math.max(calculatedWidth, minWidth) : minWidth;

  return (
    <div className={styles.wrapper}>
      <p className={styles.barLabel}>{label}:</p>
      <div
        className={styles.bar}
        style={{
          width: `${width}px`,
          height: '40px',
          backgroundColor: 'lightblue',
        }}
      >
        {(percentage * 100).toFixed(2)}%
      </div>
    </div>
  );
}
