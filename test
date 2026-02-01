import React, { useState, useEffect } from 'react'
import { MapPin, Calendar, DollarSign, User, Loader2, X } from 'lucide-react';
import { useLoaderData } from 'react-router';
import toast, { Toaster } from 'react-hot-toast'; // Ensure you have react-hot-toast installed

// MOCK USER - Replace this with your actual Auth Context (e.g. const { user } = useAuth())
const user = {
    email: "user@example.com",
    displayName: "John Doe",
    photoURL: "https://ui-avatars.com/api/?name=John+Doe"
};

const IssueDetails = () => {
    const data = useLoaderData();
    const issue = data.result;

    const [showModal, setShowModal] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Fetch Contributions when component mounts
    useEffect(() => {
        if (issue?._id) {
            fetch(`http://localhost:3000/contributions?issueId=${issue._id}`)
                .then(res => res.json())
                .then(data => setContributions(data))
                .catch(err => console.error("Failed to load contributions", err));
        }
    }, [issue]);

    // 2. Calculate Progress
    const totalRaised = contributions.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const progressPercentage = Math.min((totalRaised / issue.amount) * 100, 100);

    // 3. Handle Form Submission
    const handleContributionSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const contributionData = {
            issueId: issue._id,
            issueTitle: issue.title,
            contributorName: form.contributorName.value,
            contributorEmail: user.email, // Using logged in user email
            contributorImage: user.photoURL,
            phoneNumber: form.phone.value,
            address: form.address.value,
            amount: form.contributionAmount.value,
            additionalInfo: form.additionalInfo.value,
        };

        try {
            const response = await fetch('http://localhost:3000/contributions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contributionData),
            });

            const result = await response.json();

            if (result._id) {
                toast.success('Contribution successful!');
                // Update UI immediately without refreshing
                setContributions([result, ...contributions]);
                setShowModal(false);
                form.reset();
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            {/* Toaster for notifications */}
            <Toaster />
            
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="h-96 overflow-hidden">
                                <img
                                    src={issue.image}
                                    alt={issue.title}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <div className="mb-4">
                                    <span className="badge badge-success text-sm text-white">
                                        {issue.category}
                                    </span>
                                </div>
                                <h1 className="text-3xl mb-4 text-gray-900 dark:text-white font-bold">{issue.title}</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        {issue.location}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        {new Date(issue.date || Date.now()).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <DollarSign className="h-5 w-5 mr-2" />
                                        Budget: ${issue.amount}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <User className="h-5 w-5 mr-2" />
                                        {issue.email || "Organizer"}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl mb-2 text-gray-900 dark:text-white font-semibold">Description</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{issue.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contributors Table */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="text-xl mb-4 text-gray-900 dark:text-white font-bold">Contributors</h3>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Contributor</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contributions.length > 0 ? (
                                                contributions.map((contrib) => (
                                                    <tr key={contrib._id}>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-10 h-10">
                                                                        <img src={contrib.contributorImage} alt={contrib.contributorName} />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{contrib.contributorName}</div>
                                                                    <div className="text-sm opacity-50">{contrib.contributorEmail}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-green-600 font-bold">${contrib.amount}</td>
                                                        <td>{new Date(contrib.createdAt).toLocaleDateString()}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-4">No contributions yet. Be the first!</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="text-xl mb-4 text-gray-900 dark:text-white font-bold">Contribution Progress</h3>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Total Raised</span>
                                        <span className="text-green-600 font-bold">${totalRaised}</span>
                                    </div>
                                    <progress className="progress progress-success w-full" value={progressPercentage} max="100"></progress>
                                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                                        <span>{Math.round(progressPercentage)}% of goal</span>
                                        <span>Goal: ${issue.amount}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-full" onClick={() => setShowModal(true)}>
                                    Pay Clean-Up Contribution
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contribution Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
                                <div>
                                    <h3 className="text-lg font-bold">Make a Contribution</h3>
                                    <p className="text-sm text-gray-500">Enter your details to contribute to this issue.</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-ghost btn-sm btn-circle"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="p-6">
                                <form onSubmit={handleContributionSubmit} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">Issue Title</label>
                                        <input className="input input-bordered w-full bg-gray-100" value={issue.title} disabled />
                                    </div>

                                    <div className="form-control">
                                        <label htmlFor="contributorName" className="label">Name *</label>
                                        <input
                                            id="contributorName"
                                            name="contributorName"
                                            className="input input-bordered w-full"
                                            defaultValue={user.displayName}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label htmlFor="contributorEmail" className="label">Email *</label>
                                        <input
                                            id="contributorEmail"
                                            type="email"
                                            className="input input-bordered w-full bg-gray-100"
                                            value={user.email}
                                            disabled
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label htmlFor="phone" className="label">Phone Number *</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label htmlFor="address" className="label">Address *</label>
                                        <input
                                            id="address"
                                            name="address"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label htmlFor="contributionAmount" className="label">Amount ($) *</label>
                                        <input
                                            id="contributionAmount"
                                            name="contributionAmount"
                                            type="number"
                                            min="1"
                                            step="1"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label htmlFor="additionalInfo" className="label">Additional Information</label>
                                        <textarea
                                            id="additionalInfo"
                                            name="additionalInfo"
                                            className="textarea textarea-bordered w-full"
                                            placeholder="Any additional notes (optional)"
                                            rows={3}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit Contribution'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IssueDetails