import React, { useState, useEffect } from "react";
import { useShortenUrl } from "../hooks/useShortenUrl";
import { useCheckCustomShortCode } from "../hooks/useCheckCustomShortCode";
import useDebounce from "../hooks/useDebounce";
import { getStoredUrls, addStoredUrl } from "../utils/storage";
import RateLimitModal from "./RateLimitModal";

const UrlForm = () => {
	const [longUrl, setLongUrl] = useState("");
	const [customShortCode, setCustomShortCode] = useState("");
	const [customShortCodeError, setCustomShortCodeError] = useState("");
	const [rateLimitError, setRateLimitError] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [recentUrls, setRecentUrls] = useState<string[]>(getStoredUrls());
	const { mutate, reset, data, isPending, isError, error } = useShortenUrl();
	const { data: customShortCodeData, isFetching: isCheckingCustomShortCode } =
		useCheckCustomShortCode(customShortCode);

	useEffect(() => {
		if (data) {
			setLongUrl("");
			setCustomShortCode("");
			setCustomShortCodeError("");
			setRateLimitError("");
			reset(); // reset  mutation state

			// add URL to browser storage
			addStoredUrl(data.shortUrl);
			setRecentUrls(getStoredUrls());
		}
	}, [data, reset]);
	// custom url validation
	const debouncedValidation = useDebounce(() => {
		if (customShortCodeData && !customShortCodeData.available) {
			setCustomShortCodeError("Custom short code is already in use");
		} else {
			setCustomShortCodeError("");
		}
	});
	useEffect(() => {
		debouncedValidation();
	}, [customShortCodeData, debouncedValidation]);

	// rate limiter error
	useEffect(() => {
		if (isError && error?.message) {
			console.log(error);
			setRateLimitError(error.message);
			setIsModalOpen(true);
		}
	}, [isError, error]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (customShortCode.trim().length === 0 && customShortCode.length > 0) {
			setCustomShortCodeError(
				"Custom short code cannot be empty or contain only spaces"
			);
			return;
		}

		if (customShortCodeError) {
			return;
		}

		mutate({ longUrl, customShortCode });
	};

	return (
		<div className="w-full max-w-md  rounded-xl shadow-lg p-6 space-y-6">
			<h1 className="text-2xl font-bold   text-center">URL Shortener</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					value={longUrl}
					onChange={(e) => {
						setLongUrl(e.target.value);
						setRateLimitError("");
					}}
					placeholder="Enter long URL"
					className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
					required
				/>
				<div>
					<div className="relative">
						<input
							type="text"
							value={customShortCode}
							onChange={(e) => {
								setCustomShortCode(e.target.value);
								setRateLimitError("");
							}}
							placeholder="Custom short code (optional)"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						/>
						{/* status icon */}
						<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg">
							{isCheckingCustomShortCode
								? "⏳"
								: customShortCodeError
								? "❌"
								: customShortCode
								? "✅"
								: ""}
						</span>
					</div>
				</div>
				{rateLimitError && (
					<p className="text-sm text-red-500 mt-1">{rateLimitError} </p>
				)}
				<button
					type="submit"
					disabled={isPending || !!customShortCodeError}
					className="w-full px-4 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-all"
				>
					{isPending ? "Shortening..." : "Shorten"}
				</button>
			</form>
			{data && (
				<div className="mt-4 p-4 bg-green-50 rounded-lg">
					<p className="text-green-700">
						Short URL:{" "}
						<a target="_blank" href={data.shortUrl} className="underline">
							{data.shortUrl}
						</a>
					</p>
				</div>
			)}
			{isError && !rateLimitError && (
				<div className="mt-4 p-4 bg-red-50 rounded-lg">
					<p className="text-red-700">Error: {error?.message}</p>
				</div>
			)}
			{/* Recent URL Section */}
			<details className="mt-6 bg-[#2a2433] p-4 rounded-md">
				<summary className="text-lg font-semibold cursor-pointer">
					Recent URLs
				</summary>
				<ul className="mt-2 space-y-2">
					{recentUrls.map((url, index) => (
						<li key={index} className="flex justify-between items-center">
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								{url}
							</a>
						</li>
					))}
				</ul>
			</details>
			{/* rateLimit modal */}
			<RateLimitModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSignUp={() => {
					// TODO: redirect to signup page
					console.log("redirecting to signup page...");
				}}
			/>
		</div>
	);
};

export default UrlForm;
