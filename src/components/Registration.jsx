import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Book, Hash, Phone, MapPin, Building, Home, ArrowLeft, CreditCard, Upload, Image as ImageIcon, Users, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TiltCard from './TiltCard';

import { collection, addDoc, doc, setDoc, query, where, getDocs, runTransaction } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const Registration = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        email: '',
        gender: '',
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
    const [errors, setErrors] = useState({
        name: '',
        regNo: '',
        email: '',
        gender: '',
        section: '',
        year: '',
        stream: '',
        phone: '',
        hostelName: '',
        roomNo: '',
        wardenName: '',
        wardenPhone: '',
        transactionId: '',
        screenshot: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            // Clear error when file is selected
            setErrors(prev => ({ ...prev, [name]: '' }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            // Clear required error as user types
            if (value.trim()) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    const handleBlur = async (e) => {
        const { name, value } = e.target;
        let errorMsg = '';

        // Required Check
        if (!value || (typeof value === 'string' && !value.trim())) {
            errorMsg = "This field is required";
        }

        if (name === 'email' && value) {
            if (!value.toLowerCase().endsWith('@klu.ac.in')) {
                errorMsg = "Use official KLU email ID (@klu.ac.in)";
            } else {
                // Check for duplicate email
                try {
                    const registrationsRef = collection(db, 'registrations');
                    const q = query(registrationsRef, where("email", "==", value.toLowerCase()));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        errorMsg = "This Email ID is already registered!";
                    }
                } catch (error) {
                    console.error("Error checking email:", error);
                }
            }
        }
        if ((name === 'phone' || name === 'wardenPhone') && value) {
            if (!/^[0-9]{10}$/.test(value)) {
                errorMsg = "Enter a valid 10-digit number";
            }
        }
        if (name === 'transactionId' && value) {
            try {
                const paymentsRef = collection(db, 'payments');
                const q = query(paymentsRef, where("transactionId", "==", value));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    errorMsg = "This Transaction ID has already been used!";
                }
            } catch (error) {
                console.error("Error checking transaction ID:", error);
            }
        }
        if (name === 'regNo' && value) {
            try {
                const registrationsRef = collection(db, 'registrations');
                const q = query(registrationsRef, where("regNo", "==", value));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    errorMsg = "This Registration Number is already registered!";
                }
            } catch (error) {
                console.error("Error checking registration number:", error);
            }
        }
        setErrors(prev => ({
            ...prev,
            [name]: errorMsg
        }));
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
                    const MAX_WIDTH = 800; // Optimized for speed and readability
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
                    resolve(canvas.toDataURL('image/jpeg', 0.6)); // 60% quality for faster upload
                };
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform final validation
        const newErrors = {};
        const requiredFields = ['name', 'regNo', 'email', 'gender', 'section', 'year', 'stream', 'phone', 'transactionId'];
        if (formData.accommodation === 'hostler') {
            requiredFields.push('hostelName', 'roomNo', 'wardenName', 'wardenPhone');
        }

        requiredFields.forEach(field => {
            if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
                newErrors[field] = "This field is required";
            }
        });

        if (!formData.screenshot) {
            newErrors.screenshot = "Please upload the payment screenshot!";
        }

        // Check if any errors already existed from blur events
        const hasExistingErrors = Object.values(errors).some(err => err !== '');

        if (Object.keys(newErrors).length > 0 || hasExistingErrors) {
            setErrors(prev => ({ ...prev, ...newErrors }));
            setIsSubmitting(false);
            // Scroll to first error
            const firstErrorField = Object.keys(newErrors)[0] || Object.keys(errors).find(k => errors[k]);
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        try {
            // 1. Strict Domain Re-verification
            if (!formData.email.toLowerCase().endsWith('@klu.ac.in')) {
                setErrors(prev => ({ ...prev, email: "Use official KLU email (@klu.ac.in)" }));
                setIsSubmitting(false);
                return;
            }

            // 2. Prepare Data & Compress Image FIRST (Outside Transaction for Speed)
            const base64Image = await compressImage(formData.screenshot);
            const { screenshot, ...restOfData } = formData;
            const registrationId = formData.regNo.toUpperCase().trim();
            const transactionDocId = formData.transactionId.toUpperCase().trim();

            const userData = {
                ...restOfData,
                screenshotStatus: 'Uploaded',
                submittedAt: new Date().toISOString()
            };

            // 3. BROAD SEARCH (Check ALL existing records regardless of ID format)
            const submissionErrors = {};
            const registrationsRef = collection(db, 'registrations');
            const paymentsRef = collection(db, 'payments');

            const [emailSnap, regNoSnap, transSnap] = await Promise.all([
                getDocs(query(registrationsRef, where("email", "==", formData.email.toLowerCase()))),
                getDocs(query(registrationsRef, where("regNo", "==", formData.regNo))),
                getDocs(query(paymentsRef, where("transactionId", "==", formData.transactionId)))
            ]);

            if (!emailSnap.empty) submissionErrors.email = "This Email ID is already registered!";
            if (!regNoSnap.empty) submissionErrors.regNo = "This Registration Number is already registered!";
            if (!transSnap.empty) submissionErrors.transactionId = "This Transaction ID has already been used!";

            if (Object.keys(submissionErrors).length > 0) {
                setErrors(prev => ({ ...prev, ...submissionErrors }));
                setIsSubmitting(false);
                const firstErrorField = Object.keys(submissionErrors)[0];
                const element = document.getElementsByName(firstErrorField)[0];
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // 4. ATOMIC LOCK (Prevent same-millisecond collisions)
            await runTransaction(db, async (transaction) => {
                const regDocRef = doc(db, 'registrations', registrationId);
                const payDocRef = doc(db, 'payments', transactionDocId);

                const regSnapTx = await transaction.get(regDocRef);
                const paySnapTx = await transaction.get(payDocRef);

                if (regSnapTx.exists() || paySnapTx.exists()) {
                    throw {
                        type: 'validation', errors: {
                            regNo: regSnapTx.exists() ? "Collision detected! Please wait." : "",
                            transactionId: paySnapTx.exists() ? "Collision detected! Please wait." : ""
                        }
                    };
                }

                transaction.set(regDocRef, userData);
                transaction.set(payDocRef, {
                    transactionId: formData.transactionId,
                    regNo: formData.regNo,
                    screenshot: base64Image,
                    linkedRegistrationId: registrationId,
                    submittedAt: new Date().toISOString()
                });
            });

            alert("Registration Successful!");
            navigate('/success');
            setFormData({
                name: '',
                regNo: '',
                email: '',
                gender: '',
                section: '',
                year: '',
                stream: '',
                phone: '',
                accommodation: 'dayscholar',
                hostelName: '',
                roomNo: '',
                wardenName: '',
                wardenPhone: '',
                transactionId: '',
                screenshot: null
            });

        } catch (error) {
            console.error("Error submitting registration:", error);
            if (error.type === 'validation') {
                setErrors(prev => ({ ...prev, ...error.errors }));
                const firstErrorField = Object.keys(error.errors)[0];
                const element = document.getElementsByName(firstErrorField)[0];
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert("Registration Failed! check the details carefully!" + (error.message || ''));
            }
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

                <div className="glass-card p-5 md:p-10 rounded-3xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl relative overflow-hidden">

                    {/* Compact Important Note */}
                    <div className="mb-8 p-4 rounded-xl bg-black/40 border border-red-500/20 flex items-center gap-3 backdrop-blur-sm">
                        <div className="text-red-500 shrink-0">
                            <AlertTriangle size={18} />
                        </div>
                        <p className="text-gray-300 text-[12px] md:text-xs leading-relaxed">
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Name(as per SIS login)"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Reg No"
                                        />
                                    </div>
                                    {errors.regNo && <p className="text-red-500 text-xs mt-1 ml-1">{errors.regNo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Official Email ID</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <CreditCard size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="yourname@klu.ac.in"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Gender</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                                            <User size={18} />
                                        </div>
                                        <select
                                            name="gender"
                                            required
                                            value={formData.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-gray-900 text-gray-500">Select Gender</option>
                                            <option value="Male" className="bg-gray-900">Male</option>
                                            <option value="Female" className="bg-gray-900">Female</option>
                                            <option value="Other" className="bg-gray-900">Other</option>
                                        </select>
                                    </div>
                                    {errors.gender && <p className="text-red-500 text-xs mt-1 ml-1">{errors.gender}</p>}
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Section"
                                        />
                                    </div>
                                    {errors.section && <p className="text-red-500 text-xs mt-1 ml-1">{errors.section}</p>}
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-gray-900 text-gray-500">Select Year</option>
                                            <option value="1" className="bg-gray-900">1st Year</option>
                                            <option value="2" className="bg-gray-900">2nd Year</option>
                                            <option value="3" className="bg-gray-900">3rd Year</option>
                                            <option value="4" className="bg-gray-900">4th Year</option>
                                        </select>
                                    </div>
                                    {errors.year && <p className="text-red-500 text-xs mt-1 ml-1">{errors.year}</p>}
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Stream/Branch"
                                        />
                                    </div>
                                    {errors.stream && <p className="text-red-500 text-xs mt-1 ml-1">{errors.stream}</p>}
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="10 digit mobile number"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
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
                                                    onBlur={handleBlur}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
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
                                            {errors.hostelName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.hostelName}</p>}
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
                                                    onBlur={handleBlur}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                                    placeholder="Enter Room Number"
                                                />
                                            </div>
                                            {errors.roomNo && <p className="text-red-500 text-xs mt-1 ml-1">{errors.roomNo}</p>}
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
                                                    onBlur={handleBlur}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                                    placeholder="Enter Warden's Name"
                                                />
                                            </div>
                                            {errors.wardenName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.wardenName}</p>}
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
                                                    onBlur={handleBlur}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                                    placeholder="10 digit mobile number"
                                                />
                                            </div>
                                            {errors.wardenPhone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.wardenPhone}</p>}
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
                                            onBlur={handleBlur}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                            placeholder="Enter Transaction ID"
                                        />
                                    </div>
                                    {errors.transactionId && <p className="text-red-500 text-xs mt-1 ml-1">{errors.transactionId}</p>}
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
                                    {errors.screenshot && <p className="text-red-500 text-xs mt-1 ml-1">{errors.screenshot}</p>}
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
