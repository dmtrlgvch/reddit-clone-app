import {User} from "@prisma/client";
import {AvatarProps} from "@radix-ui/react-avatar";
import {Icons} from "@/components/icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
interface Props extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export const UserAvatar = ({user, ...props}: Props) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback>
        <span className="sr-only">{user?.name}</span>
        <Icons.user />
      </AvatarFallback>
    </Avatar>
  );
};
