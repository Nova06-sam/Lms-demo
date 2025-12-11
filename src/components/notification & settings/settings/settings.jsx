// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   ArrowLeft,
//   Pencil,
//   Upload,
//   Save,
//   X,
//   CheckCircle2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Settings() {
//   const navigate = useNavigate();
//   const fileRef = useRef(null);

//   // ---- initial data (replace with API later) ----
//   const initialProfile = useMemo(
//     () => ({
//       username: "karthik.sales",
//       displayName: "Karthik",
//       bio:
//         "Sales Executive with 3+ years of experience in B2B sales. " +
//         "Passionate about building customer relationships and exceeding targets.",
//       avatarUrl: "", // keep empty to show initial letter
//       stats: {
//         leadsHandled: 156,
//         conversions: 42,
//         callsMade: 328,
//         avgResponse: "2.5h",
//       },
//     }),
//     []
//   );

//   const [profile, setProfile] = useState(initialProfile);
//   const [draft, setDraft] = useState(initialProfile);
//   const [isEditing, setIsEditing] = useState(false);

//   // toast
//   const [toast, setToast] = useState({ open: false, msg: "" });

//   useEffect(() => {
//     if (!toast.open) return;
//     const t = setTimeout(() => setToast({ open: false, msg: "" }), 2000);
//     return () => clearTimeout(t);
//   }, [toast.open]);

//   const onEdit = () => {
//     setIsEditing(true);
//     setDraft(profile);
//   };

//   const onCancel = () => {
//     setDraft(profile);
//     setIsEditing(false);
//   };

//   const onSave = (e) => {
//     e.preventDefault();
//     setProfile(draft);
//     setIsEditing(false);
//     setToast({ open: true, msg: "Profile updated successfully!" });
//   };

//   const onChange = (key) => (e) => {
//     setDraft((prev) => ({ ...prev, [key]: e.target.value }));
//   };

//   // ---- image upload (local preview only) ----
//   const onPickAvatar = () => fileRef.current?.click();

//   const onFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // preview in browser
//     const url = URL.createObjectURL(file);
//     setDraft((prev) => ({ ...prev, avatarUrl: url }));
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="px-4 sm:px-6 lg:px-10 pt-6 pb-4">
//         <div className="flex items-start justify-between gap-4 flex-wrap">
//           {/* Left */}
//           <div className="flex items-start gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 rounded-xl hover:bg-gray-100 transition"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             <div>
//               <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
//                 Profile
//               </h1>
//               <p className="text-sm text-gray-500 mt-0.5">
//                 Manage your public profile information
//               </p>
//             </div>
//           </div>

//           {/* Right Edit button */}
//           {!isEditing && (
//             <button
//               onClick={onEdit}
//               className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             >
//               <Pencil className="w-4 h-4" />
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>

//       <form onSubmit={onSave} className="px-4 sm:px-6 lg:px-10 pb-10 space-y-6">
//         {/* Profile Picture */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Profile Picture
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Upload a professional photo for your profile
//           </p>

//           <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
//             {/* Avatar */}
//             <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
//               {draft.avatarUrl ? (
//                 <img
//                   src={draft.avatarUrl}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-white text-4xl font-semibold">
//                   {draft.displayName?.[0]?.toUpperCase() || "U"}
//                 </span>
//               )}
//             </div>

//             {/* Upload button */}
//             {isEditing && (
//               <div className="flex flex-col gap-2">
//                 <button
//                   type="button"
//                   onClick={onPickAvatar}
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition w-fit"
//                 >
//                   <Upload className="w-5 h-5" />
//                   Upload Photo
//                 </button>

//                 <p className="text-xs text-gray-500">
//                   JPG, PNG or GIF. Max size 2MB.
//                 </p>

//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={onFileChange}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Information */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Profile Information
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Update your profile details visible to team members
//           </p>

//           <div className="mt-6 space-y-6">
//             {/* Username */}
//             <div>
//               <label className="text-sm font-semibold text-gray-900">
//                 Username
//               </label>

//               {!isEditing ? (
//                 <p className="mt-2 text-gray-900 text-base">
//                   {profile.username}
//                 </p>
//               ) : (
//                 <input
//                   value={draft.username}
//                   onChange={onChange("username")}
//                   className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               )}
//             </div>

//             {/* Display Name */}
//             <div>
//               <label className="text-sm font-semibold text-gray-900">
//                 Display Name
//               </label>

//               {!isEditing ? (
//                 <p className="mt-2 text-gray-900 text-base">
//                   {profile.displayName}
//                 </p>
//               ) : (
//                 <input
//                   value={draft.displayName}
//                   onChange={onChange("displayName")}
//                   className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               )}
//             </div>

//             {/* Bio */}
//             <div>
//               <label className="text-sm font-semibold text-gray-900">
//                 Bio / About
//               </label>

//               {!isEditing ? (
//                 <p className="mt-2 text-gray-700 leading-relaxed">
//                   {profile.bio}
//                 </p>
//               ) : (
//                 <textarea
//                   rows={4}
//                   value={draft.bio}
//                   onChange={onChange("bio")}
//                   className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Save / Cancel */}
//         {isEditing && (
//           <div className="flex items-center gap-3">
//             <button
//               type="submit"
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//             >
//               <Save className="w-4 h-4" />
//               Save Changes
//             </button>

//             <button
//               type="button"
//               onClick={onCancel}
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition"
//             >
//               <X className="w-4 h-4" />
//               Cancel
//             </button>
//           </div>
//         )}
//       </form>

//       {/* Toast */}
//       {toast.open && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
//           <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
//             <CheckCircle2 className="w-5 h-5 text-green-600" />
//             <span className="text-sm font-semibold text-gray-900">
//               {toast.msg}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* -------------------------- Stat Card -------------------------- */

// function StatCard({ title, value, variant = "blue" }) {
//   const variantMap = {
//     blue: "bg-blue-50 text-blue-700",
//     green: "bg-green-50 text-green-700",
//     purple: "bg-purple-50 text-purple-700",
//     orange: "bg-orange-50 text-orange-700",
//   };

//   return (
//     <div className={`rounded-2xl p-5 ${variantMap[variant] || variantMap.blue}`}>
//       <p className="text-sm font-medium text-gray-600">{title}</p>
//       <p className="mt-2 text-3xl font-semibold">{value}</p>
//     </div>
//   );
// }


// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   ArrowLeft,
//   Pencil,
//   Upload,
//   Save,
//   X,
//   CheckCircle2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Settings() {
//   const navigate = useNavigate();
//   const fileRef = useRef(null);

//   // ---- initial data (replace with API later) ----
//   const initialProfile = useMemo(
//     () => ({
//       username: "karthik.sales",
//       displayName: "Karthik",
//       bio:
//         "Sales Executive with 3+ years of experience in B2B sales. " +
//         "Passionate about building customer relationships and exceeding targets.",
//       avatarUrl: "", // keep empty to show initial letter
//       stats: {
//         leadsHandled: 156,
//         conversions: 42,
//         callsMade: 328,
//         avgResponse: "2.5h",
//       },
//     }),
//     []
//   );

//   const [profile, setProfile] = useState(initialProfile);
//   const [draft, setDraft] = useState(initialProfile);
//   const [isEditing, setIsEditing] = useState(false);

//   // toast
//   const [toast, setToast] = useState({ open: false, msg: "" });

//   useEffect(() => {
//     if (!toast.open) return;
//     const t = setTimeout(() => setToast({ open: false, msg: "" }), 2000);
//     return () => clearTimeout(t);
//   }, [toast.open]);

//   const onEdit = () => {
//     setIsEditing(true);
//     setDraft(profile);
//   };

//   const onCancel = () => {
//     setDraft(profile);
//     setIsEditing(false);
//   };

//   const onSave = (e) => {
//     e.preventDefault();
//     setProfile(draft);
//     setIsEditing(false);
//     setToast({ open: true, msg: "Profile updated successfully!" });
//   };

//   const onChange = (key) => (e) => {
//     setDraft((prev) => ({ ...prev, [key]: e.target.value }));
//   };

//   // ---- image upload (local preview only) ----
//   const onPickAvatar = () => fileRef.current?.click();

//   const onFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // preview in browser
//     const url = URL.createObjectURL(file);
//     setDraft((prev) => ({ ...prev, avatarUrl: url }));
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="px-4 sm:px-6 lg:px-10 pt-6 pb-4">
//         <div className="flex items-start justify-between gap-4 flex-wrap">
//           {/* Left */}
//           <div className="flex items-start gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 rounded-xl hover:bg-gray-100 transition"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             <div>
//               <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
//                 Profile
//               </h1>
//               <p className="text-sm text-gray-500 mt-0.5">
//                 Manage your public profile information
//               </p>
//             </div>
//           </div>

//           {/* Right Edit button */}
//           {!isEditing && (
//             <button
//               onClick={onEdit}
//               className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             >
//               <Pencil className="w-4 h-4" />
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>

//       <form onSubmit={onSave} className="px-4 sm:px-6 lg:px-10 pb-10 space-y-6">
//         {/* Profile Picture */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Profile Picture
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Upload a professional photo for your profile
//           </p>

//           <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
//             {/* Avatar */}
//             <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
//               {draft.avatarUrl ? (
//                 <img
//                   src={draft.avatarUrl}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-white text-4xl font-semibold">
//                   {draft.displayName?.[0]?.toUpperCase() || "U"}
//                 </span>
//               )}
//             </div>

//             {/* Upload button */}
//             {isEditing && (
//               <div className="flex flex-col gap-2">
//                 <button
//                   type="button"
//                   onClick={onPickAvatar}
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition w-fit"
//                 >
//                   <Upload className="w-5 h-5" />
//                   Upload Photo
//                 </button>

//                 <p className="text-xs text-gray-500">
//                   JPG, PNG or GIF. Max size 2MB.
//                 </p>

//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={onFileChange}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Information */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Profile Information
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Update your profile details visible to team members
//           </p>

//           <div className="mt-6 space-y-6">
//             {/* Username */}
//             <div>
//               <label className="text-sm font-semibold text-gray-900">
//                 Username
//               </label>

//               {!isEditing ? (
//                 <p className="mt-2 text-gray-900 text-base">
//                   {profile.username}
//                 </p>
//               ) : (
//                 <input
//                   value={draft.username}
//                   onChange={onChange("username")}
//                   className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               )}
//             </div>

//             {/* Display Name */}
//             <div>
//               <label className="text-sm font-semibold text-gray-900">
//                 Display Name
//               </label>

//               {!isEditing ? (
//                 <p className="mt-2 text-gray-900 text-base">
//                   {profile.displayName}
//                 </p>
//               ) : (
//                 <input
//                   value={draft.displayName}
//                   onChange={onChange("displayName")}
//                   className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               )}
//             </div>

//             {/* Bio */}
//             <div>
//               <label className="text-sm font-semibold text-gray-900">
//                 Bio / About
//               </label>

//               {!isEditing ? (
//                 <p className="mt-2 text-gray-700 leading-relaxed">
//                   {profile.bio}
//                 </p>
//               ) : (
//                 <textarea
//                   rows={4}
//                   value={draft.bio}
//                   onChange={onChange("bio")}
//                   className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Save / Cancel */}
//         {isEditing && (
//           <div className="flex items-center gap-3">
//             <button
//               type="submit"
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//             >
//               <Save className="w-4 h-4" />
//               Save Changes
//             </button>

//             <button
//               type="button"
//               onClick={onCancel}
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition"
//             >
//               <X className="w-4 h-4" />
//               Cancel
//             </button>
//           </div>
//         )}
//       </form>

//       {/* Toast */}
//       {toast.open && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
//           <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
//             <CheckCircle2 className="w-5 h-5 text-green-600" />
//             <span className="text-sm font-semibold text-gray-900">
//               {toast.msg}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* -------------------------- Stat Card -------------------------- */

// function StatCard({ title, value, variant = "blue" }) {
//   const variantMap = {
//     blue: "bg-blue-50 text-blue-700",
//     green: "bg-green-50 text-green-700",
//     purple: "bg-purple-50 text-purple-700",
//     orange: "bg-orange-50 text-orange-700",
//   };

//   return (
//     <div className={`rounded-2xl p-5 ${variantMap[variant] || variantMap.blue}`}>
//       <p className="text-sm font-medium text-gray-600">{title}</p>
//       <p className="mt-2 text-3xl font-semibold">{value}</p>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Upload,
  Save,
  X,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  // ---- initial data (replace with API later) ----
  const initialProfile = useMemo(
    () => ({
      fullName: "Karthik Sharma",
      phoneNumber: "+91 9876543210",
      collegeUniversity: "Delhi University",
      collegeId: "DU2021CS12345",
      degree: "Bachelor of Computer Science",
      bio:
        "Sales Executive with 3+ years of experience in B2B sales. " +
        "Passionate about building customer relationships and exceeding targets.",
      avatarUrl: "", // keep empty to show initial letter
      stats: {
        leadsHandled: 156,
        conversions: 42,
        callsMade: 328,
        avgResponse: "2.5h",
      },
    }),
    []
  );

  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  
  // Password states
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Initialize toast
  useEffect(() => {
    // Toast is now handled by react-toastify
  }, []);

  const onEdit = () => {
    setIsEditing(true);
    setDraft(profile);
    // Reset password fields when starting to edit
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const onCancel = () => {
    setDraft(profile);
    setIsEditing(false);
    // Reset password data
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    
    // Check if password is being changed
    if (passwordData.newPassword) {
      if (!validatePasswordChange()) {
        return;
      }
      // Here you would typically send password change to API
      toast.success("Password updated successfully!");
    }
    
    setProfile(draft);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const onChange = (key) => (e) => {
    setDraft((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onPasswordChange = (key) => (e) => {
    const value = e.target.value;
    setPasswordData(prev => ({ ...prev, [key]: value }));
    
    // Clear error when user types
    if (passwordErrors[key]) {
      setPasswordErrors(prev => ({ ...prev, [key]: "" }));
    }
    
    // Validate new password requirements
    if (key === "newPassword") {
      setPasswordChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@$!%*?&#]/.test(value),
      });
    }
    
    // Validate confirm password
    if (key === "confirmPassword" && passwordData.newPassword !== value) {
      setPasswordErrors(prev => ({ 
        ...prev, 
        confirmPassword: "Passwords do not match" 
      }));
    } else if (key === "confirmPassword" && passwordData.newPassword === value) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswordChange = () => {
    const errors = {};
    let isValid = true;

    // Check if old password is provided when changing password
    if (passwordData.newPassword && !passwordData.oldPassword) {
      errors.oldPassword = "Current password is required to set a new password";
      isValid = false;
    }

    // Validate new password requirements
    if (passwordData.newPassword) {
      const checks = passwordChecks;
      if (!checks.length) {
        errors.newPassword = "Password must be at least 8 characters";
        isValid = false;
      } else if (!checks.uppercase || !checks.lowercase || !checks.number || !checks.specialChar) {
        errors.newPassword = "Password does not meet all requirements";
        isValid = false;
      }
    }

    // Check if new password matches confirm password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  // ---- image upload (local preview only) ----
  const onPickAvatar = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or GIF files are allowed");
      return;
    }

    // preview in browser
    const url = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, avatarUrl: url }));
    toast.success("Profile picture updated!");
  };

  const PasswordChecklist = () => (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
      <div className="space-y-1 text-xs">
        {[
          ["At least 8 characters", passwordChecks.length],
          ["One uppercase letter (A-Z)", passwordChecks.uppercase],
          ["One lowercase letter (a-z)", passwordChecks.lowercase],
          ["One number (0-9)", passwordChecks.number],
          ["One special character (@$!%*?&#)", passwordChecks.specialChar],
        ].map(([text, valid], i) => (
          <div
            key={i}
            className={`flex items-center ${valid ? "text-green-600" : "text-red-500"}`}
          >
            {valid ? (
              <CheckCircle2 className="w-3 h-3 mr-2" />
            ) : (
              <X className="w-3 h-3 mr-2" />
            )}{" "}
            {text}
          </div>
        ))}
      </div>
    </div>
  );

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

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Left */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your profile and security settings
              </p>
            </div>
          </div>

          {/* Right Edit button */}
          {!isEditing && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <form onSubmit={onSave} className="px-4 sm:px-6 lg:px-10 pb-10 space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Picture
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Upload a professional photo for your profile (Max 2MB)
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              {draft.avatarUrl ? (
                <img
                  src={draft.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-4xl font-semibold">
                  {draft.displayName?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Upload button */}
            {isEditing && (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onPickAvatar}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition w-fit"
                >
                  <Upload className="w-5 h-5" />
                  {draft.avatarUrl ? "Change Photo" : "Upload Photo"}
                </button>

                <p className="text-xs text-gray-500">
                  JPG, PNG or GIF. Max size 2MB.
                </p>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your personal details
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Full Name *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.fullName}
                </p>
              ) : (
                <input
                  value={draft.fullName}
                  onChange={onChange("fullName")}
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Display Name */}
            {/* <div>
              <label className="text-sm font-semibold text-gray-900">
                Display Name *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.displayName}
                </p>
              ) : (
                <input
                  value={draft.displayName}
                  onChange={onChange("displayName")}
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div> */}

            {/* Username */}
            {/* <div>
              <label className="text-sm font-semibold text-gray-900">
                Username *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.username}
                </p>
              ) : (
                <input
                  value={draft.username}
                  onChange={onChange("username")}
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div> */}

            {/* Phone Number */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Phone Number *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.phoneNumber}
                </p>
              ) : (
                <input
                  value={draft.phoneNumber}
                  onChange={onChange("phoneNumber")}
                  type="tel"
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* College/University */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                College/University *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.collegeUniversity}
                </p>
              ) : (
                <input
                  value={draft.collegeUniversity}
                  onChange={onChange("collegeUniversity")}
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* College ID/Student ID */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                College ID/Student ID *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.collegeId}
                </p>
              ) : (
                <input
                  value={draft.collegeId}
                  onChange={onChange("collegeId")}
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              )}
            </div>

            {/* Degree */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-900">
                Degree/Qualification *
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-900 text-base">
                  {profile.degree}
                </p>
              ) : (
                <input
                  value={draft.degree}
                  onChange={onChange("degree")}
                  required
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
                  
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-900">
                Bio / About
              </label>
              {!isEditing ? (
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {profile.bio}
                </p>
              ) : (
                <textarea
                  rows={4}
                  value={draft.bio}
                  onChange={onChange("bio")}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  placeholder="Tell us about yourself..."
                />
              )}
            </div>
          </div>
        </div>

        {/* Change Password Section (Only when editing) */}
        {isEditing && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Update your password (leave blank to keep current password)
            </p>

            <div className="mt-6 space-y-6">
              {/* Current Password */}
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Current Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    value={passwordData.oldPassword}
                    onChange={onPasswordChange("oldPassword")}
                    placeholder="Enter current password"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.oldPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.oldPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordErrors.oldPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  New Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={onPasswordChange("newPassword")}
                    placeholder="Enter new password"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.newPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {passwordData.newPassword && (
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
                
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Confirm New Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={onPasswordChange("confirmPassword")}
                    placeholder="Confirm new password"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
                {passwordData.confirmPassword && 
                 passwordData.newPassword === passwordData.confirmPassword && 
                 passwordData.confirmPassword.length > 0 && (
                  <p className="text-green-500 text-xs mt-1 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Save / Cancel */}
        {isEditing && (
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

/* -------------------------- Stat Card -------------------------- */
function StatCard({ title, value, variant = "blue" }) {
  const variantMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className={`rounded-2xl p-5 ${variantMap[variant] || variantMap.blue}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
