import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { GoogleIcon } from "./google-icon";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { NewPasswordInput } from "../../../components/form-inputs/new-password";
import { useId } from "react";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { RegisterSchema } from "../schemas/auth-schemas";
import { z } from "zod";

export const RegisterModal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const registerForm = useForm<z.infer<typeof RegisterSchema>>();
  const id = useId();

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    console.log(data);
  };

  return (
    <div className={clsx(styles.modal, className)} {...props}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Form {...registerForm}>
            <form
              className={styles.form}
              onSubmit={registerForm.handleSubmit(onSubmit)}
            >
              <div className={styles.formHeader}>
                <h1>Registration</h1>
                <p>Create your Melo account</p>
              </div>

              <SimpleFormInput
                id={id}
                name="email"
                label="Email"
                placeholder="m@example.com"
                required
              />

              <NewPasswordInput id={id} />

              <Button htmlType="submit" className="w-full" size="large">
                Sign Up
              </Button>

              <div className={styles.divider}>
                <span>Or continue with</span>
              </div>

              <Button icon={<GoogleIcon />} type="outline" size="large">
                Continue with Google
              </Button>

              <div className={styles.formFooter}>
                Already have an account? <a href="/auth/login">Login</a>
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
