import { motion } from 'framer-motion'
import { UserCheck, Users } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const MemberSelection = ({ onSelect }) => {
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
          <div className="max-w-6xl mx-auto w-full">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="text-6xl font-bold text-gray-900 mb-4">
                Welcome to Marriott
              </h1>
              <p className="text-2xl text-gray-600">
                Express Check-In Kiosk
              </p>
            </motion.div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-3">
                Are you a Marriott Bonvoy Member?
              </h2>
              <p className="text-xl text-gray-600 text-center mb-10">
                Please select your membership status
              </p>

              {/* Selection Buttons */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Yes - Member Button */}
                <motion.button
                  onClick={() => onSelect(true)}
                  className="relative text-white p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ minHeight: '320px', backgroundColor: '#8B1538' }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700" />
                  
                  <div className="flex flex-col items-center justify-center h-full relative z-10">
                    <div style={{ backgroundColor: '#D4AF37' }} className="w-28 h-28 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <UserCheck className="w-14 h-14" style={{ color: '#8B1538' }} />
                    </div>
                    <h3 style={{ color: '#FFFFFF' }} className="text-5xl font-bold mb-4">YES</h3>
                    <div style={{ backgroundColor: '#D4AF37' }} className="w-16 h-1 mb-4" />
                    <p style={{ color: '#D4AF37' }} className="text-xl font-medium">I'm a Bonvoy Member</p>
                  </div>
                </motion.button>

                {/* No - Non-Member Button */}
                <motion.button
                  onClick={() => onSelect(false)}
                  className="relative text-white p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ minHeight: '320px', backgroundColor: '#8B1538' }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700" />
                  
                  <div className="flex flex-col items-center justify-center h-full relative z-10">
                    <div style={{ backgroundColor: '#D4AF37' }} className="w-28 h-28 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Users className="w-14 h-14" style={{ color: '#8B1538' }} />
                    </div>
                    <h3 style={{ color: '#FFFFFF' }} className="text-5xl font-bold mb-4">NO</h3>
                    <div style={{ backgroundColor: '#D4AF37' }} className="w-16 h-1 mb-4" />
                    <p style={{ color: '#D4AF37' }} className="text-xl font-medium">I'm not a member</p>
                  </div>
                </motion.button>
              </div>

              {/* Info Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-marriott-gold to-marriott-lightGold rounded-2xl p-6 shadow-lg"
              >
                <p className="text-center text-marriott-darkBurgundy text-lg font-semibold">
                  ✨ Bonvoy Members enjoy faster check-in, exclusive benefits, and earn points on every stay
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberSelection
