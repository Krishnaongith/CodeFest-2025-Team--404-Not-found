import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemberSelection from './components/MemberSelection'
import NFCTap from './components/NFCTap'
import FaceIDVerification from './components/FaceIDVerification'
import StaffAssistance from './components/StaffAssistance'
import PaymentMethod from './components/PaymentMethod'
import PaymentVerification from './components/PaymentVerification'
import RoomDetails from './components/RoomDetails'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('memberSelection') // memberSelection, nfcTap, faceID, staffAssistance, paymentMethod, paymentVerification, roomDetails
  const [isMember, setIsMember] = useState(null)
  const [guestData, setGuestData] = useState(null)
  
  // Guest data templates for different users
  const guestDataTemplates = {
    krishna: {
      name: 'Krishna Sharma',
      roomType: 'Presidential Suite',
      floor: '15',
      checkIn: '2025-10-15',
      checkOut: '2025-10-18',
      roomNumber: '1501',
      memberTier: 'Bonvoy Titanium Elite',
      receptionPhone: '1-800-MARRIOTT'
    },
    vishwaja: {
      name: 'Vishwaja',
      roomType: 'Executive Suite',
      floor: '12',
      checkIn: '2025-10-15',
      checkOut: '2025-10-18',
      roomNumber: '1207',
      memberTier: 'Bonvoy Platinum Elite',
      receptionPhone: '1-800-MARRIOTT'
    }
  }

  const handleMemberSelection = (memberStatus) => {
    setIsMember(memberStatus)
    setCurrentScreen('nfcTap')
  }

  const handleNFCComplete = () => {
    console.log('📱 NFC Complete - isMember:', isMember)
    if (isMember) {
      console.log('➡️ Navigating to Face ID screen')
      setCurrentScreen('faceID')
    } else {
      console.log('➡️ Navigating to Staff Assistance')
      setCurrentScreen('staffAssistance')
    }
  }

  const handleFaceIDComplete = (verifiedUser) => {
    // Set guest data based on verified user
    console.log('🎯 Face ID Complete - Verified User:', verifiedUser)
    if (verifiedUser && guestDataTemplates[verifiedUser.name]) {
      console.log('✅ Setting guest data for:', verifiedUser.name)
      setGuestData(guestDataTemplates[verifiedUser.name])
    } else {
      console.warn('⚠️ No guest data template found for:', verifiedUser)
      // Fallback to Krishna if no match
      setGuestData(guestDataTemplates.krishna)
    }
    setCurrentScreen('paymentMethod')
  }

  const handlePaymentMethodSelected = () => {
    setCurrentScreen('paymentVerification')
  }

  const handlePaymentComplete = () => {
    setCurrentScreen('roomDetails')
  }

  const handleReset = () => {
    setIsMember(null)
    setGuestData(null)
    setCurrentScreen('memberSelection')
  }

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {currentScreen === 'memberSelection' && (
          <motion.div
            key="memberSelection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <MemberSelection onSelect={handleMemberSelection} />
          </motion.div>
        )}

        {currentScreen === 'nfcTap' && (
          <motion.div
            key="nfcTap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <NFCTap onComplete={handleNFCComplete} isMember={isMember} />
          </motion.div>
        )}

        {currentScreen === 'faceID' && (
          <motion.div
            key="faceID"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <FaceIDVerification onComplete={handleFaceIDComplete} guestName={guestData?.name || 'Guest'} />
          </motion.div>
        )}

        {currentScreen === 'staffAssistance' && (
          <motion.div
            key="staffAssistance"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <StaffAssistance onReset={handleReset} />
          </motion.div>
        )}

        {currentScreen === 'paymentMethod' && (
          <motion.div
            key="paymentMethod"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <PaymentMethod onSelect={handlePaymentMethodSelected} />
          </motion.div>
        )}

        {currentScreen === 'paymentVerification' && (
          <motion.div
            key="paymentVerification"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <PaymentVerification onComplete={handlePaymentComplete} />
          </motion.div>
        )}

        {currentScreen === 'roomDetails' && guestData && (
          <motion.div
            key="roomDetails"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <RoomDetails guestData={guestData} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
