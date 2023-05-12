import React from "react";
import { WithPageAuthRequired } from "@auth0/nextjs-auth0";
export default function WorldEvents() {
  

  return (<a href="/api/auth/login">Login</a>);
  
}

// export const getServerSideProps= WithPageAuthRequired();