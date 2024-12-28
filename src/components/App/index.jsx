import './styles.css';
import { useState, useEffect } from "react";
import { getImages, getSearchImages } from '../../utils/api';
import ImageSection from '../ImageSection';
import SearchBar from '../SearchBar';
import Loading from '../Loading';
import ErrorInfo from '../Error';
import { useInView } from 'react-intersection-observer';

export default function App() {
  const [imageData, setImageData] = useState([]);
  const [imageLoading, setImageLoading] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const { ref, inView } = useInView({ threshold: 0.5 });

  const fetchImages = async () => {
    setImageLoading(true);

    try {

    } catch (e) {
      ErrorInfo(e);
    }
  };

  const InfiniteScroll = () => {

    useEffect(async () => {
      if (inView) {
        loadNextImages();
        const allImageData = await getImages(pageNumber);

        setImageLoading(false);
        setImageData([...imageData, ...allImageData]);
        setPageNumber(page => page + 1);
      }
    }, [inView]);
  };

  useEffect(() => {
    const getAllImage = async() => {
      setImageLoading(true);

      try {
        const allImageData = await getImages(pageNumber);

        setImageLoading(false);
        setImageData([...imageData, ...allImageData]);
        setPageNumber(page => page + 1);
      } catch (e) {
        throw new Error(e);
      }
    };

    getAllImage();
  }, []);

  const handleSearchImage = async (ev, searchWord) => {
    ev.preventDefault();

    try {
      const searchedImage = await getSearchImages(pageNumber, searchWord);

      setImageData(searchedImage);
    } catch (e) {
      throw new Error(e);
    }
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
      {imageLoading && <Loading />}
      {!imageLoading && (
        <ImageSection
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          imageData={imageData}
          setImageData={setImageData}
        />
      )}
      <div ref={ref}></div>
    </>
  )
}
