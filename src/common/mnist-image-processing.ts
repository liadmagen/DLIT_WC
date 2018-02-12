import {Array1D} from 'deeplearn';
import {XhrDataset} from 'deeplearn';
import * as dl from 'deeplearn';

/**
 * A helper class for loading, displaying the MNIST digits
 */
export class MnistImageProcssing {
  readonly MNIST_FILE = '../assets/mnist_images.png';

  /**
   * Receieve an image as an array of pixels and draws it as a 2D image
   * @param array - representing image pixels
   */
  renderMnistImage(array: Array1D) {
    const width = 28;
    const height = 28;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const float32Array = array.dataSync();
    const imageData = ctx.createImageData(width, height);
    for (let i = 0; i < float32Array.length; ++i) {
      const j = i * 4;
      const value = Math.round(float32Array[i] * 255);
      imageData.data[j + 0] = value; // R
      imageData.data[j + 1] = value; // G
      imageData.data[j + 2] = value; // B
      imageData.data[j + 3] = 255; // alpha channel
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  loadMnistImage() {
    let xhrConf = dl.getXhrDatasetConfig();
    let xhr = new XhrDataset(xhrConf);

  }
}
