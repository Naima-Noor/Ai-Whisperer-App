import React from "react";

const TermsModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 overflow-y-auto" style={{paddingTop:'120px',paddingBottom:'10px'}}>
            <div className="modal bg-white rounded-lg shadow-lg max-w-md w-full max-h-full overflow-y-auto">
                <div className="modal-content p-4 relative">
                    <button
                        className="close absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
                    <div className="text-gray-700 space-y-4">
                        <p>
                            <strong>Last updated: 20-June-2024 </strong>
                        </p>
                        <p>
                            <strong>Acceptance of Terms</strong><br />
                            By accessing or using the Website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of the terms, you may not access the Website.
                        </p>
                        <p>
                            <strong>Use of the Website</strong><br />
                            You agree to use the Website only for lawful purposes and in accordance with these Terms and Conditions. You agree not to use the Website:
                            <ul className="list-disc ml-5">
                                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                                <li>To exploit, harm, or attempt to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
                            </ul>
                        </p>
                        <p>
                            <strong>Intellectual Property</strong><br />
                            The Website and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website.
                        </p>
                        <p>
                            <strong>Termination</strong><br />
                            We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.
                        </p>
                        <p>
                            <strong>Limitation of Liability</strong><br />
                            In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Website; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; and (iii) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Website by any third party.
                        </p>
                        <p>
                            <strong>Changes to These Terms</strong><br />
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Website after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
