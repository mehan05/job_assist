-- CreateTable
CREATE TABLE "_WorkSpaceRequests" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_WorkSpaceRequests_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_WorkSpaceRequests_B_index" ON "_WorkSpaceRequests"("B");

-- AddForeignKey
ALTER TABLE "_WorkSpaceRequests" ADD CONSTRAINT "_WorkSpaceRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkSpaceRequests" ADD CONSTRAINT "_WorkSpaceRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
