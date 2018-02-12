/**
 * Loads a model description (JSON format)
 */

export interface LayerInfos {
  layerName: 'Dense'|'ReLU'|'Convolution'|'Max pool'|'Flatten';
  //Dense (Fully Connected)
  numberOfUnits: number;
  // Convolution | Max pool
  fieldSize: number;
  stride: number;
  zeroPad: number;
  outputDepth: number;
}

export interface XhrModelConfig {
  layers: LayerInfos[];
}

/**
 * 
 * @param jsonConfigPath 
 */
export function getXhrModelConfig(jsonConfigPath: string):
    Promise<{layers: XhrModelConfig}> {
  return new Promise<{layers: XhrModelConfig}>(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', jsonConfigPath);

        xhr.onload = () => {
          resolve(
              JSON.parse(xhr.responseText) as
              {layers: XhrModelConfig});
        };
        xhr.onerror = (error) => {
          reject(error);
        };
        xhr.send();
      });
}



/** Data Set  **/
export interface LayerInfos {
    layerName: 'Dense'|'ReLU'|'Convolution'|'Max pool'|'Flatten';
    //Dense (Fully Connected)
    numberOfUnits: number;
    // Convolution | Max pool
    fieldSize: number;
    stride: number;
    zeroPad: number;
    outputDepth: number;
  }
  
export interface XhrDataSetConfig {
    type: LayerInfos[];
  }
  

  export function getXhrDataSetConfig(jsonConfigPath: string):
    Promise<{layers: XhrModelConfig}> {
  return new Promise<{layers: XhrModelConfig}>(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', jsonConfigPath);

        xhr.onload = () => {
          resolve(
              JSON.parse(xhr.responseText) as
              {layers: XhrModelConfig});
        };
        xhr.onerror = (error) => {
          reject(error);
        };
        xhr.send();
      });
}



