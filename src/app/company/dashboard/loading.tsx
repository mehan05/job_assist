import { NavBar } from "@/components/NavBar";

export default function LoadingPage() {
    return (
        <div>
                <div>
                      <NavBar />
                    </div>  
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8156e5]"></div>
      </div>
        </div>
    );
  }