import SearchResults from "@/component/AZ/az";
import { MongoClient } from "mongodb";
import React from "react";

export async function generateMetadata({ params }) {
  const idd = "Anime";

  return {
    title: `Watch ${idd} English Sub/Dub online free on Animoon, free Anime Streaming`,
    description: `Animoon is the best site to watch
                    ${idd} SUB online, or you can even
                    watch ${idd} DUB in HD quality. You
                    can also watch underrated anime
                    on Animoon website.`,
  };
}

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  let pageParam = searchParam?.page || "1";
  let json = "";
  const cacheMaxAge = 345600; // 4 days in seconds

  const mongoUri =
    "mongodb://root:Imperial_king2004@145.223.118.168:27017/?authSource=admin";
  const dbName = "mydatabase";
  const azCollectionName = searchParam.sort
    ? "az-list" + searchParam.sort
    : "az-list";

  const client = new MongoClient(mongoUri);
  let existingAnime = [];
  let count;

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Fetch homepage data

    // Check if anime from spotlights exists in the animeInfo collection
    const animeCollection = db.collection(azCollectionName.trim());
    existingAnime = await animeCollection.findOne({
      page: parseInt(pageParam),
    });

    if (existingAnime) {
      existingAnime = JSON.parse(JSON.stringify(existingAnime)); // Convert BSON to plain object
    }

    count = await db.collection(azCollectionName.trim()).countDocuments();
  } catch (error) {
    console.error("Error fetching data from MongoDB or API:", error.message);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }

  try {
    const url = searchParam.sort
      ? `https://vimal.animoon.me/api/az-list/${searchParam.sort}?page=${
          searchParam.page || "1"
        }`
      : `https://vimal.animoon.me/api/az-list?page=${searchParam.page || "1"}`;

    const data = await fetch(url, {
      cache: "force-cache",
      headers: {
        "Cache-Control": `public, max-age=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge}`,
      },
    });

    json = await data.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return (
    <div>
      <SearchResults
        el={existingAnime}
        sort={searchParam.sort}
        page={searchParam.page}
        totalPages={count}
        para={param.id}
      />
    </div>
  );
}
