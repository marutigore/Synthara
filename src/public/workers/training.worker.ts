// Web Worker for offloading mock training computation tasks
self.onmessage = function (e) {
  const { datasetSize, epochs, batchSize, modelType } = e.data;

  let epoch = 0;
  const interval = setInterval(() => {
    epoch++;
    const progress = Math.min(100, Math.round((epoch / epochs) * 100));
    
    // Simulate training loss/accuracy metrics changes
    const loss = 1.0 / (epoch * 0.8 + 1.0) + Math.random() * 0.05;
    const accuracy = modelType === "classification" 
      ? Math.min(0.99, 0.5 + (epoch / epochs) * 0.45 + Math.random() * 0.02)
      : undefined;

    self.postMessage({
      type: "epoch",
      epoch,
      progress,
      metrics: {
        loss: parseFloat(loss.toFixed(4)),
        ...(accuracy ? { accuracy: parseFloat(accuracy.toFixed(4)) } : {})
      }
    });

    if (epoch >= epochs) {
      clearInterval(interval);
      self.postMessage({
        type: "complete",
        metrics: {
          accuracy: modelType === "classification" ? 0.94 : undefined,
          loss: 0.12
        }
      });
    }
  }, 150);
};
