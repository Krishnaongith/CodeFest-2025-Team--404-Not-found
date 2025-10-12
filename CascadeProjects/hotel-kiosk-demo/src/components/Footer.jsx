import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 bg-marriott-charcoal bg-opacity-90 text-white py-4 px-8"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-marriott-gold" />
          <span className="text-marriott-lightGold">Marriott International</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-marriott-gold" />
            <span className="text-gray-300">1-800-MARRIOTT</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-marriott-gold" />
            <span className="text-gray-300">bonvoy@marriott.com</span>
          </div>
        </div>
        
        <div className="text-gray-400 text-xs">
          © 2025 Marriott International, Inc.
        </div>
      </div>
    </motion.div>
  )
}

export default Footer
