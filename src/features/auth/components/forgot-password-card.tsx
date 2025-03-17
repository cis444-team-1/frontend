import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { z } from "zod";
import { ForgotPasswordSchema } from "../schemas/auth-schemas";
import { useSendPasswordResetEmail } from "../../../api/auth";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert/alert";
import { AlertCircle, CircleCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

export const ForgotPasswordCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const registerForm = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const sendPasswordResetEmail = useSendPasswordResetEmail();

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    sendPasswordResetEmail.mutate({ email: data.email });
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

            {sendPasswordResetEmail.isError && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Could not send email.</AlertTitle>
                <AlertDescription>
                  {String(sendPasswordResetEmail.error)}
                </AlertDescription>
              </Alert>
            )}

            {sendPasswordResetEmail.isSuccess && (
              <Alert variant="success">
                <CircleCheck />
                <AlertTitle>Email sent!</AlertTitle>
                <AlertDescription>
                  Sent password reset email to {registerForm.watch("email")}
                </AlertDescription>
              </Alert>
            )}

            <SimpleFormInput
              name="email"
              label="Email"
              placeholder="Enter your email address"
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
