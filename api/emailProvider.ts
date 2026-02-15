
// Simple Email API Client
// This implementation targets a generic transactional email API (compatible with Resend, SendGrid, etc.)
// Note: In a production environment, this should be called from a secure backend server to protect API keys.

const EMAIL_CONFIG = {
  // Replace with your actual API endpoint (e.g., https://api.resend.com/emails or EmailJS)
  endpoint: 'https://api.emailjs.com/api/v1.0/email/send', 
  // In a real app, these would come from environment variables
  serviceId: import.meta.env?.VITE_EMAIL_SERVICE_ID || '',
  templateId: import.meta.env?.VITE_EMAIL_TEMPLATE_ID || '',
  userId: import.meta.env?.VITE_EMAIL_USER_ID || '', // Public Key
};

export const emailProvider = {
  sendVerificationEmail: async (email: string, code: string) => {
    console.log(`[Email Provider] Preparing to send verification code to ${email}`);

    // If no credentials, fallback to console for development safety
    if (!EMAIL_CONFIG.userId) {
      console.warn('[Email Provider] Missing configuration. Fallback to console log.');
      console.log(`%c[Email Sent] To: ${email} | Subject: Verify Account | Code: ${code}`, 'color: #10b981; font-weight: bold;');
      return true;
    }

    try {
      // Example using EmailJS structure as it works client-side securely with specific templates
      // Or a generic POST if using a proxy
      const response = await fetch(EMAIL_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAIL_CONFIG.serviceId,
          template_id: EMAIL_CONFIG.templateId,
          user_id: EMAIL_CONFIG.userId,
          template_params: {
            to_email: email,
            verification_code: code,
            message: `Your verification code is: ${code}`
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Email API Error: ${response.statusText}`);
      }
      
      console.log('[Email Provider] Email sent successfully via API');
      return true;
    } catch (error) {
      console.error('[Email Provider] Failed to send email:', error);
      // Fallback log ensures flow doesn't break for the user
      console.log(`%c[Fallback] Verification Code: ${code}`, 'color: yellow');
      return false;
    }
  },

  sendPasswordResetEmail: async (email: string, code: string) => {
    console.log(`[Email Provider] Preparing to send password reset code to ${email}`);

    if (!EMAIL_CONFIG.userId) {
      console.warn('[Email Provider] Missing configuration. Fallback to console log.');
      console.log(`%c[Email Sent] To: ${email} | Subject: Reset Password | Code: ${code}`, 'color: #10b981; font-weight: bold;');
      return true;
    }

    try {
      const response = await fetch(EMAIL_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAIL_CONFIG.serviceId,
          template_id: EMAIL_CONFIG.templateId,
          user_id: EMAIL_CONFIG.userId,
          template_params: {
            to_email: email,
            reset_code: code,
            message: `Your password reset code is: ${code}`
          }
        }),
      });

      if (!response.ok) throw new Error(response.statusText);
      return true;
    } catch (error) {
      console.error('[Email Provider] Failed to send email:', error);
      console.log(`%c[Fallback] Reset Code: ${code}`, 'color: yellow');
      return false;
    }
  }
};
