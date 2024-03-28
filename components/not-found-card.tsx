import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const NotFoundCard = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[600px] rounded-md bg-white shadow px-15">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-3xl md:text-4xl h-14">
            Not found
          </CardTitle>
          <CardDescription className="text-gray-500">
            The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
