import React from "react";

interface RateLimitModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSignUp: () => void;
}

const RateLimitModal: React.FC<RateLimitModalProps> = ({
	isOpen,
	onClose,
	onSignUp,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="bg-[#1f1828] p-6 rounded-lg shadow-md shadow-purple-700 border-1">
				<h2 className="text-xl font-bold mb-4">Rate Limit Exceeded</h2>
				<p className="mb-4">
					You've exceeded the rate limit. Please signup to continue
				</p>
				<div className="flex justify-end space-x-4">
					<button onClick={onClose} className="px-4 py-2 rounded-lg">
						Close
					</button>
					<button onClick={onSignUp} className="px-4 py-2 rounded-lg">
						Signup
					</button>
				</div>
			</div>
		</div>
	);
};

export default RateLimitModal;
