"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaPlayCircle, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "@/component/loadingSpinner";
import Link from "next/link";
import { FaEye, FaHeart, FaMedal } from "react-icons/fa";
import "./mouse-over-card.css";

export default function MouseOverCard(props) {
  const [hoverAnime, setHoverAnime] = useState("");

  useEffect(() => {
    if (props.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/hover?id=${props.id}`, {
            next: { revalidate: 3600 },
          });
          const result = await response.json();

          if (response.ok) {
            setHoverAnime(result); // Set the response data from MongoDB
          } else {
            setHoverAnime(null);
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setHoverAnime(null);
    }
  }, [props.id]);

  // const info = hoverAnime?.info?.results;

  const genre = hoverAnime?.results?.genres?.map((genre, idx) => (
    <Link className="genreo-button" key={idx} href={`/${genre}`}>
      {genre}
    </Link>
  ));

  const removeHtmlTags = (str) => {
    return str?.replace(/<[^>]*>/g, ""); // Remove HTML tags
  };

  return (
    <div className="mouse-over-card-wrapper d-flex-fd-column">
      {!hoverAnime?.results ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="greatN">{hoverAnime?.results?.title}</h1>
          <div className="d-flex anime-st">
            <span className="d-flex a-center j-center">
              <FaStar color="yellow" />
              {hoverAnime?.results?.rating}
            </span>
            <div className="anime-statistics-tiles-wrapper d-flex a-center">
              {/* <span className="anime-statistics-tile d-flex a-center j-center">
                {info.data.animeInfo.tvInfo.rating || "?"}
              </span> */}
              {/* <span className="anime-statistics-tile medal-tile d-flex a-center j-center">
                <FaMedal /> {" "}
                {info.data.animeInfo.tvInfo.rating
                  || "NA"}
              </span> */}
              {/* <span className="anime-statistics-tile dil-tile d-flex a-center j-center">
                <FaHeart /> {info.data.animeInfo.tvInfo?.dub}
              </span> */}
              {/* <span className="anime-statistics-tile eye-tile d-flex a-center j-center">
                <FaEye /> {"NA"}
              </span> */}
              <span className="anime-statistics-tile qual-tile d-flex a-center j-center">
                {hoverAnime?.results?.quality}
              </span>
            </div>
            <span className="typop">{hoverAnime?.results?.type || "?"}</span>
          </div>
          <p style={{ marginBottom: 0 }} className="description">
            <span className="ligty">
              {removeHtmlTags(hoverAnime?.results?.description)}
            </span>
          </p>
          <div
            style={{ marginBottom: 0, paddingBottom: "10px" }}
            className="details-header-statistics"
          >
            <p>
              <b>Japanese: </b>{" "}
              <span className="ligt">
                {hoverAnime?.results?.japaneseTitle
                  ? hoverAnime?.results?.japaneseTitle?.length > 20
                    ? hoverAnime?.results?.japaneseTitle?.slice(0, 20) + "..."
                    : hoverAnime?.results?.japaneseTitle
                  : "?"}
              </span>
            </p>
            <p>
              <b>Aired: </b>
              <span className="ligt">
                {hoverAnime?.results?.airedDate || "?"}
              </span>
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className="ligt">
                {hoverAnime?.results?.status || "?"}
              </span>
            </p>
          </div>
          <div className="anime-st-genreo"></div>
          <div className="anime-st-genre">
            <div className="anime-st-genrep">
              <div>Genre: </div>
              <div className="Jonty">{genre}</div>
            </div>
          </div>
          <div className="anime-st-genreo"></div>
          <div className="tits-btn">
            <Link href={`/watch/${props?.data?.id}`} className="tit-bt-w">
              <FaPlayCircle size={15} /> Watch Now
            </Link>
            <Link href={`/${props?.data?.id}`} className="tit-bt-d">
              Details <FaChevronRight size={12} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
