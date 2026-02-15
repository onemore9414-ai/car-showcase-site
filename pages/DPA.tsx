import React from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Download, FileText } from 'lucide-react';

export const DPA: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Data Processing Agreement" 
        description="Review our Data Processing Agreement (DPA) outlining our responsibilities and obligations regarding personal data processing." 
      />

      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
             <ShieldCheck className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Data Processing Agreement</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Last Updated: February 24, 2025
          </p>
          <div className="mt-8 flex justify-center gap-4">
             <button className="inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
               <Download className="h-4 w-4" />
               Download PDF
             </button>
             <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
               <FileText className="h-4 w-4" />
               Sign Digitally
             </button>
          </div>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-2xl bg-gray-50 p-8 sm:p-12 ring-1 ring-gray-900/5">
          <article className="prose prose-sm sm:prose-base text-gray-600 space-y-12">
            
            {/* Preamble */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preamble</h2>
              <p className="leading-relaxed">
                This Data Processing Agreement ("DPA") forms part of the Master Services Agreement ("Agreement") between Brand Automotive Group ("Processor") and the Customer ("Controller"). This DPA applies to the extent that Brand Automotive Group processes Personal Data on behalf of the Customer in the course of providing its services.
              </p>
            </section>

            {/* Definitions */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Definitions</h2>
              <p className="mb-4">For the purposes of this DPA, the following definitions shall apply:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
                <li><strong>"GDPR"</strong> means Regulation (EU) 2016/679 of the European Parliament and of the Council.</li>
                <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person.</li>
                <li><strong>"Processing"</strong> means any operation or set of operations which is performed on Personal Data.</li>
                <li><strong>"Sub-processor"</strong> means any third party appointed by or on behalf of Processor to process Personal Data.</li>
              </ul>
            </section>

            {/* Subject Matter */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Subject Matter and Duration</h2>
              <p className="leading-relaxed mb-4">
                The subject matter of the processing is the performance of the services described in the Agreement. The processing will continue for the duration of the Agreement, unless otherwise agreed upon in writing.
              </p>
              <p className="leading-relaxed">
                The nature and purpose of the processing involves the collection, storage, and analysis of vehicle telemetry data, driver profiles, and service logs to provide the connected vehicle features and support services.
              </p>
            </section>

            {/* Obligations */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Obligations of the Processor</h2>
              <p className="mb-4">The Processor agrees to:</p>
              <ul className="list-decimal pl-5 space-y-3 marker:text-gray-900 marker:font-medium">
                <li>Process Personal Data only on documented instructions from the Controller.</li>
                <li>Ensure that persons authorized to process the Personal Data have committed themselves to confidentiality.</li>
                <li>Take all measures required pursuant to Article 32 of the GDPR (Security of processing).</li>
                <li>Respect the conditions referred to in paragraphs 2 and 4 of Article 28 of the GDPR for engaging another processor.</li>
                <li>Assist the Controller by appropriate technical and organizational measures, insofar as this is possible, for the fulfillment of the Controller's obligation to respond to requests for exercising the data subject's rights.</li>
              </ul>
            </section>

            {/* Data Transfers */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. International Data Transfers</h2>
              <p className="leading-relaxed">
                The Processor may transfer Personal Data to countries outside the European Economic Area (EEA). In such cases, the Processor shall ensure that such transfers are compliant with Chapter V of the GDPR, typically through the use of Standard Contractual Clauses (SCCs) approved by the European Commission.
              </p>
            </section>

            {/* Sub-processors */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Authorized Sub-processors</h2>
              <p className="mb-4">
                The Controller grants general authorization to the Processor to engage Sub-processors. A current list of Sub-processors is available upon request. The Processor shall inform the Controller of any intended changes concerning the addition or replacement of other processors.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Key Sub-processors include:</h3>
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                  <li>Amazon Web Services (Cloud Infrastructure)</li>
                  <li>Google Cloud Platform (Analytics)</li>
                  <li>Stripe (Payment Processing)</li>
                  <li>Salesforce (Customer Relationship Management)</li>
                </ul>
              </div>
            </section>

            {/* Audit Rights */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Audit Rights</h2>
              <p className="leading-relaxed">
                The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this Article and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller.
              </p>
            </section>

            {/* Contact */}
            <section className="pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="mb-4">
                For any inquiries regarding this DPA or data protection matters, please contact our Data Protection Officer:
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900">Data Protection Officer</p>
                <p className="mt-1">Brand Automotive Group</p>
                <p className="mt-1">123 Velocity Avenue, Modena, Italy</p>
                <p className="mt-2 text-indigo-600 font-medium">privacy@brand.com</p>
              </div>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
};