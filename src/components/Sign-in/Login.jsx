import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaCheck, FaTimes } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineGroup } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Back from "../common/Back/Back";
import axios from 'axios';
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import './login.css';
// import BACKEND_URL from "../../api/Api";

export default function Login() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    // 🧠 Load saved email/password if not expired
    useEffect(() => {
        const savedData = localStorage.getItem("rememberedLogin");
        if (savedData) {
            const { email, password, expiry } = JSON.parse(savedData);
            const now = Date.now();

            if (now < expiry) {
                setFormData((prev) => ({ ...prev, email, password, remember: true }));
            } else {
                localStorage.removeItem("rememberedLogin");
                toast.info("⏰ Remember me expired — please log in again", {
                    autoClose: 3000,
                    position: "top-center",
                });
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }

        // Password validation checks
        if (name === "password") {
            setPasswordChecks({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                number: /\d/.test(value),
                specialChar: /[@$!%*?&]/.test(value),
            });
        }

        // ✅ Clear remembered data if unchecked
        if (name === "remember" && !checked) {
            localStorage.removeItem("rememberedLogin");
        }
    };

    const handleUserTypeSelect = (selectedRole) => {
        setUserType(selectedRole);
        // Clear any previous user type errors
        if (errors.userType) {
            setErrors({ ...errors, userType: "" });
        }

        // Show toast message based on selection
        if (selectedRole === "student") {
            toast.success("🎓 You chose to Learn as a Student!", { 
                autoClose: 2500,
                position: "top-center",
            });
        } else if (selectedRole === "teacher") {
            toast.success("👨‍🏫 You chose to Teach as a Instructor!", { 
                autoClose: 2500,
                position: "top-center",
            });
        }
    };

    const validate = () => {
        let newErrors = {};

        // User Type validation
        if (!userType) {
            newErrors.userType = "Please select a role";
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else {
            const c = passwordChecks;
            if (!c.length) newErrors.password = "Password must be at least 8 characters";
            else if (!c.uppercase || !c.lowercase || !c.number || !c.specialChar) {
                newErrors.password = "Password does not meet all requirements";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('❌ Please fix the errors in the form', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        setLoading(true);

        const endpoint = userType === "student"
            ? `http://localhost:5000/api/students/login/${formData.email}`
            : `http://localhost:5000/api/teachers/login/${formData.email}`;

        try {
            const res = await axios.post(endpoint, {
                email: formData.email,
                password: formData.password,
            });

            const { token, user } = res.data;

            if (!user) {
                toast.error("❌ Backend did not send user data", {
                    position: "top-center",
                });
                console.log("❌ user undefined:", res.data);
                return;
            }
            console.log("✅ Login Successful:", user);
            console.log("✅ Login Successful:", token);

            // ✅ Save token + user info in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            const userId = user._id || user.id;

            if (userId) {
                if (user.role === "student") {
                    localStorage.setItem("studentId", userId);
                    localStorage.removeItem("teacherId");
                    console.log("student", userId);
                } else if (user.role === "teacher" || user.role === "instructor") {
                    localStorage.setItem("teacherId", userId);
                    localStorage.removeItem("studentId");
                    console.log("Teacher", userId);
                }
            } else {
                console.log("⚠️ Warning: user._id missing from backend");
            }

            // ✅ Remember Me feature
            if (formData.remember) {
                const expiryTime = Date.now() + 10 * 60 * 1000; // 10 mins
                localStorage.setItem(
                    "rememberedLogin",
                    JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        expiry: expiryTime,
                    })
                );
            }

            toast.success(`🎉 Welcome back, ${user.name || "User"}!`, {
                position: "top-center",
                autoClose: 2000,
            });

            // Navigate based on role
            if (user.role === "student") navigate("/student");
            else if (user.role === "teacher" || user.role === "instructor")
                navigate("/teacher");

            // Reset form (except email if remembered)
            setFormData({
                email: formData.remember ? formData.email : "",
                password: "",
                remember: formData.remember,
            });

        } catch (err) {
            console.error("❌ Login error:", err.response?.data || err.message);
            toast.error(`❌ ${err.response?.data?.error || 'Invalid credentials'}`, {
                position: "top-center",
                autoClose: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    // ✅ Forgot Password Function
    const handleForgotPassword = () => {
        if (!formData.email) {
            toast.warn("⚠️ Please enter your email to reset your password.", {
                position: "top-center",
                autoClose: 4000,
            });
            return;
        }
        toast.info(`📩 Password reset link sent to ${formData.email}`, {
            position: "top-center",
            autoClose: 4000,
        });
    };

    // Password Strength Indicator
    const getPasswordStrength = () => {
        const c = passwordChecks;
        let strength = 0;
        if (c.length) strength++;
        if (c.lowercase) strength++;
        if (c.uppercase) strength++;
        if (c.number) strength++;
        if (c.specialChar) strength++;

        const map = {
            0: { text: "Very Weak", color: "bg-red-500", textColor: "text-red-500" },
            1: { text: "Weak", color: "bg-red-400", textColor: "text-red-400" },
            2: { text: "Fair", color: "bg-orange-500", textColor: "text-orange-500" },
            3: { text: "Good", color: "bg-yellow-500", textColor: "text-yellow-500" },
            4: { text: "Strong", color: "bg-green-500", textColor: "text-green-500" },
            5: { text: "Very Strong", color: "bg-green-600", textColor: "text-green-600" },
        };
        return map[strength] || { text: "", color: "", textColor: "" };
    };

    const passwordStrength = getPasswordStrength();

    const PasswordChecklist = () => (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
            <div className="space-y-1 text-xs">
                {[
                    ["At least 8 characters", passwordChecks.length],
                    ["One uppercase letter (A-Z)", passwordChecks.uppercase],
                    ["One lowercase letter (a-z)", passwordChecks.lowercase],
                    ["One number (0-9)", passwordChecks.number],
                    ["One special character (@$!%*?&)", passwordChecks.specialChar],
                ].map(([text, valid], i) => (
                    <div
                        key={i}
                        className={`flex items-center ${valid ? "text-green-600" : "text-red-500"}`}
                    >
                        {valid ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} {text}
                    </div>
                ))}
            </div>
        </div>
    );

    // Google Authentication
    const googleLogin = async () => {
        if (!userType) {
            toast.error('Please select Student or Teacher first', {
                position: "top-center",
                autoClose: 4000,
            });
            return;
        }

        try {
            console.log("🔐 Starting Google login for:", userType);

            // Step 1: Firebase Google sign-in
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const idToken = await user.getIdToken(true);

            // Step 2: Backend endpoint
            const endpoint =
                userType === "student"
                    ? `http://localhost:5000/api/auth/google/student`
                    : `http://localhost:5000/api/auth/google/teacher`;

            // Step 3: Send token to backend for verification
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    role: userType === "student" ? "student" : "teacher",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Email not registered. Please sign up first.", { 
                    autoClose: 4000,
                    position: "top-center",
                });
                return;
            }

            // Step 4: Success — store user and redirect
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            toast.success(`🎉 Welcome back ${data.user.name || user.email}!`, {
                position: "top-center",
                autoClose: 2500,
            });

            if (userType === "student") navigate("/student");
            else navigate("/teacher");

        } catch (error) {
            console.error("❌ Google login failed:", error);
            let errorMessage = "Google login failed";
            if (error.code === "auth/popup-closed-by-user") {
                errorMessage = "Google sign-in was cancelled";
            } else if (error.code === "auth/network-request-failed") {
                errorMessage = "Network error. Please check your connection";
            }
            toast.error(`❌ ${errorMessage}`, { 
                position: "top-center",
                autoClose: 4000,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-100">
                {/* Back Button */}
                <Back />
                
                {/* Header */}
                <div className="text-center mb-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                        alt="EduPlatform"
                        className="w-10 mx-auto mb-2"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800">EduPlatform</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Join thousands of learners and instructors
                    </p>
                </div>

                {/* User Type Selection */}
                <div className="mb-6">
                    <label className="text-sm text-gray-600 block mb-3">I want to: *</label>
                    <div className="f-choose gap-3 flex  justify-center">
                        <div
                            className={`f-learn f-c-box flex flex-col justify-center p-4 border-2 rounded-sm cursor-pointer transition-all flex-1 text-center ${
                                userType === "student"
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-300 hover:border-gray-400 bg-white"
                            } ${errors.userType ? "border-red-500" : ""}`}
                            onClick={() => handleUserTypeSelect("student")}
                        >
                            <p className="flex justify-center items-center gap-2 font-medium">
                                <RiGraduationCapFill className="w-5 h-5" /> Learn
                            </p>
                            <small className="text-gray-600 mt-1">Take courses and earn certification</small>
                        </div>

                        <div
                            className={`f-teach f-c-box flex flex-col justify-center p-4 border-2 rounded-sm cursor-pointer transition-all flex-1 text-center ${
                                userType === "teacher"
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-300 hover:border-gray-400 bg-white"
                            } ${errors.userType ? "border-red-500" : ""}`}
                            onClick={() => handleUserTypeSelect("teacher")}
                        >
                            <p className="flex justify-center items-center gap-2 font-medium">
                                <MdOutlineGroup className="w-5 h-5" /> Teach
                            </p>
                            <small className="text-gray-600 mt-1">Create and share your knowledge</small>
                        </div>
                    </div>
                    {errors.userType && (
                        <p className="text-red-500 text-xs mt-2 text-center">{errors.userType}</p>
                    )}
                    {userType && !errors.userType && (
                        <p className="text-green-500 text-xs mt-2 text-center flex items-center justify-center">
                            <FaCheck className="mr-1" />
                            Selected: {userType === "student" ? "Student" : "Teacher"}
                        </p>
                    )}
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className={`space-y-4 transition-all duration-300 ${userType ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>

                    {/* Form Title */}
                    <h3 className="text-lg font-semibold text-gray-800 text-center border-b pb-2">
                        {userType === "student" ? "Student Sign In" : userType === "teacher" ? "Teacher Sign In" : "Select Your Role"}
                    </h3>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{textTransform:'lowercase'}}
                            placeholder="john.doe@example.com"
                            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            disabled={!userType}
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        {formData.email && !errors.email && (
                            <p className="text-green-500 text-xs mt-1 flex items-center">
                                <FaCheck className="mr-1" /> Valid email format
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-sm text-gray-600">Password *</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                            disabled={!userType}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition-colors"
                            disabled={!userType}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>

                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Password Strength:</span>
                                    <span className={`font-medium ${passwordStrength.textColor}`}>
                                        {passwordStrength.text}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className={`h-2 rounded-full ${passwordStrength.color}`}
                                        style={{
                                            width: `${(Object.values(passwordChecks).filter(Boolean).length / 5) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <PasswordChecklist />
                            </div>
                        )}
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="accent-blue-600 cursor-pointer transition-colors"
                                disabled={!userType}
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-blue-600 hover:underline cursor-pointer text-sm transition-colors"
                            disabled={!userType}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-sm transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                        disabled={Object.keys(errors).some(key => errors[key]) || !userType || loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Signing In...
                            </>
                        ) : (
                            userType ? `Sign In as ${userType === "student" ? "Student" : "Teacher"}` : "Select Your Role First"
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <hr className=" border-gray-300" />
                        <span className="px-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
                        <hr className=" border-gray-300" />
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={googleLogin}
                        disabled={!userType || loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                                Connecting...
                            </>
                        ) : (
                            <>
                                <FaGoogle className="text-red-500 text-lg" />
                                <span>Continue with Google</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline font-medium transition-colors"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}


// import React, { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash, FaGoogle, FaCheck, FaTimes } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
// import Back from "../common/Back/Back";
// import axios from 'axios';
// import { auth, googleProvider } from "./firebase";
// import { signInWithPopup } from "firebase/auth";
// import './login.css';

// export default function Login() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         remember: false,
//     });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [passwordChecks, setPasswordChecks] = useState({
//         length: false,
//         uppercase: false,
//         lowercase: false,
//         number: false,
//         specialChar: false,
//     });

//     // 🧠 Load saved email/password if not expired
//     useEffect(() => {
//         const savedData = localStorage.getItem("rememberedLogin");
//         if (savedData) {
//             const { email, password, expiry } = JSON.parse(savedData);
//             const now = Date.now();

//             if (now < expiry) {
//                 setFormData((prev) => ({ ...prev, email, password, remember: true }));
//             } else {
//                 localStorage.removeItem("rememberedLogin");
//                 toast.info("⏰ Remember me expired — please log in again", {
//                     autoClose: 3000,
//                     position: "top-center",
//                 });
//             }
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

//         // Clear error when user starts typing
//         if (errors[name]) {
//             setErrors({ ...errors, [name]: "" });
//         }

//         // Password validation checks
//         if (name === "password") {
//             setPasswordChecks({
//                 length: value.length >= 8,
//                 uppercase: /[A-Z]/.test(value),
//                 lowercase: /[a-z]/.test(value),
//                 number: /\d/.test(value),
//                 specialChar: /[@$!%*?&]/.test(value),
//             });
//         }

//         // ✅ Clear remembered data if unchecked
//         if (name === "remember" && !checked) {
//             localStorage.removeItem("rememberedLogin");
//         }
//     };

//     const validate = () => {
//         let newErrors = {};

//         // Email validation
//         if (!formData.email) {
//             newErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = "Invalid email address";
//         }

//         // Password validation
//         if (!formData.password) {
//             newErrors.password = "Password is required";
//         } else {
//             const c = passwordChecks;
//             if (!c.length) newErrors.password = "Password must be at least 8 characters";
//             else if (!c.uppercase || !c.lowercase || !c.number || !c.specialChar) {
//                 newErrors.password = "Password does not meet all requirements";
//             }
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) {
//             toast.error('❌ Please fix the errors in the form', {
//                 position: "top-center",
//                 autoClose: 4000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//             });
//             return;
//         }

//         setLoading(true);

//         // First try student login
//         let endpoint = `http://localhost:5000/api/students/login/${formData.email}`;
//         let userType = "student";

//         try {
//             const res = await axios.post(endpoint, {
//                 email: formData.email,
//                 password: formData.password,
//             });

//             const { token, user } = res.data;

//             if (!user) {
//                 toast.error("❌ Backend did not send user data", {
//                     position: "top-center",
//                 });
//                 console.log("❌ user undefined:", res.data);
//                 return;
//             }
//             console.log("✅ Login Successful as Student:", user);
//             console.log("✅ Login Successful:", token);

//             // ✅ Save token + user info in localStorage
//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(user));

//             const userId = user._id || user.id;

//             if (userId) {
//                 if (user.role === "student") {
//                     localStorage.setItem("studentId", userId);
//                     localStorage.removeItem("teacherId");
//                     console.log("student", userId);
//                 } else if (user.role === "teacher" || user.role === "instructor") {
//                     localStorage.setItem("teacherId", userId);
//                     localStorage.removeItem("studentId");
//                     console.log("Teacher", userId);
//                 }
//             } else {
//                 console.log("⚠️ Warning: user._id missing from backend");
//             }

//             // ✅ Remember Me feature
//             if (formData.remember) {
//                 const expiryTime = Date.now() + 10 * 60 * 1000; // 10 mins
//                 localStorage.setItem(
//                     "rememberedLogin",
//                     JSON.stringify({
//                         email: formData.email,
//                         password: formData.password,
//                         expiry: expiryTime,
//                     })
//                 );
//             }

//             toast.success(`🎉 Welcome back, ${user.name || "User"}!`, {
//                 position: "top-center",
//                 autoClose: 2000,
//             });

//             // Navigate based on role
//             if (user.role === "student") navigate("/student");
//             else if (user.role === "teacher" || user.role === "instructor")
//                 navigate("/teacher");

//             // Reset form (except email if remembered)
//             setFormData({
//                 email: formData.remember ? formData.email : "",
//                 password: "",
//                 remember: formData.remember,
//             });

//         } catch (studentErr) {
//             console.log("Student login failed, trying teacher login...");
            
//             // Try teacher login
//             try {
//                 endpoint = `http://localhost:5000/api/teachers/login/${formData.email}`;
//                 userType = "teacher";
                
//                 const res = await axios.post(endpoint, {
//                     email: formData.email,
//                     password: formData.password,
//                 });

//                 const { token, user } = res.data;

//                 if (!user) {
//                     toast.error("❌ Backend did not send user data", {
//                         position: "top-center",
//                     });
//                     return;
//                 }
                
//                 console.log("✅ Login Successful as Teacher:", user);
//                 console.log("✅ Login Successful:", token);

//                 // ✅ Save token + user info in localStorage
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("user", JSON.stringify(user));

//                 const userId = user._id || user.id;

//                 if (userId) {
//                     if (user.role === "student") {
//                         localStorage.setItem("studentId", userId);
//                         localStorage.removeItem("teacherId");
//                     } else if (user.role === "teacher" || user.role === "instructor") {
//                         localStorage.setItem("teacherId", userId);
//                         localStorage.removeItem("studentId");
//                     }
//                 }

//                 // ✅ Remember Me feature
//                 if (formData.remember) {
//                     const expiryTime = Date.now() + 10 * 60 * 1000; // 10 mins
//                     localStorage.setItem(
//                         "rememberedLogin",
//                         JSON.stringify({
//                             email: formData.email,
//                             password: formData.password,
//                             expiry: expiryTime,
//                         })
//                     );
//                 }

//                 toast.success(`🎉 Welcome back, ${user.name || "User"}!`, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });

//                 // Navigate based on role
//                 if (user.role === "student") navigate("/student");
//                 else if (user.role === "teacher" || user.role === "instructor")
//                     navigate("/teacher");

//                 // Reset form (except email if remembered)
//                 setFormData({
//                     email: formData.remember ? formData.email : "",
//                     password: "",
//                     remember: formData.remember,
//                 });

//             } catch (teacherErr) {
//                 console.error("❌ Both student and teacher login failed:", teacherErr.message);
                
//                 let errorMessage = "Invalid credentials";
//                 if (teacherErr.response?.data?.error) {
//                     errorMessage = teacherErr.response.data.error;
//                 }
                
//                 toast.error(`❌ ${errorMessage}`, {
//                     position: "top-center",
//                     autoClose: 4000,
//                 });
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Forgot Password Function
//     const handleForgotPassword = () => {
//         if (!formData.email) {
//             toast.warn("⚠️ Please enter your email to reset your password.", {
//                 position: "top-center",
//                 autoClose: 4000,
//             });
//             return;
//         }
//         toast.info(`📩 Password reset link sent to ${formData.email}`, {
//             position: "top-center",
//             autoClose: 4000,
//         });
//     };

//     // Password Strength Indicator
//     const getPasswordStrength = () => {
//         const c = passwordChecks;
//         let strength = 0;
//         if (c.length) strength++;
//         if (c.lowercase) strength++;
//         if (c.uppercase) strength++;
//         if (c.number) strength++;
//         if (c.specialChar) strength++;

//         const map = {
//             0: { text: "Very Weak", color: "bg-red-500", textColor: "text-red-500" },
//             1: { text: "Weak", color: "bg-red-400", textColor: "text-red-400" },
//             2: { text: "Fair", color: "bg-orange-500", textColor: "text-orange-500" },
//             3: { text: "Good", color: "bg-yellow-500", textColor: "text-yellow-500" },
//             4: { text: "Strong", color: "bg-green-500", textColor: "text-green-500" },
//             5: { text: "Very Strong", color: "bg-green-600", textColor: "text-green-600" },
//         };
//         return map[strength] || { text: "", color: "", textColor: "" };
//     };

//     const passwordStrength = getPasswordStrength();

//     const PasswordChecklist = () => (
//         <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//             <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
//             <div className="space-y-1 text-xs">
//                 {[
//                     ["At least 8 characters", passwordChecks.length],
//                     ["One uppercase letter (A-Z)", passwordChecks.uppercase],
//                     ["One lowercase letter (a-z)", passwordChecks.lowercase],
//                     ["One number (0-9)", passwordChecks.number],
//                     ["One special character (@$!%*?&)", passwordChecks.specialChar],
//                 ].map(([text, valid], i) => (
//                     <div
//                         key={i}
//                         className={`flex items-center ${valid ? "text-green-600" : "text-red-500"}`}
//                     >
//                         {valid ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />} {text}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     // Google Authentication - Auto detects role from backend
//     const googleLogin = async () => {
//         try {
//             console.log("🔐 Starting Google login");

//             // Step 1: Firebase Google sign-in
//             const result = await signInWithPopup(auth, googleProvider);
//             const user = result.user;
//             const idToken = await user.getIdToken(true);

//             // Step 2: Send to backend - backend will detect user type
//             const endpoint = "http://localhost:5000/api/auth/google/login";
            
//             // Step 3: Send token to backend for verification
//             const response = await fetch(endpoint, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${idToken}`,
//                 },
//                 body: JSON.stringify({
//                     email: user.email,
//                     name: user.displayName,
//                     photoURL: user.photoURL,
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 toast.error(data.error || "Authentication failed. Please try again.", { 
//                     autoClose: 4000,
//                     position: "top-center",
//                 });
//                 return;
//             }

//             // Step 4: Success — store user and redirect
//             localStorage.setItem("user", JSON.stringify(data.user));
//             localStorage.setItem("token", data.token);

//             // Set appropriate user ID based on role
//             const userId = data.user._id || data.user.id;
//             if (data.user.role === "student") {
//                 localStorage.setItem("studentId", userId);
//                 localStorage.removeItem("teacherId");
//             } else if (data.user.role === "teacher" || data.user.role === "instructor") {
//                 localStorage.setItem("teacherId", userId);
//                 localStorage.removeItem("studentId");
//             }

//             toast.success(`🎉 Welcome back ${data.user.name || user.email}!`, {
//                 position: "top-center",
//                 autoClose: 2500,
//             });

//             // Navigate based on role detected by backend
//             if (data.user.role === "student") navigate("/student");
//             else if (data.user.role === "teacher" || data.user.role === "instructor") navigate("/teacher");
//             else navigate("/");

//         } catch (error) {
//             console.error("❌ Google login failed:", error);
//             let errorMessage = "Google login failed";
//             if (error.code === "auth/popup-closed-by-user") {
//                 errorMessage = "Google sign-in was cancelled";
//             } else if (error.code === "auth/network-request-failed") {
//                 errorMessage = "Network error. Please check your connection";
//             }
//             toast.error(`❌ ${errorMessage}`, { 
//                 position: "top-center",
//                 autoClose: 4000,
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />

//             <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-100">
//                 {/* Back Button */}
//                 <Back />
                
//                 {/* Header */}
//                 <div className="text-center mb-6">
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
//                         alt="EduPlatform"
//                         className="w-10 mx-auto mb-2"
//                     />
//                     <h1 className="text-2xl font-semibold text-gray-800">EduPlatform</h1>
//                     <p className="text-gray-500 text-sm mt-1">
//                         Sign in to access your learning journey
//                     </p>
//                 </div>

//                 {/* Login Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Form Title */}
//                     <h3 className="text-lg font-semibold text-gray-800 text-center border-b pb-2">
//                         Sign In to Your Account
//                     </h3>

//                     {/* Email */}
//                     <div>
//                         <label className="text-sm text-gray-600">Email *</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             style={{textTransform:'lowercase'}}
//                             placeholder="john.doe@example.com"
//                             className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
//                                 errors.email ? "border-red-500" : "border-gray-300"
//                             }`}
//                         />
//                         <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                         {formData.email && !errors.email && (
//                             <p className="text-green-500 text-xs mt-1 flex items-center">
//                                 <FaCheck className="mr-1" /> Valid email format
//                             </p>
//                         )}
//                     </div>

//                     {/* Password */}
//                     <div className="relative">
//                         <label className="text-sm text-gray-600">Password *</label>
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
//                                 errors.password ? "border-red-500" : "border-gray-300"
//                             }`}
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition-colors"
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </button>
//                         <p className="text-red-500 text-xs mt-1">{errors.password}</p>

//                         {formData.password && (
//                             <div className="mt-2">
//                                 <div className="flex justify-between text-xs mb-1">
//                                     <span>Password Strength:</span>
//                                     <span className={`font-medium ${passwordStrength.textColor}`}>
//                                         {passwordStrength.text}
//                                     </span>
//                                 </div>
//                                 <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                                     <div
//                                         className={`h-2 rounded-full ${passwordStrength.color}`}
//                                         style={{
//                                             width: `${(Object.values(passwordChecks).filter(Boolean).length / 5) * 100}%`,
//                                         }}
//                                     ></div>
//                                 </div>
//                                 <PasswordChecklist />
//                             </div>
//                         )}
//                     </div>

//                     {/* Remember Me + Forgot Password */}
//                     <div className="flex items-center justify-between text-sm">
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="checkbox"
//                                 name="remember"
//                                 checked={formData.remember}
//                                 onChange={handleChange}
//                                 className="accent-blue-600 cursor-pointer transition-colors"
//                             />
//                             <span className="text-gray-600">Remember me</span>
//                         </label>
//                         <button
//                             type="button"
//                             onClick={handleForgotPassword}
//                             className="text-blue-600 hover:underline cursor-pointer text-sm transition-colors"
//                         >
//                             Forgot Password?
//                         </button>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-sm transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
//                         disabled={Object.keys(errors).some(key => errors[key]) || loading}
//                     >
//                         {loading ? (
//                             <>
//                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                                 Signing In...
//                             </>
//                         ) : (
//                             "Sign In"
//                         )}
//                     </button>

//                     {/* Divider */}
//                     <div className="flex items-center my-4">
//                         <hr className="flex-grow border-gray-300" />
//                         <span className="px-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
//                         <hr className="flex-grow border-gray-300" />
//                     </div>

//                     {/* Google Button */}
//                     <button
//                         type="button"
//                         className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
//                         onClick={googleLogin}
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <>
//                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
//                                 Connecting...
//                             </>
//                         ) : (
//                             <>
//                                 <FaGoogle className="text-red-500 text-lg" />
//                                 <span>Continue with Google</span>
//                             </>
//                         )}
//                     </button>
//                 </form>

//                 {/* Sign Up Link */}
//                 <p className="text-center text-sm text-gray-600 mt-6">
//                     Don't have an account?{" "}
//                     <Link
//                         to="/signup"
//                         className="text-blue-600 hover:underline font-medium transition-colors"
//                     >
//                         Sign Up
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// }