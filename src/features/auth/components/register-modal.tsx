import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
// import { GoogleIcon } from "./google-icon";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { NewPasswordInput } from "../../../components/form-inputs/new-password";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { RegisterSchema } from "../schemas/auth-schemas";
import { z } from "zod";
import { useRegister } from "../../../api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert/alert";
import { AlertCircle, CircleCheck } from "lucide-react";
import { useTheme } from "../../../hooks/theme";

export const RegisterModal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const register = useRegister();
  const { theme } = useTheme();

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    register.mutate(values);
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

              {register.isError && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>Could not create your account.</AlertTitle>
                  <AlertDescription>{String(register.error)}</AlertDescription>
                </Alert>
              )}

              {register.isSuccess && (
                <Alert variant="success">
                  <CircleCheck />
                  <AlertTitle>Email verification sent</AlertTitle>
                  <AlertDescription>
                    Sucessfully created your account. Please verify the email
                    sent to {register.data}
                  </AlertDescription>
                </Alert>
              )}

              <SimpleFormInput
                name="email"
                label="Email"
                placeholder="Enter your email address"
                required
              />

              <NewPasswordInput />

              <Button
                htmlType="submit"
                className="w-full"
                size="large"
                loading={register.isPending}
              >
                Sign Up
              </Button>

              {/* <div className={styles.divider}>
                <span>Or continue with</span>
              </div>

              <Button icon={<GoogleIcon />} type="outline" size="large">
                Continue with Google
              </Button> */}

              <div className={styles.formFooter}>
                Already have an account? <a href="/auth/login">Login</a>
              </div>
            </form>
          </Form>

          <div className={styles.imageContainer}>
            <img
              src={theme === "dark" ? "/1-dark.png" : "/1.png"}
              alt="Image"
            />
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
