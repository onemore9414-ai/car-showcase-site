
// NOTE: Real SMTP sending via Nodemailer requires a Node.js runtime (backend server).
// Since this application runs in the browser (client-side), we cannot use 'nodemailer' 
// as it relies on Node.js specific modules (net, tls, fs, buffer) which are unavailable 
// in the browser environment.
// 
// To fix the "Buffer is not defined" error and prevent the app from crashing, 
// we are using a simulation. In a real deployment, this logic would live in a 
// backend API route (e.g. Express, Next.js API, AWS Lambda).

export const emailProvider = {
  sendVerificationEmail: async (email: string, code: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a browser demo, we MUST log the code so you can copy/paste it.
    // In production, this would be handled by the real SMTP server.
    console.group('%c📧 Email Service Simulation', 'background: #4f46e5; color: white; padding: 4px 8px; border-radius: 4px;');
    console.log(`To: ${email}`);
    console.log(`Subject: Verify your account`);
    console.log(`Code: %c${code}`, 'font-weight: bold; font-size: 1.2em; color: #4f46e5;');
    console.groupEnd();
    
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
