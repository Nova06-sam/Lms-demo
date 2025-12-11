// src/pages/NotificationsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCheckCircle, FaTrash, FaSearch, FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./notification.css"; // We'll create this

const NotificationsPage = ({ userType = "student" }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [typeFilter, setTypeFilter] = useState("all"); // all, welcome, course, assignment, webinar, message
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock notifications data (in real app, fetch from API)
  const mockNotifications = [
    { 
      id: 1, 
      msg: "Welcome to your dashboard!", 
      time: "2024-01-15T10:30:00", 
      read: false,
      type: "welcome",
      priority: "high"
    },
    { 
      id: 2, 
      msg: "New lesson available in React course", 
      time: "2024-01-14T14:20:00", 
      read: false,
      type: "course",
      course: "React Fundamentals",
      priority: "medium"
    },
    { 
      id: 3, 
      msg: "Your assignment was graded - 95%", 
      time: "2024-01-13T09:15:00", 
      read: true,
      type: "assignment",
      course: "Advanced JavaScript",
      priority: "high"
    },
    { 
      id: 4, 
      msg: "Upcoming webinar: Advanced JavaScript Patterns", 
      time: "2024-01-12T16:45:00", 
      read: false,
      type: "webinar",
      date: "2024-01-20",
      priority: "medium"
    },
    { 
      id: 5, 
      msg: "New message from your instructor", 
      time: "2024-01-11T11:10:00", 
      read: true,
      type: "message",
      sender: "John Doe",
      priority: "low"
    },
    { 
      id: 6, 
      msg: "Course completion certificate ready", 
      time: "2024-01-10T08:30:00", 
      read: false,
      type: "course",
      course: "HTML & CSS Mastery",
      priority: "high"
    },
    { 
      id: 7, 
      msg: "System maintenance scheduled", 
      time: "2024-01-09T22:00:00", 
      read: true,
      type: "system",
      priority: "low"
    },
    { 
      id: 8, 
      msg: "New student joined your class", 
      time: "2024-01-08T15:45:00", 
      read: false,
      type: "student",
      priority: "medium"
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // In real app: fetch from localStorage or API
      const savedNotifications = JSON.parse(localStorage.getItem(`${userType}_notifications`)) || mockNotifications;
      setNotifications(savedNotifications);
      setFilteredNotifications(savedNotifications);
      setLoading(false);
      
      toast.success(`Loaded ${savedNotifications.length} notifications`, {
        position: "top-right",
        autoClose: 2000,
      });
    }, 500);
  }, [userType]);

  // Apply filters whenever filters or notifications change
  useEffect(() => {
    let filtered = [...notifications];

    // Apply read/unread filter
    if (filter === "unread") {
      filtered = filtered.filter(n => !n.read);
    } else if (filter === "read") {
      filtered = filtered.filter(n => n.read);
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(n => n.type === typeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.msg.toLowerCase().includes(query) ||
        (n.course && n.course.toLowerCase().includes(query)) ||
        (n.sender && n.sender.toLowerCase().includes(query))
      );
    }

    // Sort by time (newest first)
    filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    setFilteredNotifications(filtered);
  }, [notifications, filter, typeFilter, searchQuery]);

  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      
      // Save to localStorage
      localStorage.setItem(`${userType}_notifications`, JSON.stringify(updated));
      
      const notification = updated.find(n => n.id === id);
      if (notification && !notification.read) {
        toast.success(`✅ Marked as read: ${notification.msg.substring(0, 30)}...`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
      
      return updated;
    });
  };

  const markAsUnread = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, read: false } : n
      );
      
      localStorage.setItem(`${userType}_notifications`, JSON.stringify(updated));
      
      toast.info(`📬 Marked as unread`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      return updated;
    });
  };

  const markAllAsRead = () => {
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount === 0) {
      toast.info("ℹ️ All notifications are already read", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    
    // Save to localStorage
    localStorage.setItem(`${userType}_notifications`, JSON.stringify(updated));
    
    toast.success(`✅ Marked ${unreadCount} notification${unreadCount > 1 ? 's' : ''} as read`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const deleteNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    
    // Save to localStorage
    localStorage.setItem(`${userType}_notifications`, JSON.stringify(updated));
    
    toast.info(`🗑️ Deleted: ${notification.msg.substring(0, 30)}...`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const clearAllNotifications = () => {
    if (notifications.length === 0) {
      toast.info("ℹ️ No notifications to clear", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    toast.info("🗑️ Clearing all notifications...", {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      setNotifications([]);
      localStorage.setItem(`${userType}_notifications`, JSON.stringify([]));
      toast.success("✅ All notifications cleared", {
        position: "top-right",
        autoClose: 3000,
      });
    }, 1500);
  };

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
      case 'system':
        return '⚙️';
      case 'student':
        return '👨‍🎓';
      default:
        return '🔔';
    }
  };

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
      case 'system':
        return 'bg-gray-100 text-gray-800';
      case 'student':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">High Priority</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">Medium Priority</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">Low Priority</span>;
      default:
        return null;
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  if (loading) {
    return (
      <div className="notifications-container min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBell className="text-4xl text-gray-300 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
                  <FaBell className="text-white text-2xl" />
                </div>
                <span>Notifications Center</span>
              </h1>
              <p className="text-gray-600 mt-3 text-lg">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} • Manage all your alerts and updates
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={markAllAsRead}
                className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md flex items-center gap-2 font-medium"
              >
                <FaCheckCircle />
                Mark All Read
              </button>
              <button
                onClick={clearAllNotifications}
                className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center gap-2 font-medium"
              >
                <FaTrash />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-md">
            <div className="text-3xl font-bold text-gray-900">{notifications.length}</div>
            <div className="text-gray-600 mt-1">Total Notifications</div>
            <div className="w-12 h-1 bg-blue-500 rounded-full mt-3"></div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-md">
            <div className="text-3xl font-bold text-blue-600">
              {notifications.filter(n => !n.read).length}
            </div>
            <div className="text-gray-600 mt-1">Unread</div>
            <div className="w-12 h-1 bg-blue-500 rounded-full mt-3"></div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-md">
            <div className="text-3xl font-bold text-green-600">
              {notifications.filter(n => n.read).length}
            </div>
            <div className="text-gray-600 mt-1">Read</div>
            <div className="w-12 h-1 bg-green-500 rounded-full mt-3"></div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-md">
            <div className="text-3xl font-bold text-purple-600">
              {new Set(notifications.map(n => n.type)).size}
            </div>
            <div className="text-gray-600 mt-1">Categories</div>
            <div className="w-12 h-1 bg-purple-500 rounded-full mt-3"></div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-gradient-to-br  from-white to-gray-50 p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 ">Filter & Search</h2>
          <div className="flex flex-col lg:flex-row gap-6 justify-center ">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-12 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications by message, course, or sender..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 mt-6 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-col sm:flex-row  gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2 font-medium">Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm min-w-[160px]"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2 font-medium">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm min-w-[160px]"
                >
                  <option value="all">All Types</option>
                  <option value="welcome">Welcome</option>
                  <option value="course">Course</option>
                  <option value="assignment">Assignment</option>
                  <option value="webinar">Webinar</option>
                  <option value="message">Message</option>
                  <option value="system">System</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">Your Notifications</h2>
            <p className="text-gray-600 mt-2">
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50/50 transition-all duration-200 group ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${getNotificationColor(notification.type)} shadow-sm`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {notification.msg}
                            </h3>
                            {!notification.read && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-3">
                            <span className={`inline-flex items-center gap-2 text-sm ${
                              notification.read ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {notification.read ? (
                                <>
                                  <FaCheckCircle size={14} />
                                  <span>Read</span>
                                </>
                              ) : (
                                <>
                                  <FaEyeSlash size={14} />
                                  <span>Unread</span>
                                </>
                              )}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {formatTime(notification.time)}
                            </span>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          
                          {/* Additional info */}
                          {notification.course && (
                            <div className="flex items-center gap-2 text-gray-600 mt-2">
                              <span className="text-sm">📚 Course:</span>
                              <span className="text-sm font-medium">{notification.course}</span>
                            </div>
                          )}
                          {notification.sender && (
                            <div className="flex items-center gap-2 text-gray-600 mt-2">
                              <span className="text-sm">👤 From:</span>
                              <span className="text-sm font-medium">{notification.sender}</span>
                            </div>
                          )}
                          {notification.date && (
                            <div className="flex items-center gap-2 text-gray-600 mt-2">
                              <span className="text-sm">📅 Scheduled:</span>
                              <span className="text-sm font-medium">
                                {new Date(notification.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          {!notification.read ? (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                            >
                              <FaEye size={14} />
                              Mark Read
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsUnread(notification.id)}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                            >
                              <FaEyeSlash size={14} />
                              Mark Unread
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                          >
                            <FaTrash size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl inline-block shadow-sm mb-6">
                <FaBell className="text-6xl text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No notifications found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                {searchQuery || filter !== "all" || typeFilter !== "all" 
                  ? "No notifications match your current filters. Try adjusting your search criteria."
                  : "You're all caught up! New notifications will appear here when they arrive."}
              </p>
              {(searchQuery || filter !== "all" || typeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                    setTypeFilter("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-2xl shadow-md">
            <div className="text-center">
              <p className="text-gray-700">
                Showing <span className="font-semibold">{filteredNotifications.length}</span> of{' '}
                <span className="font-semibold">{notifications.length}</span> notifications
                {searchQuery && (
                  <span className="text-blue-600 ml-2">
                    • Search: "{searchQuery}"
                  </span>
                )}
              </p>
              <div className="flex justify-center items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Unread</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Read</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;