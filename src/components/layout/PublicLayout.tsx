import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmittanAssistant } from "@/components/chat/SmittanAssistant";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <SmittanAssistant />
    </div>
  );
};