// import { Filter } from "lucide-react";
// import { Button } from "../../../components/button/button";
import styles from "../styles/filters.module.css";
import Badge from "../../../components/badge/badge";

export const Filters = () => {
  return (
    <div className={styles.container}>
      <Badge
        label="public"
        onClick={() => {}}
        size="small"
        borderRadius={999}
      />
      <Badge
        label="private"
        onClick={() => {}}
        size="small"
        borderRadius={999}
      />
      <Badge
        label="not mine"
        onClick={() => {}}
        size="small"
        borderRadius={999}
      />
      {/* <Button
        icon={<Filter />}
        type="text"
        size="tiny"
        className={styles.filterButton}
      /> */}
    </div>
  );
};

export default Filters;
