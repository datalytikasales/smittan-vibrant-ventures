import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  type: 'assistant' | 'user';
  content: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const questions = [
  { key: 'name' as const, text: "Hi! I'm Smittan Assistant. What's your name?" },
  { key: 'email' as const, text: "Nice to meet you! What's your email address?" },
  { key: 'phone' as const, text: "Great! Could you share your phone number?" },
  { key: 'message' as const, text: "How can we help you today?" },
];

export const SmittanAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'assistant', content: questions[0].text }]);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!currentInput.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    const updatedFormData = { ...formData, [currentQuestion.key]: currentInput };
    setFormData(updatedFormData);

    setMessages(prev => [
      ...prev,
      { type: 'user', content: currentInput },
    ]);
    setCurrentInput("");

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'assistant', content: questions[currentQuestionIndex + 1].text },
        ]);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 500);
    } else if (currentQuestionIndex === questions.length - 1) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('contact_submissions')
          .insert([updatedFormData]);

        if (error) throw error;

        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              type: 'assistant', 
              content: "Thank you for your message! Our team will contact you soon." 
            },
          ]);
          toast({
            title: "Message sent!",
            description: "We'll get back to you as soon as possible.",
          });
        }, 500);
      } catch (error) {
        console.error('Error submitting form:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button Container with Text */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
          Talk To Me
        </span>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full w-14 h-14 p-0 shadow-lg transition-transform hover:scale-105",
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-[#D3E4FD] hover:bg-[#1EAEDB]"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-[#1EAEDB]" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Chat Header */}
        <div className="bg-[#1EAEDB] text-white p-4 rounded-t-lg">
          <h3 className="font-semibold">Smittan Assistant</h3>
          <p className="text-sm opacity-90">How can we help you today?</p>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "max-w-[80%] p-3 rounded-lg animate-fade-in",
                message.type === 'assistant'
                  ? "bg-gray-100 rounded-tl-none"
                  : "bg-[#1EAEDB] text-white ml-auto rounded-tr-none"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EAEDB]"
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmit}
              disabled={!currentInput.trim() || isSubmitting}
              className="bg-[#1EAEDB] hover:bg-[#0FA0CE]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};