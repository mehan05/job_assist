"use client"; 
import { LandingPageMarquee } from "@/components/LandingPageMarquee";
import { NavBar } from "@/components/NavBar";
const TypingAnimation  = dynamic(() => import('@/components/ui/typing-animation'), { ssr: false });
import dynamic from "next/dynamic";
const RootNavigator = dynamic(() => import("./rootnavigator/page"), { ssr: false });

export default function Home() {
  return (
    <div className="overflow-hidden">
      <NavBar />

      <div className="px-4 sm:px-10 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full">
            <h1 className="font-Josefin_Sans text-4xl sm:text-6xl font-bold">
              Find the Right Job
            </h1>
            <h1 className="font-Josefin_Sans text-4xl sm:text-6xl font-bold mt-2">
              Build the Best Future -{" "}
              <TypingAnimation className="inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Job Assist
              </TypingAnimation>
            </h1>
            <p className="text-lg sm:text-xl font-semibold mt-4">
              Explore opportunities, grow your skills, and achieve career milestones with{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Job_Assist
              </span>{" "}
              by your side.
            </p>
          </div>
        </div>

        <RootNavigator />

        <div className="mt-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Job Assist
            </span>
            ?
          </h1>
          <LandingPageMarquee />
        </div>

        <div className="mt-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            How{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Job Assist
            </span>{" "}
            Works?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-5 border rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  1
                </span>{" "}
                Create a Profile
              </h2>
              <p>Sign up and showcase your skills.</p>
            </div>

            <div className="p-5 border rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  2
                </span>{" "}
                Get Matched
              </h2>
              <p>Receive job recommendations tailored to you.</p>
            </div>

            <div className="p-5 border rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  3
                </span>{" "}
                Apply & Connect
              </h2>
              <p>Apply directly and engage with employers.</p>
            </div>
          </div>
        </div>

        <section className="mt-16 text-center">
          <h1 className="text-3xl font-bold">Ready to Transform Your Career?</h1>
          <p className="text-lg mt-2">Sign up today and take the first step toward your dream job.</p>
          <button className="mt-5 px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300">
            Get Started for Free
          </button>
        </section>

        <footer className="mt-20 border-t border-gray-700 py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div>
              <h2 className="text-2xl font-bold mb-4">Job_Assist</h2>
              <p>Your trusted partner in achieving career success.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Home</a></li>
                <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400">Jobs</a></li>
                <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                <a href="#" className="hover:text-indigo-400">LinkedIn</a>
                <a href="#" className="hover:text-indigo-400">Twitter</a>
                <a href="#" className="hover:text-indigo-400">Instagram</a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            © 2025 Job_Assist. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
