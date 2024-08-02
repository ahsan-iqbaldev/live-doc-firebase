// import CollaborativeRoom from "@/components/CollaborativeRoom";
// import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ActiveCollaborators from "@/components/ActiveCollaborators";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { getClerkUsers } from "@/lib/actions/user.actions";

const page =  async ({ params: { id } }: SearchParamProps) => {

  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  // const room = await getDocument({
  //   roomId: id,
  //   userId: clerkUser.emailAddresses[0].emailAddress,
  // });

  // if(!room) redirect('/');

  // const userIds = Object.keys(room.usersAccesses);
  // const users = await getClerkUsers({ userIds });

  // const usersData = users.map((user: User) => ({
  //   ...user,
  //   userType: room.usersAccesses[user.email]?.includes('room:write')
  //     ? 'editor'
  //     : 'viewer'
  // }))

  // const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';


  return (
    <main className="flex w-full items-center flex-col">
      <Header>
          <div className="flex w-fit items-center justify-center gap-2">
            <p>Shared</p>
          </div>
          <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
            <ActiveCollaborators />
            {/* <ShareModal 
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              /> */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
    </main>
  );
};

export default page;
