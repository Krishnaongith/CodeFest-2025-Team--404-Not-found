const MarriottLogo = ({ white = false }) => {
  const textColor = white ? '#FFFFFF' : '#8B1538'
  
  return (
    <div className="flex items-center py-2">
      <h1 
        style={{ 
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '2.5rem',
          fontWeight: '700',
          letterSpacing: '0.2em',
          color: textColor,
          margin: 0,
          padding: 0,
          lineHeight: 1
        }}
      >
        MARRIOTT
      </h1>
    </div>
  )
}

export default MarriottLogo
