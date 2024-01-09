import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = () => {
  let isbn = null;
  let sucScan = 0;

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
    }, 
      (err) => {
        if (err) {
          console.log(err);
          return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      // console.log('Barcode detected:', result.codeResult.code);
      sucScan++;
      console.log(sucScan)
      if (sucScan > 100) {
        Quagga.stop();
        window.location.href = '/book/'+result.codeResult.code;
      }
      // document.querySelector('#barcode-text').innerHTML = 'ISBN: '+result.codeResult.code;
    });

    return () => {
      Quagga.stop();
    }
  }, []);

  return (
    <div id="scanner-wrapper">
      <div id="scanner-container"></div>
      <h3 id="barcode-text">ISBN:</h3>
    </div>
  );
};

export default Scanner;