import React, { useEffect, useState } from 'react';
import { hrApi } from '../../services/api';
import { toast } from 'react-hot-toast';

const LeaveApproval = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            setLoading(true);
            const res = await hrApi.getLeaves();
            setLeaves(res.data || []);
        } catch (err) {
            toast.error("Failed to fetch leaves");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await hrApi.updateLeaveStatus(id, status);
            toast.success(`Leave ${status.toLowerCase()}`);
            fetchLeaves();
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const getStatusBadge = (status) => {
        const baseClass =
            "text-sm font-semibold px-3 py-1 rounded-full border border-opacity-40";
        if (status === 'Approved')
            return <span className={`${baseClass} text-green-300 border-green-500 bg-green-500/10`}>{status}</span>;
        if (status === 'Rejected')
            return <span className={`${baseClass} text-red-300 border-red-500 bg-red-500/10`}>{status}</span>;
        return <span className={`${baseClass} text-yellow-300 border-yellow-500 bg-yellow-500/10`}>{status}</span>;
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300">📝 Leave Requests</h1>

            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="loader border-4 border-t-4 border-cyan-400 rounded-full h-12 w-12 animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl border border-cyan-400/30 shadow-xl">
                    <table className="min-w-full divide-y divide-cyan-500/30">
                        <thead className="bg-cyan-800/20">
                        <tr>
                            {['Name', 'Email', 'From', 'To', 'Location', 'Status', 'Action'].map((head) => (
                                <th
                                    key={head}
                                    className="px-4 py-3 text-left text-xs font-bold text-cyan-200 uppercase tracking-wider"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-cyan-600/30">
                        {leaves.map((leave) => (
                            <tr key={leave._id} className="hover:bg-cyan-800/10 transition">
                                <td className="px-4 py-3 text-sm text-cyan-100">{leave.name}</td>
                                <td className="px-4 py-3 text-sm text-cyan-100">{leave.email}</td>
                                <td className="px-4 py-3 text-sm text-cyan-200">{leave.fromDate}</td>
                                <td className="px-4 py-3 text-sm text-cyan-200">{leave.toDate}</td>
                                <td className="px-4 py-3 text-sm text-cyan-100">{leave.location}</td>
                                <td className="px-4 py-3">{getStatusBadge(leave.status)}</td>
                                <td className="px-4 py-3">
                                    {leave.status === "Pending" ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateStatus(leave._id, "Approved")}
                                                className="px-3 py-1 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded shadow transition hover:shadow-md"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(leave._id, "Rejected")}
                                                className="px-3 py-1 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded shadow transition hover:shadow-md"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 italic text-sm">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LeaveApproval;