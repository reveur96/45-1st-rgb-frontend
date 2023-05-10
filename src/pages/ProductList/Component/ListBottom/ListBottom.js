import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ArtWorks from "../ArtWorks/ArtWorks";
import LeftFilter from "../LeftFilter/LeftFilter";
import "./ListBottom.scss";

function ListBottom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get("offset") || 0;
  const limit = searchParams.get("limit") || 4;
  // fetch 데이터 저장하는 useState
  const [shopContent, setShopContent] = useState([]);

  // const page = () => {
  //   searchParams.set("offset", 0);
  //   searchParams.set("limit", 4);
  //   setSearchParams(searchParams);
  // };

  useEffect(() => {
    const url = `http://10.58.52.169:9001/products/all?limit=${limit}&offset=${offset}`;
    console.log(url);
    // const url = `http://10.58.52.169:9001/products?limit=${limit}&start=${offset}&category=${category}`;

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then(res => res.json())
      .then(shop => {
        setShopContent(shop);
        console.log(shop);
      });
  }, [offset, limit]);

  const movePage = pageNumber => {
    searchParams.set("offset", (pageNumber - 1) * 4);
    searchParams.set("limit", 4);
    setSearchParams(searchParams);
  };

  // useEffect(() => {
  //   const url = `/data/artlist.json?limit=${limit}&start=${offset}`;
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(shop => {
  //       setShopContent(shop);
  //     });
  // }, []);

  return (
    <div className="listBottom">
      <div className="bottomTop">
        <div className="category">
          <span
          // onClick={() => {
          //   page();
          // }}
          >
            All
          </span>
        </div>
      </div>
      <div className="bottomBottom">
        <div className="bottomLeft">
          <LeftFilter
            shopContent={shopContent}
            setShopContent={setShopContent}
          />
        </div>
        <div className="bottomRight">
          <div className="artworkBox">
            {shopContent.map(art => {
              return (
                <Link key={art.id} to={`/productDetail/${art.id}`}>
                  <ArtWorks art={art} key={art.id} />
                </Link>
              );
            })}
          </div>
          <div className="pageButton">
            <button
              onClick={() => {
                movePage(1);
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                movePage(2);
              }}
            >
              2
            </button>
            <button
              onClick={() => {
                movePage(3);
              }}
            >
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBottom;
