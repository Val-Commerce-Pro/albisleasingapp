import styles from "./styles.module.css";

type Divider = {
  type: "main" | "section";
  title?: string;
};

export const Divider = ({ type = "section", title }: Divider) => {
  return (
    <div>
      {title && <h4 className={styles.sectionTitle}>{title}</h4>}
      <hr
        className={styles.base}
        style={{ backgroundColor: type === "main" ? "#282828" : "#7396dd" }}
      />
    </div>
  );
};
