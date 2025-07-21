import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserIcon, MailIcon, BriefcaseIcon, CalendarIcon } from "lucide-react";
import axios from "axios";

export default function EmployeeProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const { data } = await axios.get("/api/employee/profile");
            setProfile(data.data);
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <div className="p-6">Loading profile...</div>;

    if (!profile) return <div className="p-6 text-red-500">Profile not found</div>;

    return (
        <motion.div
            className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-blue-500" />
                Employee Profile
            </h2>

            <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                    <span><strong>Name:</strong> {profile.name}</span>
                </div>

                <div className="flex items-center gap-2">
                    <MailIcon className="w-5 h-5 text-gray-600" />
                    <span><strong>Email:</strong> {profile.email}</span>
                </div>

                <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-5 h-5 text-gray-600" />
                    <span><strong>Department:</strong> {profile.department || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gray-600" />
                    <span><strong>Joined On:</strong> {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </motion.div>
    );
}