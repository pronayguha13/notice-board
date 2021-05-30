import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import { fetchNotice, noticeDisplayHandler } from "../../../utils/helperMethod";
import UserContext from "../../../global/UserContext";
let pause;
let imgId = 0;
const DisplayNotices = () => {
  const [uploadedNotices, setUploadedNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayImage, setDisplayImage] = useState("assets/homescreen.svg");

  const { userData } = useContext(UserContext);

  useEffect(() => {
    randomFunction();
    fetchNotice(setUploadedNotices, setIsLoading);
  }, []);

  const imageRotateHandler = () => {
    let images = ["homescreen.svg", "homescreen1.svg", "homescreen2.svg"];

    let index;
    if (imgId === 2) {
      index = 0;
    } else {
      index = imgId + 1;
    }
    imgId = index;
    let element = images[index];
    setDisplayImage(`assets/${element}`);
  };

  const randomFunction = () => {
    pause = setInterval(() => {
      imageRotateHandler();
    }, 5300);
  };

  const scrollHandler = (e) => {
    let y = window.scrollY;
    while (y !== 621) {
      y = y + 1;
      window.scroll(0, y);
    }
  };

  return (
    <div className={styles.container}>
      {!userData.user ? (
        <>
          <div className={styles.banner}>
            <img
              className={styles.movingImage}
              src={displayImage}
              alt="carousal"
            />
          </div>
          <div className={styles.arrowContainer}>
            <img
              src="assets/expand.svg"
              alt="show Notice"
              onClick={(e) => {
                scrollHandler(e);
              }}
            />
          </div>
        </>
      ) : null}
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : uploadedNotices.length ? (
          <div className={styles.noticeContainer}>
            {uploadedNotices.map((notice, id) =>
              noticeDisplayHandler(notice, id)
            )}
          </div>
        ) : (
          <span>
            <img src="/assets/NoContent.svg" alt="no notice" />
            <h1>No notice</h1>
          </span>
        )}
      </div>
    </div>
  );
};

export default DisplayNotices;
