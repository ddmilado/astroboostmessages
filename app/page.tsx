"use client";
import { useState, useEffect } from "react";
import { Client, Databases } from 'appwrite';

// Define the interface for message data
interface Message {
  $id: string;
  $createdAt: string;
  $collectionId: string;
  $databaseId: string;
  $updatedAt: string;
  $permissions: string[];
  name: string;
  email: string;
  message: string;
}

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67b353fb001e6802cb02');
const databases = new Databases(client);

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await databases.listDocuments<Message>(
        '67b35525003baa0485f6',
        '67b35571002f395f3f36',
      );
      setMessages(response.documents);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Customer Messages
        </h1>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 p-6">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages found</p>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.$id}
                  className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-700 text-lg font-semibold">
                          {message.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {message.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {message.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-13 mt-3">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {message.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Received on {new Date(message.$createdAt).toLocaleDateString('en-AE', { timeZone: 'Asia/Dubai' })} at {new Date(message.$createdAt).toLocaleTimeString('en-AE', { 
                          timeZone: 'Asia/Dubai',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
