
// NOTE: This provider now uses an API endpoint for email delivery.
// Ensure your backend handles POST /api/send-code

export const emailProvider = {
  sendVerificationEmail: async (email: string, code: string) => {
    await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    return true;
  },

  sendPasswordResetEmail: async (email: string, code: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    console.group('%c📧 Email Service Simulation', 'background: #4f46e5; color: white; padding: 4px 8px; border-radius: 4px;');
    console.log(`To: ${email}`);
    console.log(`Subject: Reset Password Request`);
    console.log(`Code: %c${code}`, 'font-weight: bold; font-size: 1.2em; color: #4f46e5;');
    console.groupEnd();
    
    return true;
  }
};
