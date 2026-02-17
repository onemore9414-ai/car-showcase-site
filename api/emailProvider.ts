
export const emailProvider = {
  sendVerificationEmail: async (email: string, code: string) => {
    await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
  },

  sendPasswordResetEmail: async (email: string, code: string) => {
    await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
  }
};
