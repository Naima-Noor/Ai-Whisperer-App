import React from "react";

const Privacypolicy = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 overflow-y-auto" style={{ paddingTop: '120px', paddingBottom: '10px' }}>
            <div className="modal bg-white rounded-lg shadow-lg max-w-md w-full max-h-full overflow-y-auto">
                <div className="modal-content p-4 relative">
                    <button
                        className="close absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Privacy Policy</h2>

                    <p>Last updated: 20-June-2024  </p>
                    <p>
                        <strong>Introduction</strong><br />
                        AI Whisperer is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, as well as your rights in relation to that information.
                    </p>
                    <p>
                        <strong>Information We Collect</strong><br />
                        We may collect information about you in a variety of ways. The information we may collect on the website includes:
                    </p>
                    <ul class="list-disc ml-5">
                        <li>
                            <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website.
                        </li>
                        <li>
                            <strong>Derivative Data:</strong> Information our servers automatically collect when you access the website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the website.
                        </li>
                        <li>
                            <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the website.
                        </li>
                    </ul>
                    <p>
                        <strong>Use of Your Information</strong><br />
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
                    </p>
                    <ul class="list-disc ml-5">
                        <li>Administer sweepstakes, promotions, and contests.</li>
                        <li>Create and manage your account.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
                        <li>Generate a personal profile about you to make future visits to the website more personalized.</li>
                        <li>Increase the efficiency and operation of the website.</li>
                        <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
                        <li>Perform other business activities as needed.</li>
                    </ul>
                    <p>
                        <strong>Disclosure of Your Information</strong><br />
                        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                    </p>
                    <ul class="list-disc ml-5">
                        <li>
                            <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                        </li>
                        <li>
                            <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                        </li>
                    </ul>
                    <p>
                        <strong>Security of Your Information</strong><br />
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>
                    <p>
                        <strong>Policy for Children</strong><br />
                        We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us at [Contact Information].
                    </p>
                    <p>
                        <strong>Changes to This Privacy Policy</strong><br />
                        We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>
                    <p>
                        <strong>Contact Us</strong><br />
                        If you have questions or comments about this Privacy Policy, please contact us at:
                        <br />
                        AI Whisperer
                        <br></br>
                        Ai-whisperer@gmail.com
                        <br />
                        0311-1234567
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Privacypolicy;
