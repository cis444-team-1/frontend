import styles from "./card.module.css";

export const AnalyticsCard = ({
  label,
  value,
  sublabel,
  icon,
  color,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconCircle} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className={styles.cardText}>
        <p>{label}</p>
        <h1>{value}</h1>
        <h2>{sublabel}</h2>
      </div>
    </div>
  );
};
