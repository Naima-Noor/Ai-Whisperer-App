import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import TermsModal from "../Singup/TermsModal";
import PrivacyPolicy from "../Singup/privacypolicy";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleTermsClick = () => {
        setShowTermsModal(true);
    };

    const handlePrivacyPolicyClick = () => {
        setShowPrivacyPolicy(true);
    };

    const handleCloseModal = () => {
        setShowTermsModal(false);
        setShowPrivacyPolicy(false);
    };

    const handleSignup = async () => {
        try {
            // Simulated signup process without email validation and sending email

            // Replace with your actual signup endpoint
            const signupUrl = "http://localhost:8080/api/users";
            await axios.post(signupUrl, data);

            // Simulated success message
            setSuccessMessage("User created successfully!");

            // Redirect to login page after a delay
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            // Handle errors
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        } finally {
            setIsLoading(false); // Ensure loading indicator is turned off
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            setError("Please accept terms and conditions and privacy policy.");
            return;
        }
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        handleSignup();
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-green-500"
                                onChange={handleCheckboxChange}
                                checked={isChecked}
                            />
                            <span className="ml-2 text-gray-700 text-sm">
                                I accept{" "}
                                <Link to="#" onClick={handleTermsClick} className="text-blue-500 underline">
                                    terms and conditions
                                </Link>{" "}
                                and{" "}
                                <Link to="#" onClick={handlePrivacyPolicyClick} className="text-blue-500 underline">
                                    privacy policy
                                </Link>{" "}
                                of this website.
                            </span>
                        </div>
                        {successMessage && (
                            <div
                                className={styles.success_msg}
                                style={{
                                    position: "absolute",
                                    top: 120,
                                    left: 190,
                                    color: "#3bb19b",
                                    backgroundColor: "#ffffff",
                                    padding: "10px 20px",
                                    borderRadius: 5,
                                }}
                            >
                                {successMessage}
                            </div>
                        )}
                        <button
                            type="submit"
                            className={styles.green_btn}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
            {showTermsModal && <TermsModal onClose={handleCloseModal} />}
            {showPrivacyPolicy && <PrivacyPolicy onClose={handleCloseModal} />}
        </div>
    );
};

export default Signup;
