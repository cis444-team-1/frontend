import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { useId } from "react";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { z } from "zod";
import { ForgotPasswordSchema } from "../schemas/auth-schemas";

export const ForgotPasswordCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const registerForm = useForm<z.infer<typeof ForgotPasswordSchema>>();
  const id = useId();

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
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
              <h1>Forgot Password?</h1>
              <p>
                Type in your email and we'll send you a link to reset your
                password
              </p>
            </div>

            <SimpleFormInput
              id={id}
              name="email"
              label="Email"
              placeholder="m@example.com"
              required
            />

            <Button htmlType="submit" className="w-full" size="large">
              Send Reset Email
            </Button>
          </form>
        </Form>
      </div>

      <div className={styles.disclaimer}>
        Already have an account? <a href="/auth/login">Login</a>
      </div>
    </div>
  );
};
