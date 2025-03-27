import { useForm } from "react-hook-form";
import { ModalData } from "../../../context/modal-context";
import { Button } from "../../button/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";
import { PasswordFormInput } from "../../form-inputs/password-input";
import { SimpleFormInput } from "../../form-inputs/simple-form-input";
import { Form } from "../../form/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "../styles/modal.module.css";
// import { Alert, AlertDescription, AlertTitle } from "../../alert/alert";
// import { AlertCircleIcon } from "lucide-react";

const NewUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const AddUser = ({ data = null }: { data: ModalData | null }) => {
  const form = useForm<z.infer<typeof NewUserSchema>>({
    resolver: zodResolver(NewUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewUserSchema>) => {
    console.log(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <img src="/logo.png" alt="Melo" style={{ width: "2rem" }} />
          {data?.title || "Unknown Modal"}
        </DialogTitle>
        <DialogDescription>
          {data?.description || "This action cannot be undone"}
        </DialogDescription>
      </DialogHeader>

      {/* <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This action cannot be undone</AlertDescription>
      </Alert> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <SimpleFormInput
              name="email"
              label="Email"
              placeholder="Enter a email"
              inputClassName={styles.formInputPlaceholder}
            />
            <PasswordFormInput
              name="password"
              label="Password"
              placeholder="Enter a password"
              hideForgotPassword
              inputClassName={styles.formInputPlaceholder}
            />
            <Button
              size="medium"
              htmlType="submit"
              style={{ marginTop: "1rem" }}
            >
              Add
            </Button>
            <p className={styles.notice}>
              Creating the user will send a confirmation email to the user for
              them to set up their account.
            </p>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
