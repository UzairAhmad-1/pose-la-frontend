"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/ToastContainer";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
  MoreVertical,
  Send,
  Paperclip,
  Mic,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Download,
  Shield,
  Bell,
  Settings,
  User,
  ArrowUp,
  Lock,
  Eye,
  GitMerge,
  Ghost,
  Heart,
  Brain,
  Scan,
  Zap,
  Languages,
  Building,
  Users,
  Calendar,
  Cloud,
  Mail,
  LogOut,
  Trash2,
  Archive,
  EyeOff,
  Volume2,
  Play,
  Pause,
  HelpCircle,
  Star,
  Bug,
  Gift,
  ShieldCheck,
  Globe,
  Moon,
  Sun,
  MessageCircle,
  Home,
  Search,
  Filter,
  Grid,
  List,
  X,
  Check,
  Clock,
  HistoryIcon,
} from "lucide-react";

// Types
interface Card {
  id: string;
  title: string;
  pitch: string;
  type: "locked" | "mirror" | "bridge" | "phantom";
  sensitiveMode: boolean;
  group: string;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  cardTitle: string;
  lastMessage: string;
  timestamp: Date;
}

// Main Chat Page Component
export default function ChatPage() {
  const [currentView, setCurrentView] = useState<
    "spaces" | "groups" | "cards" | "chat"
  >("spaces");
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [sensitiveMode, setSensitiveMode] = useState(false);
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    "account" | "privacy" | "app" | "support"
  >("account");
  const { toasts, showToast, removeToast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data
  const thematicGroups = [
    { id: "wounds", name: "Invisible Wounds", count: 12 },
    { id: "overload", name: "Mental Overload", count: 8 },
    { id: "family", name: "Family Legacy / Mirror", count: 15 },
    { id: "sabotage", name: "Relational Self-Sabotage", count: 10 },
    { id: "healing", name: "Healing Journey", count: 9 },
    { id: "growth", name: "Personal Growth", count: 8 },
  ];

  const sampleCards: Card[] = [
    {
      id: "1",
      title: "I no longer want to beg to exist",
      pitch:
        "You're tired of reaching out to exist in the eyes of others. You forget yourself believing you have to prove your worth to be loved.",
      type: "mirror",
      sensitiveMode: true,
      group: "wounds",
    },
    {
      id: "2",
      title: "The weight of silence",
      pitch:
        "When words remain unspoken, they create echoes that shape our relationships and self-perception.",
      type: "phantom",
      sensitiveMode: false,
      group: "overload",
    },
    {
      id: "3",
      title: "Breaking inherited patterns",
      pitch:
        "Understanding how family legacy influences your current relationships and emotional responses.",
      type: "bridge",
      sensitiveMode: true,
      group: "family",
    },
  ];

  const cardTypes = {
    locked: {
      icon: Lock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      label: "Locked Card",
    },
    mirror: {
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      label: "Mirror Card",
    },
    bridge: {
      icon: GitMerge,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      label: "Bridge Card",
    },
    phantom: {
      icon: Ghost,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      label: "Phantom Card",
    },
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simulate SOYA response
    setTimeout(() => {
      const soyaResponse: Message = {
        id: Date.now() + 1,
        text: "I hear the depth in your words. Your feelings are valid and important. What else is coming up for you right now as you explore this space?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, soyaResponse]);
    }, 1000);
  };

  // Keyboard shortcuts
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  // Handle card selection with sensitive mode check
  const handleCardSelect = (card: Card) => {
    if (card.sensitiveMode && !sensitiveMode) {
      setSelectedCard(card);
      setShowSensitiveWarning(true);
    } else {
      setSelectedCard(card);
      setCurrentView("chat");
      setMessages([]);
    }
  };

  // Handle sensitive mode access
  const handleSensitiveAccess = (access: boolean) => {
    if (access) {
      setSensitiveMode(true);
      setCurrentView("chat");
      setMessages([]);
      showToast("Sensitive mode activated for this session", "success", 3000);
    }
    setShowSensitiveWarning(false);
  };

  // Start new conversation
  const handleNewConversation = () => {
    setMessages([]);
    showToast("New conversation started", "success", 2000);
  };

  // File attachment handler
  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`File "${file.name}" attached`, "success", 3000);
    }
  };

  // Render different views based on current state
  const renderCurrentView = () => {
    switch (currentView) {
      case "spaces":
        return <SpacesView onSpaceSelect={setSelectedSpace} />;
      case "groups":
        return (
          <GroupsView
            groups={thematicGroups}
            onGroupSelect={setSelectedGroup}
            onBack={() => setCurrentView("spaces")}
          />
        );
      case "cards":
        return (
          <CardsView
            cards={sampleCards}
            onCardSelect={handleCardSelect}
            onBack={() => setCurrentView("groups")}
          />
        );
      case "chat":
        return selectedCard ? (
          <ChatView card={selectedCard} messages={messages} />
        ) : null;
      default:
        return <SpacesView onSpaceSelect={setSelectedSpace} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">POSE-LÀ</h1>
          </div>
        </div>

        {/* New Conversation Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewConversation}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center">
            <HistoryIcon className="h-4 w-4 mr-2" />
            History
          </h3>

          {conversations.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Start a conversation to see your history here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Conversation list would be mapped here */}
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">Alex Morgan</p>
              <p className="text-xs text-gray-500">Free Trial • 2 days left</p>
            </div>
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Global Header */}
        <header className="bg-[#dde0e8] px-6 py-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center space-x-4">
            {currentView !== "spaces" && (
              <button
                onClick={() => {
                  if (currentView === "chat") setCurrentView("cards");
                  else if (currentView === "cards") setCurrentView("groups");
                  else if (currentView === "groups") setCurrentView("spaces");
                }}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
            )}
            <span className="text-sm font-medium text-gray-700">
              {currentView === "spaces" && "Choose Your Space"}
              {currentView === "groups" && "Thematic Groups"}
              {currentView === "cards" && "Cards"}
              {currentView === "chat" && selectedCard?.title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <div className="relative">
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
                <MoreVertical className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {showSensitiveWarning ? (
            <SensitiveWarningView
              card={selectedCard!}
              onAccess={() => handleSensitiveAccess(true)}
              onCancel={() => handleSensitiveAccess(false)}
            />
          ) : (
            renderCurrentView()
          )}
        </main>

        {/* Input Area - Only show in chat view */}
        {currentView === "chat" && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                <div className="flex-1 bg-[#d9d9d9] rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all duration-200">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Write as if it were 2 a.m."
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-gray-900 placeholder-[#737373] text-sm"
                    rows={2}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={handleFileAttach}
                        className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200"
                      >
                        <Paperclip className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200">
                        <Mic className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200">
                        <Smile className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Ctrl + Enter to send
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-4 bg-black text-white rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
      </div>

      {/* Profile & Settings Modal */}
      {isProfileOpen && (
        <ProfileSettingsModal
          onClose={() => setIsProfileOpen(false)}
          activeTab={activeSettingsTab}
          onTabChange={setActiveSettingsTab}
        />
      )}
    </div>
  );
}

// Component for Spaces View
function SpacesView({
  onSpaceSelect,
}: {
  onSpaceSelect: (space: string) => void;
}) {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Emotional Space
          </h1>
          <p className="text-xl text-gray-600">
            Where would you like to begin your journey today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Women's Space */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
              <Users className="h-16 w-16 text-rose-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Women's Space
              </h3>
              <p className="text-gray-600 mb-4">
                Explore emotions and relationships from a feminine perspective
              </p>
              <button
                onClick={() => onSpaceSelect("women")}
                className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors duration-200 font-medium"
              >
                Enter Space
              </button>
            </div>
          </div>

          {/* Men's Space */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
              <User className="h-16 w-16 text-indigo-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Men's Space
              </h3>
              <p className="text-gray-600 mb-4">
                Navigate emotional landscapes from a masculine perspective
              </p>
              <button
                onClick={() => onSpaceSelect("men")}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Enter Space
              </button>
            </div>
          </div>

          {/* Universal Space */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
              <Globe className="h-16 w-16 text-teal-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Universal Space
              </h3>
              <p className="text-gray-600 mb-4">
                Mixed perspectives for all genders and identities
              </p>
              <button
                onClick={() => onSpaceSelect("universal")}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Explore Space
              </button>
            </div>
          </div>

          {/* Rebuilding Module */}
          <div className="bg-[#dde0e8] rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
              <Building className="h-16 w-16 text-orange-600" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                I'm Rebuilding Myself
              </h3>
              <p className="text-gray-600 mb-4">
                Healing and reconstruction journey
              </p>
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium">
                Start Journey
              </button>
            </div>
          </div>
        </div>

        {/* Complementary Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Translation Box */}
          <div className="bg-[#dde0e8] rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <Languages className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Translation Box
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              When she says this, what does he hear? / When he says this, what
              does she hear?
            </p>
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 text-sm font-medium">
              Discover Translations
            </button>
          </div>

          {/* Relational Scanner */}
          <div className="bg-[#dde0e8] rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <Scan className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Relational Scanner
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Analyze and understand your relationship patterns and dynamics
            </p>
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 text-sm font-medium">
              Scan Relationships
            </button>
          </div>

          {/* Seductive Energy */}
          <div className="bg-[#dde0e8] rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <Zap className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Seductive Energy
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Activate your natural charisma and magnetic presence
            </p>
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200 text-sm font-medium">
              Activate Energy
            </button>
          </div>
        </div>

        {/* Back to Top Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Component for Groups View
function GroupsView({
  groups,
  onGroupSelect,
  onBack,
}: {
  groups: any[];
  onGroupSelect: (group: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Thematic Groups
            </h1>
            <p className="text-gray-600">
              Choose a theme to explore related cards
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Grid className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <List className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => onGroupSelect(group.id)}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {group.name}
                </h3>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {group.count} cards
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Explore cards related to {group.name.toLowerCase()} and deepen
                your understanding.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>View Cards</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component for Cards View
function CardsView({
  cards,
  onCardSelect,
  onBack,
}: {
  cards: Card[];
  onCardSelect: (card: Card) => void;
  onBack: () => void;
}) {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cards</h1>
            <p className="text-gray-600">
              Select a card to start your conversation
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const CardIcon = cardTypes[card.type].icon;
            return (
              <div
                key={card.id}
                onClick={() => onCardSelect(card)}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${
                      cardTypes[card.type].bgColor
                    } ${cardTypes[card.type].color}`}
                  >
                    <CardIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{card.title}</h3>
                    <span className="text-xs text-gray-500">
                      {cardTypes[card.type].label}
                    </span>
                  </div>
                  {card.sensitiveMode && (
                    <Shield className="h-4 w-4 text-rose-500" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {card.pitch}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Click to open</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Component for Chat View
function ChatView({ card, messages }: { card: Card; messages: Message[] }) {
  const CardIcon = cardTypes[card.type].icon;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Card Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${cardTypes[card.type].bgColor} ${
                    cardTypes[card.type].color
                  }`}
                >
                  <CardIcon className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {card.title}
                </h1>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {card.pitch}
              </p>

              <div className="flex items-center space-x-4">
                {card.sensitiveMode && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium">
                    <Shield className="h-4 w-4" />
                    <span>Sensitive Mode</span>
                  </div>
                )}

                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>{cardTypes[card.type].label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                Start a conversation with SOYA
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Write as if it were 2 a.m.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${message.isUser ? "flex justify-end" : ""}`}
              >
                {message.isUser ? (
                  // User message bubble
                  <div className="max-w-2xl">
                    <div className="bg-[#d9d9d9] rounded-2xl rounded-br-md px-6 py-4">
                      <p className="text-gray-900">{message.text}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ) : (
                  // SOYA message (no bubble)
                  <div className="max-w-4xl">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-3">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-200">
                        <ThumbsUp className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-200">
                        <ThumbsDown className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        onClick={() =>
                          navigator.clipboard.writeText(message.text)
                        }
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

// Component for Sensitive Warning
function SensitiveWarningView({
  card,
  onAccess,
  onCancel,
}: {
  card: Card;
  onAccess: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-full p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-rose-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sensitive Content Ahead
        </h2>

        <p className="text-gray-600 mb-2">
          This card discusses a strong emotional topic.
        </p>
        <p className="text-gray-600 mb-6">
          Take a moment to ensure you feel ready to explore it.
        </p>

        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6">
          <p className="text-rose-800 text-sm font-medium">{card.title}</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Not Now
          </button>
          <button
            onClick={onAccess}
            className="flex-1 py-3 px-6 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 font-medium"
          >
            I'm Ready - Access
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Your choice will be remembered for this session only
        </p>
      </div>
    </div>
  );
}

// Component for Profile & Settings Modal
function ProfileSettingsModal({
  onClose,
  activeTab,
  onTabChange,
}: {
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: any) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Alex Morgan</p>
                <p className="text-sm text-gray-500">alex@example.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: "account", label: "Account", icon: User },
                { id: "privacy", label: "Privacy", icon: ShieldCheck },
                { id: "app", label: "App & Interface", icon: Settings },
                { id: "support", label: "Support", icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === "account" && "Account Settings"}
                {activeTab === "privacy" && "Privacy & Security"}
                {activeTab === "app" && "App & Interface"}
                {activeTab === "support" && "Help & Support"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "account" && <AccountSettings />}
              {activeTab === "privacy" && <PrivacySettings />}
              {activeTab === "app" && <AppSettings />}
              {activeTab === "support" && <SupportSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Account Settings Component
function AccountSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Manage Subscription
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Free Trial</p>
              <p className="text-sm text-gray-500">3 days remaining</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Export Data</h3>
        <p className="text-gray-600 mb-4">
          Download your conversation history and personal data
        </p>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
          <Download className="h-4 w-4" />
          <span>Export as JSON/PDF</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-gray-600 mb-4">
          Permanently delete your account and all data
        </p>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
          Delete Account
        </button>
      </div>
    </div>
  );
}

// Privacy Settings Component
function PrivacySettings() {
  const [memoryEnabled, setMemoryEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Conversation Memory
            </h3>
            <p className="text-gray-600 text-sm">
              {memoryEnabled
                ? "SOYA remembers your previous exchanges for coherent follow-up"
                : "Each message is processed without context — like a first encounter"}
            </p>
          </div>
          <button
            onClick={() => setMemoryEnabled(!memoryEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              memoryEnabled ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                memoryEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Metadata Control
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              defaultChecked
            />
            <span className="text-gray-700">
              Approximate location (city/region)
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              defaultChecked
            />
            <span className="text-gray-700">
              Usage data (modules used, cards opened)
            </span>
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Used solely to improve the POSE-LÀ experience
        </p>
      </div>
    </div>
  );
}

// App Settings Component
function AppSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Interface Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Italian</option>
              <option>Portuguese</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-800 text-white">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          SOYA Dialogue Style
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How should I call you?
            </label>
            <input
              type="text"
              placeholder="First name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Tone
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Casual - Simple and direct</option>
              <option>Modern & Impactful - Effective and stylish</option>
              <option>Companion-like - Warm and close</option>
              <option>Classic & Composed - Respectful and professional</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Support Settings Component
function SupportSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Help Center</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <p className="font-medium text-gray-900">
              How to Start a Conversation
            </p>
            <p className="text-sm text-gray-600">
              Step-by-step guide to begin chatting with SOYA
            </p>
          </button>
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <p className="font-medium text-gray-900">
              Understanding Card Types
            </p>
            <p className="text-sm text-gray-600">
              Learn about Mirror, Bridge, Locked, and Phantom cards
            </p>
          </button>
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <p className="font-medium text-gray-900">Managing Subscription</p>
            <p className="text-sm text-gray-600">
              Upgrade, downgrade, or cancel your plan
            </p>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Contact Support
        </h3>
        <p className="text-gray-600 mb-4">
          Your message will be read with care. We'll get back to you as soon as
          possible, with kindness.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
          Contact the Team
        </button>
      </div>
    </div>
  );
}
