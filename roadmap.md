# Smart Rider Helmet Webpage Roadmap

## Phase 1: Setup
- Set up Google OAuth and Twilio/Firebase for phone OTP.

## Phase 2: Front-End Development
- Create the following pages:
  - **Sign-in Page**: Include Google OAuth and phone OTP functionality.
  - **Welcome Page**: Display a "Continue Adding the Device" button.
  - **Device Control Pages**:
    - **Emergency Contacts**: Form for updating emergency contact details.
    - **Rename Device**: Field for renaming the device.
    - **Navigation Control**: Launch Google Maps directly from this button.

## Phase 3: Back-End Development
- Integrate Google sign-in functionality using Firebase.
- Implement phone OTP functionality using Twilio or Firebase Authentication.
- Create APIs using Express (or Firebase Cloud Functions) to handle:
  - Saving emergency contact details.
  - Renaming the device.

## Phase 4: Bluetooth Pairing
- Implement Bluetooth pairing using Web Bluetooth API.
- Request necessary permissions for Bluetooth access.
- After pairing, navigate to the emergency contact input form.

## Phase 5: Feature Integration
- **Emergency Contacts**: Create form for inputting and saving emergency contact details (name, address, phone) to Firebase Firestore.
- **Rename Device**: Allow users to rename the device, saving this information to Firestore.
- **Navigation Control**: Implement a button that launches Google Maps and passes the destination. ESP32 will relay navigation details via a speaker.

## Phase 6: Testing and Deployment
- Test the webpage across multiple browsers (focus on Chrome for Web Bluetooth).
- Verify the Bluetooth connection with ESP32 and control of the LEDs in real-time.
- Test crash detection and ensure emergency contacts are notified correctly.
- Deploy the app on Netlify or Vercel, and ensure the deployment works seamlessly.

## Future Phase: Design Integration (with V0)
- Design the UI using V0 after core functionality is working.
