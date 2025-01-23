-- AddForeignKey
ALTER TABLE "workspaceRequestData" ADD CONSTRAINT "workspaceRequestData_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
