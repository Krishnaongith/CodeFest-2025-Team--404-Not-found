import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, CheckCircle, Sparkles, Key, Home, RotateCcw } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const AIKioskDeposit = ({ guestData, onReset }) => {
  const [verificationStage, setVerificationStage] = useState('verifying') // verifying, verified, complete
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate AI verification progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // After 3 seconds, show verified
    const timer = setTimeout(() => {
      setVerificationStage('verified')
      
      // After showing verified, move to complete
      setTimeout(() => {
        setVerificationStage('complete')
      }, 2000)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
      <motion.div 
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-marriott-burgundy to-marriott-darkBurgundy p-8 text-white">
          <MarriottLogo className="w-40 mb-4" />
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold">AI Verification Kiosk</h1>
          </div>
          <p className="text-center text-marriott-lightGold">Powered by Marriott Bonvoy Technology</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Verifying Stage */}
            {verificationStage === 'verifying' && (
              <motion.div
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    rotateY: 360,
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="inline-block mb-6"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-marriott-cream to-marriott-lightGold rounded-full flex items-center justify-center shadow-lg">
                    <CreditCard className="w-16 h-16 text-marriott-burgundy" />
                  </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  AI Verifying Deposit...
                </h2>
                <p className="text-gray-600 mb-8">
                  Securely processing your payment information
                </p>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-marriott-burgundy to-marriott-gold h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
                </div>

                {/* Verification Steps */}
                <div className="max-w-md mx-auto space-y-3">
                  {[
                    { text: 'Scanning payment method', delay: 0 },
                    { text: 'Verifying account status', delay: 1 },
                    { text: 'Processing security deposit', delay: 2 }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: progress > index * 33 ? 1 : 0.3, x: 0 }}
                      transition={{ delay: step.delay * 0.5 }}
                      className="flex items-center justify-start bg-gray-50 p-3 rounded-lg"
                    >
                      <motion.div
                        animate={{ 
                          scale: progress > index * 33 ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ 
                          duration: 0.5,
                          repeat: progress > index * 33 && progress < 100 ? Infinity : 0
                        }}
                      >
                        {progress > (index + 1) * 33 ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-marriott-burgundy rounded-full mr-3 animate-pulse" />
                        )}
                      </motion.div>
                      <span className="text-gray-700">{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Verified Stage */}
            {verificationStage === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-block mb-6"
                >
                  <div className="w-40 h-40 bg-green-100 rounded-full flex items-center justify-center relative">
                    <CheckCircle className="w-24 h-24 text-green-600" />
                    <motion.div
                      className="absolute inset-0 border-4 border-green-400 rounded-full"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: 2 }}
                    />
                  </div>
                </motion.div>

                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Payment Verified ✅
                </h2>
                <p className="text-xl text-gray-600">
                  Security deposit confirmed
                </p>
              </motion.div>
            )}

            {/* Complete Stage */}
            {verificationStage === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8"
              >
                {/* Welcome Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-marriott-burgundy to-marriott-darkBurgundy text-white rounded-2xl p-8 mb-6 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-marriott-lightGold text-sm mb-1">Welcome back,</p>
                      <h2 className="text-3xl font-bold">{guestData.name}</h2>
                    </div>
                    <Home className="w-16 h-16 opacity-50" />
                  </div>
                  
                  <div className="border-t border-marriott-gold pt-4 mt-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-marriott-lightGold text-sm mb-1">Your Room</p>
                        <p className="text-5xl font-bold">{guestData.roomNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-marriott-lightGold text-sm">{guestData.roomType}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Room Ready Message */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6"
                >
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Your room is ready!</h3>
                  </div>
                  <p className="text-center text-gray-600">
                    Enjoy your stay at Marriott
                  </p>
                </motion.div>

                {/* Mobile Key Activation */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-marriott-cream border-2 border-marriott-gold rounded-xl p-6 mb-6"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-marriott-lightGold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Key className="w-6 h-6 text-marriott-burgundy" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Mobile Room Key Activated</h4>
                      <p className="text-sm text-gray-600">
                        Your digital key has been sent to your mobile device. 
                        You can now access your room using your smartphone.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="w-full bg-gradient-to-r from-marriott-burgundy to-marriott-darkBurgundy text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                    style={{ color: '#FFFFFF' }}
                  >
                    View Marriott Services
                  </motion.button>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    onClick={onReset}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                    style={{ color: '#374151', backgroundColor: '#E5E7EB' }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Start New Demo</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default AIKioskDeposit
