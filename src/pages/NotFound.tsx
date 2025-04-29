
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="text-center max-w-md p-6">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
