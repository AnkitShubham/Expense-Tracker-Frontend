import { Button, Spacer, Card } from "@nextui-org/react";
import { Home } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-5 font-clashDisplay">
      <Card className="p-8 max-w-lg text-center shadow-lg">
        <h1 className="text-5xl font-bold text-primary mb-5">404</h1>
        <p className="text-lg text-gray-500 mb-10">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Button
          size="mg"
          color="primary"
          variant="shadow"
          onPress={handleGoHome}
          endContent={<Home size={24} weight="thin" variant="Broken" />}
        >
          Go to Home
        </Button>
      </Card>
      <Spacer y={2} />
    </div>
  );
};

export default PageNotFound;
