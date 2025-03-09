import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { GoogleIcon } from "./google-icon";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { Form } from "../../../components/form/form";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { PasswordFormInput } from "../../../components/form-inputs/password-input";
import { LoginSchema } from "../schemas/auth-schemas";
import { z } from "zod";

export const LoginModal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const loginForm = useForm<z.infer<typeof LoginSchema>>();
  const id = useId();

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
  };

  return (
    <div className={clsx(styles.modal, className)} {...props}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Form {...loginForm}>
            <form
              className={styles.form}
              onSubmit={loginForm.handleSubmit(onSubmit)}
            >
              <div className={styles.formHeader}>
                <h1>Welcome back</h1>
                <p>Login to your Melo account</p>
              </div>

              <SimpleFormInput
                id={id}
                name="email"
                label="Email"
                placeholder="m@example.com"
              />

              <PasswordFormInput
                id={id}
                name="password"
                label="Password"
                placeholder="••••••••"
              />

              <Button htmlType="submit" className="w-full" size="large">
                Login
              </Button>

              <div className={styles.divider}>
                <span>Or continue with</span>
              </div>

              <Button icon={<GoogleIcon />} type="outline" size="large">
                Continue with Google
              </Button>

              <div className={styles.formFooter}>
                Don&apos;t have an account? <a href="/auth/register">Sign up</a>
              </div>
            </form>
          </Form>

          <div className={styles.imageContainer}>
            <img src="/placeholder.svg" alt="Image" />
          </div>
        </div>
      </div>

      <div className={styles.disclaimer}>
        By clicking continue, you agree to our{" "}
        <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  );
};
