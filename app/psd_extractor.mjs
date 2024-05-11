import PSD from 'psd';
import fs from 'fs-extra';
import path from 'path';
import { PNG } from 'pngjs';

async function extractImageLayers(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error('File does not exist:', filePath);
        return;
    }

    const fileType = path.extname(filePath).toLowerCase();
    const outputDir = path.join(path.dirname(filePath), 'extracted_data');
    fs.ensureDirSync(outputDir);

    if (fileType === '.psd') {
        const psd = PSD.fromFile(filePath);
        psd.parse();
        const layers = psd.tree().descendants();
        console.log(`Total layers found: ${layers.length}`);
        processLayers(layers, outputDir);
    } else if (fileType === '.png') {
        splitPngIntoSegments(filePath, outputDir);
    } else {
        console.error('Unsupported file type:', fileType);
    }
}

function splitPngIntoSegments(filePath, outputDir) {
    fs.createReadStream(filePath)
        .pipe(new PNG())
        .on('parsed', function() {
            let segments = 4; // Number of segments to split the image into
            let segmentWidth = Math.floor(this.width / 2);
            let segmentHeight = Math.floor(this.height / 2);

            for (let i = 0; i < 2; i++) { // Rows
                for (let j = 0; j < 2; j++) { // Columns
                    let segment = new PNG({ width: segmentWidth, height: segmentHeight });

                    this.bitblt(segment, j * segmentWidth, i * segmentHeight, segmentWidth, segmentHeight, 0, 0);

                    let segmentPath = path.join(outputDir, `segment_${i * 2 + j + 1}.png`);
                    segment.pack().pipe(fs.createWriteStream(segmentPath));
                    console.log(`Segment ${i * 2 + j + 1} saved at ${segmentPath}`);
                }
            }
        });
}

function processLayers(layers, outputDir) {
    layers.forEach(layer => {
        const isVisible = layer.visible();
        console.log(`Inspecting layer: ${layer.name}, visible: ${isVisible}, kind: ${layer.kind}`);

        if (layer.isLayer() && !layer.isGroup() && isVisible) {
            const layerName = layer.name.replace(/[^a-zA-Z0-9]/g, '_');
            processImageLayer(layer, outputDir, layerName);
            processTextLayer(layer, outputDir, layerName);
        }
    });
}

function processImageLayer(layer, outputDir, layerName) {
    if (layer.image && layer.image()) {
        const imgPath = path.join(outputDir, `${layerName}.png`);
        layer.image().saveAsPng(imgPath).then(() => {
            console.log(`Saved image layer as ${imgPath}`);
        }).catch(err => {
            console.error('Error saving image:', err);
        });
    }
}

function processTextLayer(layer, outputDir, layerName) {
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

const filePath = process.argv[2];
extractImageLayers(filePath);
