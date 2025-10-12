import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Wallet } from 'lucide-react'
import MarriottLogo from './MarriottLogo'

const PaymentMethod = ({ onSelect }) => {
  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Tap, Insert, or Swipe',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'apple',
      title: 'Apple Pay',
      subtitle: 'Tap to Pay',
      icon: Smartphone,
      color: 'from-gray-800 to-black'
    },
    {
      id: 'google',
      title: 'Google Pay',
      subtitle: 'Tap to Pay',
      icon: Wallet,
      color: 'from-green-500 to-green-600'
    }
  ]

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
          <h2 className="text-5xl font-bold text-gray-900 text-center mb-6">
            Select Payment Method
          </h2>
          <p className="text-2xl text-gray-600 text-center mb-10">
            For security deposit verification
          </p>

          {/* Security Deposit Info */}
          <div className="bg-gradient-to-r from-marriott-gold to-marriott-lightGold rounded-3xl p-8 mb-12 max-w-4xl mx-auto text-center shadow-xl">
            <p className="text-marriott-darkBurgundy text-2xl font-bold mb-2">
              A $300 security deposit will be held on your card
            </p>
            <p className="text-marriott-darkBurgundy text-lg">
              This hold will be released upon checkout
            </p>
          </div>

          {/* Payment Method Grid */}
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {paymentMethods.map((method, index) => (
              <motion.button
                key={method.id}
                onClick={() => onSelect(method.id)}
                className="bg-white border-4 border-gray-300 hover:border-marriott-burgundy p-12 rounded-3xl shadow-xl hover:shadow-3xl transition-all group"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                style={{ minHeight: '320px' }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-28 h-28 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <method.icon className="w-14 h-14 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 text-lg">{method.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Card Logos */}
          <div className="flex justify-center items-center space-x-8 opacity-50">
            <div className="text-gray-600 font-bold text-2xl">VISA</div>
            <div className="text-gray-600 font-bold text-2xl">Mastercard</div>
            <div className="text-gray-600 font-bold text-2xl">AMEX</div>
            <div className="text-gray-600 font-bold text-2xl">Discover</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
