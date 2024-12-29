import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getImages, getSearchImages } from "../../utils/api";
import ImageSection from "../ImageSection";
import SearchBar from "../SearchBar";
import Loading from "../Loading";
import ErrorInfo from "../Error";
import "./styles.css";

export default function App() {
  const [imageData, setImageData] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [loadingError, setLoadingError] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const fetchImages = async () => {
    setIsImageLoading(true);
    setLoadingError(null);

    try {
      const newImages = searchWord
        ? await getSearchImages(pageNumber, searchWord)
        : await getImages(pageNumber);

      setImageData((prevImages) => pageNumber === 1 ? newImages : [...prevImages, ...newImages]);
    } catch (e) {
      setLoadingError(e);
    } finally {
      setIsImageLoading(false);
    }
  };

  useEffect(() => {
    if (pageNumber > 1 || !searchWord) {
      fetchImages();
    }
  }, [pageNumber]);

  useEffect(() => {
    if (inView && !loadingError && !isImageLoading) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView]);

  const handleSearchImage = (ev, searchWord) => {
    ev.preventDefault();

    setSearchWord(searchWord);
    setImageData([]);
    setPageNumber(1);
    fetchImages();
  }

  return (
    <>
      <h1>이미지 검색</h1>
      <SearchBar
        handleSearchImage={handleSearchImage}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      {isImageLoading && <Loading />}
      {loadingError && <ErrorInfo error={loadingError} />}
      {!isImageLoading && <ImageSection imageData={imageData} />}
      <div ref={ref} style={{ height: "50px", backgroundColor: "transparent" }}></div>
    </>
  )
}
