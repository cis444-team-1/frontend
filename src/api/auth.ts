import { useNavigate } from "react-router";
import { useSession } from "../hooks/session-hook";
import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase";
import { Session } from "@supabase/supabase-js";
import { UserMetadata } from "../types/user";
import { toast } from "sonner";

type Credentials = {
  email: string;
  password: string;
};

export function useLogin() {
  const navigate = useNavigate();
  const { setSession } = useSession();

  return useMutation<Session, string, Credentials>({
    mutationFn: async ({ email, password }) => {
      const { data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (data.weakPassword) {
        throw new Error("Weak password: " + data.weakPassword);
      }

      if (!data.session) {
        throw new Error("Your email or password is incorrect");
      }

      return data.session;
    },
    onSuccess: (data) => {
      console.log(data);
      setSession(data);
      navigate("/");
    },
    onError: (error) => {
      return error;
    },
  });
}

// https://supabase.com/docs/reference/javascript/auth-signup
export function useRegister() {
  return useMutation<string | undefined, string, Credentials>({
    mutationFn: async ({ email, password }) => {
      const { data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo:
            import.meta.env.VITE_FRONTEND_URL + "/auth/verify-email",
          data: {
            is_onboarded: false,
            role: "user",
            bio: "",
            avatar: "",
            tags: [],
          } as UserMetadata,
        },
      });

      if (!data.user) {
        throw new Error("Error signing up");
      }

      // User was created, email was sent by supabase
      // Notify client email was sent using this email
      if (!data.session && data.user) {
        return data.user.email;
      }

      // This shouldn't happen. This would be if there was a user and a session.
      // Which can only happen if confirm email is disabled in supabase
      throw new Error("Email confirmation is set to false in supabase");
    },
    onError: (error) => {
      return error;
    },
  });
}

type OnboardingSchema = {
  username: string;
  bio: string;
  tags: string[];
  avatarImage: File | null;
};

export function useOnboarding() {
  return useMutation<void, unknown, OnboardingSchema>({
    mutationFn: async ({ username, bio, tags, avatarImage }) => {
      let avatarUrl;
      if (avatarImage) {
        const { data: imageData } = await supabase.storage
          .from("avatars")
          .upload(avatarImage.name, avatarImage);
        avatarUrl = imageData?.path;
      }

      const { data } = await supabase.auth.updateUser({
        data: {
          username: username,
          bio: bio,
          tags: tags,
          avatar: avatarUrl,
          is_onboarded: true,
        },
      });

      if (!data.user) {
        throw new Error("Error updating user metadata");
      }
    },
    onSuccess: () => {
      toast.success("Profile updated");
    },
    onError: () => {
      toast.error("Something went wrong. Try again later.");
    },
  });
}

export function useUpdatePassword() {
  return useMutation<string | undefined, string, { password: string }>({
    mutationFn: async ({ password }) => {
      const { data } = await supabase.auth.updateUser({
        password: password,
      });

      if (!data.user) {
        throw new Error("Error updating password");
      }

      return data.user.email;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
}

export function useSendPasswordResetEmail() {
  return useMutation<undefined, string, { email: string }>({
    mutationFn: async ({ email }) => {
      const { data } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_FRONTEND_URL + "/auth/reset-password",
      });

      if (!data) {
        throw new Error("Error sending password reset email");
      }
    },
    onError: (error) => {
      return error;
    },
  });
}
