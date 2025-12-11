import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
    FiMessageCircle,
    FiMail,
    FiPhone,
    FiHelpCircle,
    FiBookOpen,
    FiVideo,
    FiZap,
    FiDownload,
    FiSend,
    FiFileText,
    FiX,
    FiPaperclip,
    FiMessageSquare,
    FiCalendar,
    FiUser,
} from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { supportApi } from "../service/supportApi";
import { debounce } from "lodash";

// FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle, onHelpfulClick, helpfulCount, hasVoted }) => {
    return (
        <div className="p-4 md:p-5 hover:bg-gray-50 transition-colors duration-150">
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${index}`}
            >
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex items-center gap-3">
                        <FiHelpCircle className="text-blue-500 flex-shrink-0 text-xl" />
                        <p className="font-medium text-gray-700 text-left">{faq.question}</p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full inline-block md:ml-2 mt-1 md:mt-0">
                        {faq.category || faq.tags?.[0] || 'General'}
                    </span>
                </div>
                <span className="text-gray-400 ml-4">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </button>
            {isOpen && (
                <div id={`faq-content-${index}`} className="mt-4 pl-10 md:pl-11">
                    <p className="text-gray-600 mb-3">
                        {faq.answer}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <CiHeart className="text-lg text-red-400" />
                            <span>{helpfulCount} people found this helpful</span>
                        </p>
                        <button
                            onClick={onHelpfulClick}
                            disabled={hasVoted}
                            className={`px-4 py-2 text-sm rounded-full flex items-center gap-2 transition-colors ${hasVoted
                                ? 'bg-green-100 text-green-600 cursor-default'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <CiHeart className="text-lg" />
                            {hasVoted ? 'Thank you!' : 'Was this helpful?'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Support Card Component
const SupportCard = ({ supportItem, index }) => {
    return (
        <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer hover-lift"
            onClick={supportItem.action}
        >
            <div className="text-3xl text-blue-600 bg-blue-50 p-4 rounded-full mb-4">
                {supportItem.icon}
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">{supportItem.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{supportItem.desc}</p>
            <div className="mb-4 space-y-1">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    {supportItem.time}
                </p>
                <p className="text-xs text-gray-400">Response: {supportItem.response}</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 w-full">
                {supportItem.btn}
            </button>
        </div>
    );
};

// Resource Card Component
const ResourceCard = ({ resource }) => {
    const Icon = resource.icon;
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-200 hover-lift">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center bg-green-50 p-3 rounded-full">
                    <Icon className="text-green-600 text-2xl" />
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize">
                    {resource.type}
                </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-500 mb-4 flex-grow">{resource.desc}</p>
            <a
                href={resource.url}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium rounded-lg border border-blue-600 hover:border-blue-700 px-4 py-2.5 flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-blue-50"
            >
                <FiFileText /> View Resource
            </a>
        </div>
    );
};

// Ticket Details Modal Component
const TicketDetailsModal = ({ ticket, onClose, getStatusColor, getPriorityColor, formatStatus, formatDate }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{ticket.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Ticket ID: #{ticket._id?.slice(-6)}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                        >
                            <FiX className="text-xl" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FiCalendar className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Created</p>
                                <p className="font-medium">{formatDate(ticket.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FiCalendar className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Last Updated</p>
                                <p className="font-medium">{formatDate(ticket.updatedAt)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FiUser className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="font-medium capitalize">{ticket.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FiMessageSquare className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getStatusColor(ticket.status)}`}>
                                    {formatStatus(ticket.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Description</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600">{ticket.description}</p>
                        </div>
                    </div>

                    {ticket.attachments && ticket.attachments.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-3">Attachments</h4>
                            <div className="flex flex-wrap gap-2">
                                {ticket.attachments.map((attachment, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg"
                                    >
                                        <FiPaperclip />
                                        <span className="text-sm">Attachment {index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {ticket.messages && ticket.messages.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3">Conversation</h4>
                            <div className="space-y-4">
                                {ticket.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`p-4 rounded-lg ${message.sender === 'user' ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium text-sm">
                                                {message.sender === 'user' ? 'You' : 'Support Agent'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(message.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{message.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex gap-2">
                            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getStatusColor(ticket.status)}`}>
                                {formatStatus(ticket.status)}
                            </span>
                            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
                                Priority: {ticket.priority}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Live Chat Component
const LiveChat = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", sender: 'agent', time: '10:00 AM' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMessage = {
            text: input,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMessage]);
        setInput('');
        
        // Simulate agent response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks for your message. An agent will be with you shortly.",
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 w-96">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FiMessageCircle className="text-xl" />
                        <div>
                            <h4 className="font-semibold">Live Chat Support</h4>
                            <p className="text-xs opacity-90">We're online • Response time: 2 min</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 p-1"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs rounded-lg p-3 ${message.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 rounded-bl-none'
                                    }`}
                            >
                                <p>{message.text}</p>
                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {message.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FiSend />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Typically replies within 2 minutes
                    </p>
                </div>
            </div>
        </div>
    );
};

// Main Support Component
export default function Support() {
    // State
    const [openFAQ, setOpenFAQ] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [ticketForm, setTicketForm] = useState({
        subject: "",
        category: "",
        message: ""
    });
    const [submittedTickets, setSubmittedTickets] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [helpfulCounts, setHelpfulCounts] = useState({});
    const [userVotes, setUserVotes] = useState({});
    const [loading, setLoading] = useState({
        faqs: false,
        tickets: false,
        submitting: false
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        hasMore: false
    });
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [showChat, setShowChat] = useState(false);

    const formRef = useRef(null);

    // Fetch FAQs on component mount
    useEffect(() => {
        fetchFAQs();
        fetchUserTickets();
        loadUserVotes();
    }, []);

    // Load user votes from localStorage
    const loadUserVotes = () => {
        const savedVotes = localStorage.getItem('faq_votes');
        if (savedVotes) {
            setUserVotes(JSON.parse(savedVotes));
        }
    };

    // Save user votes to localStorage
    const saveUserVotes = (votes) => {
        localStorage.setItem('faq_votes', JSON.stringify(votes));
    };

    // Fetch FAQs from backend with pagination
    const fetchFAQs = async (loadMore = false) => {
        setLoading(prev => ({ ...prev, faqs: true }));
        try {
            const page = loadMore ? pagination.page + 1 : 1;
            const response = await supportApi.getFAQs({
                search: searchQuery,
                page,
                limit: pagination.limit
            });

            if (response.success) {
                if (loadMore) {
                    setFaqs(prev => [...prev, ...response.data]);
                } else {
                    setFaqs(response.data);
                }

                const counts = {};
                const data = loadMore ? [...faqs, ...response.data] : response.data;
                data.forEach((faq, index) => {
                    counts[index] = faq.helpfulCount || 0;
                });
                setHelpfulCounts(counts);

                setPagination(prev => ({
                    ...prev,
                    page,
                    total: response.total || 0,
                    hasMore: response.data.length === pagination.limit
                }));
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            toast.error('Failed to load FAQs');
            setFaqs(getFallbackFAQs());
        } finally {
            setLoading(prev => ({ ...prev, faqs: false }));
        }
    };

    // Fetch user tickets from backend
    const fetchUserTickets = async () => {
        setLoading(prev => ({ ...prev, tickets: true }));
        try {
            const response = await supportApi.getUserTickets({
                page: 1,
                limit: 10,
                sort: '-createdAt'
            });

            if (response.success) {
                setSubmittedTickets(response.data);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            toast.error('Failed to load tickets');
            setSubmittedTickets(getFallbackTickets());
        } finally {
            setLoading(prev => ({ ...prev, tickets: false }));
        }
    };

    // Fallback FAQs
    const getFallbackFAQs = () => [
        {
            _id: '1',
            question: "How do I reset my password?",
            answer: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox. The reset link will expire in 24 hours for security reasons.",
            category: "account",
            tags: ["Account"],
            helpfulCount: 38,
            notHelpfulCount: 2,
            views: 150,
            isPublished: true
        },
        {
            _id: '2',
            question: "How do I download my certificates?",
            answer: "Navigate to your profile dashboard, click on 'Certificates' section, select the certificate you want to download, and click the download button. Certificates are available in PDF format.",
            category: "certificates",
            tags: ["Certificates"],
            helpfulCount: 42,
            notHelpfulCount: 1,
            views: 200,
            isPublished: true
        },
        {
            _id: '3',
            question: "Can I access courses offline?",
            answer: "Yes! Our mobile app allows you to download courses for offline viewing. Simply go to the course content page in the app and tap the download icon next to each lesson.",
            category: "courses",
            tags: ["Courses"],
            helpfulCount: 25,
            notHelpfulCount: 0,
            views: 120,
            isPublished: true
        },
        {
            _id: '4',
            question: "How do I track my learning progress?",
            answer: "Your learning dashboard shows progress bars for each course, completed modules, quiz scores, and time spent learning. You can also view detailed analytics in the 'Progress' section.",
            category: "progress",
            tags: ["Progress"],
            helpfulCount: 31,
            notHelpfulCount: 1,
            views: 180,
            isPublished: true
        },
        {
            _id: '5',
            question: "What if I'm having technical issues?",
            answer: "First, try clearing your browser cache and cookies. If issues persist, check our status page for system updates. For persistent problems, submit a support ticket with details about your device, browser, and error messages.",
            category: "technical",
            tags: ["Technical"],
            helpfulCount: 19,
            notHelpfulCount: 3,
            views: 250,
            isPublished: true
        },
        {
            _id: '6',
            question: "How do I change my email address?",
            answer: "Go to Account Settings > Personal Information. Click 'Edit' next to your email, enter the new email, and confirm via the verification link sent to both old and new email addresses.",
            category: "account",
            tags: ["Account"],
            helpfulCount: 27,
            notHelpfulCount: 0,
            views: 100,
            isPublished: true
        },
    ];

    // Fallback tickets
    const getFallbackTickets = () => [
        {
            _id: '1',
            title: "Course video not loading",
            description: "Video playback was stuck at 50% loading. The issue was resolved by clearing browser cache.",
            category: "technical",
            priority: "medium",
            status: "resolved",
            createdAt: "2024-12-18T00:00:00.000Z",
            updatedAt: "2024-12-19T00:00:00.000Z"
        },
        {
            _id: '2',
            title: "Certificate download issue",
            description: "Unable to download certificate in PDF format. Our team is working on the export functionality.",
            category: "certificates",
            priority: "low",
            status: "in-progress",
            createdAt: "2024-12-20T00:00:00.000Z",
            updatedAt: "2024-12-20T00:00:00.000Z"
        },
    ];

    // Debounced search
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            await fetchFAQs();
        }, 500),
        []
    );

    // Filter FAQs with useMemo for performance
    const filteredFaqs = useMemo(() => {
        if (!searchQuery) return faqs;
        return faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [faqs, searchQuery]);

    // Support options
    const supportOptions = [
        {
            title: "Live Chat",
            desc: "Get instant help from our support team",
            icon: <FiMessageCircle />,
            time: "24/7",
            response: "< 5 minutes",
            btn: "Start Chat",
            action: async () => {
                try {
                    const response = await supportApi.startChatSession('general');
                    if (response.success) {
                        toast.success(response.message);
                        setShowChat(true);
                    }
                } catch (error) {
                    toast.error('Failed to start chat session');
                }
            }
        },
        {
            title: "Email Support",
            desc: "Send us a detailed message",
            icon: <FiMail />,
            time: "24/7",
            response: "< 24 hours",
            btn: "Send Email",
            action: () => window.location.href = 'mailto:support@example.com?subject=Support Request'
        },
        {
            title: "Phone Support",
            desc: "Speak directly with our team",
            icon: <FiPhone />,
            time: "Mon-Fri: 9AM-6PM",
            response: "Immediate",
            btn: "Call Now",
            action: () => window.location.href = 'tel:+15551234567'
        },
    ];

    // Resources
    const resources = [
        {
            title: "Getting Started Guide",
            desc: "Learn the basics of using the platform",
            icon: FiBookOpen,
            url: "/guides/getting-started",
            type: "guide"
        },
        {
            title: "Video Tutorials",
            desc: "Watch step-by-step video tutorials",
            icon: FiVideo,
            url: "/tutorials",
            type: "video"
        },
        {
            title: "Platform Updates",
            desc: "Latest features and improvements",
            icon: FiZap,
            url: "/updates",
            type: "updates"
        },
        {
            title: "Download Mobile App",
            desc: "Learn on the go with our mobile app",
            icon: FiDownload,
            url: "/download/app",
            type: "app"
        },
    ];

    // Categories
    const categories = [
        "Select a category",
        "Technical",
        "Courses",
        "Certificates",
        "Billing",
        "Account",
        "Other"
    ];

    // Form validation
    const validateTicketForm = () => {
        const errors = {};

        if (!ticketForm.subject.trim()) {
            errors.subject = "Subject is required";
        } else if (ticketForm.subject.length < 5) {
            errors.subject = "Subject must be at least 5 characters";
        }

        if (ticketForm.category === "" || ticketForm.category === "Select a category") {
            errors.category = "Please select a category";
        }

        if (!ticketForm.message.trim()) {
            errors.message = "Message is required";
        } else if (ticketForm.message.length < 20) {
            errors.message = "Please provide more details (minimum 20 characters)";
        }

        return errors;
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicketForm(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle form submission
    const handleSubmitTicket = async (e) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, submitting: true }));

        const errors = validateTicketForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            Object.values(errors).forEach(error => toast.error(error));
            setLoading(prev => ({ ...prev, submitting: false }));
            return;
        }

        try {
            const ticketData = {
                title: ticketForm.subject,
                description: ticketForm.message,
                category: ticketForm.category,
                priority: "medium"
            };

            const response = await supportApi.createTicket(ticketData);

            if (response.success) {
                toast.success("Support Ticket submitted successfully! ✅");

                setSubmittedTickets(prev => [response.data, ...prev]);

                setTicketForm({
                    subject: "",
                    category: "",
                    message: ""
                });
                setFormErrors({});

                if (formRef.current) {
                    formRef.current.reset();
                }
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
            toast.error(error.response?.data?.message || 'Failed to submit ticket');
        } finally {
            setLoading(prev => ({ ...prev, submitting: false }));
        }
    };

    // Handle helpful click with rate limiting
    const handleHelpfulClick = async (faqIndex, faqId) => {
        const lastVoteTime = localStorage.getItem(`vote_${faqId}`);
        if (lastVoteTime && Date.now() - parseInt(lastVoteTime) < 24 * 60 * 60 * 1000) {
            toast.info("You can only vote once every 24 hours");
            return;
        }

        if (userVotes[faqIndex]) {
            toast.info("You've already voted on this FAQ!");
            return;
        }

        try {
            const response = await supportApi.voteFAQ(faqId, true);

            if (response.success) {
                setHelpfulCounts(prev => ({
                    ...prev,
                    [faqIndex]: response.data.helpfulCount
                }));

                const newVotes = {
                    ...userVotes,
                    [faqIndex]: true
                };
                setUserVotes(newVotes);
                saveUserVotes(newVotes);

                localStorage.setItem(`vote_${faqId}`, Date.now().toString());

                toast.success("Thank you for your feedback! 👍");
            }
        } catch (error) {
            console.error('Error voting on FAQ:', error);
            setHelpfulCounts(prev => ({
                ...prev,
                [faqIndex]: (prev[faqIndex] || 0) + 1
            }));

            const newVotes = {
                ...userVotes,
                [faqIndex]: true
            };
            setUserVotes(newVotes);
            saveUserVotes(newVotes);

            toast.success("Thank you for your feedback! 👍");
        }
    };

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            toast.info("Please enter a search term");
            return;
        }

        try {
            await fetchFAQs();
            toast.info(`Searching for: ${searchQuery}`);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    // Helper functions
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-600';
            case 'medium': return 'bg-yellow-100 text-yellow-600';
            case 'low': return 'bg-green-100 text-green-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'bg-green-100 text-green-600';
            case 'in-progress': return 'bg-blue-100 text-blue-600';
            case 'open': return 'bg-yellow-100 text-yellow-600';
            case 'pending': return 'bg-orange-100 text-orange-600';
            case 'closed': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const formatStatus = (status) => {
        return status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Load more FAQs
    const handleLoadMore = () => {
        fetchFAQs(true);
    };

    return (
        <>
            <section className="pt-10 bg-gray-50 min-h-screen">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <BackToDashboard />
                <div className="bg-gray-50 p-4 md:p-6 lg:p-8 xl:p-10">
                    {/* Header */}
                    <div className="mb-6 md:mb-8 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Help & Support</h1>
                        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                            We're here to help! Find answers to common questions or get in touch with our support team.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8 md:mb-10">
                        <form onSubmit={handleSearchSubmit} className="flex justify-center">
                            <div className="relative w-full max-w-2xl">
                                <input
                                    type="text"
                                    placeholder="Search for help..."
                                    className="w-full border rounded-full border-gray-300 py-3 px-6 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <button
                                    type="submit"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                                    disabled={loading.faqs}
                                >
                                    {loading.faqs ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                                    ) : (
                                        <FaSearch className="text-xl text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Get Support */}
                    <div className="mb-10 md:mb-12">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Support</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {supportOptions.map((supportItem, i) => (
                                <SupportCard
                                    key={i}
                                    supportItem={supportItem}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mb-10 md:mb-12">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
                            <span className="text-sm text-gray-500">
                                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
                            </span>
                        </div>

                        {loading.faqs && !faqs.length ? (
                            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading FAQs...</p>
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-200">
                                {filteredFaqs.length > 0 ? (
                                    <>
                                        {filteredFaqs.map((faq, i) => (
                                            <FAQItem
                                                key={faq._id}
                                                faq={faq}
                                                index={i}
                                                isOpen={openFAQ === i}
                                                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                                                onHelpfulClick={() => handleHelpfulClick(i, faq._id)}
                                                helpfulCount={helpfulCounts[i] || faq.helpfulCount}
                                                hasVoted={userVotes[i]}
                                            />
                                        ))}
                                        {pagination.hasMore && (
                                            <div className="p-4 text-center">
                                                <button
                                                    onClick={handleLoadMore}
                                                    disabled={loading.faqs}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {loading.faqs ? 'Loading...' : 'Load More FAQs'}
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="p-8 text-center">
                                        <p className="text-gray-500">No FAQs found matching your search.</p>
                                        <button
                                            onClick={() => {
                                                setSearchQuery("");
                                                fetchFAQs();
                                            }}
                                            className="text-blue-600 hover:text-blue-700 mt-2 hover:underline transition-colors"
                                        >
                                            Clear search
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Help Resources */}
                    <div className="mb-10 md:mb-12">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Help Resources</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {resources.map((res, i) => (
                                <ResourceCard key={i} resource={res} />
                            ))}
                        </div>
                    </div>

                    {/* Create Support Ticket */}
                    <div className="mb-10 md:mb-12 bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Create Support Ticket</h2>
                        <p className="text-sm text-gray-500 mb-5">
                            Can't find what you're looking for? Send us a detailed message and we'll get back to you.
                        </p>
                        <form ref={formRef} onSubmit={handleSubmitTicket} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Briefly describe your issue"
                                    required
                                    className={`w-full border ${formErrors.subject ? 'border-red-300' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200`}
                                    value={ticketForm.subject}
                                    onChange={handleInputChange}
                                    disabled={loading.submitting}
                                />
                                {formErrors.subject && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    required
                                    className={`w-full border ${formErrors.category ? 'border-red-300' : 'border-gray-300'} rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200`}
                                    value={ticketForm.category}
                                    onChange={handleInputChange}
                                    disabled={loading.submitting}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.toLowerCase()}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.category && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Please provide detailed information about your issue"
                                    rows={5}
                                    required
                                    className={`w-full border ${formErrors.message ? 'border-red-300' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all duration-200`}
                                    value={ticketForm.message}
                                    onChange={handleInputChange}
                                    disabled={loading.submitting}
                                />
                                {formErrors.message && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading.submitting}
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading.submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FiSend /> Submit Ticket
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* My Support Tickets */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">My Support Tickets</h2>
                            <span className="text-sm text-gray-500">
                                {submittedTickets.length} {submittedTickets.length === 1 ? 'ticket' : 'tickets'}
                            </span>
                        </div>

                        {loading.tickets ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading tickets...</p>
                            </div>
                        ) : submittedTickets.length > 0 ? (
                            <div className="space-y-4">
                                {submittedTickets.map((ticket) => (
                                    <div
                                        key={ticket._id}
                                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer hover-lift"
                                        onClick={() => setSelectedTicket(ticket)}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <p className="font-medium text-gray-800">{ticket.title}</p>
                                                    <span className="text-xs text-gray-500">#{ticket._id?.slice(-6)}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {ticket.category?.charAt(0).toUpperCase() + ticket.category?.slice(1) || 'Unknown'} •
                                                    Created: {formatDate(ticket.createdAt)} •
                                                    Updated: {formatDate(ticket.updatedAt)}
                                                </p>
                                                <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                                <div className="flex gap-2">
                                                    <span
                                                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${getStatusColor(ticket.status)}`}
                                                    >
                                                        {formatStatus(ticket.status)}
                                                    </span>
                                                    {/* <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
                                                        {ticket.priority}
                                                    </span> */}
                                                </div>
                                                <button
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 hover:underline transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTicket(ticket);
                                                    }}
                                                >
                                                    <FiFileText /> View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">You don't have any support tickets yet.</p>
                                <button
                                    onClick={() => {
                                        const formElement = document.querySelector('form');
                                        if (formElement) {
                                            formElement.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-blue-600 hover:text-blue-700 mt-2 hover:underline transition-colors"
                                >
                                    Create your first ticket
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ticket Details Modal */}
                {selectedTicket && (
                    <TicketDetailsModal
                        ticket={selectedTicket}
                        onClose={() => setSelectedTicket(null)}
                        getStatusColor={getStatusColor}
                        getPriorityColor={getPriorityColor}
                        formatStatus={formatStatus}
                        formatDate={formatDate}
                    />
                )}

                {/* Live Chat */}
                {showChat && <LiveChat onClose={() => setShowChat(false)} />}
            </section>
        </>
    );
}