import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResult.css';
import Header from '../../../components/Header/header'; // Import the Header component


const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 items (2 rows of 3)

  // Add default image constant
  const DEFAULT_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mtg-capstone-2024.appspot.com/o/grave_images%2Fbna_3..jpg?alt=media&token=8f7ddd09-355a-4d65-85b6-476829954072";

  useEffect(() => {
    if (location.state && location.state.results) {
      setResults(location.state.results);
    }
  }, [location.state]);

  // Calculate pagination values
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  // Icons components
  const CalendarIcon = () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M19 4h-1V3c0-.6-.4-1-1-1s-1 .4-1 1v1H8V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v12c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3z"/>
    </svg>
  );

  const HomeIcon = () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12 3L4 9v12h16V9l-8-6zm6 16h-4v-5h-4v5H6v-9l6-4.5 6 4.5v9z"/>
    </svg>
  );

  const LocationIcon = () => (
    <svg className="icon" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    </svg>
  );

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        className={`search-result__page-button ${currentPage === 1 ? 'search-result__page-button--disabled' : ''}`}
        disabled={currentPage === 1}
      >
        ‹
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="search-result__page-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="search-result__page-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`search-result__page-button ${currentPage === i ? 'search-result__page-button--active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="search-result__page-ellipsis">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="search-result__page-button"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        className={`search-result__page-button ${currentPage === totalPages ? 'search-result__page-button--disabled' : ''}`}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    );

    return buttons;
  };

  const handleCardClick = (martyrId) => {
    navigate(`/chitietmo/${martyrId}`);
  };

  return (
    <>
      <Header />
      <div className="search-result__container">
        <h1 className="search-result__heading">Kết Quả Tìm Kiếm</h1>
        
        <div className="search-result__grid">
          {currentResults.map((grave) => (
            <div
              key={grave.martyrId}
              className={`search-result__card ${hoveredCard === grave.martyrId ? 'search-result__card--hover' : ''}`}
              onMouseEnter={() => setHoveredCard(grave.martyrId)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(grave.martyrId)}
              style={{ cursor: 'pointer' }}
            >
              <div className="search-result__image-container">
                <img
                  src={grave.imageUrl || DEFAULT_IMAGE}
                  alt={`Grave of ${grave.fullName}`}
                  className="search-result__image"
                />
              </div>
              
              <div className="search-result__content">
                <h2 className="search-result__name">{grave.name}</h2>
                
                <div className="search-result__info-grid">
                  <div className="search-result__info-item">
                   
                    <span>Năm sinh: {new Date(grave.dateOfBirth).getFullYear()}</span>
                  </div>
                  <div className="search-result__info-item">
                    
                    <span>Năm mất: {new Date(grave.dateOfSacrifice).getFullYear()}</span>
                  </div>
                  <div className="search-result__info-item">
                   
                    <span>Quê quán: {grave.homeTown}</span>
                  </div>
                  <div className="search-result__info-item">
                    
                    <span>Vị trí: {grave.graveLocation}</span>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        <div className="search-result__pagination">
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
