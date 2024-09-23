# SEARCHiT Engine

SEARCHiT is a sleek, modern search engine interface with integrated search history functionality. It features a clean design with smooth animations and a responsive layout.

![image](https://github.com/user-attachments/assets/ec2422af-376e-4d15-bdf2-3e45a7373cd0)

## Features

- Clean and intuitive user interface
- Real-time search history tracking
- Firebase integration for data persistence
- Responsive design for various screen sizes
- Customizable color scheme
- Animated loader for enhanced user experience

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Firebase (Firestore)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/searchit-engine.git
   ```

2. Navigate to the project directory:
   ```
   cd searchit-engine
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Set up Firestore database in your project
   - Add a web app to your Firebase project and copy the configuration

4. Update Firebase configuration:
   - Open `index.html`
   - Replace the Firebase configuration object with your own:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

5. Serve the project:
   - You can use any local server. For example, with Python:
     ```
     python -m http.server 8000
     ```
   - Or use a VS Code extension like Live Server

6. Open the application in your browser:
   ```
   http://localhost:8000
   ```

## Customization

- Colors: Modify the CSS variables in the `:root` selector in `styles.css` to change the color scheme.
- Logo: Replace `logo.png` in the `images` folder with your own logo.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any queries or suggestions, please reach out to [tanishqgupta322@gmail.com](mailto:tanishqgupta322@gmail.com).

---

Happy Searching with SEARCHiT!
