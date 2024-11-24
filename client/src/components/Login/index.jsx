
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const url = "http://localhost:8081/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            setSuccessMessage("Logged In Successfully!");
            localStorage.setItem("isLoggedIn", true);
            setTimeout(() => {
                window.location = "/"; //agr home py jana hai tou / agr ai content py jana hai to AIContent.
            }, 1500);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
        setIsLoading(false); // End loading
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
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
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn} disabled={isLoading}>
                            {isLoading ? "Logging In..." : "Sign In"}
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
            {successMessage && (
                <div className="success-msg" style={{ position: 'absolute', top: 120, left: 190, backgroundColor: '#3bb19b', color: '#ffffff', padding: '10px 20px', borderRadius: 5 }}>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default Login;
