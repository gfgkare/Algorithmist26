import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Lock, Search, RefreshCw, Eye, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'dayscholar', 'hostler'

    const ADMIN_PASSWORD = "gfgalgo"; // Use Vercel env var or fallback to "admin"

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert("Indices Incorrect!");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'registrations'));
            const data = querySnapshot.docs.map((docSnapshot) => ({
                id: docSnapshot.id,
                ...docSnapshot.data()
            }));

            // Sort by latest first
            setRegistrations(data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Error fetching data");
        }
        setLoading(false);
    };

    const viewScreenshot = async (userId) => {
        setLoading(true);
        try {
            const paymentDoc = await getDoc(doc(db, 'payments', userId));
            if (paymentDoc.exists()) {
                setSelectedImage(paymentDoc.data().screenshot);
            } else {
                alert("Screenshot not found!");
            }
        } catch (err) {
            console.error("Error fetching payment:", err);
            alert("Failed to load image");
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = registrations.filter(user => {
        const matchesSearch = (
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.regNo?.includes(searchTerm) ||
            user.transactionId?.includes(searchTerm)
        );
        const matchesFilter = filterType === 'all' || user.accommodation === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleExport = () => {
        if (filteredUsers.length === 0) {
            alert("No filtered data to export!");
            return;
        }

        const hasHostlers = filteredUsers.some(u => u.accommodation === 'hostler');

        let headers = ["Name", "Registration Number", "Year", "Section", "Stream", "Phone", "Type"];
        if (hasHostlers) {
            headers = [...headers, "Hostel", "Room", "Warden Name", "Warden Phone"];
        }
        headers.push("Transaction ID", "Submitted At");

        const csvRows = filteredUsers.map(user => {
            const row = [
                user.name,
                `"${user.regNo}"`,
                user.year,
                user.section,
                user.stream,
                user.phone,
                user.accommodation === 'dayscholar' ? 'Day Scholar' : user.accommodation
            ];

            if (hasHostlers) {
                row.push(
                    user.hostelName || '-',
                    user.roomNo || '-',
                    user.wardenName || '-',
                    user.wardenPhone || '-'
                );
            }

            row.push(
                user.transactionId,
                new Date(user.submittedAt).toLocaleString()
            );

            return row.join(',');
        });

        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const fileName = filterType === 'all' ? 'all_registrations' : `${filterType}s`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 rounded-2xl border border-green-500/30 max-w-md w-full text-center backdrop-blur-md"
                >
                    <Lock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-6">Restricted Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />
                        <button type="submit" className="w-full bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition-colors">
                            Unlock Panel
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                >
                    <h1 className="text-3xl font-bold text-white">Admin <span className="text-green-500">Dashboard</span></h1>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search student..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 cursor-pointer"
                        >
                            <option value="all" className="bg-gray-900">All Types</option>
                            <option value="dayscholar" className="bg-gray-900">Day Scholar</option>
                            <option value="hostler" className="bg-gray-900">Hostler</option>
                        </select>
                        <button onClick={fetchData} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white transition-colors" title="Refresh Data">
                            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
                        >
                            <Download size={18} />
                            <span className="hidden md:inline">Export CSV</span>
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-xl border border-white/10 overflow-hidden overflow-x-auto backdrop-blur-sm"
                >
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-white/5 text-green-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Reg No</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Section</th>
                                <th className="px-6 py-4">Stream</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Hostel</th>
                                <th className="px-6 py-4">Room</th>
                                <th className="px-6 py-4">Warden</th>
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4 text-center">Screenshot</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.regNo}</td>
                                    <td className="px-6 py-4">{user.year}</td>
                                    <td className="px-6 py-4">{user.section}</td>
                                    <td className="px-6 py-4">{user.stream}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4 capitalize">
                                        {user.accommodation === 'dayscholar' ? 'Day Scholar' : (user.accommodation || 'N/A')}
                                    </td>
                                    <td className="px-6 py-4">{user.accommodation === 'hostler' ? user.hostelName : '-'}</td>
                                    <td className="px-6 py-4">{user.accommodation === 'hostler' ? user.roomNo : '-'}</td>
                                    <td className="px-6 py-4 text-xs">
                                        {user.accommodation === 'hostler' ? (
                                            <>
                                                <div className="text-white">{user.wardenName}</div>
                                                <div className="text-gray-500">{user.wardenPhone}</div>
                                            </>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm">{user.transactionId}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => viewScreenshot(user.id)}
                                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs hover:bg-green-500 hover:text-black transition-colors flex items-center justify-center gap-1 mx-auto"
                                        >
                                            <Eye size={14} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && !loading && (
                                <tr className="text-center">
                                    <td colSpan="6" className="py-8 text-gray-500">No registrations found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="relative max-w-3xl w-full bg-white/5 p-2 rounded-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
                            >
                                <X size={32} />
                            </button>
                            <img src={selectedImage} alt="Payment Proof" className="w-full h-auto rounded-xl max-h-[80vh] object-contain" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
