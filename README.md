# ProcterX - Advanced AI-Powered Proctoring System

An intelligent exam proctoring system built with React and AI/ML technologies for real-time student monitoring during online examinations.

##  Project Overview

ProcterX is a comprehensive proctoring solution that uses advanced computer vision and head pose estimation to monitor student behavior during online exams. The system provides real-time feedback on student focus levels and head movements to ensure exam integrity.

##  Key Features

- ** Real-Time Face Detection**: Continuous monitoring using MediaPipe Face Landmarker
- ** Head Pose Estimation**: Advanced 3D head pose calculation (Pitch, Yaw, Roll angles)
- ** Focus Tracking**: Real-time inference of student focus status
- ** Alert System**: Automatic alerts when students look away (±30° yaw threshold)
- ** Fully Responsive UI**: Works seamlessly on desktop, tablet, and mobile devices
- ** Modern UI Design**: Professional gradient-based interface with intuitive controls
- ** Cross-Browser Support**: Compatible with Chrome, Firefox, Safari, Edge, and mobile browsers

##  Technology Stack

- **Frontend Framework**: React 19.1.1 with Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.13 with responsive design
- **Computer Vision**: MediaPipe Tasks Vision (@mediapipe/tasks-vision)
- **Head Pose Calculation**: Custom OpenCV-JS integration (@techstark/opencv-js)
- **Build Tool**: Vite with optimized code splitting
- **Package Manager**: npm

##  Project Structure

```
exam-vision-client-main/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Navigation bar with ProcterX branding
│   │   ├── ProctorPageLayout.jsx      # Main layout component
│   │   └── ProctorMainWindow.jsx      # Core proctoring interface
│   ├── utils/
│   │   ├── headPoseUtils.js           # Head pose calculation utilities
│   │   └── pnp-rodrigues.js           # Rodrigues rotation formula
│   ├── App.jsx                        # Root component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html                          # HTML template
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── package.json                        # Dependencies and scripts
```

##  Getting Started

### Prerequisites

- **Node.js** version 16 or higher
- **npm** (comes with Node.js)

### Installation

1. **Clone or download** the project to your local machine

2. **Navigate** to the project directory:
   ```bash
   cd exam-vision-client-main
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173/
- **Network**: http://<your-ip>:5173/ (for accessing from other devices)

#### Production Build
Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

#### Linting
Check code quality with ESLint:
```bash
npm run lint
```

##  Usage

1. **Open the application** in your browser at http://localhost:5173/
2. **Allow camera access** when prompted by the browser
3. **View real-time monitoring**:
   - Left panel shows current focus status (Focused/Looking Away)
   - Center panel displays live video feed with tracking indicators
   - Right panel shows real-time head pose angles (Pitch, Yaw, Roll)
4. **Status indicators**:
   -  Green badge: Student is focused
   -  Yellow badge: Student is looking away
   -  Red border: Alert state (excessive head movement)

##  UI Features

- **Responsive Design**: Automatically adapts to all screen sizes from mobile to desktop
- **Modern Gradient Theme**: Professional blue-purple gradient with cyan accents
- **Real-time Updates**: Smooth animations and instant feedback
- **Mobile Optimized**: Touch-friendly interface for all devices
- **Dark Mode**: Eye-friendly dark theme optimized for exam environments

##  Configuration

### Vite Configuration
- **Target Browsers**: ES2020, Edge 88+, Firefox 78+, Chrome 87+, Safari 13+
- **Code Splitting**: Automatic vendor and MediaPipe chunks
- **Optimization**: Terser minification with source map disabled

### Tailwind Configuration
- **Breakpoints**: xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Custom Colors**: Extended slate color palette
- **Animations**: Fade-in and slide-in transitions

##  Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 87+ | ✅ Full | Recommended |
| Firefox 78+ | ✅ Full | Fully supported |
| Safari 13+ | ✅ Full | iOS support included |
| Edge 88+ | ✅ Full | Chromium-based |
| Mobile Browsers | ✅ Full | iOS Safari, Chrome Mobile |

##  Available NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

##  Key Components

### ProctorMainWindow
Main component handling:
- Real-time face detection using MediaPipe
- Head pose calculation and angle extraction
- Focus status inference based on yaw angle
- Dynamic UI updates with visual feedback

### Navbar
- ProcterX branding with gradient logo
- Navigation menu
- Responsive layout for all screen sizes

### Responsive Styling
- Mobile-first approach using Tailwind breakpoints
- Flexible layouts that adapt to any device
- Touch-optimized interactions

##  Dependencies

- **react**: 19.1.1 - UI library
- **react-dom**: 19.1.1 - React DOM rendering
- **@mediapipe/tasks-vision**: 0.10.22 - Face detection and landmarking
- **@tailwindcss/vite**: 4.1.13 - Tailwind CSS integration
- **tailwindcss**: 4.1.13 - Utility-first CSS framework
- **@techstark/opencv-js**: 4.8.0 - Computer vision library

##  Security & Privacy

- **No Data Storage**: All processing happens client-side
- **No Video Upload**: Video feed is never sent to external servers
- **Secure**: Uses HTTPS for external API calls
- **Privacy-First**: Respects user privacy while monitoring

##  Contributing

Feel free to fork this project and submit pull requests for any improvements.

##  License

This project is provided as-is for educational and exam proctoring purposes.

##  Troubleshooting

### Camera Access Denied
- Check browser permissions for camera access
- Reload the page and approve camera access
- Ensure you're using HTTPS (or localhost) for security

### Poor Head Detection
- Ensure adequate lighting
- Position camera at eye level
- Make sure face is clearly visible
- Check camera resolution (recommended 640x480+)

### Performance Issues
- Close unnecessary browser tabs
- Update browser to latest version
- Check internet connection for API calls
- Reduce other background processes

##  Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments in components
3. Check browser console for error messages

---