import { supabase } from "../lib/supabase";

export async function sendOTP(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) throw error;
}

export async function verifyOTP(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) throw error;
  return data.user;
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}