import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, UserCheck, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const ArrivalCheckIn = ({ guestData, onProceed, onToggleMembership }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState('idle') // idle, verifying, verified, needsStaff

  const handleStartScan = () => {
    setIsScanning(true)
    setScanComplete(false)
    setVerificationStatus('idle')

    // Simulate NFC detection
    setTimeout(() => {
      setVerificationStatus('verifying')
      
      // Simulate verification process
      const verificationTime = guestData.isMember ? 2000 : 3500
      setTimeout(() => {
        if (guestData.isMember) {
          setVerificationStatus('verified')
        } else {
          setVerificationStatus('needsStaff')
        }
        setScanComplete(true)
      }, verificationTime)
    }, 1000)
  }

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
          <h1 className="text-3xl font-bold text-center mb-2">Welcome to Marriott</h1>
          <p className="text-center text-marriott-lightGold">Bonvoy Express Check-In</p>
        </div>

        <div className="p-8">
          {/* Member Toggle */}
          <div className="mb-6 flex items-center justify-center space-x-4 bg-gray-100 p-4 rounded-xl">
            <span className={`font-semibold ${!guestData.isMember ? 'text-marriott-burgundy' : 'text-gray-400'}`}>
              Non-Member
            </span>
            <button
              onClick={onToggleMembership}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                guestData.isMember ? 'bg-marriott-gold' : 'bg-gray-400'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ x: guestData.isMember ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`font-semibold ${guestData.isMember ? 'text-marriott-burgundy' : 'text-gray-400'}`}>
              Bonvoy Member
            </span>
          </div>

          {/* NFC Scanning Area */}
          {!isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="mb-6">
                <motion.div
                  className="inline-block"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-marriott-cream to-marriott-lightGold rounded-full flex items-center justify-center shadow-lg">
                    <Wifi className="w-24 h-24 text-marriott-burgundy" />
                  </div>
                </motion.div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ready for Check-In
              </h2>
              <p className="text-gray-600 mb-6">
                Tap your mobile device or scan your QR code to begin
              </p>

              <button
                onClick={handleStartScan}
                className="bg-marriott-burgundy hover:bg-marriott-darkBurgundy text-white px-12 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                style={{ color: '#FFFFFF', backgroundColor: '#8B1538' }}
              >
                Simulate NFC Scan
              </button>
            </motion.div>
          )}

          {/* Verification Process */}
          <AnimatePresence>
            {isScanning && verificationStatus === 'verifying' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-6"
                >
                  <Shield className="w-24 h-24 text-marriott-burgundy" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {guestData.isMember ? 'Verifying Member Status...' : 'Checking Reservation...'}
                </h2>
                <p className="text-gray-600">Please wait</p>
                
                <div className="mt-6 flex justify-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-marriott-gold rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Member Verified */}
            {isScanning && verificationStatus === 'verified' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-block mb-6"
                >
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-20 h-20 text-green-600" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Verified!
                </h2>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6 max-w-md mx-auto">
                  <p className="text-lg text-gray-700 mb-2">
                    Welcome, <span className="font-bold text-marriott-burgundy">{guestData.name}</span>
                  </p>
                  <p className="text-gray-600">
                    Please proceed to AI Kiosk for security deposit verification.
                  </p>
                </div>

                <button
                  onClick={onProceed}
                  className="bg-marriott-burgundy hover:bg-marriott-darkBurgundy text-white px-12 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                  style={{ color: '#FFFFFF', backgroundColor: '#8B1538' }}
                >
                  Continue to Deposit Verification →
                </button>
              </motion.div>
            )}

            {/* Non-Member - Staff Needed */}
            {isScanning && verificationStatus === 'needsStaff' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="inline-block mb-6"
                >
                  <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-20 h-20 text-yellow-600" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Staff Verification Needed
                </h2>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6 max-w-md mx-auto">
                  <p className="text-lg text-gray-700 mb-2">
                    Hello, <span className="font-bold">{guestData.name}</span>
                  </p>
                  <p className="text-gray-600 mb-4">
                    A staff member will assist you shortly with your check-in process.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Estimated wait time: 2-3 minutes</span>
                  </div>
                </div>

                <button
                  onClick={onProceed}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                  style={{ color: '#FFFFFF', backgroundColor: '#4B5563' }}
                >
                  Simulate Staff Approval →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default ArrivalCheckIn
