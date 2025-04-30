// File: src/components/MagazineViewer/index.js
import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './pdfMagazine.module.css';

// Set the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const MagazineViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState('src/assets/MAGAZINE-INDESIGN-2024-final.pdf'); // Path to your PDF file
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(600);
  const [pageHeight, setPageHeight] = useState(800);
  const [pages, setPages] = useState([]);
  const bookRef = useRef(null);

  useEffect(() => {
    // Adjust page size based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setPageWidth(width * 0.85);
        setPageHeight((width * 0.85) * 1.4); // Maintain aspect ratio
      } else {
        setPageWidth(width * 0.4);
        setPageHeight((width * 0.4) * 1.4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    
    // Pre-render all pages
    const pagesArray = Array.from(
      new Array(numPages),
      (el, index) => index + 1
    );
    setPages(pagesArray);
  };

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const onFlip = (e) => {
    setPageNumber(e.data + 1);
  };

  return (
    <div className={styles.magazineContainer}>
      <div className={styles.magazineTitle}>
        <h1>St. Francis Digital Magazine</h1>
      </div>
      
      {loading && (
        <div className={styles.loading}>
          <p>Loading magazine...</p>
        </div>
      )}
      
      <div className={styles.flipbookContainer}>
        <button 
          className={`${styles.flipButton} ${styles.prev}`} 
          onClick={prevPage} 
          disabled={pageNumber <= 1}
        >
          &lt;
        </button>
        
        <div className={styles.flipbook}>
          <HTMLFlipBook
            width={pageWidth}
            height={pageHeight}
            size="stretch"
            minWidth={pageWidth / 2}
            maxWidth={pageWidth * 2}
            minHeight={pageHeight / 2}
            maxHeight={pageHeight * 2}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className={styles.demoBook}
            ref={bookRef}
          >
            {pages.map((pageNum) => (
              <div className={styles.page} key={pageNum}>
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div className={styles.pageLoading}>Loading page...</div>}
                >
                  <Page
                    pageNumber={pageNum}
                    width={pageWidth}
                    height={pageHeight}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            ))}
          </HTMLFlipBook>
        </div>
        
        <button 
          className={`${styles.flipButton} ${styles.next}`} 
          onClick={nextPage} 
          disabled={pageNumber >= numPages}
        >
          &gt;
        </button>
      </div>
      
      <div className={styles.pageNavigation}>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};

export default MagazineViewer;