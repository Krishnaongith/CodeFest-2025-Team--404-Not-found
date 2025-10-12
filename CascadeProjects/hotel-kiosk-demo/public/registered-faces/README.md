# Registered Member Faces

This folder contains pre-registered member face photos for verification.

## How to Add Your Photo

1. **Take a clear photo of your face:**
   - Good lighting (natural light is best)
   - Face looking directly at camera
   - No sunglasses, masks, or hats
   - Neutral expression
   - Single person in photo
   - High resolution (at least 640x480)

2. **Save the photo as `krishna.jpg`** in this folder:
   ```
   /public/registered-faces/krishna.jpg
   ```

3. **Photo Requirements:**
   - Format: JPG or JPEG
   - File name: `krishna.jpg` (lowercase)
   - Clear, well-lit face
   - Face should be the main focus
   - Front-facing (not profile)

4. **The system will automatically:**
   - Load your photo when a member logs in
   - Extract facial features
   - Compare with live camera feed
   - Verify identity with 70%+ confidence

## Current Registered Members

- `krishna.jpg` - Your registered face photo (add this file)

## Testing

After adding your photo:
1. Refresh the application
2. Click "YES" (I'm a Bonvoy Member)
3. Complete NFC verification
4. The system will load your registered face
5. Position your face in the camera
6. Click "Start Scan"
7. System will verify it's you!

## Security

- Only registered members can pass verification
- 70% minimum confidence required
- Real-time face matching using face-api.js
- Euclidean distance < 0.6 for match
