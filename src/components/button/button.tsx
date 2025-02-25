import clsx from "clsx";
import styles from "./button.module.css";
import "@/index.css";

const Button = () => {
  return <button className={clsx(styles.example, "global-btn")}>Button</button>;
};

export default Button;
