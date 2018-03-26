import {Polymer} from 'polymer'

class MnistImageProcssing extends Polymer.Element {
  readonly BASE_PATH = '../assets/mnist/';
  readonly MNIST_DATA = 'mnist_images.png';
  readonly MNIST_LABELS = 'mnist_labels_uint8';
  readonly WIDTH = 28;
  readonly HEIGHT = 28;

  /**
   * Receieve an image as an array of pixels and draws it as a 2D image
   * @param array - representing image pixels
   */
  renderMnistImage(array: Array1D) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const float32Array = array.dataSync();
    const imageData = ctx.createImageData(this.WIDTH, this.HEIGHT);
    for (let i = 0; i < float32Array.length; ++i) {
      const j = i * 4;
      const value = Math.round(float32Array[i] * 255);
      imageData.data[j + 0] = value;  // R
      imageData.data[j + 1] = value;  // G
      imageData.data[j + 2] = value;  // B
      imageData.data[j + 3] = 255;    // alpha channel
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }
}