import { DialogTrigger } from "@/components/ui/dialog";

type ProductModalTriggerProps = {
  children: React.ReactNode;
};

const ProductModalTrigger: React.FC<ProductModalTriggerProps> = ({ children }) => {
  return (
    <DialogTrigger asChild>
      <div className="cursor-pointer">{children}</div>
    </DialogTrigger>
  );
};

export default ProductModalTrigger;