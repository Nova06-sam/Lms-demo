import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaCheck, FaTimes } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineGroup } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Back from "../common/Back/Back";
import { Link, useNavigate } from 'react-router-dom'
import './signin.css';
import './login.css';
// Firebase imports
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
// import BACKEND_URL from "../../api/Api";

export default function Signup() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Update password validation checks in real-time
    if (name === "password") {
      setPasswordChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@$!%*?&]/.test(value),
      });
    }
  };

  const handleUserTypeSelect = (selectedRole) => {
    setRole(selectedRole);
    // Clear any previous user type errors
    if (errors.role) {
      setErrors({ ...errors, role: "" });
    }
    
    // Show toast message for role selection
    if (selectedRole === "student") {
      toast.success("🎓 You selected to Learn as a Student!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (selectedRole === "teacher") {
      toast.success("👨‍🏫 You selected to Teach as a Teacher!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const validate = () => {
    let newErrors = {};

    // User Type validation
    if (!role) {
      newErrors.role = "Please select whether you want to Learn or Teach";
    }

    // First Name validation - at least 3 letters
    if (!formData.fname.trim()) {
      newErrors.fname = "First name is required";
    } else if (formData.fname.length < 3) {
      newErrors.fname = "First name must be at least 3 letters";
    } else if (!/^[a-zA-Z]+$/.test(formData.fname)) {
      newErrors.fname = "First name should contain only letters";
    }

    // Last Name validation
    if (!formData.lname.trim()) {
      newErrors.lname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.lname)) {
      newErrors.lname = "Last name should contain only letters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Enhanced Strong Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const checks = passwordChecks;
      if (!checks.length) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!checks.uppercase || !checks.lowercase || !checks.number || !checks.specialChar) {
        newErrors.password = "Password does not meet all requirements";
      }
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agree) {
      newErrors.agree = "You must accept the terms and conditions";
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
    
    // Show loading toast
    const loadingToast = toast.loading("🔄 Creating your account...", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
    });

    // Build payload with role
    const payload = {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      password: formData.password,
      role: role // Send the selected role to backend
    };

    console.log("📤 Sending to backend:", payload);

    const endpoint = role === "student"
      ? `http://localhost:5000/api/students`
      : `http://localhost:5000/api/teachers`;

    try {
      const res = await axios.post(endpoint, payload);
      console.log("✅ Success:", res.data);

      // Update loading toast to success
      toast.update(loadingToast, {
        render: `🎉 ${role === "student" ? "Student" : "Teacher"} account created successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Show additional success message
      toast.success(`✅ Welcome ${formData.fname}! You can now log in.`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form
      resetForm();

      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      
      // Update loading toast to error
      toast.update(loadingToast, {
        render: `❌ ${err.response?.data?.error || "Registration failed. Please try again."}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Show specific error message
      let errorMsg = "Registration failed";
      if (err.response?.data?.error?.includes("already registered")) {
        errorMsg = "Email already registered. Please log in or use a different email.";
      } else if (err.response?.status === 500) {
        errorMsg = "Server error. Please try again later.";
      }
      
      toast.error(`❌ ${errorMsg}`, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Google Authentication
  const googleCall = async () => {
    if (!role) {
      toast.error('⚠️ Please select whether you want to Learn or Teach first', {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    setLoading(true);
    
    // Show loading toast for Google sign-in
    const loadingToast = toast.loading("🔐 Connecting to Google...", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
    });

    try {
      console.log('🔐 Starting Google authentication for:', role);

      // Firebase popup sign-in
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken(true); // get fresh token

      console.log('✅ Google sign-in successful:', user.email);
      
      // Update toast to show Google success
      toast.update(loadingToast, {
        render: "✅ Google authentication successful! Creating your account...",
        type: "info",
        isLoading: true,
        autoClose: false,
      });

      // ✅ Choose correct backend endpoint
      const endpoint =
        role === 'student'
          ? `http://localhost:5000/api/auth/google/student`
          : `http://localhost:5000/api/auth/google/teacher`;

      // ✅ Send Firebase token + role to backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          role: role === 'student' ? 'student' : 'teacher',
        }),
      });

      // Read backend response once
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save Google user');
      }

      console.log('✅ Received from backend:', data);

      // Update loading toast to success
      toast.update(loadingToast, {
        render: `🎉 ${role === 'student' ? 'Student' : 'Teacher'} account created successfully with Google!`,
        type: "success",
        isLoading: false,
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Show welcome message
      toast.success(`👋 Welcome ${user.displayName || user.email}!`, {
        position: "top-center",
        autoClose: 3000,
      });

      // Optionally store user info locally
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate after short delay
      setTimeout(() => {
        navigate(role === 'student' ? '/student' : '/teacher');
      }, 1500);

    } catch (error) {
      console.error('❌ Google authentication failed:', error);

      // Update loading toast to error
      toast.update(loadingToast, {
        render: "❌ Google authentication failed",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      let errorMessage = error.message || 'Google authentication failed';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Google sign-in was cancelled';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by browser. Please allow popups for this site';
      } else if (error.message.includes("already registered")) {
        errorMessage = 'Email already registered. Please log in instead.';
      }

      toast.error(`❌ ${errorMessage}`, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });
    setRole("");
    setPasswordChecks({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  };

  // Enhanced password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "", textColor: "" };

    const checks = passwordChecks;
    let strength = 0;
    if (checks.length) strength++;
    if (checks.lowercase) strength++;
    if (checks.uppercase) strength++;
    if (checks.number) strength++;
    if (checks.specialChar) strength++;

    const strengthMap = {
      0: { strength: 0, text: "Very Weak", color: "bg-red-500", textColor: "text-red-500" },
      1: { strength: 1, text: "Weak", color: "bg-red-400", textColor: "text-red-400" },
      2: { strength: 2, text: "Fair", color: "bg-orange-500", textColor: "text-orange-500" },
      3: { strength: 3, text: "Good", color: "bg-yellow-500", textColor: "text-yellow-500" },
      4: { strength: 4, text: "Strong", color: "bg-green-500", textColor: "text-green-500" },
      5: { strength: 5, text: "Very Strong", color: "bg-green-600", textColor: "text-green-600" }
    };

    return strengthMap[strength] || { strength: 0, text: "", color: "", textColor: "" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Password requirement checklist component
  const PasswordChecklist = () => (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
      <div className="space-y-1 text-xs">
        <div className={`flex items-center ${passwordChecks.length ? 'text-green-600' : 'text-red-500'}`}>
          {passwordChecks.length ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          At least 8 characters
        </div>
        <div className={`flex items-center ${passwordChecks.uppercase ? 'text-green-600' : 'text-red-500'}`}>
          {passwordChecks.uppercase ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          One uppercase letter (A-Z)
        </div>
        <div className={`flex items-center ${passwordChecks.lowercase ? 'text-green-600' : 'text-red-500'}`}>
          {passwordChecks.lowercase ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          One lowercase letter (a-z)
        </div>
        <div className={`flex items-center ${passwordChecks.number ? 'text-green-600' : 'text-red-500'}`}>
          {passwordChecks.number ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          One number (0-9)
        </div>
        <div className={`flex items-center ${passwordChecks.specialChar ? 'text-green-600' : 'text-red-500'}`}>
          {passwordChecks.specialChar ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          One special character (@$!%*?&)
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center p-4 justify-center bg-gray-50">
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
        {/*back */}
        <Back />
        {/* text content */}
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
          <div className="f-choose gap-3 flex justify-center">
            <div
              className={`f-learn f-c-box flex flex-col justify-center p-4 border-2 rounded-sm cursor-pointer transition-all flex-1 text-center ${role === "student"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 hover:border-gray-400 bg-white"
                } ${errors.role ? "border-red-500" : ""}`}
              onClick={() => handleUserTypeSelect("student")}
            >
              <p className="flex justify-center items-center gap-2 font-medium">
                <RiGraduationCapFill className="w-5 h-5" /> Learn
              </p>
              <small className="text-gray-600 mt-1">Take courses and earn certification</small>
            </div>

            <div
              className={`f-teach f-c-box flex flex-col justify-center p-4 border-2 rounded-sm cursor-pointer transition-all flex-1 text-center ${role === "teacher"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 hover:border-gray-400 bg-white"
                } ${errors.role ? "border-red-500" : ""}`}
              onClick={() => handleUserTypeSelect("teacher")}
            >
              <p className="flex justify-center items-center gap-2 font-medium">
                <MdOutlineGroup className="w-5 h-5" /> Teacher
              </p>
              <small className="text-gray-600 mt-1">Create and share your knowledge</small>
            </div>
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-2 text-center">{errors.role}</p>
          )}
          {role && !errors.role && (
            <p className="text-green-500 text-xs mt-2 text-center flex items-center justify-center">
              <FaCheck className="mr-1" />
              Selected: {role === "student" ? "Student" : "Teacher"}
            </p>
          )}
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className={`space-y-4 transition-all duration-300 ${role ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>

          {/* Form Title */}
          <h3 className="text-lg font-semibold text-gray-800 text-center border-b pb-2">
            {role === "student" ? "Student Sign Up" : role === "teacher" ? "Teacher Sign Up" : "Select Your Role"}
          </h3>

          {/* First + Last Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-sm text-gray-600">First Name *</label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="John"
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.fname ? "border-red-500" : "border-gray-300"
                  }`}
                disabled={!role}
              />
              <p className="text-red-500 text-xs mt-1">{errors.fname}</p>
              {formData.fname && !errors.fname && formData.fname.length >= 3 && (
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <FaCheck className="mr-1" /> Valid first name
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label className="text-sm text-gray-600">Last Name *</label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Doe"
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.lname ? "border-red-500" : "border-gray-300"
                  }`}
                disabled={!role}
              />
              <p className="text-red-500 text-xs mt-1">{errors.lname}</p>
            </div>
          </div>

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
              className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              disabled={!role}
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
              placeholder="Create a strong password"
              className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.password ? "border-red-500" : "border-gray-300"
                }`}
              disabled={!role}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={!role}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>

            {/* Enhanced Password Strength Indicator */}
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
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`
                    }}
                  ></div>
                </div>

                {/* Password Checklist */}
                <PasswordChecklist />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm text-gray-600">Confirm Password *</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              disabled={!role}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={!role}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <FaCheck className="mr-1" /> ✅ Passwords match
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className={`mt-1 transition-colors ${errors.agree ? "border-red-500 ring-1 ring-red-500" : ""}`}
              disabled={!role}
            />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
          <p className="text-red-500 text-xs">{errors.agree}</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            disabled={Object.keys(errors).some(key => errors[key]) || !role || loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              role ? `Create ${role === "student" ? "Student" : "Teacher"} Account` : "Select Your Role First"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={googleCall}
            disabled={!role || loading}
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

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}