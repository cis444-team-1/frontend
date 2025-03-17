import clsx from "clsx";
import styles from "./modal.module.css";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert/alert";
import { CheckCircle } from "lucide-react";
import { useSession } from "../../../hooks/session-hook";
import { Navigate } from "react-router";

export const VerifyEmailCard = ({
  className,
  ...props
}: {
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={clsx(styles.modal, className)} {...props}>
      <Alert variant="success">
        <CheckCircle />
        <AlertTitle>Your email has been verified</AlertTitle>
        <AlertDescription>
          Welcome to Melo, {session?.user.email}. You can now personalize your
          musical journey.
        </AlertDescription>
      </Alert>

      <div className={styles.disclaimer}>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
};
