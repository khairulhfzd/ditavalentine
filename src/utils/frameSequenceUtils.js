/**
 * Frame Sequence Utilities
 * Helper functions for managing and optimizing frame sequences
 */

/**
 * Dynamically detect frame files in a folder
 * Useful when you don't know the exact count
 * 
 * @param {string} folderPath - Path to frames folder
 * @param {string} pattern - Glob pattern (e.g., 'frame_*.jpg')
 * @returns {Promise<string[]>} - Array of frame paths
 */
export async function detectFrames(folderPath, pattern = '*.*') {
    try {
        // Using Vite's import.meta.glob for dynamic imports
        const frameModules = import.meta.glob('/src/assets/videos/frames/*.*', {
            eager: false,
            as: 'url'
        })

        const framePaths = Object.keys(frameModules)
            .filter(path => {
                // Filter by pattern if needed
                const filename = path.split('/').pop()
                return filename.match(/\.(jpg|jpeg|png|webp)$/i)
            })
            .sort() // Ensure alphabetical order

        return framePaths
    } catch (error) {
        console.error('Error detecting frames:', error)
        return []
    }
}

/**
 * Preload images with progress tracking
 * 
 * @param {string[]} imagePaths - Array of image URLs
 * @param {Function} onProgress - Progress callback (current, total)
 * @returns {Promise<HTMLImageElement[]>} - Array of loaded images
 */
export function preloadImages(imagePaths, onProgress) {
    return new Promise((resolve, reject) => {
        const images = []
        let loadedCount = 0
        const total = imagePaths.length

        if (total === 0) {
            resolve([])
            return
        }

        imagePaths.forEach((path, index) => {
            const img = new Image()

            img.onload = () => {
                images[index] = img
                loadedCount++

                if (onProgress) {
                    onProgress(loadedCount, total)
                }

                if (loadedCount === total) {
                    resolve(images)
                }
            }

            img.onerror = () => {
                console.warn(`Failed to load image: ${path}`)
                loadedCount++

                if (onProgress) {
                    onProgress(loadedCount, total)
                }

                if (loadedCount === total) {
                    resolve(images.filter(Boolean))
                }
            }

            img.src = path
        })
    })
}

/**
 * Calculate optimal canvas dimensions maintaining aspect ratio
 * 
 * @param {number} imgWidth - Image width
 * @param {number} imgHeight - Image height
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @param {string} fit - 'cover' or 'contain'
 * @returns {Object} - { width, height, offsetX, offsetY }
 */
export function calculateCanvasDimensions(
    imgWidth,
    imgHeight,
    containerWidth,
    containerHeight,
    fit = 'contain'
) {
    const imgAspect = imgWidth / imgHeight
    const containerAspect = containerWidth / containerHeight

    let drawWidth, drawHeight, offsetX = 0, offsetY = 0

    if (fit === 'contain') {
        if (imgAspect > containerAspect) {
            // Image is wider - fit to width
            drawWidth = containerWidth
            drawHeight = drawWidth / imgAspect
            offsetY = (containerHeight - drawHeight) / 2
        } else {
            // Image is taller - fit to height
            drawHeight = containerHeight
            drawWidth = drawHeight * imgAspect
            offsetX = (containerWidth - drawWidth) / 2
        }
    } else if (fit === 'cover') {
        if (imgAspect > containerAspect) {
            // Image is wider - fit to height
            drawHeight = containerHeight
            drawWidth = drawHeight * imgAspect
            offsetX = (containerWidth - drawWidth) / 2
        } else {
            // Image is taller - fit to width
            drawWidth = containerWidth
            drawHeight = drawWidth / imgAspect
            offsetY = (containerHeight - drawHeight) / 2
        }
    }

    return {
        width: drawWidth,
        height: drawHeight,
        offsetX,
        offsetY
    }
}

/**
 * Debounce function for resize events
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 150) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
}

/**
 * Get optimal frame quality based on device
 * @returns {Object} - Recommended settings
 */
export function getOptimalFrameSettings() {
    const mobile = isMobile()
    const pixelRatio = window.devicePixelRatio || 1

    if (mobile) {
        return {
            maxWidth: 1280,
            maxHeight: 720,
            quality: 0.8,
            format: 'jpg',
            frameCount: 60, // Fewer frames for mobile
        }
    }

    if (pixelRatio > 1.5) {
        // Retina display
        return {
            maxWidth: 2560,
            maxHeight: 1440,
            quality: 0.9,
            format: 'webp',
            frameCount: 120,
        }
    }

    return {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        format: 'jpg',
        frameCount: 120,
    }
}

/**
 * Estimate memory usage for frame sequence
 * 
 * @param {number} frameCount - Number of frames
 * @param {number} width - Frame width
 * @param {number} height - Frame height
 * @param {number} bytesPerPixel - Bytes per pixel (default 4 for RGBA)
 * @returns {Object} - { megabytes, recommended }
 */
export function estimateMemoryUsage(frameCount, width, height, bytesPerPixel = 4) {
    const bytesPerFrame = width * height * bytesPerPixel
    const totalBytes = bytesPerFrame * frameCount
    const megabytes = totalBytes / (1024 * 1024)

    return {
        megabytes: Math.round(megabytes),
        recommended: megabytes < 500, // Recommend if under 500MB
        warning: megabytes > 1000 ? 'High memory usage - consider reducing frame count or resolution' : null
    }
}
