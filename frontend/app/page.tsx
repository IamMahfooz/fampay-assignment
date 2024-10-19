"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation"

export default function SearchForm() {
    const router = useRouter();
    const [keyword, setKeyword] = useState('');
    const [modifyKeyword, setModifyKeyword] = useState('No');
    const [maxResults, setMaxResults] = useState('');
    const [searchFrom, setSearchFrom] = useState('youtube');
    const [lastDate,setLastDate]=useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = {
            keyword,
            modifyKeyword,
            maxResults
        };
        if (searchFrom === 'youtube') {
            router.push(`/youtube?keyword=${keyword}&modifyKeyword=${modifyKeyword}&maxResults=${maxResults}&startDate=${lastDate}`);
        } else {
            router.push(`/database?keyword=${keyword}&modifyKeyword=${modifyKeyword}&maxResults=${maxResults}&startDate=${lastDate}`);
        }
    };

    return (
        <>
            <title>Search - Home Page</title>
            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-center text-gray-900 dark:text-red-400 text-2xl mb-4 font-bold">
                    Search Videos
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
                    <strong>Your next favorite  AI enabled video search is just a click away!</strong>
                    <br/>
                    Features - Local & Server pagination , AI query enhancement , database / youtube Query , Cronjobs for continous fetching ,results fetching in reverse chronology of date and many more to come.....
                </p>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="w-full">
                        {/* Search From Dropdown */}
                        <div className="mb-6">
                            <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-2">
                                Search From
                            </label>
                            <select
                                value={searchFrom}
                                onChange={(e) => setSearchFrom(e.target.value)}
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm w-full dark:bg-gray-800 dark:text-gray-100"
                            >
                                <option value="youtube">YouTube</option>
                                <option value="database">Database</option>
                            </select>
                        </div>

                        {/* Keyword Input */}
                        <div className="mb-6">
                            <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-2">
                                Enter a Search Keyword
                            </label>
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="e.g., Web Development Tutorials"
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm w-full dark:bg-gray-800 dark:text-gray-100"
                            />
                        </div>

                        {/* Modify Keyword */}
                        <div className="mb-6">
                            <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-2">
                                Modify Keyword for Better Search
                            </label>
                            <select
                                value={modifyKeyword}
                                onChange={(e) => setModifyKeyword(e.target.value)}
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm w-full dark:bg-gray-800 dark:text-gray-100"
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        {/* Max Results Input */}
                        <div className="mb-6">
                            <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-2">
                                Maximum Number of Results
                            </label>
                            <input
                                type="number"
                                value={maxResults}
                                onChange={(e) => setMaxResults(e.target.value)}
                                placeholder="e.g., 10"
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm w-full dark:bg-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-2">
                                Last how many days of videos ?
                            </label>
                            <input
                                type="number"
                                value={lastDate}
                                onChange={(e) => setLastDate(e.target.value)}
                                placeholder="e.g., 20"
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm w-full dark:bg-gray-800 dark:text-gray-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full mt-6 p-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-md"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
