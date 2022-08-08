import { useState, useEffect, useRef } from 'react';
import api from '../api/api';
import s from './App.module.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import { Bars } from 'react-loader-spinner';
import SerchBar from './Searchbar/SearchBar';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [objectModal, setObjectModal] = useState({});
  const [loading, setLoading] = useState(false);

  const firstStartRef = useRef(null);

  useEffect(() => {
    if (query === '') return;
    setLoading(true);
    const dataRequest = async () => {
      try {
        const data = await api(query, page);

        setData(prev => [...prev, ...data.hits]);
        setLoading(false);
        setTotalHits(data.totalHits);
      } catch (error) {
        alert('error');
      } finally {
        setLoading(false);
      }
    };

    firstStartRef.current = document.body.clientHeight;
    dataRequest();
  }, [page, query]);

  const onSubmit = queryA => {
    if (query === queryA && page === 1) return;
    setQuery(queryA);
    setData([]);
    setPage(1);
    setTotalHits(null);
    firstStartRef.current = null;
  };
  const toggleModal = () => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    setShowModal(showModal => !showModal);
  };
  const dataModal = (src, alt) => {
    // this.setState({ objectModal: { src, alt } });
    // this.toggleModal();
    toggleModal();
    setObjectModal({ src, alt });
  };
  const btnLoad = () => {
    setPage(prev => prev + 1);
  };

  const totalPage = Math.ceil(totalHits / 12);
  return (
    <div className={s.app}>
      <SerchBar onSubmit={onSubmit} />
      {data.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem data={data} onModal={dataModal} />
        </ImageGallery>
      )}

      {loading === true && (
        <div className={s.loader}>
          <Bars
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}

      {totalPage > page && <Button onClick={btnLoad} />}

      {showModal && (
        <Modal objectModal={objectModal} toggleModal={toggleModal} />
      )}
    </div>
  );
};
