import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Waves, CheckCircle } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const NFCTap = ({ onComplete, isMember }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)

  useEffect(() => {
    if (isScanning) {
      // 3 second scan time
      const timer = setTimeout(() => {
        setScanComplete(true)
        setTimeout(() => {
          onComplete()
        }, 3000)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isScanning, onComplete])

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* Header Bar */}
      <div style={{ backgroundColor: '#8B1538' }} className="py-6 px-10 shadow-xl">
        <div style={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '0.2em', fontFamily: 'Arial, sans-serif' }}>
          MARRIOTT
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col justify-center px-10 py-10">
          <AnimatePresence mode="wait">
            {!isScanning && !scanComplete && (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  Tap Your Mobile Ticket
                </h2>
                <p className="text-2xl text-gray-600 mb-16">
                  Place your device on the reader below
                </p>

                {/* NFC Target Area */}
                <motion.div
                  className="relative mx-auto mb-12"
                  style={{ width: '300px', height: '300px' }}
                >
                  {/* Pulsing Rings */}
                  <motion.div
                    className="absolute inset-0 border-8 border-marriott-gold rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 border-8 border-marriott-burgundy rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />

                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-marriott-burgundy to-marriott-darkBurgundy rounded-full flex items-center justify-center shadow-2xl">
                      <Smartphone className="w-20 h-20 text-white" />
                    </div>
                  </div>

                  {/* Wave Icons */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Waves className="w-64 h-64 text-marriott-gold opacity-20" />
                  </motion.div>
                </motion.div>

                {/* Tap Button */}
                <button
                  onClick={() => setIsScanning(true)}
                  className="bg-marriott-burgundy hover:bg-marriott-darkBurgundy text-white px-24 py-8 rounded-3xl font-bold text-3xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
                  style={{ color: '#FFFFFF', backgroundColor: '#8B1538' }}
                >
                  Tap to Scan
                </button>
              </motion.div>
            )}

            {isScanning && !scanComplete && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-marriott-burgundy to-marriott-gold rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Waves className="w-16 h-16 text-white" />
                </motion.div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  Scanning...
                </h2>
                <p className="text-2xl text-gray-600">
                  Please keep your device in place
                </p>
              </motion.div>
            )}

            {scanComplete && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-32 h-32 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-20 h-20 text-green-600" />
                </motion.div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  Ticket Verified!
                </h2>
                <p className="text-2xl text-gray-600">
                  {isMember ? 'Proceeding for verification...' : 'Please wait for staff assistance...'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default NFCTap
