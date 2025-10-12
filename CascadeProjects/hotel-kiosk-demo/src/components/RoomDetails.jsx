import { motion } from 'framer-motion'
import { Home, Calendar, Phone, Key, RotateCcw, Building2 } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const RoomDetails = ({ guestData, onReset }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

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
        <div className="min-h-full flex flex-col justify-center px-10 py-8">
          {/* Success Message */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-3">
              Welcome, {guestData.name}!
            </h2>
            <p className="text-2xl text-gray-600">
              Your room is ready
            </p>
          </motion.div>

          {/* Room Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ backgroundColor: '#8B1538' }}
            className="text-white rounded-3xl p-12 mb-8 shadow-2xl max-w-5xl mx-auto w-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p style={{ color: '#D4AF37' }} className="text-sm mb-2">Your Room</p>
                <h3 style={{ color: '#FFFFFF' }} className="text-6xl font-bold mb-2">{guestData.roomNumber}</h3>
                <p style={{ color: '#D4AF37' }} className="text-xl">{guestData.roomType}</p>
              </div>
              <div className="text-right">
                <p style={{ color: '#D4AF37' }} className="text-sm mb-2">Floor</p>
                <p style={{ color: '#FFFFFF' }} className="text-5xl font-bold">{guestData.floor}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #D4AF37' }} className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p style={{ color: '#D4AF37' }} className="text-sm mb-1">Check-In</p>
                  <p style={{ color: '#FFFFFF' }} className="text-lg font-semibold">{formatDate(guestData.checkIn)}</p>
                </div>
                <div>
                  <p style={{ color: '#D4AF37' }} className="text-sm mb-1">Check-Out</p>
                  <p style={{ color: '#FFFFFF' }} className="text-lg font-semibold">{formatDate(guestData.checkOut)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto w-full">
            {/* Mobile Key */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ backgroundColor: '#FFF8E7', borderColor: '#D4AF37' }}
              className="border-4 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-start">
                <div style={{ backgroundColor: '#D4AF37' }} className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Key className="w-6 h-6" style={{ color: '#8B1538' }} />
                </div>
                <div>
                  <h4 style={{ color: '#8B1538' }} className="font-bold mb-2 text-xl">Mobile Key Activated</h4>
                  <p style={{ color: '#333333' }} className="text-base">
                    Your digital room key is ready in your mobile wallet
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reception Contact */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ backgroundColor: '#FFF8E7', borderColor: '#D4AF37' }}
              className="border-4 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-start">
                <div style={{ backgroundColor: '#D4AF37' }} className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6" style={{ color: '#8B1538' }} />
                </div>
                <div>
                  <h4 style={{ color: '#8B1538' }} className="font-bold mb-2 text-xl">Reception</h4>
                  <p style={{ color: '#333333' }} className="text-base mb-2">Quick dial from room phone:</p>
                  <p style={{ color: '#8B1538' }} className="text-xl font-bold">{guestData.receptionPhone}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ backgroundColor: '#FFF8E7' }}
            className="rounded-3xl p-8 mb-8 shadow-lg max-w-5xl mx-auto w-full"
          >
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6" style={{ color: '#8B1538' }} />
              <h4 style={{ color: '#8B1538' }} className="font-bold text-2xl ml-3">Important Information</h4>
            </div>
            <ul className="space-y-3 text-lg" style={{ color: '#333333' }}>
              <li className="flex items-start">
                <span style={{ color: '#D4AF37' }} className="mr-2">•</span>
                <span>Check-in time: 3:00 PM | Check-out time: 12:00 PM</span>
              </li>
              <li className="flex items-start">
                <span style={{ color: '#D4AF37' }} className="mr-2">•</span>
                <span>Complimentary WiFi password available at reception</span>
              </li>
              <li className="flex items-start">
                <span style={{ color: '#D4AF37' }} className="mr-2">•</span>
                <span>Breakfast served daily 6:30 AM - 10:30 AM</span>
              </li>
              <li className="flex items-start">
                <span style={{ color: '#D4AF37' }} className="mr-2">•</span>
                <span>Fitness center open 24/7 on Floor 3</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-5 max-w-5xl mx-auto w-full">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="w-full bg-gradient-to-r from-marriott-burgundy to-marriott-darkBurgundy text-white py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              style={{ color: '#FFFFFF' }}
            >
              View Hotel Services & Amenities
            </motion.button>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onReset}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-6 rounded-3xl font-bold text-xl transition-all hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
              style={{ color: '#374151', backgroundColor: '#E5E7EB' }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Start New Check-In</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails
