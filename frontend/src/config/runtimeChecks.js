const runRuntimeChecks = () => {
  if (!import.meta.env.PROD) {
    return;
  }

  const apiUrl = import.meta.env.VITE_API_URL?.trim();

  if (!apiUrl) {
    // Keep this as a console error so missed env setup is obvious in production logs.
    console.error(
      "[UrbanMart] Missing VITE_API_URL in production. Set it to your deployed backend API URL (e.g. https://your-backend-domain.com/api)."
    );
  }
};

export default runRuntimeChecks;
