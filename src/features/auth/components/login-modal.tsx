import clsx from "clsx";
import styles from "./modal.module.css";
import { Button } from "../../../components/button/button";
import { GoogleIcon } from "./google-icon";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/form/form";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { PasswordFormInput } from "../../../components/form-inputs/password-input";
import { LoginSchema } from "../schemas/auth-schemas";
import { z } from "zod";
import { useLogin } from "../../../api/auth";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert/alert";
import { AlertCircle } from "lucide-react";
import { useTheme } from "../../../hooks/theme";

export const LoginModal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useLogin();
  const { theme } = useTheme();

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    login.mutate(values);
  };

  // const signInWithGoogle = () => {
  //   supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  // };

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

              {login.isError && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>Login failed</AlertTitle>
                  <AlertDescription>{String(login.error)}</AlertDescription>
                </Alert>
              )}

              <SimpleFormInput
                name="email"
                label="Email"
                placeholder="Enter your email address"
              />

              <PasswordFormInput
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <Button
                htmlType="submit"
                className="w-full"
                size="large"
                loading={login.isPending}
              >
                Login
              </Button>

              <div className={styles.divider}>
                <span>Or continue with</span>
              </div>

              <Button
                icon={<GoogleIcon />}
                type="outline"
                size="large"
                onClick={() => {
                  toast.error("Not implemented yet");
                }}
              >
                Continue with Google
              </Button>

              <div className={styles.formFooter}>
                Don&apos;t have an account? <a href="/auth/register">Sign up</a>
              </div>
            </form>
          </Form>

          <div className={styles.imageContainer}>
            <img
              src={theme === "dark" ? "/4-dark.png" : "/4.png"}
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
