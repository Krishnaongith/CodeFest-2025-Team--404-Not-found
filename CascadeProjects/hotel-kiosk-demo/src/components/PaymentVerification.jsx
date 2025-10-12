import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, CheckCircle, Shield } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const PaymentVerification = ({ onComplete }) => {
  const [stage, setStage] = useState('verifying') // verifying, verified
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 20
      })
    }, 200)

    // After 3 seconds, show verified
    const timer = setTimeout(() => {
      setStage('verified')
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

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
            {stage === 'verifying' && (
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
                  className="inline-block mb-8"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-marriott-burgundy to-marriott-gold rounded-full flex items-center justify-center shadow-lg">
                    <CreditCard className="w-16 h-16 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  Verifying Payment...
                </h2>
                <p className="text-2xl text-gray-600 mb-12">
                  Securely processing your payment information
                </p>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
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
                    { text: 'Validating payment method', delay: 0 },
                    { text: 'Authorizing security deposit', delay: 0.5 },
                    { text: 'Confirming transaction', delay: 1 }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: progress > index * 33 ? 1 : 0.3, x: 0 }}
                      transition={{ delay: step.delay }}
                      className="flex items-center justify-start bg-gray-50 p-4 rounded-lg"
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
                          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-marriott-burgundy rounded-full mr-3 animate-pulse" />
                        )}
                      </motion.div>
                      <span className="text-gray-700">{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-block mb-8"
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

                <h2 className="text-6xl font-bold text-gray-900 mb-8">
                  Payment Verified ✓
                </h2>
                
                <div className="bg-green-50 border-4 border-green-300 rounded-3xl p-10 max-w-3xl mx-auto mb-8 shadow-xl">
                  <p className="text-2xl text-gray-800 mb-3 font-bold">
                    $300 security deposit authorized
                  </p>
                  <p className="text-gray-700 text-lg">
                    Hold will be released upon checkout
                  </p>
                </div>

                <p className="text-gray-600 text-2xl">
                  Preparing your room details...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default PaymentVerification
