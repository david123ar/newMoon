import React from "react";
import Slab from "@/component/Slab/Slab";
import Profito from "@/component/Profito/Profito";
import MyComponent from "@/component/ContinueWatching/ContinueWatching";
import WatchList from "@/component/WatchList/WatchList";
import Settings from "@/component/Settings/Settings";
import Notification from "@/component/Notification/Notification"
import User from "@/component/User/user";

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Animoon.me , free Anime Streaming`,
    description: `Animoon is the best site to watch
                      ${idd} SUB online, or you can even
                      watch ${idd} DUB in HD quality. You
                      can also watch under rated anime
                      on Animoon website.`,
  };
}


export default async function page({ params, searchParams }) {
  const param = (await params).id;
  const searchParam = await searchParams
  const slabId = param.replace("-", " ");

  return (
    <>
    <div><User type={searchParam.type} id={param}/></div>
    </>
  );
}
