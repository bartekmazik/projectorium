"use client";

import { useUser } from "@/lib/AuthProvider";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddTask from "./addTask";

const page = () => {
  const [tasks, setTasks] = useState();

  const { id } = useParams();
  const accessToken = useUser().accessToken;
  const userid = useUser().user?.id;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const projectId = Number(id);
      try {
        const res = await fetch(`http://localhost:3333/task/get/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}` || "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch project");

        const json = await res.json();
        setTasks(json);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6">
      <div className="font-bold text-3xl">Tasks</div>
      <div className="font-bold test-2xl py-10"> All tasks</div>
      <AddTask />
    </div>
  );
};

export default page;
