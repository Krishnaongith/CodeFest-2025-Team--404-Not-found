import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { loadFaceModels, loadRegisteredMemberFaces, verifyFace, isFaceRegistered, getRegisteredFacesCount } from '../services/faceVerification'

const FaceIDVerification = ({ onComplete, guestName = 'Guest' }) => {
  const [stage, setStage] = useState('init') // init, loading, ready, scanning, verified, failed, error
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('Initializing...')
  
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const canvasRef = useRef(null)
  
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [useFallback, setUseFallback] = useState(false)
  const [verifiedUser, setVerifiedUser] = useState(null)

  // Step 1: Load face-api.js models
  useEffect(() => {
    let mounted = true

    const initFaceAPI = async () => {
      try {
        setStatusMessage('Loading face recognition models...')
        console.log('🔄 Loading face-api.js models...')
        
        // Wait for face-api to be available
        let attempts = 0
        while (!window.faceapi && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }
        
        if (!window.faceapi) {
          console.warn('⚠️ face-api.js not available, using fallback mode')
          if (mounted) {
            setUseFallback(true)
            setModelsLoaded(true)
          }
          return
        }
        
        // Load models
        const modelsSuccess = await loadFaceModels()
        if (!modelsSuccess) {
          console.warn('⚠️ Failed to load models, using fallback mode')
          if (mounted) {
            setUseFallback(true)
            setModelsLoaded(true)
          }
          return
        }
        
        // Load registered faces for all users
        console.log('🔄 Loading registered faces...')
        const members = [
          { name: 'krishna', displayName: 'Krishna Sharma', fileName: 'krishna.jpg' },
          { name: 'vishwaja', displayName: 'Vishwaja', fileName: 'Vishwaja.jpg' }
        ]
        const faceSuccess = await loadRegisteredMemberFaces(members)
        if (!faceSuccess) {
          console.warn('⚠️ Failed to load registered faces, using fallback mode')
          if (mounted) {
            setUseFallback(true)
            setModelsLoaded(true)
          }
          return
        }
        
        console.log(`✅ Loaded ${getRegisteredFacesCount()} registered faces`)
        
        if (mounted) {
          console.log('✅ Face-api.js initialized successfully')
          setModelsLoaded(true)
        }
      } catch (err) {
        console.error('❌ Error initializing face-api.js:', err)
        if (mounted) {
          setUseFallback(true)
          setModelsLoaded(true)
        }
      }
    }

    initFaceAPI()

    return () => {
      mounted = false
    }
  }, [])

  // Step 2.5: Draw video to canvas continuously
  useEffect(() => {
    if (!cameraReady || !videoRef.current || !canvasRef.current) return

    let animationId
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const drawFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas size to match video
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
        }
        
        // Draw the video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
      
      animationId = requestAnimationFrame(drawFrame)
    }

    console.log('🎬 Starting video feed rendering')
    drawFrame()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [cameraReady, stage])

  // Step 2: Initialize camera after models are loaded
  useEffect(() => {
    if (!modelsLoaded) return

    let mounted = true

    const initCamera = async () => {
      // Wait for video element to be available
      let attempts = 0
      while (!videoRef.current && attempts < 20) {
        console.log('⏳ Waiting for video element...')
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }
      
      if (!videoRef.current) {
        console.error('❌ Video element never became available')
        if (mounted) {
          setError('Video element not found. Please reload the page.')
          setStage('error')
        }
        return
      }
      
      console.log('✅ Video element found')
      try {
        setStage('loading')
        setStatusMessage('Accessing camera...')
        console.log('🔄 Initializing camera...')

        // Check browser support
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Camera not supported in this browser')
        }

        console.log('🔄 Requesting camera permission...')
        
        // Request camera access with timeout
        const streamPromise = navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          }
        })

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Camera access timeout - please grant permission')), 10000)
        })

        const stream = await Promise.race([streamPromise, timeoutPromise])

        if (!mounted) {
          stream.getTracks().forEach(track => track.stop())
          return
        }

        console.log('✅ Camera stream obtained:', {
          tracks: stream.getTracks().length,
          videoTracks: stream.getVideoTracks().length
        })
        
        streamRef.current = stream

        // Attach to video element
        const video = videoRef.current
        if (!video) {
          throw new Error('Video element not found')
        }

        console.log('🔄 Attaching stream to video element...')
        video.srcObject = stream
        
        // Wait for video to be ready
        await new Promise((resolve, reject) => {
          let resolved = false
          
          const onSuccess = () => {
            if (resolved) return
            resolved = true
            console.log('✅ Video ready and playing')
            resolve()
          }
          
          const onError = (err) => {
            if (resolved) return
            resolved = true
            console.error('❌ Video error:', err)
            reject(err)
          }
          
          video.onloadedmetadata = () => {
            console.log('✅ Video metadata loaded:', {
              width: video.videoWidth,
              height: video.videoHeight,
              readyState: video.readyState
            })
            video.play()
              .then(onSuccess)
              .catch(onError)
          }
          
          video.oncanplay = () => {
            console.log('✅ Video can play')
            if (!resolved && video.paused) {
              video.play().then(onSuccess).catch(onError)
            }
          }
          
          video.onerror = (e) => {
            onError(video.error || e)
          }
          
          // Timeout fallback
          setTimeout(() => {
            if (resolved) return
            console.log('⏰ Video timeout, checking state:', {
              readyState: video.readyState,
              paused: video.paused,
              videoWidth: video.videoWidth
            })
            
            if (video.readyState >= 2) {
              video.play().then(onSuccess).catch(onError)
            } else {
              onError(new Error('Video failed to load after 5 seconds'))
            }
          }, 5000)
        })

        if (mounted) {
          console.log('✅ Camera ready')
          setCameraReady(true)
          setStage('ready')
          setStatusMessage('Camera ready')
        }
      } catch (err) {
        console.error('❌ Camera error:', err)
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          constraint: err.constraint
        })
        
        if (mounted) {
          let errorMessage = 'Camera error: '
          
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            errorMessage += 'Camera permission denied. Please allow camera access and reload.'
          } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            errorMessage += 'No camera found. Please connect a camera.'
          } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
            errorMessage += 'Camera is in use by another application.'
          } else if (err.message.includes('timeout')) {
            errorMessage += 'Camera access timeout. Please grant permission and try again.'
          } else {
            errorMessage += err.message
          }
          
          setError(errorMessage)
          setStage('error')
        }
      }
    }

    initCamera()

    return () => {
      mounted = false
      if (streamRef.current) {
        console.log('🧹 Cleaning up camera stream')
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
    }
  }, [modelsLoaded])

  // Start face verification
  const startVerification = async () => {
    setStage('scanning')
    setProgress(0)
    setStatusMessage('Scanning face...')

    try {
      console.log('🔄 Starting face verification...')
      console.log('📊 Status:', { modelsLoaded, cameraReady, useFallback, faceRegistered: isFaceRegistered() })

      if (useFallback || !modelsLoaded || !isFaceRegistered()) {
        // Fallback mode - simulate verification
        console.log('⚠️ Using fallback verification')
        
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i)
          await new Promise(resolve => setTimeout(resolve, 200))
        }

        const success = Math.random() > 0.2 // 80% success rate
        
        if (success) {
          // In fallback mode, default to krishna
          const fallbackUser = { name: 'krishna', displayName: 'Krishna Sharma' }
          setVerificationResult({ match: true, confidence: 95 })
          setVerifiedUser(fallbackUser)
          setStage('verified')
          setStatusMessage('Identity verified!')
          
          setTimeout(() => {
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop())
            }
            onComplete(fallbackUser)
          }, 2000)
        } else {
          setVerificationResult({ match: false, confidence: 45 })
          setStage('failed')
          setError('Face verification failed. Please try again.')
        }
        return
      }

      // Real face verification
      console.log('✅ Using real face verification')
      
      // Give camera time to stabilize
      await new Promise(resolve => setTimeout(resolve, 500))
      setProgress(10)

      // Try multiple times for better accuracy
      let bestResult = { match: false, confidence: 0, distance: 1 }
      const attempts = 5

      for (let i = 0; i < attempts; i++) {
        console.log(`🔄 Verification attempt ${i + 1}/${attempts}`)
        
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 400))
        }

        const result = await verifyFace(videoRef.current)
        console.log(`📊 Result ${i + 1}:`, result)

        if (result.confidence > bestResult.confidence) {
          bestResult = result
        }

        setProgress(10 + ((i + 1) / attempts) * 80)

        // Early exit on strong match
        if (result.match && result.confidence > 85) {
          console.log('✅ Strong match found!')
          bestResult = result
          break
        }
      }

      setProgress(100)
        console.log('📊 Best result:', bestResult)

        if (bestResult.match && bestResult.user) {
          setVerificationResult(bestResult)
          setVerifiedUser(bestResult.user)
          setStage('verified')
          setStatusMessage(`Welcome ${bestResult.user.displayName}! (${bestResult.confidence}% confidence)`)
          
          setTimeout(() => {
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop())
            }
            onComplete(bestResult.user)
          }, 2000)
        } else {
          setVerificationResult(bestResult)
          setStage('failed')
          setError(bestResult.error || `Face verification failed. Confidence: ${bestResult.confidence}%`)
        }
    } catch (err) {
      console.error('❌ Verification error:', err)
      setStage('error')
      setError(`Verification error: ${err.message}`)
    }
  }

  // Retry verification
  const retry = () => {
    setStage('ready')
    setError('')
    setProgress(0)
    setVerificationResult(null)
    setVerifiedUser(null)
    setStatusMessage('Ready to scan')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      {/* Hidden video element - always mounted */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ display: 'none' }}
      />
      
      {/* Header */}
      <div style={{ backgroundColor: '#8B1538' }} className="w-full py-6 px-8 rounded-3xl mb-8 shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center">
          Marriott Bonvoy
        </h1>
        <p className="text-white text-xl text-center mt-2">
          Face ID Verification
        </p>
        <p className="text-white text-sm text-center mt-1">
          {statusMessage} {useFallback && '(Demo Mode)'}
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white rounded-3xl p-8 shadow-2xl">
        {/* Loading State */}
        {(stage === 'init' || stage === 'loading') && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#8B1538] mx-auto mb-6"></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {stage === 'init' ? 'Loading Models...' : 'Starting Camera...'}
            </h2>
            <p className="text-xl text-gray-600">{statusMessage}</p>
          </div>
        )}

        {/* Ready State */}
        {stage === 'ready' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Instructions */}
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Verify Your Identity
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div style={{ color: '#8B1538' }} className="text-2xl">•</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Position Your Face</h3>
                    <p className="text-gray-600">Look directly at the camera</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div style={{ color: '#8B1538' }} className="text-2xl">•</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Good Lighting</h3>
                    <p className="text-gray-600">Ensure your face is well-lit</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div style={{ color: '#8B1538' }} className="text-2xl">•</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Remove Obstructions</h3>
                    <p className="text-gray-600">No sunglasses or masks</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startVerification}
                style={{ backgroundColor: '#8B1538' }}
                className="w-full py-6 rounded-2xl text-white font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              >
                Start Scanning
              </button>
            </div>

            {/* Video Feed Display */}
            <div className="w-full md:w-1/2">
              <div className="relative bg-black rounded-2xl overflow-hidden" style={{ minHeight: '360px', aspectRatio: '4/3' }}>
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
                {!cameraReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-white">Loading camera...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scanning State */}
        {stage === 'scanning' && (
          <div className="text-center py-12">
            <div className="relative w-full max-w-md mx-auto mb-8">
              <canvas
                ref={canvasRef}
                className="w-full rounded-2xl"
                style={{ transform: 'scaleX(-1)', aspectRatio: '4/3' }}
              />
              {/* Animated scanning border */}
              <div className="absolute inset-0 border-4 border-[#8B1538] rounded-2xl animate-pulse"></div>
              
              {/* Corner indicators */}
              <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-xl"></div>
              <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-xl"></div>
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-xl"></div>
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-br-xl"></div>
              
              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div 
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                  style={{
                    animation: 'scan 2s linear infinite',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)'
                  }}
                ></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Scanning Face...
            </h2>
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="h-4 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: '#8B1538',
                  width: `${progress}%`
                }}
              ></div>
            </div>
            <p className="text-xl text-gray-600">{progress}%</p>
            <p className="text-sm text-gray-500 mt-2">Please hold still...</p>
          </div>
        )}

        {/* Verified State */}
        {stage === 'verified' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Verified!
            </h2>
            {verifiedUser && (
              <p className="text-2xl font-semibold text-[#8B1538] mb-2">
                Welcome {verifiedUser.displayName}!
              </p>
            )}
            <p className="text-xl text-gray-600 mb-2">
              Identity confirmed
            </p>
            {verificationResult && (
              <p className="text-lg text-gray-500">
                Confidence: {verificationResult.confidence}%
              </p>
            )}
          </motion.div>
        )}

        {/* Failed State */}
        {stage === 'failed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h2>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <button
              onClick={retry}
              style={{ backgroundColor: '#8B1538' }}
              className="text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Error State */}
        {stage === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Error
            </h2>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ backgroundColor: '#8B1538' }}
              className="text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              Reload Page
            </button>
          </motion.div>
        )}
      </div>

      {/* Debug Panel */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-xs shadow-2xl z-50">
        <div className="font-bold mb-2 text-yellow-400">Debug Panel</div>
        <div className="grid grid-cols-2 gap-1">
          <div>Stage:</div>
          <div className="font-mono">{stage}</div>
          
          <div>Models:</div>
          <div className={modelsLoaded ? 'text-green-400' : 'text-yellow-400'}>
            {modelsLoaded ? '✅ Loaded' : '⏳ Loading...'}
          </div>
          
          <div>Camera:</div>
          <div className={cameraReady ? 'text-green-400' : 'text-red-400'}>
            {cameraReady ? '✅ Ready' : '❌ Not Ready'}
          </div>
          
          <div>Face Reg:</div>
          <div className={isFaceRegistered() ? 'text-green-400' : 'text-red-400'}>
            {isFaceRegistered() ? `✅ ${getRegisteredFacesCount()} users` : '❌ No'}
          </div>
          
          <div>Mode:</div>
          <div className={useFallback ? 'text-yellow-400' : 'text-green-400'}>
            {useFallback ? '⚠️ Demo' : '✅ Real'}
          </div>
          
          {stage === 'scanning' && (
            <>
              <div>Progress:</div>
              <div className="font-mono">{progress}%</div>
            </>
          )}
        </div>
        
        {videoRef.current && (
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="font-medium text-xs">Video:</div>
            <div className="text-xs">
              {videoRef.current.videoWidth}×{videoRef.current.videoHeight}
              {' | '}
              State: {videoRef.current.readyState}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FaceIDVerification
