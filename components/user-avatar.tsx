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
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <AvatarImage
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};
