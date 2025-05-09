import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   api: {
    bodyParser: false, // necessário para usar o formidable
  },
};


export default nextConfig;
