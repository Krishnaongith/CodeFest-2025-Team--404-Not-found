/**
 * Face Verification Service
 * This service handles face detection and verification using face-api.js
 * Pre-registered member faces are loaded from the backend
 */

// Store registered face descriptors with user info
let registeredFaces = []

/**
 * Initialize face-api.js models
 */
export const loadFaceModels = async () => {
  try {
    // Load models from CDN
    const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'
    
    await Promise.all([
      window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      window.faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      window.faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ])
    
    console.log('Face detection models loaded successfully')
    return true
  } catch (error) {
    console.error('Error loading face models:', error)
    return false
  }
}

/**
 * Load pre-registered member faces from backend
 * @param {Array} members - Array of member objects with name and displayName
 * @returns {Promise<boolean>} - Success status
 */
export const loadRegisteredMemberFaces = async (members) => {
  try {
    registeredFaces = []
    
    const loadPromises = members.map(member => {
      return new Promise((resolve) => {
        const imagePath = `/registered-faces/${member.fileName}`
        const img = new Image()
        img.crossOrigin = 'anonymous'
        
        img.onload = async () => {
          try {
            const detection = await window.faceapi
              .detectSingleFace(img, new window.faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceDescriptor()

            if (detection) {
              registeredFaces.push({
                name: member.name,
                displayName: member.displayName,
                descriptor: detection.descriptor
              })
              console.log(`✅ Face registered successfully for: ${member.displayName}`)
              resolve(true)
            } else {
              console.error(`❌ No face detected in registration image for: ${member.displayName}`)
              resolve(false)
            }
          } catch (error) {
            console.error(`❌ Error processing face for ${member.displayName}:`, error)
            resolve(false)
          }
        }
        
        img.onerror = () => {
          console.error(`❌ Failed to load image: ${imagePath}`)
          resolve(false)
        }
        
        img.src = imagePath
      })
    })
    
    const results = await Promise.all(loadPromises)
    const successCount = results.filter(r => r).length
    
    console.log(`📊 Loaded ${successCount}/${members.length} registered faces`)
    return successCount > 0
  } catch (error) {
    console.error('Error loading registered faces:', error)
    return false
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use loadRegisteredMemberFaces instead
 */
export const loadRegisteredMemberFace = async (memberName = 'krishna') => {
  return loadRegisteredMemberFaces([
    { name: 'krishna', displayName: 'Krishna Sharma', fileName: 'krishna.jpg' }
  ])
}

/**
 * Register a face from an image element (for testing/admin purposes)
 * @param {HTMLImageElement} imageElement - Image element containing the face
 * @returns {Promise<boolean>} - Success status
 */
export const registerFace = async (imageElement) => {
  try {
    const detection = await window.faceapi
      .detectSingleFace(imageElement, new window.faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (detection) {
      registeredFaceDescriptor = detection.descriptor
      console.log('Face registered successfully')
      return true
    } else {
      console.error('No face detected in registration image')
      return false
    }
  } catch (error) {
    console.error('Error registering face:', error)
    return false
  }
}

/**
 * Verify a face against all registered faces
 * @param {HTMLVideoElement|HTMLImageElement} element - Video or image element
 * @returns {Promise<{match: boolean, distance: number, confidence: number, user: object}>}
 */
export const verifyFace = async (element) => {
  try {
    if (!registeredFaces || registeredFaces.length === 0) {
      throw new Error('No registered faces found. Please register faces first.')
    }

    const detection = await window.faceapi
      .detectSingleFace(element, new window.faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (!detection) {
      return {
        match: false,
        distance: 1,
        confidence: 0,
        error: 'No face detected',
        user: null
      }
    }

    // Threshold for face matching (lower is better, 0.4 = 60% confidence)
    const MATCH_THRESHOLD = 0.4
    
    // Find the best match among all registered faces
    let bestMatch = {
      match: false,
      distance: 1,
      confidence: 0,
      user: null
    }

    for (const registeredFace of registeredFaces) {
      // Calculate Euclidean distance between face descriptors
      const distance = window.faceapi.euclideanDistance(
        registeredFace.descriptor,
        detection.descriptor
      )
      
      // Calculate confidence (0-100%)
      const confidence = Math.max(0, Math.min(100, (1 - distance) * 100))
      
      // Check if this is a better match than previous best
      if (distance < bestMatch.distance) {
        bestMatch = {
          match: distance < MATCH_THRESHOLD,
          distance,
          confidence: Math.round(confidence),
          user: {
            name: registeredFace.name,
            displayName: registeredFace.displayName
          }
        }
      }
    }

    return bestMatch
  } catch (error) {
    console.error('Error verifying face:', error)
    return {
      match: false,
      distance: 1,
      confidence: 0,
      error: error.message,
      user: null
    }
  }
}

/**
 * Check if faces are registered
 */
export const isFaceRegistered = () => {
  return registeredFaces && registeredFaces.length > 0
}

/**
 * Get count of registered faces
 */
export const getRegisteredFacesCount = () => {
  return registeredFaces ? registeredFaces.length : 0
}

/**
 * Clear all registered faces
 */
export const clearRegisteredFaces = () => {
  registeredFaces = []
}
