"use client";

import { useState } from "react";
import { ChevronRight, User } from "lucide-react";

interface Account {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function AccountSelectionPage() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en-US");

  const accounts: Account[] = [
    {
      id: "1",
      name: "Orange AMER",
      email: "orange@gmail.com",
      avatar: "O",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "J",
    },
  ];

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Redirect to main app
      window.location.href = "/";
    }, 1500);
  };

  const handleAnotherAccount = () => {
    setIsLoading(true);
    // Simulate opening social login again
    setTimeout(() => {
      // This would typically open the social provider's auth window
      alert("Please sign in with another account");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900">POSE-LA</h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose your account to enter the application
          </p>
        </div>

        {/* Accounts List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          {accounts.map((account) => (
            <div key={account.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {account.avatar ? (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {account.avatar}
                        </span>
                      </div>
                    ) : (
                      <User className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {account.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {account.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAccountSelect(account.id)}
                  disabled={isLoading}
                  className="ml-4 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                >
                  {isLoading ? "Continuing..." : "Continue"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Choose Another Account */}
        <div className="mt-4 text-center">
          <button
            onClick={handleAnotherAccount}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
          >
            Choose another account
          </button>
        </div>

        {/* Language Selector */}
        <div className="mt-8 text-center">
          <label htmlFor="language" className="sr-only">
            Select language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          >
            <option value="en-US">English (United States)</option>
            <option value="fr-FR">French (France)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="de-DE">German (Germany)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
