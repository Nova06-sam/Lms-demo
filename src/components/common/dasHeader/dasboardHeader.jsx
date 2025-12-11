import React, { useState, useEffect, memo } from "react";
import { FaSearch } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaBell, FaBarsStaggered } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import "./dasboardHeader.css";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "lucide-react";

function DasboardHeader({ view, setShow2, Tview, setTnav, userType, anav, setAnav }) {
  const navigate = useNavigate();
  
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [not, setNot] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [notification, setNotification] = useState([
    { 
      id: 1, 
      msg: "Welcome to your dashboard!", 
      time: "Just now", 
      read: false,
      type: "welcome"
    },
    { 
      id: 2, 
      msg: "New lesson available in React course", 
      time: "2 hours ago", 
      read: false,
      type: "course"
    },
    { 
      id: 3, 
      msg: "Your assignment was graded", 
      time: "1 day ago", 
      read: true,
      type: "assignment"
    },
    { 
      id: 4, 
      msg: "Upcoming webinar: Advanced JavaScript", 
      time: "3 days ago", 
      read: false,
      type: "webinar"
    },
    { 
      id: 5, 
      msg: "New message from instructor", 
      time: "1 week ago", 
      read: true,
      type: "message"
    },
  ]);

  // Load user details from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserDetails(userData);
      console.log("User details loaded:", userData);
    }
  }, []);

  // Count unread notifications
  useEffect(() => {
    const unreadCount = notification.filter(item => !item.read).length;
    setCount(unreadCount);
  }, [notification]);

  const callAct = () => {
    console.log("Toggle clicked - User type:", userType);
    if (userType === "teacher" && typeof setTnav === "function") {
      setTnav(!Tview);
      toast.info(Tview ? "📱 Closing teacher menu" : "📱 Opening teacher menu", {
        position: "top-right",
        autoClose: 2000,
      });
    } else if (userType === "student" && typeof setShow2 === "function") {
      setShow2(!view);
      toast.info(view ? "📱 Closing student menu" : "📱 Opening student menu", {
        position: "top-right",
        autoClose: 2000,
      });
    } else if (userType === "admin" && typeof setAnav === "function") {
      setAnav(!anav);
      toast.info(anav ? "📱 Closing admin menu" : "📱 Opening admin menu", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Mark single notification as read
  const markAsRead = (id, index) => {
    setNotification(prev => {
      const updated = [...prev];
      const notificationIndex = updated.findIndex(item => item.id === id);
      
      if (notificationIndex !== -1 && !updated[notificationIndex].read) {
        updated[notificationIndex] = { ...updated[notificationIndex], read: true };
        setCount(prevCount => prevCount - 1);
        
        // Show toast for the specific notification
        toast.success(`✅ Marked as read: ${updated[notificationIndex].msg.substring(0, 30)}...`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
      return updated;
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const unreadCount = notification.filter(item => !item.read).length;
    if (unreadCount === 0) {
      toast.info("ℹ️ All notifications are already read", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    setNotification(prev => prev.map(item => ({ ...item, read: true })));
    setCount(0);
    
    toast.success(`✅ Marked ${unreadCount} notification${unreadCount > 1 ? 's' : ''} as read`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    if (notification.length === 0) {
      toast.info("ℹ️ No notifications to clear", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    toast.info(`🗑️ Clearing all notifications...`, {
      position: "top-right",
      autoClose: 2000,
    });
    
    setTimeout(() => {
      setNotification([]);
      setCount(0);
      toast.success("✅ All notifications cleared", {
        position: "top-right",
        autoClose: 3000,
      });
      setNot(false); // Close notification dropdown
    }, 1500);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'welcome':
        return '👋';
      case 'course':
        return '📚';
      case 'assignment':
        return '📝';
      case 'webinar':
        return '🎤';
      case 'message':
        return '💬';
      default:
        return '🔔';
    }
  };

  // Get notification color based on type
  const getNotificationColor = (type) => {
    switch(type) {
      case 'welcome':
        return 'bg-blue-100 text-blue-800';
      case 'course':
        return 'bg-green-100 text-green-800';
      case 'assignment':
        return 'bg-yellow-100 text-yellow-800';
      case 'webinar':
        return 'bg-purple-100 text-purple-800';
      case 'message':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle logout
  const handleLogout = () => {
    toast.info("👋 Logging out...", {
      position: "top-center",
      autoClose: 2000,
    });

    // Clear all user data from localStorage
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("studentId");
      localStorage.removeItem("teacherId");
      localStorage.removeItem("adminId");
      localStorage.removeItem("rememberedLogin");

      toast.success("✅ Successfully logged out", {
        position: "top-center",
        autoClose: 3000,
      });

      // Redirect to login page
      navigate("/login");
    }, 1500);
  };

  // Handle settings click
  const handleSettings = () => {
    toast.info("⚙️ Opening settings...", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate(`/settings`);
  };

  const handleout = () =>{
    setNot(!not);
    setShow(false);
  }

   const handleout2 = () =>{
    setNot(false);
    setShow(!show);
  }

  // Determine which state to use for mobile menu icon
  const isMenuOpen = userType === "teacher" ? Tview : 
                    userType === "admin" ? anav : 
                    view;

  return(
    <>
      <header>
        <nav className="studHeader w-full flex justify-between items-center p-4 bg-white bg-[#F7F9FB]/90 backdrop-blur supports-[backdrop-filter]:bg-[#F7F9FB]/60">
          {/* logo */}
          <div className="s-logo">
            <h1 className="font-stretch-90% text-2xl">wrench wise LMS</h1>
            <small className="text-gray-500 text-xs capitalize">{userType} Dashboard</small>
          </div>
          
          {/* search bar box */}
          <div className="s-search flex justify-center items-center gap-5">
            <div className="s-bar">
              <input type="search" placeholder="search courses,webinars...." className="outline-none"/>
              <FaSearch className="s-icon bg-white"/>
            </div>  
            
            {/* notification */}
            <div
              onClick={() => {
                handleout()
                if (!not && count > 0) {
                  toast.info(`📬 You have ${count} unread notification${count > 1 ? 's' : ''}`, {
                    position: "top-right",
                    autoClose: 3000,
                  });
                }
              }}  
              className="s-note hover:bg-green-600 hover:text-white rounded-lg cursor-pointer flex justify-center items-center transition-all">
              <FaBell className="b-icon"/>
              {count > 0 && (
                <div className="n-count bg-red-700 flex justify-center">
                  <small className="text-[10px] font-bold text-white">
                    {count > 9 ? '9+' : count}
                  </small>
                </div>
              )}
            </div>

            {/* notification details */}
            <div className={`s-not-details py-4 px-5 shadow-md flex flex-col gap-2 bg-white rounded-2xl ${not ? 'visible' : 'invisible'}`}>
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">notifications</h1>
                <span className="text-xs text-gray-500">
                  {count} unread
                </span>
              </div>
              <hr className="text-gray-300"/>
              
              <div className="s-not-data max-h-60 overflow-y-auto">
                {notification.length > 0 ? (
                  notification.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`s-data-box flex items-center gap-3 hover:bg-gray-50 rounded-xl cursor-pointer p-3 transition-all ${item.read ? 'opacity-60' : ''}`}
                      onClick={() => markAsRead(item.id, index)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${getNotificationColor(item.type)}`}>
                        {getNotificationIcon(item.type)}
                      </div>
                      <div className="s-data-txt flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">{item.msg}</p>
                          {item.read && (
                            <FaCheckCircle className="text-green-500 ml-2 flex-shrink-0" size={14} />
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <small className="text-gray-500 text-xs">{item.time}</small>
                          {!item.read && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaBell className="mx-auto text-3xl text-gray-300 mb-2" />
                    <p>No notifications</p>
                    <p className="text-xs mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>
              
              <hr className="text-gray-300"/>
              
              <div className="flex gap-2">
                {notification.length > 0 && (
                  <>
                    {count > 0 && (
                      <button 
                        className="bg-green-500 hover:bg-green-600 py-2 rounded-xl text-white font-medium text-sm flex-1 transition-colors flex items-center justify-center gap-1"
                        onClick={markAllAsRead}
                      >
                        <FaCheckCircle size={14} />
                        Mark All Read
                      </button>
                    )}
                    <button 
                      className="bg-gray-500 hover:bg-gray-600 py-2 rounded-xl text-white font-medium text-sm flex-1 transition-colors"
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </button>
                  </>
                )}
                <button 
                  className="bg-blue-500 hover:bg-blue-600 py-2 rounded-xl text-white font-medium text-sm flex-1 transition-colors"
                  onClick={() => {
                    setNot(false);
                    navigate(`/notification`);
                  }}
                >
                  View All
                </button>
              </div>
            </div>             
            
            {/* user details */}
            <div className="s-details overflow-hidden cursor-pointer" 
              onClick={() => {
                 handleout2()
                if (!show) {
                  toast.info("👤 Viewing profile options", {
                    position: "top-right",
                    autoClose: 2000,
                  });
                }
              }}
            >
              {userDetails?.photoURL ? (
                <img src={userDetails.photoURL} alt="profile" className="w-10 h-10 rounded-full" />
              ) : (
                <div className=" s-avatar bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                  {userDetails?.name?.charAt(0) || userDetails?.email?.charAt(0) || "U"}
                </div>
              )}
              <div className={`s-drop rounded-lg bg-white p-4 ${show ? 'visible' : 'invisible'}`}>
                <div className="mb-3">
                  <h4 className="font-medium underline">
                    {userDetails?.name ?? "Unknown User"}
                  </h4>
                  <h5 style={{textTransform:'lowercase'}} className="text-gray-400 font-light mb-1 truncate max-w-[200px]">
                    {userDetails?.email || "No email"}
                  </h5>
                  <div className="mt-1">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {userType?.charAt(0).toUpperCase() + userType?.slice(1)}
                    </span>
                  </div>
                </div>
                <hr className="border-gray-300 mb-3" />
                
                {/* setting */}
                <div 
                  className="d-set mt-1 hover:bg-green-600 p-2 rounded-lg mb-1 flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSettings();
                    setShow(false);
                  }}
                >
                  <User className="size-4"/>
                  <small className="text-gray-400">profile</small>
                </div>
                
                <hr className="border-gray-300 mb-2" />
                
                {/* logout */}
                <div 
                  className="d-set hover:bg-green-600 mt-1 mb-1 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                    setShow(false);
                  }}
                >
                  <FiLogOut className="size-4"/>
                  <small className="text-gray-400">Logout</small>
                </div>
              </div>
            </div>
            
            {/* mobile bar */}
            <div className="m-bar bg-gray-200 p-2 rounded-lg cursor-pointer"
              onClick={callAct}
            >
              {isMenuOpen ? <MdClose className="text-2xl"/> : <FaBarsStaggered className="text-2xl"/>}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

// ✅ Prevent unnecessary re-renders caused by parent updates
export default memo(DasboardHeader);