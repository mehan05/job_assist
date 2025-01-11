import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CandidateSearchCard = () => {
  return (
    <div className="hover:scale-105 transition-all duration-300 ease-in">
      <div className="border-2 border-[#9b58ff] w-[1000px] h-24 min-w-64 max-w-[1000px] sm:w-64 md:w-96 lg:w-[1000px] sm:h-14 md:h-20 lg:h-24 min-h-24 rounded-xl">
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
                            <p className="font-Josefin_Sans font-bold text-2xl ">Name</p>
                            <p className="font-Josefin_Sans font-semibold">Headlines of the user</p>
                            </div>
                    </div>
                    

                    <div className="flex justify-center items-center">

                            <div className="flex justify-center items-center gap-5 ">
                                    <p className="font-Josefin_Sans font-semibold">Role</p>
                                    <p className="font-Josefin_Sans font-semibold">Location</p>
                            </div>
                    </div>

                    <div className="flex justify-end items-center">
                            <h1 className="font-Josefin_Sans font-semibold">Email: mehanmehan6@gmail.com</h1>
                    </div>
                
                </div>


        </div>
      </div>
    </div>
  );
};

export default CandidateSearchCard;
