// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../../Pages/images/logo.png';

// function Header() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
//         setIsLoggedIn(loggedIn);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('isLoggedIn');
//         setIsLoggedIn(false);
//         window.location.reload(); // Reload the page to reflect logout
//     };

//     return (
//         <section style={{
//             color: '#088178',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '20px 88px',
//             background: '#e3e6f3',
//             boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
//             position: 'sticky',
//             top: '0',
//             left: '0',
//             zIndex: '100',
//             width: '100%'
//         }}>
//             {/* Logo aligned to the left */}
//             <div>
//                 <img src={logo} alt="logo" style={{ width: '200px', height: 'auto' }} />
//             </div>
//             {/* Menu and buttons aligned to the right */}
//             <div style={{ flex: '1', textAlign: 'right' }}>
//                 <ul style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'flex-end',
//                     listStyle: 'none',
//                     margin: 0,
//                     padding: 0,
//                 }}>
//                     <li style={{ padding: '0 20px', position: 'relative' }}>
//                         <Link to="/" style={{ textDecoration: 'none', color: '#088178' }}>Home</Link>
//                     </li>
//                     <li style={{ padding: '0 20px', position: 'relative' }}>
//                         <Link to="/ServicesPage" style={{ textDecoration: 'none', color: '#088178' }}>Services</Link>
//                     </li>
//                     <li style={{ padding: '0 20px', position: 'relative' }}>
//                         <Link to="/About" style={{ textDecoration: 'none', color: '#088178' }}>About</Link>
//                     </li>
//                     <li style={{ padding: '0 20px', position: 'relative' }}>
//                         <Link to="/ContactSection" style={{ textDecoration: 'none', color: '#088178' }}>Contact</Link>
//                     </li>
//                     <li style={{ padding: '0 20px', position: 'relative' }}>
//                         <Link to="/Pricing" style={{ textDecoration: 'none', color: '#088178' }}>Pricing</Link>
//                     </li>
//                     {/* Conditional Rendering for AI Content Link and Login/Logout Button */}
//                     {isLoggedIn ? (
//                         <>
//                             <li style={{ padding: '0 20px', position: 'relative' }}>
//                                 <Link to="/AIContent" style={{ textDecoration: 'none', color: '#088178' }}>AI Content</Link>
//                             </li>
//                             <li style={{ padding: '0 20px', position: 'relative', background: '#3bb19b', borderRadius: '20px' }}>
//                                 <button onClick={handleLogout} style={{
//                                     textDecoration: 'none',
//                                     fontSize: '16px',
//                                     fontWeight: 'normal',
//                                     color: '#ffffff',
//                                     transition: '0.3s ease',
//                                     display: 'block',
//                                     padding: '10px 20px'
//                                 }}>
//                                     Logout
//                                 </button>
//                             </li>
//                         </>
//                     ) : (
//                         <>
//                             <li style={{ padding: '0 20px', position: 'relative', background: '#ffffff', borderRadius: '20px' }}>
//                                 <Link to="/Login" style={{
//                                     textDecoration: 'none',
//                                     fontSize: '16px',
//                                     fontWeight: 'normal',
//                                     color: '#3bb19b',
//                                     transition: '0.3s ease',
//                                     display: 'block',
//                                     padding: '10px 20px'
//                                 }}>
//                                     Login
//                                 </Link>
//                             </li>
//                             <li style={{ padding: '0 20px', position: 'relative', background: '#3bb19b', borderRadius: '20px' }}>
//                                 <Link to="/Signup" style={{
//                                     textDecoration: 'none',
//                                     fontSize: '16px',
//                                     fontWeight: 'normal',
//                                     color: '#ffffff',
//                                     transition: '0.3s ease',
//                                     display: 'block',
//                                     padding: '10px 20px'
//                                 }}>
//                                     Sign Up
//                                 </Link>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </div>
//         </section>
//     );
// }

// export default Header;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import logoo from '../../Pages/images/logoo.png';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/'); // Redirect to Home page after logout
    };

    return (
        <section style={{
            color: '#088178',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 88px',
            background: '#e3e6f3',
            boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: '0',
            left: '0',
            zIndex: '100',
            width: '100%'
        }}>
            {/* Logo aligned to the left */}
            <div>
                <img src={logoo} alt="logo" style={{ width: '200px', height: 'auto' }} />
            </div>
            {/* Menu and buttons aligned to the right */}
            <div style={{ flex: '1', textAlign: 'right' }}>
                <ul style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                }}>
                    <li style={{ padding: '0 20px', position: 'relative' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#088178' }}>Home</Link>
                    </li>
                    <li style={{ padding: '0 20px', position: 'relative' }}>
                        <Link to="/ServicesPage" style={{ textDecoration: 'none', color: '#088178' }}>Services</Link>
                    </li>
                    <li style={{ padding: '0 20px', position: 'relative' }}>
                        <Link to="/About" style={{ textDecoration: 'none', color: '#088178' }}>About</Link>
                    </li>
                    <li style={{ padding: '0 20px', position: 'relative' }}>
                        <Link to="/ContactSection" style={{ textDecoration: 'none', color: '#088178' }}>Contact</Link>
                    </li>
                    <li style={{ padding: '0 20px', position: 'relative' }}>
                        <Link to="/Pricing" style={{ textDecoration: 'none', color: '#088178' }}>Pricing</Link>
                    </li>
                    {/* Conditional Rendering for AI Content Link and Login/Logout Button */}
                    {isLoggedIn ? (
                        <>
                            <li style={{ padding: '0 20px', position: 'relative' }}>
                                <Link to="/AIContent" style={{ textDecoration: 'none', color: '#088178' }}>Content Detector</Link>
                            </li>
                            <li style={{ padding: '0 20px', position: 'relative', background: '#3bb19b', borderRadius: '20px' }}>
                                <button onClick={handleLogout} style={{
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    fontWeight: 'normal',
                                    color: '#ffffff',
                                    transition: '0.3s ease',
                                    display: 'block',
                                    padding: '10px 20px'
                                }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li style={{ padding: '0 20px', position: 'relative', background: '#ffffff', borderRadius: '20px',boxShadow:'1px 1px 0.5px 0px rgba(0, 0, 0, 0.1)' }}>
                                <Link to="/Login" style={{
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    fontWeight: 'normal',
                                    color: '#3bb19b',
                                    transition: '0.3s ease',
                                    display: 'block',
                                    padding: '10px 20px'
                                }}>
                                    Login
                                </Link>
                            </li>
                            <li style={{ padding: '0 20px', position: 'relative', background: '#3bb19b', borderRadius: '20px',marginLeft:'10px' }}>
                                <Link to="/Signup" style={{
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    fontWeight: 'normal',
                                    color: '#ffffff',
                                    transition: '0.3s ease',
                                    display: 'block',
                                    padding: '10px 20px'
                                }}>
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </section>
    );
}

export default Header;
