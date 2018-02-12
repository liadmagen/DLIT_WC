import {Array1D, CostReduction, Graph, Optimizer, Session, SGDOptimizer, Tensor} from 'deeplearn';
import {InCPUMemoryShuffledInputProviderBuilder, NDArrayMath, NDArrayMathGPU, ENV} from 'deeplearn';
import {XhrDataset} from 'deeplearn';
import {MnistImageProcssing} from '../../common/mnist-image-processing';

// const math = ENV.math;
// const a = Array1D.new([1, 2, 3]);
// const b = Scalar.new(2);

// const result = math.add(a, b);

// result.data().then(data => console.log(data));

export class FullyConnectedModel {
  readonly IMAGE_SIZE = 28;
  readonly IMAGE_PIXELS = this.IMAGE_SIZE * this.IMAGE_SIZE;
  readonly NUM_CLASSES = 10;
  readonly BATCH_SIZE = 64;

  // math = new NDArrayMathGPU;
  math: NDArrayMath = ENV.math;
  graph: Graph;
  initialLearningRate: number;
  optimizer: Optimizer;
  session: Session;

  inputTensor: Tensor;
  targetTensor: Tensor;

  predictionTensor: Tensor;
  costTensor: Tensor;

  feedEntries = [];

  constructor(initialLearningRate: number = 0.1) {
    this.graph = new Graph();
    this.initialLearningRate = initialLearningRate;
    this.optimizer = new SGDOptimizer(this.initialLearningRate);
  }

  loadTrainngData(): Tensor[][] {
    let image = new MnistImageProcssing();
    image.loadMnistImage();

  }

  placeholderInputs(batchSize) {
    this.inputTensor =
        this.graph.placeholder('input MNIST', [batchSize, this.IMAGE_PIXELS]);
    this.targetTensor =
        this.graph.placeholder('output digit', [batchSize, this.NUM_CLASSES]);

    return [this.inputTensor, this.targetTensor];
  }

  createFullyConnectedLayer(
      inputLayer: Tensor, layerIndex: number, sizeOfThisLayer: number,
      useBias: boolean = true): Tensor {
          // dense is already doing the creation and multiplication of the nodes with the inptu layer + bias
    return this.graph.layers.dense(
        'fully_connected_${layerIndex}', inputLayer, sizeOfThisLayer,
        (x) => this.graph.relu(x), useBias);
  }

  /**
   * By default, creates a computation graph model with 4 hidden layers:
   * 1st: 64 nodes
   * 2nd: 32 nodes
   * 3rd: 16 nodes
   * 4th: 10 nodes
   * all with RELU activation function
   * and a Softmax at the end to emphasize the predicted class
   * loss function: euclidean distance
   */
  buildComputationGraph() {
    [this.inputTensor, this.targetTensor] =
        this.placeholderInputs(this.BATCH_SIZE);

    // add layers to the graph
    let fullyConnectedLayer: Tensor =
        this.createFullyConnectedLayer(this.inputTensor, 0, 64);

    fullyConnectedLayer =
        this.createFullyConnectedLayer(fullyConnectedLayer, 1, 32);

    fullyConnectedLayer =
        this.createFullyConnectedLayer(fullyConnectedLayer, 2, 16);

    fullyConnectedLayer =
        this.createFullyConnectedLayer(fullyConnectedLayer, 3, 10);

    this.predictionTensor = this.graph.softmax(fullyConnectedLayer);

    this.costTensor =
        this.graph.meanSquaredCost(this.targetTensor, this.predictionTensor);

    this.session = new Session(this.graph, this.math);

    return this.session;
  }

  normalizeVector(image) {
    return image.map(v => v / 255);
  }

  prepareTrainingSet(trainnsgSet) {
    this.math.scope(() => {
      const {rawInputs, rawTargets} = trainnsgSet;

      const inputArray =
          rawInputs.map(v => Array1D.new(this.normalizeVector(v)));
      const targetArray = rawTargets.map(v => Array1D.new(v));

      const shuffledInputProviderBuilder =
          new InCPUMemoryShuffledInputProviderBuilder(
              [inputArray, targetArray]);

      const [inputProvider, targetProvider] =
          shuffledInputProviderBuilder.getInputProviders();
    });
  }

  trainBatch(step, computeCost) {
    const learningRate =
        this.initialLearningRate * Math.pow(0.85, Math.floor(step / 42));
    (this.optimizer as SGDOptimizer).setLearningRate(learningRate);

    let costValue = -1;
    this.math.scope(() => {
      const cost = this.session.train(
          this.costTensor, this.feedEntries, this.BATCH_SIZE, this.optimizer,
          computeCost ? CostReduction.MEAN : CostReduction.NONE);

      if (computeCost) {
        costValue = cost.get();
      }
    });

    return costValue;
  }

  train(inputArray, targetArray) {
    const shuffledInputProviderBuilder =
        new InCPUMemoryShuffledInputProviderBuilder([inputArray, targetArray]);
    const [inputProvider, targetProvider] =
        shuffledInputProviderBuilder.getInputProviders();

    this.feedEntries = [
      {tensor: this.inputTensor, data: inputProvider},
      {tensor: this.targetTensor, data: targetProvider}
    ];

    const epochs = 100;
    for (let step = 1; step < epochs; step++) {
      this.trainBatch();
    }
  }

  runTrain() {
    let trainingSet = this.this.buildGraph();
    this.prepareTrainingSet(trainingSet);
  }

  /*
  infer(x: dl.Array1D, vars: {[varName: string]: dl.NDArray}): dl.Scalar {
    const hidden1W = vars['hidden1/weights'] as dl.Array2D;
    const hidden1B = vars['hidden1/biases'] as dl.Array1D;
    const hidden2W = vars['hidden2/weights'] as dl.Array2D;
    const hidden2B = vars['hidden2/biases'] as dl.Array1D;
    const softmaxW = vars['softmax_linear/weights'] as dl.Array2D;
    const softmaxB = vars['softmax_linear/biases'] as dl.Array1D;

    const hidden1 =
        x.as2D(-1, hidden1W.shape[0]).matMul(hidden1W).add(hidden1B).relu() as
        dl.Array1D;
    const hidden2 = hidden1.as2D(-1, hidden2W.shape[0])
                        .matMul(hidden2W)
                        .add(hidden2B)
                        .relu() as dl.Array1D;
    const logits =
        hidden2.as2D(-1, softmaxW.shape[0]).matMul(softmaxW).add(softmaxB);

    return logits.argMax();
  }*/
}
