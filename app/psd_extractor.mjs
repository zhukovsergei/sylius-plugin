import PSD from 'psd';
import fs from 'fs-extra';
import path from 'path';

async function extractLayers(psdPath) {
  if (!fs.existsSync(psdPath)) {
    console.error('File does not exist:', psdPath);
    return;
  }

  const psd = PSD.fromFile(psdPath);
  psd.parse();

  const outputDir = path.join(path.dirname(psdPath), 'extracted_data');
  fs.ensureDirSync(outputDir);

  const layers = psd.tree().descendants();
  console.log(`Total layers found: ${layers.length}`);

  layers.forEach(layer => {

    const isVisible = layer.visible();  // evaluate visibility
    console.log(`Inspecting layer: ${layer.name}, visible: ${isVisible}, kind: ${layer.kind}`);

    if (layer.isLayer() && !layer.isGroup() && isVisible) { // Only process visible layers
      const layerName = layer.name.replace(/[^a-zA-Z0-9]/g, '_');

      if (layer.image && layer.image()) { // Check if it is image layer
        const imgPath = path.join(outputDir, `${layerName}.png`);
        layer.image().saveAsPng(imgPath).then(() => {
          console.log(`Saved image layer as ${imgPath}`);
        }).catch(err => {
          console.error('Error saving image:', err);
        });
      }
      // Check if it text layer
      if (layer.kind === 'text' && layer.text) {
        const textData = {
          text: layer.text.value,
          font: layer.text.fonts ? layer.text.fonts().join(", ") : "Unknown",
          size: layer.text.sizes ? layer.text.sizes().join(", ") : "Unknown",
          color: layer.text.colors ? layer.text.colors().join(", ") : "Unknown"
        };
        const jsonPath = path.join(outputDir, `${layerName}.json`);
        fs.writeJson(jsonPath, textData, {
          spaces: 2
        }, err => {
          if (err) console.error('Error writing JSON for layer:', layerName, err);
          else console.log(`Saved text layer as ${jsonPath}`);
        });
      }
    }
  });
}

const psdFilePath = process.argv[2];
extractLayers(psdFilePath);
