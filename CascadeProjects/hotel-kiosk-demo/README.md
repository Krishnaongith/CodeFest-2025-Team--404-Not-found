# 🏨 Hotel NFC Check-in Kiosk

> **CodeFest 2025 - Team 404 Not Found**  
> An intelligent, modern hotel check-in kiosk featuring NFC card scanning, real-time facial recognition, multi-user support, and seamless payment integration.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Face-api.js](https://img.shields.io/badge/Face--api.js-0.22.2-FF6B6B)](https://github.com/justadudewhohacks/face-api.js)

---

## 🌟 Overview

A production-ready hotel self-service kiosk application built with modern web technologies. This system demonstrates the future of hospitality check-in with AI-powered facial recognition, NFC card scanning, and automated payment processing - all wrapped in a beautiful, intuitive interface inspired by Marriott Bonvoy's premium design language.

### ✨ Key Highlights

- 🎭 **Real Facial Recognition** - Multi-user face verification using face-api.js with 60% confidence threshold
- 💳 **NFC/RFID Integration** - Simulated contactless card scanning for member verification
- 🎨 **Premium UI/UX** - Marriott-inspired burgundy & gold design with smooth animations
- 👥 **Multi-User Support** - Personalized experiences for different guests (Krishna Sharma, Vishwaja)
- 🔐 **Security-First** - Biometric authentication with fallback mechanisms
- 📱 **Modern Tech Stack** - React 18, Vite, Tailwind CSS, Framer Motion

---

## 🚀 Features

### 1. 👤 Member Selection
- Choose between Bonvoy Member or Non-Member paths
- Different verification flows based on membership status
- Elegant toggle interface with Marriott branding

### 2. 📋 Booking Confirmation
- Display guest reservation details
- Bonvoy membership tier badges
- Animated QR code for digital room keys
- "Send to Wallet" integration preview

### 3. 🏁 Arrival & Check-In
- **NFC/RFID Card Scanning** - Tap your Bonvoy card for instant verification
- **Member Fast-Track** - 2-second verification for Bonvoy members
- **Non-Member Flow** - 3.5-second verification with staff assistance option
- Real-time status updates and loading animations

### 4. 🎭 Face ID Verification (Real AI)
- **Multi-User Recognition** - Supports multiple registered faces
  - Krishna Sharma (Bonvoy Titanium Elite)
  - Vishwaja (Bonvoy Platinum Elite)
- **Real-Time Detection** - Live camera feed with scanning animations
- **High Accuracy** - 60% confidence threshold for secure matching
- **Visual Feedback** - Animated scanning interface with corner indicators
- **Fallback Mechanism** - Graceful degradation if camera unavailable
- **Debug Panel** - Real-time verification metrics (distance, confidence)

### 5. 💳 Payment Method Selection
- Credit/Debit Card option
- Digital Wallet (Apple Pay, Google Pay)
- Marriott Bonvoy Points
- Room Charge option
- Smooth card-based selection UI

### 6. ✅ Payment Verification
- Simulated payment processing
- Real-time status updates
- Security confirmation messages

### 7. 🏠 Room Details & Digital Key
- Personalized welcome message with guest name
- Room assignment details (type, number, floor)
- Check-in/check-out dates
- Digital room key activation
- Reception contact information
- "Start New Check-In" to reset

### 8. 🆘 Staff Assistance
- Emergency help button on all screens
- Contact reception directly
- Professional support interface

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **Vite 5.4.20** - Lightning-fast build tool
- **Tailwind CSS 3.4.17** - Utility-first styling
- **Framer Motion 11.15.0** - Smooth animations
- **Lucide React 0.469.0** - Beautiful icons

### AI & Biometrics
- **face-api.js 0.22.2** - Real-time face detection & recognition
- **TensorFlow.js** - Machine learning models (via face-api.js)
- **Canvas API** - Video stream rendering

### Design System
- **Custom Marriott Color Palette** - Burgundy (#8B1538) & Gold (#C5A572)
- **Responsive Design** - Works on kiosks, tablets, and desktops
- **Accessibility** - WCAG compliant components

---

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern browser with camera access (Chrome, Firefox, Safari)
- Webcam for face verification

### Setup

```bash
# Clone the repository
git clone https://github.com/Krishnaongith/CodeFest-2025-Team--404-Not-found.git
cd CodeFest-2025-Team--404-Not-found

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Usage Guide

### Quick Start Flow

1. **Member Selection** → Choose "Bonvoy Member" or "Non-Member"
2. **Booking Confirmation** → Review reservation → Click "Simulate Arrival"
3. **NFC Verification** → Tap card simulation → Wait for verification
4. **Face ID Verification** → Allow camera access → Position face in frame → Wait for scan
5. **Payment Method** → Select payment option → Continue
6. **Payment Verification** → Wait for processing
7. **Room Details** → Receive digital key → Complete check-in

### Face Verification Setup

To add new registered faces:

1. Add face image to `public/registered-faces/` (e.g., `newuser.jpg`)
2. Update `FaceIDVerification.jsx`:

```javascript
const members = [
  { name: 'krishna', displayName: 'Krishna Sharma', fileName: 'krishna.jpg' },
  { name: 'vishwaja', displayName: 'Vishwaja', fileName: 'Vishwaja.jpg' },
  { name: 'newuser', displayName: 'New User', fileName: 'newuser.jpg' } // Add here
]
```

3. Update guest data in `App.jsx`:

```javascript
const guestDataTemplates = {
  newuser: {
    name: 'New User',
    roomType: 'Deluxe Room',
    floor: '10',
    checkIn: '2025-10-15',
    checkOut: '2025-10-18',
    roomNumber: '1005',
    memberTier: 'Bonvoy Gold Elite',
    receptionPhone: '1-800-MARRIOTT'
  }
}
```

---

## 📁 Project Structure

```
hotel-nfc-check-in-kiosk/
├── public/
│   └── registered-faces/          # Face images for verification
│       ├── krishna.jpg
│       ├── Vishwaja.jpg
│       └── README.md
├── src/
│   ├── components/
│   │   ├── AIKioskDeposit.jsx     # Deposit verification screen
│   │   ├── ArrivalCheckIn.jsx     # NFC card scanning
│   │   ├── BookingConfirmation.jsx # Reservation display
│   │   ├── FaceIDVerification.jsx  # Real face recognition ⭐
│   │   ├── Footer.jsx              # App footer
│   │   ├── MarriottLogo.jsx        # Brand logo component
│   │   ├── MemberSelection.jsx     # Member/Non-member choice
│   │   ├── NFCTap.jsx              # NFC animation
│   │   ├── PaymentMethod.jsx       # Payment selection
│   │   ├── PaymentVerification.jsx # Payment processing
│   │   ├── RoomDetails.jsx         # Final confirmation
│   │   └── StaffAssistance.jsx     # Help interface
│   ├── services/
│   │   └── faceVerification.js     # Face-api.js integration ⭐
│   ├── App.jsx                     # Main application logic
│   ├── App.css                     # Global styles
│   ├── index.css                   # Tailwind imports
│   └── main.jsx                    # React entry point
├── index.html                      # HTML template (loads face-api.js)
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind + Marriott colors
├── postcss.config.js               # PostCSS config
└── README.md                       # This file
```

---

## 🎨 Design System

### Marriott Brand Colors

```javascript
marriott: {
  burgundy: '#8B1538',      // Primary brand color
  darkBurgundy: '#6B0F2A',  // Accent color
  gold: '#C5A572',          // Signature Marriott gold
  lightGold: '#E8D7B8',     // Soft accents
  cream: '#F5F1E8',         // Background highlights
  charcoal: '#2C2C2C',      // Footer and text
  warmGray: '#8B8680',      // Secondary text
  white: '#FFFFFF'          // Pure white
}
```

### Typography
- **Headings**: System font stack (SF Pro, Segoe UI, Roboto)
- **Body**: Inter, system-ui fallback
- **Sizes**: Responsive scaling from mobile to kiosk displays

---

## 🔐 Security Features

### Current Implementation (Demo)
- ✅ Client-side face verification
- ✅ Encrypted face descriptors
- ✅ 60% confidence threshold
- ✅ Fallback authentication
- ✅ Debug logging for development

### Production Recommendations
- 🔒 Backend API for face verification
- 🔒 Encrypted biometric database (PostgreSQL + AES-256)
- 🔒 HSM for key storage
- 🔒 TLS 1.3 encryption
- 🔒 PCI-DSS compliant payment processing
- 🔒 GDPR/CCPA compliance for biometric data
- 🔒 Liveness detection (prevent photo spoofing)
- 🔒 Multi-factor authentication (face + NFC + PIN)

---

## 🏗️ Production Architecture

For a real-world deployment, this system would integrate with:

### Backend Services
- **API Gateway** - Node.js/Express with JWT authentication
- **Guest Management Service** - Reservation lookup & check-in
- **Biometric Service** - Face verification & matching
- **Payment Service** - Stripe/Adyen integration
- **Room Management Service** - Key generation & assignment
- **Notification Service** - Email/SMS confirmations

### Databases
- **PostgreSQL** - Guest profiles, reservations, transactions
- **Biometric DB** (isolated) - Encrypted face descriptors
- **Redis Cache** - Session management, real-time data
- **AWS S3** - Face images (encrypted at rest)

### Hardware Integration
- **HD Camera** - 1080p+ with IR support
- **NFC/RFID Reader** - Contactless card scanning
- **EMV Card Reader** - PCI-DSS compliant
- **Thermal Printer** - Key cards & receipts
- **Touchscreen** - 32-55" industrial-grade display

### Security & Compliance
- VPN/Private network
- Firewall & IDS/IPS
- HSM for encryption keys
- PCI-DSS Level 1
- GDPR/CCPA compliance
- BIPA (Biometric Information Privacy Act)

---

## 🧪 Testing

### Face Verification Testing
1. Ensure good lighting conditions
2. Position face centered in frame
3. Look directly at camera
4. Wait for green "Verified" status
5. Check debug panel for confidence scores

### Browser Compatibility
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🚧 Known Limitations (Demo)

- Face verification runs client-side (should be server-side in production)
- Payment processing is simulated (needs real gateway integration)
- NFC scanning is animated (needs actual hardware)
- No database persistence (data resets on refresh)
- Single-device only (no cloud sync)

---

## 🔮 Future Enhancements

### Phase 1 - Enhanced Features
- [ ] Multi-language support (10+ languages)
- [ ] Voice assistance for accessibility
- [ ] QR code check-in option
- [ ] Hotel services menu integration
- [ ] Loyalty points display & redemption

### Phase 2 - Backend Integration
- [ ] REST API with Node.js/Express
- [ ] PostgreSQL database
- [ ] Real payment gateway (Stripe/Adyen)
- [ ] Email/SMS notifications
- [ ] Cloud deployment (AWS/Azure)

### Phase 3 - Advanced AI
- [ ] Emotion detection for guest satisfaction
- [ ] Age verification for amenity access
- [ ] Liveness detection (anti-spoofing)
- [ ] Gesture controls
- [ ] Predictive room preferences

### Phase 4 - IoT Integration
- [ ] Smart lock API integration
- [ ] Room automation (HVAC, lighting)
- [ ] Mobile app synchronization
- [ ] Beacon-based location services

---

## 👥 Team

**Team 404 Not Found - CodeFest 2025**

- **Krishna Sharma** - Lead Developer & AI Integration
- **Vishwaja** - UI/UX Design & Frontend Development
- **Rishika** - Worked on Offline deployement of NFC based prototype
- **Krish** - Developed the security Architecture
- **Shreyas** - NFC integration and AI based presentation development

---

## 📄 License

MIT License - Feel free to use this project for learning and development!

---

## 🙏 Acknowledgments

- **face-api.js** by Vincent Mühler - Facial recognition library
- **Marriott International** - Design inspiration
- **TensorFlow.js** - Machine learning models
- **React Team** - Amazing UI framework
- **Vite Team** - Blazing fast build tool

---

## 📞 Support

For questions or issues:
- 📧 Email: Krishnasharma0003@gmail.com
- 🐙 GitHub: [@Krishnaongith](https://github.com/Krishnaongith)
- 🔗 Repository: [CodeFest-2025-Team--404-Not-found](https://github.com/Krishnaongith/CodeFest-2025-Team--404-Not-found)

---

<div align="center">

**Built with ❤️ for CodeFest 2025**

⭐ Star this repo if you found it helpful!

</div>
