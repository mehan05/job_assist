import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:[
      "avatar.vercel.sh"
    ]
  },
  typescript:{
    ignoreBuildErrors:true
  }
 
};

export default nextConfig;
