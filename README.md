# AI Mock Interview Application

A modern job interview preparation platform powered by VAPI AI voice agents, built with Next.js, Firebase, and Tailwind CSS.

## 🚀 Features

- **AI-Powered Interviews**: Conduct realistic mock interviews with VAPI voice agents
- **Smart Feedback**: Get detailed AI-generated feedback on your interview performance
- **Interview Generation**: Create custom interviews based on role, tech stack, and experience level
- **Real-time Voice Interaction**: Natural conversation flow with AI interviewers
- **Modern UI/UX**: Sleek, responsive design with dark/light themes
- **Firebase Authentication**: Secure user management and data storage

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Voice AI**: VAPI AI voice agents
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Models**: Google Gemini, OpenAI GPT-4
- **Voice**: 11Labs, Deepgram

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project
- VAPI account
- Google AI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ankulraja/Demo-Interview.git
cd Demo-Interview
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` in the root directory:

```env
# VAPI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 How It Works

1. **Sign Up/Login**: Create an account or sign in
2. **Generate Interview**: Specify role, tech stack, and interview type
3. **Take Interview**: Conduct voice interview with AI interviewer
4. **Get Feedback**: Receive detailed AI-generated feedback and scores
5. **Review Results**: Analyze performance and areas for improvement

## 🎯 Key Components

- **Agent Component**: Handles VAPI voice interactions
- **Interview Generation**: AI-powered question creation
- **Feedback System**: Comprehensive performance analysis
- **User Dashboard**: Interview history and management

## 🔧 Configuration

### VAPI Setup
1. Create a VAPI account at [vapi.ai](https://vapi.ai)
2. Get your API token and workflow ID
3. Configure voice settings in `constants/index.ts`

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Generate service account credentials
4. Add your configuration to environment variables

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.
