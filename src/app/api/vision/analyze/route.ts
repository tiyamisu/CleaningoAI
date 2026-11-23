import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Demo mode AI analysis — clearly labelled, never presented as real inference
const DEMO_WASTE_CLASSES = [
  ['mixed_waste'],
  ['plastic_dominant_waste'],
  ['mixed_waste', 'plastic_dominant_waste'],
  ['construction_debris'],
  ['mixed_waste', 'construction_debris'],
];

const DEMO_SEVERITY = ['low', 'medium', 'high', 'medium', 'high', 'low', 'medium'];

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let fileName = 'sample_image.jpg';
    let fileSize = 1024 * 50;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const imageFile = formData.get('image') as File | null;

      if (!imageFile) {
        return NextResponse.json({ error: 'No image provided' }, { status: 400 });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload JPEG, PNG, or WebP.' },
          { status: 400 }
        );
      }

      // Validate file size (10 MB limit)
      if (imageFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 10 MB.' },
          { status: 400 }
        );
      }

      fileName = imageFile.name;
      fileSize = imageFile.size;
    } else if (contentType.includes('application/json')) {
      const json = await req.json().catch(() => ({}));
      fileName = json.image_name || 'simulated_photo.jpg';
      fileSize = json.file_size || 1024 * 75;
    }

    // Simulate processing delay (200-400ms)
    const processingMs = Math.floor(Math.random() * 200) + 200;
    await new Promise((r) => setTimeout(r, processingMs));

    // Deterministic demo results based on filename hash
    const seed = fileName.length + fileSize;
    const classIdx = seed % DEMO_WASTE_CLASSES.length;
    const sevIdx = seed % DEMO_SEVERITY.length;
    const wasteDetected = seed % 7 !== 0; // ~85% detection rate in demo
    const confidence = wasteDetected ? 0.65 + (seed % 25) / 100 : 0.12 + (seed % 20) / 100;

    const result = {
      is_demo: true,
      demo_disclaimer:
        'DEMONSTRATION MODE — Results are illustrative only and do not reflect actual AI model inference. A real YOLO model checkpoint has not been integrated.',
      model_version: 'DEMO_MODE_v1.0',
      analysis_id: `DEMO_${randomUUID().slice(0, 8).toUpperCase()}`,
      image_name: fileName,
      image_size_bytes: fileSize,
      processing_ms: processingMs,
      waste_detected: wasteDetected,
      waste_classes: wasteDetected ? DEMO_WASTE_CLASSES[classIdx] : [],
      confidence: parseFloat(confidence.toFixed(2)),
      severity_estimate: wasteDetected ? DEMO_SEVERITY[sevIdx] : 'not_assessable',
      bounding_boxes: wasteDetected
        ? [
            {
              x: 80 + (seed % 60),
              y: 60 + (seed % 40),
              w: 200 + (seed % 100),
              h: 150 + (seed % 80),
              class: (DEMO_WASTE_CLASSES[classIdx][0] || 'waste'),
              confidence: parseFloat(confidence.toFixed(2)),
            },
          ]
        : [],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('[API /vision/analyze POST]', err);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}

