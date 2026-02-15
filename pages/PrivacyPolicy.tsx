import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Privacy Policy" 
        description="Read our privacy policy to understand how Brand Automotive collects, uses, and protects your personal data." 
      />

      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">Last updated: February 24, 2025</p>
        </div>
        
        <article className="mt-16 space-y-12 text-base leading-8 text-gray-600">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">1. Introduction</h2>
            <p className="mb-6">
              Brand ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              This website is not intended for children and we do not knowingly collect data relating to children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-gray-400">
              <li><strong className="text-gray-900">Identity Data:</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
              <li><strong className="text-gray-900">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong className="text-gray-900">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li><strong className="text-gray-900">Usage Data:</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">3. How We Use Your Information</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-gray-400">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">5. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-gray-400">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            <p className="mt-6">
              If you wish to exercise any of the rights set out above, please contact our Data Privacy Officer.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-10 mt-16">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900">Legal Department</p>
              <p className="mt-1">Brand Automotive Group</p>
              <p className="mt-1">123 Velocity Avenue, Modena, Italy</p>
              <p className="mt-1 text-indigo-600">privacy@brand.com</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};