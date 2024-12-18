import { FC, PropsWithChildren } from 'react';
import styles from './pageLayout.module.css';
import Footer from '../Footer/Footer';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}

      <Footer />
    </div>
  );
};
