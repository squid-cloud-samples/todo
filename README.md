# Create a TODO app with Squid


1. In the [Squid Cloud Console](https://console.squid.cloud) create a new app called `todo`.

2. Connect the Squid backend to the `todo` by scrolling in the console **Overview** page to the **Backend project** section and selecting **Create .env file**. Copy the command.

3. Open a terminal window and change to the `backend` directory.

```bash
cd todo/backend
```

4. Install the required packages:

```bash
npm install
```

5. Create the `.env` file by running the command you copied. It will have this format:

```bash
squid init-env \
 --appId [YOUR_APP_ID] \
 --apiKey [YOUR_API_KEY] \
 --environmentId dev \
 --squidDeveloperId [YOUR_SQUID_DEVELOPER_ID]  \
 --region us-east-1.aws
```

6. Start the backend in this terminal window by running the following command:

```bash
squid start
```

7. Open a second terminal window. In this window, navigate to the frontend:

```bash
cd todo/frontend
```

8. Install the required dependencies:

```bash
npm install
```

9. Open the `frontend/src/main.tsx` file and update the configuration with your app's information. You can find the values in the Squid Cloud Console or in the `.env` file you downloaded.

10. Start the frontend by running:

```bash
npm run dev
```

11. Click the URL in the terminal logs to open the app (likely http://localhost:5173/). The page displays your todo application, and an accompanying tutorial.

Follow the steps in the application to begin building!