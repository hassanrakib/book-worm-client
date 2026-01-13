"use client";

import { useState } from "react";
import { Table, NativeSelect, HStack, Avatar, Text } from "@chakra-ui/react";
import { IUser, TUserRole, USER_ROLE } from "@/types/user";
import { useUpdateUserRoleByIdMutation } from "@/redux/features/user/user.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { toaster } from "@/components/ui/toaster";

interface UserManagementTableProps {
  initialUsers: IUser[];
}

const UserManagementTable = ({ initialUsers }: UserManagementTableProps) => {
  const [users, setUsers] = useState<IUser[]>(initialUsers);

  const [updateUserRoleById, { error }] =
    useUpdateUserRoleByIdMutation();

  // Handle Role Change
  const handleRoleChange = async (userId: string, newRole: TUserRole) => {

    const result = await updateUserRoleById({ userId, role: newRole });

    if (result.data?.data) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, role: newRole } : user
        )
      );
    } else {
      toaster.create({
        type: "error",
        description: isFetchBaseQueryErrorWithData(error)
          ? error.data.message
          : "There was an error processing your request",
      });
    }
  };

  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" maxW="4xl" bg="white">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row bg="yellow.300">
            <Table.ColumnHeader width="60px">#</Table.ColumnHeader>
            <Table.ColumnHeader>User</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end" width="200px">
              Role / Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={user.userId}>
              <Table.Cell>{index + 1}.</Table.Cell>

              <Table.Cell>
                <HStack gap="3">
                  <Avatar.Root size="xs">
                    <Avatar.Image src={user.profilePhoto} />
                    <Avatar.Fallback name={user.name} />
                  </Avatar.Root>
                  <Text fontWeight="medium">{user.name}</Text>
                </HStack>
              </Table.Cell>

              <Table.Cell>{user.email}</Table.Cell>

              <Table.Cell textAlign="end">
                <HStack justify="flex-end">
                  <NativeSelect.Root size="sm" width="140px">
                    <NativeSelect.Field
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(
                          user.userId,
                          e.currentTarget.value as TUserRole
                        )
                      }
                    >
                      <option value={USER_ROLE.User}>Normal User</option>
                      <option value={USER_ROLE.Admin}>Admin</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default UserManagementTable;
