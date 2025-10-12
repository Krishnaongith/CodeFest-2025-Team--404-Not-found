import { motion } from 'framer-motion'
import { AlertCircle, Phone, RotateCcw } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const StaffAssistance = ({ onReset }) => {
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
        <div className="min-h-full flex flex-col justify-center px-10 py-10 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
            }}
            className="inline-block mb-8"
          >
            <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-20 h-20 text-yellow-600" />
            </div>
          </motion.div>

          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            Staff Assistance Needed
          </h2>

          <div className="bg-yellow-50 border-4 border-yellow-300 rounded-3xl p-12 mb-10 max-w-4xl mx-auto shadow-xl">
            <p className="text-2xl text-gray-800 mb-8 font-medium">
              Thank you for choosing Marriott! A staff member will be with you shortly to assist with your check-in.
            </p>
            <div className="flex items-center justify-center space-x-4 text-gray-700">
              <Phone className="w-8 h-8 text-marriott-burgundy" />
              <span className="text-xl font-semibold">Estimated wait time: 2-3 minutes</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-marriott-gold to-marriott-lightGold rounded-3xl p-10 mb-10 max-w-4xl mx-auto shadow-xl">
            <p className="text-marriott-darkBurgundy text-2xl mb-4 font-bold">
              Become a Bonvoy Member for faster, automated check-in!
            </p>
            <p className="text-marriott-darkBurgundy text-lg">
              Join today and enjoy exclusive benefits and rewards
            </p>
          </div>

          <button
            onClick={onReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-16 py-6 rounded-3xl font-bold text-2xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 mx-auto hover:scale-105"
            style={{ color: '#1F2937', backgroundColor: '#D1D5DB' }}
          >
            <RotateCcw className="w-7 h-7" />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaffAssistance
