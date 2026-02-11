# Frame Sequence Animation - Setup Guide

## 📁 Preparing Your Frame Sequence

### Method 1: Extract Frames from Video (Using FFmpeg)

If you have a video file, extract frames using FFmpeg:

```bash
# Install FFmpeg first (if not installed)
# Windows: Download from https://ffmpeg.org/download.html

# Extract frames from video
ffmpeg -i input_video.mp4 -vf "fps=30" src/assets/videos/frames/frame_%04d.jpg

# Options:
# fps=30 → 30 frames per second (adjust as needed)
# %04d → zero-padded 4 digits (0001, 0002, etc.)
# .jpg → output format (can use .png, .webp for better quality)
```

### Method 2: Online Tools

- **Ezgif.com** - Upload video, export as image sequence
- **CloudConvert** - Video to images converter
- **VEED.io** - Extract frames online

### Method 3: Adobe Premiere / After Effects

1. Import video
2. File → Export → Image Sequence
3. Choose format (JPEG, PNG, or WebP)
4. Set naming pattern with padding

---

## 📦 Folder Structure

Place your extracted frames in:

```
src/assets/videos/frames/
├── frame_0001.jpg
├── frame_0002.jpg
├── frame_0003.jpg
├── ...
└── frame_0120.jpg
```

**Alternative naming patterns:**
- `sequence_001.png`
- `img_0001.webp`
- `photo_00001.jpg`

(Component supports any pattern - just configure the props!)

---

## 🎨 Component Usage

### Basic Usage

```jsx
import FrameSequencePlayer from './components/FrameSequencePlayer'

function App() {
  return (
    <FrameSequencePlayer
      folderPath="/src/assets/videos/frames/"
      frameCount={120}
      framePrefix="frame_"
      frameExtension="jpg"
      paddingLength={4}
    />
  )
}
```

### Advanced Configuration

```jsx
<FrameSequencePlayer
  // Frame sequence settings
  folderPath="/assets/frames/scrollvideo/"
  frameCount={240}              // Total number of frames
  framePrefix="img_"            // Filename prefix
  frameExtension="webp"         // File format
  paddingLength={5}             // Padding: 00001, 00002, etc.
  
  // Scroll settings
  sectionHeight="400vh"         // Scroll distance (longer = slower playback)
/>
```

---

## ⚙️ Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `folderPath` | string | `'/frames/'` | Path to frame folder |
| `frameCount` | number | `120` | Total number of frames |
| `framePrefix` | string | `'frame_'` | Filename prefix before number |
| `frameExtension` | string | `'jpg'` | File extension (jpg, png, webp) |
| `paddingLength` | number | `4` | Zero-padding length for numbers |
| `sectionHeight` | string | `'300vh'` | Scroll height (affects playback speed) |

---

## 🎯 Best Practices

### Frame Quality vs Performance

**High Quality (Desktop)**
- Format: PNG or WebP
- Resolution: 1920x1080 or higher
- Frame count: 120-240 frames

**Optimized (Mobile)**
- Format: JPEG (80-90% quality)
- Resolution: 1280x720
- Frame count: 60-120 frames

### Recommended Settings

```jsx
// Smooth, cinematic (240 frames)
<FrameSequencePlayer
  frameCount={240}
  sectionHeight="500vh"  // Longer scroll = slower, smoother
/>

// Fast, snappy (60 frames)
<FrameSequencePlayer
  frameCount={60}
  sectionHeight="200vh"  // Shorter scroll = faster
/>
```

### Scroll Height Guide

- `200vh` = Fast playback (2x viewport)
- `300vh` = Normal speed (3x viewport)
- `500vh` = Slow, cinematic (5x viewport)

---

## 🚀 Performance Optimization

### 1. Image Optimization

**Before adding frames:**
- Resize to appropriate dimensions (1920x1080 max)
- Compress images (TinyPNG, Squoosh, ImageOptim)
- Use WebP for best quality/size ratio

### 2. Lazy Loading (Optional)

For very long sequences (>200 frames), consider loading frames in chunks:

```jsx
// Future enhancement: Load frames progressively
// First 30 frames → instant display
// Remaining frames → load in background
```

### 3. Mobile Considerations

The component automatically:
- ✅ Scales canvas to viewport
- ✅ Maintains aspect ratio
- ✅ Uses requestAnimationFrame for smooth rendering
- ✅ Only renders when frame changes (optimization)

---

## 🧪 Testing

### Check if frames load correctly

Open browser console (F12) and look for:
- ❌ "Failed to load frame: /frames/frame_0001.jpg" → Fix path
- ✅ No errors → Frames loading successfully

### Scroll test

1. Scroll down slowly → animation should play forward
2. Scroll up → animation should play backward
3. Check smoothness (should be 60fps)

---

## 📱 Responsive Behavior

The canvas automatically:
- Fits container width/height
- Maintains image aspect ratio
- Centers the frame
- Adapts to window resize

Works perfectly on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablet (iPad, Android tablets)

---

## 🐛 Troubleshooting

### Frames not loading?

**Check:**
1. File paths are correct (case-sensitive!)
2. Frame numbering matches pattern
3. All frames exist (no gaps in sequence)
4. File extensions match (jpg vs jpeg)

**Fix:**
```jsx
// Wrong
folderPath="/Frames/"  // Capital F
frameExtension="jpeg"  // Files are .jpg

// Correct
folderPath="/frames/"  // Lowercase
frameExtension="jpg"   // Match actual extension
```

### Animation too fast/slow?

Adjust `sectionHeight`:
```jsx
// Too fast → Increase height
sectionHe ight="500vh"

// Too slow → Decrease height
sectionHeight="200vh"
```

### Low FPS / Janky scrolling?

1. Reduce image size (max 1920x1080)
2. Use JPEG instead of PNG
3. Reduce frame count (every 2nd frame)

---

## 💡 Example Naming Patterns

The component supports various patterns:

```jsx
// Pattern 1: frame_0001.jpg
framePrefix="frame_"
paddingLength={4}

// Pattern 2: img_001.png
framePrefix="img_"
paddingLength={3}

// Pattern 3: photo_00001.webp
framePrefix="photo_"
paddingLength={5}

// Pattern 4: sequence_01.jpg
framePrefix="sequence_"
paddingLength={2}
```

---

## 🎬 Ready to Use!

1. Extract your video frames
2. Place in `src/assets/videos/frames/`
3. Add component to `App.jsx`
4. Adjust `frameCount` to match your sequence
5. Test and enjoy smooth scroll animation! 🚀
