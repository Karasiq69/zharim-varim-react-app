import {Button, ButtonProps} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;