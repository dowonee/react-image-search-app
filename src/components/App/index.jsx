import "./styles.css";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { getImages, getSearchImages } from "../../utils/api";
import ImageSection from "../ImageSection";
import SearchBar from "../SearchBar";
import Loading from "../Loading";
import ErrorInfo from "../Error";

export default function App() {
  const [imageData, setImageData] = useState([]);
  const [imageLoading, setImageLoading] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [loadingError, setLoadingError] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const fetchImages = async (isInit = false) => {
    setImageLoading(true);
    setLoadingError(null);

    try {
      const newImages = searchWord
        ? await getSearchImages(pageNumber, searchWord)
        : await getImages(pageNumber);

        setImageData(
          isInit ? newImages : [...imageData, ...newImages]
        );
    } catch (e) {
      setLoadingError(e);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [pageNumber]);

  useEffect(() => {
    if (inView && !loadingError) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView]);

  const handleSearchImage = async (ev, searchWord) => {
    ev.preventDefault();

    setSearchWord(searchWord);
    setPageNumber(1);
    fetchImages(true);
  }

  return (
    <>
      <h1>이미지 검색</h1>
      <SearchBar
        handleSearchImage={handleSearchImage}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      {imageLoading && <Loading />}
      {loadingError && <ErrorInfo error={loadingError} />}
      {!imageLoading && <ImageSection imageData={imageData} />}
      <div ref={ref} style={{ height: "50px", backgroundColor: "transparent" }}></div>
    </>
  )
}
