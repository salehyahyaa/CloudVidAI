# CloudVidAI
**Background**
---
CloudVidAI is a full-stack, cloud-native video processing platform that integrates Google Cloud services with AI automation to provide a scalable, secure, and production-grade YouTube-style experience.

The system is built with an event-driven, serverless architecture, ensuring high availability, cost efficiency, and seamless scalability while addressing real-world constraints like security, asynchronous processing, and intelligent media enhancement.

---

**Features**
---
- **Video Upload & Playback** – Securely upload raw videos and stream transcoded versions in-browser.
- **AI Thumbnail Generation** – AI pipeline automatically detects the most relevant frame and generates engaging thumbnails.
- **Serverless Video Processing** – FFmpeg running in containerized Cloud Run services for on-demand transcoding.
- **Event-Driven Architecture** – Google Pub/Sub triggers processing jobs asynchronously to avoid blocking the UI.
- **Secure Authentication** – Firebase Authentication with role-based access control.
- **Metadata Management** – Video and thumbnail metadata stored in Cloud Firestore for fast retrieval.
- **Scalable Storage** – Google Cloud Storage for raw, processed, and thumbnail assets.

---

**Tech Stack**
---
**Frontend:** TypeScript, Next.js (React), TailwindCSS  
**Backend:** Node.js (Express), Firebase Functions  
**Processing:** FFmpeg in Docker, AI model for thumbnail generation  
**Infrastructure:**
- Google Cloud Storage (media storage)
- Google Cloud Pub/Sub (message queue)
- Google Cloud Run (processing & app hosting)
- Firebase Firestore (metadata storage)
- Firebase Auth (user management)

---

**Setup**
---

### 1) Clone the repository
```bash
git clone https://github.com/yourusername/CloudVidAI.git
cd CloudVidAI
