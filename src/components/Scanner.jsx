import { useEffect, useRef } from 'react';
import Quagga from 'quagga'; // Ensure Quagga is imported

const Scanner = ({ onDetected }) => {
  const isProcessing = useRef(false);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container')
      },
      decoder: {
        readers: ["ean_reader"]
      },
      debug: {
        drawBoundingBox: true,
        showFrequency: true,
        drawScanline: true,
        showPattern: true,
      },
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      if (isProcessing.current) return;

      console.log(result); // Log the result to understand its structure
      if (result && result.codeResult && result.codeResult.code) {
        const isbn = result.codeResult.code;
        isProcessing.current = true;
        onDetected(isbn);

        // Ignore subsequent detections for a short period
        setTimeout(() => {
          isProcessing.current = false;
        }, 1000); // Adjust the delay as needed
      } else {
        console.log("No valid code detected");
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="scanner-container" />;
};

export default Scanner;