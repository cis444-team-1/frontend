import clsx from "clsx";
import styles from "./modal.module.css";
import { Loader2 } from "lucide-react";

export const VerifyEmailCard = ({
  className,
  email,
  ...props
}: {
  className?: string;
  email: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  return (
    <div className={clsx(styles.modal, className)} {...props}>
      <div className={styles.card}>
        <div className={styles.formHeader}>
          <h1>Verifying Email</h1>
          <p>Give us a second while we verify {email}</p>
        </div>

        {/* TODO: ADD NOTIFICATION BASED ON VERIFICATION STATUS */}
        <div>
          <Loader2 />
        </div>
      </div>

      <div className={styles.disclaimer}>
        <a href="/auth/login">Back to Login</a>
      </div>
    </div>
  );
};
