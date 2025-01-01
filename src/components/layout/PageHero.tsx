import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHero = ({ title, description, className }: PageHeroProps) => {
  return (
    <div className={cn("bg-smittan-600 py-16 md:py-24", className)}>
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F97316]">{title}</h1>
        {description && (
          <p className="text-lg text-[#F97316] max-w-2xl">{description}</p>
        )}
      </div>
    </div>
  );
};