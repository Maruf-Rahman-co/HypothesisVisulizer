import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={300}>
      <ShadcnTooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          sideOffset={4}
          className="bg-black/90 text-white text-xs px-2 py-1 rounded"
        >
          {content}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
