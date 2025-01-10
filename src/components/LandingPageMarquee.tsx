import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "Job Assist provided me with personalized job matches that perfectly align with my skills!",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "The career growth resources like resume builders and interview tips truly helped me excel.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "Connecting with top employers through Job Assist has been a game-changer for my career.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "The AI-powered job recommendations made my job search so much easier and efficient.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "Job Assist's platform is secure and user-friendly. I felt safe sharing my professional profile.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "Exclusive job opportunities and mentorship helped me fast-track my career growth.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function LandingPageMarquee() {
  return (
    <div className="relative mt-5 flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
     

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 
} dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-500 via-purple-500 
}  dark:from-background"></div>
    </div>
  ); 
}