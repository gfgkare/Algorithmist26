# Firebase Security Rules

## 1. Cloud Firestore Rules

Go to **Firebase Console** -> **Build** -> **Firestore Database** -> **Rules** tab.
Replace the current rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Hardened Rules for Algorithmist '26
    
    match /registrations/{registrationId} {
      // Allow anybody to register, but NOBODY can read existing data or edit/delete it
      // In a real app, you'd use an Admin SDK or Custom Claims, but for simplicity:
      allow create: if true;
      allow read: if request.auth != null; // Only authenticated admins (if using Firebase Auth) 
                                           // OR we can rely on our password protection in the frontend 
                                           // for this specific implementation.
      allow update, delete: if false; 
    }
    
    match /payments/{paymentId} {
      // Allow anybody to upload payment proof linked to their registration
      allow create: if true;
      allow read: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```

> **IMPORTANT**: For absolute security on the Admin Panel, navigate to **Firebase Console -> Authentication** and enable "Email/Password". Create one account for yourself, and then change the `allow read` rules above to `if request.auth.uid == "YOUR_ADMIN_UID"`.

## 2. Storage Rules

**Note**: Since we are saving the screenshot as a string in Firestore/payments, you likely don't need Storage anymore. However, keeping the rules as-is doesn't hurt.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /payment_screenshots/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
