
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Send, User, Bot, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id?: string;
  content: string;
  isUser: boolean;
  timestamp?: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "Hello! I'm your AI assistant. How can I help you today?", 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/auth');
        return;
      }
      setUser(data.session.user);
      
      // Load previous messages
      loadMessages(data.session.user.id);
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/auth');
        } else {
          setUser(session.user);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Load previous messages
  const loadMessages = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.message,
          isUser: !msg.is_bot,
          timestamp: new Date(msg.created_at)
        }));
        
        setMessages([
          { 
            content: "Hello! I'm your AI assistant. How can I help you today?", 
            isUser: false, 
            timestamp: new Date() 
          },
          ...formattedMessages
        ]);
      }
    } catch (error: any) {
      console.error('Error loading messages:', error);
    }
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || loading) return;
    
    // Add user message to the UI
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    const userInput = input;
    setInput('');
    
    try {
      // Save user message to Supabase
      const { error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: userInput,
          is_bot: false
        });
        
      if (insertError) throw insertError;
      
      // Call OpenAI API via edge function
      try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: { message: userInput }
        });
        
        if (error) throw error;
        
        const aiResponse = data.response;
        
        // Add AI response to the UI
        const botMessage: Message = {
          content: aiResponse,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Save AI response to Supabase
        await supabase
          .from('chat_messages')
          .insert({
            user_id: user.id,
            message: aiResponse,
            is_bot: true
          });
      } catch (error: any) {
        console.error('Error with AI response:', error);
        toast({
          title: "Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error saving message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl">MT Nexus</span>
          </a>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <span>Sign out</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>
      
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-lg ${
                  message.isUser
                    ? 'bg-black text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.isUser ? (
                    <>
                      <span className="text-xs text-gray-300">You</span>
                      <User className="h-3 w-3 text-gray-300" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-500">AI Assistant</span>
                    </>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">AI Assistant</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Type your message..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
