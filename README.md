# HostelHub - Next-Gen Hostel Discovery Platform

A modern, futuristic hostel booking platform built with Next.js, TypeScript, Tailwind CSS, and Appwrite for authentication and data management.

## 🚀 Features

- **Futuristic UI Design** - Modern glassmorphism effects with animated backgrounds
- **Google OAuth Authentication** - Secure authentication via Appwrite
- **Role-Based Access Control** - Hostel Lister and Room Seeker roles
- **Responsive Design** - Mobile-first approach with beautiful animations
- **Protected Routes** - Secure access control for different user roles
- **Dashboard** - Personalized dashboards for different user types

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Authentication**: Appwrite (Google OAuth)
- **Database**: Appwrite Database
- **Icons**: Lucide React
- **Styling**: Custom CSS animations and glassmorphism effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Appwrite account
- Google Cloud Console account (for OAuth)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd hostelhub
npm install
```

### 2. Appwrite Setup

#### Step 1: Create Appwrite Project
1. Go to [Appwrite Console](https://console.appwrite.io/)
2. Create a new project
3. Note down your **Project ID**

#### Step 2: Set Up Authentication
1. In your Appwrite project, go to **Auth** → **Settings**
2. Enable **Google OAuth** provider
3. Add your Google OAuth credentials (see Google Setup below)

#### Step 3: Create Database and Collection
1. Go to **Databases** → **Create Database**
   - Name: `hostelhub`
   - Note down the **Database ID**

2. Create a collection named `users`
   - Note down the **Collection ID**
   - Add the following attributes:
     - `userId` (String, required) - Stores the Appwrite user ID
     - `email` (String, required) - User's email address
     - `role` (String, required, enum: `HostelLister`, `RoomSeeker`) - User role

#### Step 4: Set Up Permissions
1. In the `users` collection, go to **Settings** → **Permissions**
2. Add the following permissions:
   - **Create**: `users` (for authenticated users)
   - **Read**: `users` (for authenticated users)
   - **Update**: `users` (for authenticated users)

### 3. Google OAuth Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API**

#### Step 2: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Add authorized redirect URIs:
   - `https://your-appwrite-endpoint/v1/account/sessions/oauth2/callback/google`
   - `http://localhost:3000/auth/callback` (for development)
5. Note down your **Client ID** and **Client Secret**

#### Step 3: Configure Appwrite OAuth
1. In Appwrite Console, go to **Auth** → **Settings** → **OAuth2 Providers**
2. Enable **Google**
3. Add your Google Client ID and Client Secret

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_COLLECTION_USERS=688f7c6c002f3243b66e

# Google OAuth (for Appwrite)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🔐 Authentication Flow

### User Roles
- **Hostel Lister**: Can post, manage, and edit hostel listings
- **Room Seeker**: Can browse, search, and save hostel listings

### Signup Process
1. User visits `/auth` page
2. Selects their role (Hostel Lister or Room Seeker)
3. Clicks "Sign up with Google"
4. Google OAuth popup appears
5. After successful authentication, user is redirected to `/auth/callback`
6. User document is created in Appwrite database with selected role
7. User is redirected to dashboard

### Access Control
- **Public Pages**: Homepage, hostel listings (view only)
- **Protected Pages**: Dashboard, post hostel (requires authentication)
- **Role-Specific**: Post hostel feature (Hostel Lister only)

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── page.tsx          # Authentication page
│   │   └── callback/
│   │       └── page.tsx      # OAuth callback handler
│   ├── dashboard/
│   │   └── page.tsx          # User dashboard
│   ├── unauthorized/
│   │   └── page.tsx          # Access denied page
│   ├── layout.tsx            # Root layout with AuthProvider
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles and animations
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx # Route protection component
├── lib/
│   ├── appwrite.ts           # Appwrite configuration and services
│   └── auth-context.tsx      # React context for authentication
└── types/                    # TypeScript type definitions
```

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for custom animations
- Update Tailwind classes in components for styling changes
- Customize color schemes in the gradient classes

### Authentication
- Modify `src/lib/appwrite.ts` for additional authentication methods
- Update user roles in the `UserRole` enum
- Customize the authentication flow in `src/lib/auth-context.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Ensure all environment variables are set
- Update OAuth redirect URIs to include your production domain
- Configure CORS settings if needed

## 🔧 Troubleshooting

### Common Issues

1. **OAuth Callback Errors**
   - Ensure redirect URIs are correctly configured in both Google and Appwrite
   - Check that environment variables are properly set

2. **Database Permission Errors**
   - Verify collection permissions in Appwrite
   - Ensure user has proper access rights

3. **Authentication State Issues**
   - Clear browser cache and cookies
   - Check browser console for errors

### Debug Mode
Enable debug logging by adding to your environment variables:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the Appwrite documentation
- Review the Google OAuth documentation

---

**Note**: This is an MVP implementation. For production use, consider adding:
- Error boundaries
- Loading states
- Form validation
- Rate limiting
- Security headers
- Analytics tracking
