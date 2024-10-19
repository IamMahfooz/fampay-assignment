"use client"
import React, { useState, useEffect, useRef, use } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Define the video object type
interface Video {
    videoId: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
    publishedAt: string;
}

function Database() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword");
    const modifyKeyword = searchParams.get("modifyKeyword") === "true";
    const maxResults = parseInt(searchParams.get("maxResults") || "10", 10);
    const startDate = parseInt(searchParams.get("maxResults") || "10", 10)

    const [videos, setVideos] = useState<Video[]>([]); // Explicitly define the type
    const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]); // Explicitly define the type
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null); // Track errors
    const [emptyResponse, setEmptyResponse] = useState(false); // Track empty responses
    const isInitialRender = useRef(true);
    const [token,setToken]=useState("");

    useEffect(() => {
        // Prevent calling fetchVideos on the first render
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        fetchVideos();
    }, [keyword, modifyKeyword, maxResults]);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + 1.67;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [loading]);

    const fetchVideos = async () => {
        setLoading(true);
        setProgress(0);
        setError(null); // Reset error
        setEmptyResponse(false); // Reset empty response state

        try {
            const response = await fetch(`https://fampay-assignment-production-66b8.up.railway.app/youtube`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    keyword,
                    modify: modifyKeyword,
                    maxResults: maxResults,
                    nextPageToken: token,
                    startFrom: startDate,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error fetching videos: ${response.statusText}`);
            }

            const data: Video[] = await response.json(); // Make sure the response matches the `Video` type

            if (!data || data.length === 0) {
                // If data is empty, show "no videos found" message
                setEmptyResponse(true);
                setVideos([]);
                setDisplayedVideos([]);
                return;
            }

            setVideos(data); // Set all fetched videos
            setDisplayedVideos(data.slice(0, 10)); // Display first 10 videos initially
            setCurrentIndex(10); // Set index for next page
        } catch (error) {
            console.error("Error fetching videos:", (error as Error).message);
            setError("An error occurred while fetching videos. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        const newIndex = currentIndex + 10; // Move to the next set of 10 videos
        if (newIndex <= videos.length) {
            setCurrentIndex(newIndex);
            setDisplayedVideos(videos.slice(currentIndex, newIndex)); // Display next 10 videos
        } else {
            console.log("No more videos to show.");
        }
    };

    const handlePrevious = () => {
        const newIndex = currentIndex - 10;
        if (newIndex >= 0) {
            setCurrentIndex(newIndex);
            setDisplayedVideos(videos.slice(newIndex - 10, newIndex)); // Display previous 10 videos
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Results for "{keyword}"</h1>
            {loading ? (
                <div className="flex flex-col items-center">
                    <p className="text-gray-600 mb-2">Fetching results...</p>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            ) : error ? (
                <div className="text-red-600 text-center">{error}</div> // Display error message
            ) : emptyResponse ? (
                <div className="text-center text-gray-500">No videos found for your search.</div> // Display "no videos found"
            ) : (
                <>
                    <table className="min-w-full table-auto">
                        <tbody>
                            {displayedVideos.map((video, index) => (
                                <tr key={video.videoId || index} className="border-b">
                                    <td className="px-4 py-2">
                                        <a href={video.videoUrl}>
                                            <img
                                                src={video.thumbnailUrl}
                                                alt="Thumbnail"
                                                className="w-40 h-24 object-cover"
                                            />
                                        </a>
                                    </td>
                                    <td className="px-4 py-2">
                                        <a href={video.videoUrl} className="text-blue-600 font-medium hover:underline">
                                            {video.title}
                                        </a>
                                        <p className="text-gray-600 text-sm">{video.description.slice(0, 100)}...</p>
                                        <p className="text-gray-500 text-xs">{video.publishedAt}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-gray-300 text-black rounded-md"
                            disabled={currentIndex === 10}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                            disabled={currentIndex >= videos.length}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default function SubmissionForm() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Database />
        </Suspense>
    );
}
