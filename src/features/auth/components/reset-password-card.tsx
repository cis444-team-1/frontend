import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { useId } from "react";
import { NewPasswordInput } from "../../../components/form-inputs/new-password";
import { NewPasswordSchema } from "../schemas/auth-schemas";
import { z } from "zod";

export const ResetPasswordCard = ({
  className,
  email,
  ...props
}: {
  className?: string;
  email: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  const registerForm = useForm<z.infer<typeof NewPasswordSchema>>();
  const id = useId();

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    console.log(data);
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
              <p>Type in a new password for {email}</p>
            </div>

            <NewPasswordInput id={id} />

            <Button htmlType="submit" className="w-full" size="large">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>

      <div className={styles.disclaimer}>
        <a href="/auth/login">Back to Login</a>
      </div>
    </div>
  );
};
