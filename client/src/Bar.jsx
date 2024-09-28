import React from 'react';
import styles from './bar.module.css';
export function Bar({ label, percentage, maxWidth }) {
  const width = percentage > 0 ? percentage * maxWidth + 1 : 30;

  return (
    <div className={styles.wrapper}>
      <p className={styles.barLabel}>{label}:</p>
      <div
        className={styles.bar}
        style={{
          width: width ? `${width}px` : 'max-content',
          height: '40px',
          backgroundColor: 'lightblue',
        }}
      >
        {(percentage * 100).toFixed(percentage > 0 ? 5 : 0)}%
      </div>
    </div>
  );
}
