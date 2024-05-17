"use client";

import Loader from "@/components/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if(!isLoaded || isCallLoading) {
    return <Loader />
  }

  if(!call) {
    return (
        <p className="text-center text-3xl font-bold text-white">
            Call not found
        </p>
    )
  }

  const notAllowed = call.type === 'invalid' && (!user || !call.state.members.find((m) => m.user.id === user.id));
  

  return <main className="h-screen w-full"></main>;
};

export default MeetingPage;

