import UserManagementTable from "@/components/admin-ui/users/users-table";
import { getUsers } from "@/services/user";
import { VStack } from "@chakra-ui/react";

const Users = async () => {
  const users = await getUsers();

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="3.5">
      <UserManagementTable initialUsers={users.data || []} />
    </VStack>
  );
};

export default Users;
