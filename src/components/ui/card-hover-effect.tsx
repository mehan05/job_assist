import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    description: string;
    count:number
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const imageLocationLinks = [
    "/job-applied_icon.png",
    "/job-rejected-icon.png",
    "/job-pending-icon.png",
    "/job-selected-icon.png"];

    console.log("count from innre hovercard:",items);
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 max-w-screen-xl  min-screen-md w-screen  gap-5 justify-center items-center    py-1 ,mb-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
        key={idx}
        className="relative group  block p-2  max-w-70 min-w-50"
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
              className="absolute inset-0 max-w-70 min-w-50 bg-[var(--primary)] dark:[var(--primary)] block  rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
              />
            )}
          </AnimatePresence>
          <Card>
          <div className="flex gap-10 justify-center  items-center ">
              <div>
                <CardTitle className="text-2xl font-bold font-Josefin_Sans text-center" >{item.count}</CardTitle>
                <CardDescription className="text-sm font-semibold font-Josefin_Sans">{item.description}</CardDescription>
              </div>
              {/*Add Logo below*/}
              <div>
                <Image src={imageLocationLinks[idx]} alt="logo" height={40} width={40} className="invert"/>
              </div>
          </div>
            
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl max-w-70 min-w-50 p-2  overflow-hidden bg-white max-h-28 text-black dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("dark:text-zinc-100 font-Josefin_Sans text-black font-bold tracking-wide ", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-1 dark:text-zinc-100 font-Josefin_Sans text-black  tracking-wide leading-relaxed text-sm",
        className
      )}
    > 
        {children}
    
    </div>
  );
};
