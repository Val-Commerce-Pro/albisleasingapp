import styles from "./styles.module.css";

type Label = {
  label: string;
  htmlFor?: string;
};
export const Label = ({ label, htmlFor }: Label) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {label}
    </label>
  );
};
