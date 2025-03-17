import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { NewPasswordInput } from "../../../components/form-inputs/new-password";
import { NewPasswordSchema } from "../schemas/auth-schemas";
import { z } from "zod";
import { useUpdatePassword } from "../../../api/auth";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert/alert";
import { CircleCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "../../../hooks/session-hook";

export const ResetPasswordCard = ({
  className,
  ...props
}: {
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  const registerForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const updatePassword = useUpdatePassword();
  const { session } = useSession();

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    updatePassword.mutate({ password: data.password });
  };

  return (
    <div className={clsx(styles.modal, className)} {...props}>
      <div className={styles.card}>
        <Form {...registerForm}>
          <form
            className={styles.form}
            onSubmit={registerForm.handleSubmit(onSubmit)}
          >
            <div className={styles.formHeader}>
              <h1>Reset your password</h1>
              <p>Type in a new password for {session?.user.email}</p>
            </div>

            {updatePassword.isSuccess && (
              <Alert variant="success">
                <CircleCheck />
                <AlertTitle>Password Reset</AlertTitle>
                <AlertDescription>
                  Your password has been reset for {session?.user.email}
                </AlertDescription>
              </Alert>
            )}

            {updatePassword.isError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {String(updatePassword.error)}
                </AlertDescription>
              </Alert>
            )}

            <NewPasswordInput />

            <Button
              htmlType="submit"
              className="w-full"
              size="large"
              loading={updatePassword.isPending}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>

      <div className={styles.disclaimer}>
        <a href="/">Back to home</a>
      </div>
    </div>
  );
};
