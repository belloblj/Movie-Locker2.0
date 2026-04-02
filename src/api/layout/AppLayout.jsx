import styles from "./AppLayout.module.css";

function AppLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default AppLayout;