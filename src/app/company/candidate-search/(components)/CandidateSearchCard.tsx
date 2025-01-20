import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface User {
        id: string;
        name: string;
        age: number;
        headlines: string;
        bio: string;
        gender: string;
        place: string;
        role: string;
        skills: string[]; 
        dob: string; 
        email: string;
        profileImage?: string;
        professionalRole?: string;
        password: string;
      }
const CandidateSearchCard = ({val}:{val:User}) => {
  return (
      
    <div className="hover:scale-105 transition-all duration-100 ease-in mb-6 ">
      <div className="border-2 border-[#9b58ff] w-[1000px] h-24 min-w-64 max-w-[1000px]  lg:w-[1000px]  lg:h-24 min-h-24 rounded-xl text-wrap">
        <div className="p-5 ">
                <div className="flex gap-3 items-center justify-between">
                    <div className="flex justify-start items-center gap-5">
                            <div>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>US</AvatarFallback>
                                </Avatar>
                            </div>

                            <div >
                            <p className="font-Josefin_Sans font-bold text-2xl ">{val.name}</p>
                            <p className="font-Josefin_Sans font-semibold">{val.headlines}</p>
                            </div>
                    </div>
                    <div className="flex justify-center items-center">

                            <div className="flex justify-center items-center gap-5 ">
                                    <p className="font-Josefin_Sans font-semibold">{val.role}</p>
                                    <p className="font-Josefin_Sans font-semibold">{val.place}</p>
                            </div>
                    </div>

                    <div className="flex justify-end items-center">
                            <h1 className="font-Josefin_Sans font-semibold">Email: {val.email}</h1>
                    </div>
                
                </div>


        </div>
      </div>
    </div>
  );
};

export default CandidateSearchCard;
