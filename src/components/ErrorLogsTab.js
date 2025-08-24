import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

const ErrorLogsTab = ({ searchQuery = '' }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Dummy data that matches exactly the image
      const dummyErrors = [
        {
          id: 1,
          title: "CORS Error in Production API",
          error: "Access to fetch at 'https://api.example.com/users' from origin 'https://app.example.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
          solution: "Added CORS middleware to Express server: app.use(cors({ origin: ['https://app.example.com', 'https://admin.example.com'], credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));",
          tags: ["cors", "api", "production", "express"],
          date: "Jan 15, 2024"
        },
        {
          id: 2,
          title: "Memory Leak in Node.js Service",
          error: "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory. Process terminated with exit code 137.",
          solution: "Identified event listener leak in WebSocket connections. Fixed by: 1. Properly removing event listeners on disconnect 2. Implementing connection pooling with max limits 3. Added memory monitoring with process.memoryUsage() 4. Set Node.js heap size limit with --max-old-space-size=4096",
          tags: ["memory-leak", "nodejs", "websocket", "performance"],
          date: "Jan 12, 2024"
        },
        {
          id: 3,
          title: "Docker Build Failing on ARM64",
          error: "ERROR: failed to solve: process \"/bin/sh -c npm install\" did not complete successfully: exit code 1\nnpm ERR! code ENOENT\nnpm ERR! syscall spawn git\nnpm ERR! path /app\nnpm ERR! errno ENOENT\nnpm ERR! enoent Failed to execute git clone",
          solution: "Issue was with native dependencies not compatible with ARM64 architecture. Solution: 1. Updated Dockerfile to use multi-platform base image 2. Added platform-specific dependency installation 3. Used --platform=linux/amd64 for x86 compatibility 4. Added conditional npm install based on architecture",
          tags: ["docker", "arm64", "build", "platform"],
          date: "Jan 8, 2024"
        },
        {
          id: 4,
          title: "React Hydration Mismatch",
          error: "Warning: Text content did not match. Server: \"Loading...\" Client: \"Welcome back, John!\"\nError: Hydration failed because the initial UI does not match what was rendered on the server. This is likely caused by a global value that differs between server and client.",
          solution: "Hydration mismatch due to client-only user data being rendered on server. Fixed with useEffect pattern: const [isClient, setIsClient] = useState(false); const [user, setUser] = useState(null); useEffect(() => { setIsClient(true); setUser(getUserData()); }, []); return isClient ? <UserGreeting user={user} /> : <Loading />;",
          tags: ["react", "hydration", "ssr", "nextjs"],
          date: "Jan 7, 2024"
        }
      ];
      setErrors(dummyErrors);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filteredErrors = React.useMemo(() => {
    if (!searchQuery.trim()) return errors;
    
    const query = searchQuery.toLowerCase();
    return errors.filter(error => 
      error.title.toLowerCase().includes(query) ||
      error.error.toLowerCase().includes(query) ||
      error.solution.toLowerCase().includes(query) ||
      (error.tags && error.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [errors, searchQuery]);

  const handleIconClick = (e, action, errorId) => {
    e.stopPropagation();
    console.log(`${action} clicked for error ${errorId}`);
    // Handle different actions here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errors.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🚨</div>
        <h3>No error logs found</h3>
        <p>Start tracking your debugging journey by logging your first error.</p>
        <button className="btn btn-primary" onClick={() => navigate('/log-error')}>
          Log First Error
        </button>
      </div>
    );
  }

  if (filteredErrors.length === 0 && searchQuery) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No errors match your search</h3>
        <p>Try adjusting your search terms or log a new error.</p>
      </div>
    );
  }

  return (
    <div className="errors-grid">
      {filteredErrors.map(error => (
        <div key={error.id} className="error-card">
          <div className="error-header">
            <h3 className="error-title">{error.title}</h3>
            <div className="error-actions">
              <button 
                className="error-action-icon"
                onClick={(e) => handleIconClick(e, 'edit', error.id)}
                title="Edit Error"
              >
                <Edit size={16} />
              </button>
              <button 
                className="error-action-icon delete"
                onClick={(e) => handleIconClick(e, 'delete', error.id)}
                title="Delete Error"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="error-tags">
            {error.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          
          <div className="error-content">
            <div className="error-section">
              <h4>Error:</h4>
              <pre className="error-code">{error.error}</pre>
            </div>
            
            <div className="error-section">
              <h4>Solution:</h4>
              <p className="error-solution">{error.solution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorLogsTab;
