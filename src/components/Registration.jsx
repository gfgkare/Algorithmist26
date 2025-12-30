import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Book, Hash, Phone, MapPin, Building, Home, ArrowLeft, CreditCard, Upload, Image as ImageIcon, Users, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TiltCard from './TiltCard';

import { collection, addDoc, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const Registration = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        section: '',
        year: '',
        stream: '',
        phone: '',
        accommodation: 'dayscholar', // dayscholar or hostler
        // city: '', // Removed as per request
        hostelName: '',
        roomNo: '',
        wardenName: '',
        wardenPhone: '',
        transactionId: '',
        screenshot: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Helper to compress image and convert to base64
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200; // Better quality for screenshots
                    let width = img.width;
                    let height = img.height;

                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7)); // 70% quality balanced for readablity
                };
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!formData.screenshot) {
                alert("Please upload the payment screenshot!");
                setIsSubmitting(false);
                return;
            }

            // Check for duplicate registration
            const registrationsRef = collection(db, 'registrations');
            const q = query(registrationsRef, where("regNo", "==", formData.regNo));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("This Registration Number is already registered!");
                setIsSubmitting(false);
                return;
            }

            // 1. Prepare Data (CRITICAL: Remove raw File object which causes Firestore errors)
            const { screenshot, ...restOfData } = formData;
            const userData = {
                ...restOfData,
                screenshotStatus: 'Uploaded',
                submittedAt: new Date().toISOString()
            };

            // 2. Save to Firestore 'registrations' (ref already defined above)
            const docRef = await addDoc(registrationsRef, userData);

            // 3. Compress and Save Screenshot to 'payments' with SAME ID
            const base64Image = await compressImage(formData.screenshot);
            await setDoc(doc(db, 'payments', docRef.id), {
                transactionId: formData.transactionId,
                regNo: formData.regNo,
                screenshot: base64Image,
                linkedRegistrationId: docRef.id,
                submittedAt: new Date().toISOString()
            });

            alert("Registration Successful!");
            navigate('/success');
            setFormData({
                name: '',
                regNo: '',
                section: '',
                year: '',
                stream: '',
                phone: '',
                accommodation: 'dayscholar',
                hostelName: '',
                roomNo: '',
                wardenName: '',
                transactionId: '',
                screenshot: null
            });

        } catch (error) {
            console.error("Error submitting registration:", error);
            alert("Registration Failed: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden flex items-center justify-center">
            {/* Background elements inherited from App/Layout via z-index, but we can add local ones if needed */}

            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                <Link to="/" className="flex items-center gap-2 text-green-400 hover:text-white transition-colors font-semibold bg-black/40 px-4 py-2 rounded-full border border-green-500/30 backdrop-blur-md">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl relative z-10"
            >
                <div className="text-center mb-6 md:mb-10">
                    <h2 className="text-2xl md:text-5xl font-black mb-2 tracking-normal text-white leading-tight">
                        Participant <span className="text-green-500">Registration</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">Join the Algorithmist'26 Challenge</p>
                </div>

                <div className="glass-card p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl relative overflow-hidden">

                    {/* Compact Important Note */}
                    <div className="mb-8 p-4 rounded-xl bg-black/40 border border-red-500/20 flex items-center gap-3 backdrop-blur-sm">
                        <div className="text-red-500 shrink-0">
                            <AlertTriangle size={18} />
                        </div>
                        <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed">
                            <span className="text-red-500 font-bold mr-1 uppercase tracking-wider">Note:</span>
                            Ensure all details are <span className="text-white font-semibold">accurate</span> before submission. Once registered, details <span className="text-red-400 font-semibold underline">cannot be modified</span> and will be used for <span className="text-white font-semibold underline italic">CERTIFICATES & CREDITS</span>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Personal Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg md:text-xl font-bold text-green-400 border-b border-green-500/20 pb-2 mb-4">Personal Details</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white text-sm md:text-base focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Name(as per SIS login)"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Registration Number</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <Hash size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="regNo"
                                            required
                                            value={formData.regNo}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white text-sm md:text-base focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Reg No"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Section</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <Users size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="section"
                                            required
                                            value={formData.section}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Section"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Year of Study</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <Book size={18} />
                                        </div>
                                        <select
                                            name="year"
                                            required
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-gray-900 text-gray-500">Select Year</option>
                                            <option value="1" className="bg-gray-900">1st Year</option>
                                            <option value="2" className="bg-gray-900">2nd Year</option>
                                            <option value="3" className="bg-gray-900">3rd Year</option>
                                            <option value="4" className="bg-gray-900">4th Year</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Stream / Branch</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <Book size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="stream"
                                            required
                                            value={formData.stream}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Stream/Branch"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-gray-400 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            pattern="[0-9]{10}"
                                            minLength={10}
                                            maxLength={10}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="10 digit mobile number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accommodation Section */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-lg md:text-xl font-bold text-green-400 border-b border-green-500/20 pb-2 mb-4">Accommodation Details</h3>

                            <div className="flex gap-6 mb-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.accommodation === 'dayscholar' ? 'border-green-500' : 'border-gray-500'}`}>
                                        {formData.accommodation === 'dayscholar' && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="accommodation"
                                        value="dayscholar"
                                        checked={formData.accommodation === 'dayscholar'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className={`text-lg font-medium transition-colors ${formData.accommodation === 'dayscholar' ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>Day Scholar</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.accommodation === 'hostler' ? 'border-green-500' : 'border-gray-500'}`}>
                                        {formData.accommodation === 'hostler' && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="accommodation"
                                        value="hostler"
                                        checked={formData.accommodation === 'hostler'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className={`text-lg font-medium transition-colors ${formData.accommodation === 'hostler' ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>Hostler</span>
                                </label>
                            </div>

                            {/* Conditional Fields */}
                            <motion.div
                                className="overflow-hidden"
                                initial={false}
                                animate={{ height: 'auto', opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {formData.accommodation === 'hostler' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="grid md:grid-cols-2 gap-6 mt-4"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400 ml-1">Hostel Name</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                                    <Building size={18} />
                                                </div>
                                                <select
                                                    name="hostelName"
                                                    required
                                                    value={formData.hostelName}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-gray-900 text-gray-500">Select Hostel</option>
                                                    <option value="MH-1" className="bg-gray-900">MH-1</option>
                                                    <option value="MH-2" className="bg-gray-900">MH-2</option>
                                                    <option value="MH-3" className="bg-gray-900">MH-3</option>
                                                    <option value="MH-6" className="bg-gray-900">MH-6</option>
                                                    <option value="MH-7" className="bg-gray-900">MH-7</option>
                                                    <option value="PG" className="bg-gray-900">PG</option>
                                                    <option value="LH-2" className="bg-gray-900">LH-2</option>
                                                    <option value="LH-3" className="bg-gray-900">LH-3</option>
                                                    <option value="LH-4" className="bg-gray-900">LH-4</option>
                                                    <option value="LH-5" className="bg-gray-900">LH-5</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400 ml-1">Room Number</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                                    <Home size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="roomNo"
                                                    required
                                                    value={formData.roomNo}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                                    placeholder="Enter Room Number"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400 ml-1">Warden Name</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="wardenName"
                                                    required
                                                    value={formData.wardenName}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                                    placeholder="Enter Warden's Name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400 ml-1">Warden Phone Number</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                                    <Phone size={18} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="wardenPhone"
                                                    required
                                                    pattern="[0-9]{10}"
                                                    minLength={10}
                                                    maxLength={10}
                                                    value={formData.wardenPhone}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                                    placeholder="10 digit mobile number"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-6 pt-2">
                            <h3 className="text-xl font-bold text-green-400 border-b border-green-500/20 pb-2 mb-4">Payment Details</h3>

                            <div className="flex flex-col items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                                <p className="text-gray-400 text-sm mb-2">Scan QR Code to Pay</p>
                                <div className="w-48 h-48 bg-white p-2 rounded-xl">
                                    <img src="/payment.jpeg" alt="Payment QR Code" className="w-full h-full object-contain" />
                                </div>
                                <p className="text-green-400 font-bold mt-2">Registration Fee: ₹150</p>
                                <p className="text-white-600 font-bold mt-2">UPI ID: 69097701@ubin</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Transaction ID</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <CreditCard size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="transactionId"
                                            required
                                            value={formData.transactionId}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Transaction ID"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Payment Screenshot</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <Upload size={18} />
                                        </div>
                                        <input
                                            type="file"
                                            name="screenshot"
                                            required
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-2.5 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-400 cursor-pointer text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25 mt-8 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    Registering...
                                </>
                            ) : (
                                'Register Now'
                            )}
                        </button>

                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Registration;
