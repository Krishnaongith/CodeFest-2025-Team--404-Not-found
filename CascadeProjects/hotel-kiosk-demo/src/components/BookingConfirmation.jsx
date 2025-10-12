import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Bed, QrCode, Smartphone, Bell } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const BookingConfirmation = ({ guestData, onProceed }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
      <motion.div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-marriott-burgundy to-marriott-darkBurgundy p-8 text-white">
          <MarriottLogo className="w-40 mb-6" />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-4"
          >
            <CheckCircle className="w-16 h-16" />
          </motion.div>
          <h1 className="text-3xl font-bold text-center mb-2">Booking Confirmed!</h1>
          <p className="text-center text-marriott-lightGold">Your reservation is all set</p>
        </div>

        {/* Booking Details */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reservation Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-marriott-cream rounded-lg flex items-center justify-center mr-4">
                  <Bed className="w-6 h-6 text-marriott-burgundy" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guest Name</p>
                  <p className="text-lg font-semibold text-gray-800">{guestData.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-marriott-cream rounded-lg flex items-center justify-center mr-4">
                  <Bed className="w-6 h-6 text-marriott-burgundy" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room Type</p>
                  <p className="text-lg font-semibold text-gray-800">{guestData.roomType}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-marriott-cream rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-marriott-burgundy" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in / Check-out</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(guestData.checkIn)} - {formatDate(guestData.checkOut)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bonvoy Member Badge */}
          {guestData.memberTier && (
            <div className="bg-gradient-to-r from-marriott-gold to-marriott-lightGold rounded-xl p-4 mb-6 text-center">
              <p className="text-marriott-darkBurgundy font-bold text-lg">✨ {guestData.memberTier}</p>
            </div>
          )}

          {/* Mobile Tag Section */}
          <div className="bg-gradient-to-br from-marriott-cream to-marriott-lightGold rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Your Digital Room Key
            </h3>
            
            <motion.div 
              className="flex justify-center mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-marriott-gold">
                <QrCode className="w-32 h-32 text-marriott-burgundy" />
              </div>
            </motion.div>

            <p className="text-center text-sm text-gray-600 mb-4">
              Scan this code at the kiosk upon arrival
            </p>

            <button className="w-full bg-gradient-to-r from-marriott-burgundy to-marriott-darkBurgundy text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow" style={{ color: '#FFFFFF' }}>
              <Smartphone className="w-5 h-5" />
              <span>Send to Wallet</span>
            </button>
          </div>

          {/* Notification Preview */}
          <motion.div 
            className="bg-marriott-cream border-l-4 border-marriott-gold rounded-lg p-4 mb-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-marriott-gold mr-3 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Upcoming Notification</p>
                <p className="text-sm text-gray-600">"Check-in opens in 48 hours."</p>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <button 
            onClick={onProceed}
            className="w-full bg-marriott-burgundy hover:bg-marriott-darkBurgundy text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
            style={{ color: '#FFFFFF', backgroundColor: '#8B1538' }}
          >
            Simulate Arrival →
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default BookingConfirmation
