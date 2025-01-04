import { useEffect } from 'react';
import Quagga from 'quagga'; // Ensure Quagga is imported

const Scanner = ({ onDetected }) => {
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
      console.log(result);
      if (result && result.codeResult && result.codeResult.code) {
        const isbn = result.codeResult.code;
        onDetected(isbn);
        Quagga.stop();
      } else {
        console.log("not detected");
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="scanner-container" />;
};

export default Scanner;