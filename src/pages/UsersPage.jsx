import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import UserDialog from "@/custom_components/UserDialog";
import DeleteUserDialog from "@/custom_components/DeleteUserDialog";

const initialUsers = [
  { id: "1", name: "Ali Raza", email: "ali.raza@student.pk", role: "Admin", phone: "+92 300 1234567", status: "active" },
  { id: "2", name: "Ayesha Khan", email: "ayesha.khan@student.pk", role: "User", phone: "+92 301 9876543", status: "active" },
  { id: "3", name: "Bilal Ahmed", email: "bilal.ahmed@student.pk", role: "Moderator", phone: "+92 302 4567890", status: "inactive" },
  { id: "4", name: "Fatima Noor", email: "fatima.noor@student.pk", role: "User", phone: "+92 303 3210987", status: "active" },
  { id: "5", name: "Usman Tariq", email: "usman.tariq@student.pk", role: "User", phone: "+92 304 6543210", status: "active" },
  { id: "6", name: "Hina Malik", email: "hina.malik@student.pk", role: "Moderator", phone: "+92 305 1122334", status: "inactive" },
  { id: "7", name: "Saad Qureshi", email: "saad.qureshi@student.pk", role: "User", phone: "+92 306 2233445", status: "active" },
  { id: "8", name: "Maryam Shah", email: "maryam.shah@student.pk", role: "Admin", phone: "+92 307 3344556", status: "active" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 8px 20px rgba(220, 38, 38, 0.2)", transition: { duration: 0.3 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { backgroundColor: "rgba(239, 68, 68, 0.05)", transition: { duration: 0.2 } },
};

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (isEditing && selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...userData, id: selectedUser.id } : user
        )
      );
    } else {
      const newUser = { ...userData, id: Date.now().toString() };
      setUsers([...users, newUser]);
    }
    setIsUserDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-red-600">
              User Management
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Manage your users and their roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search + Add User */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <motion.div
                className="relative w-full sm:w-[320px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-red-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full text-base border-red-200 focus:ring-2 focus:ring-red-300"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleAddUser}
                  className="bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add User
                </Button>
              </motion.div>
            </div>

            {/* Responsive Table */}
            <div className="rounded-lg border border-red-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow className="bg-red-50/50">
                      <TableHead className="text-base font-semibold text-red-600">Name</TableHead>
                      <TableHead className="text-base font-semibold text-red-600">Email</TableHead>
                      <TableHead className="text-base font-semibold text-red-600">Role</TableHead>
                      <TableHead className="text-base font-semibold text-red-600">Phone</TableHead>
                      <TableHead className="text-base font-semibold text-red-600">Status</TableHead>
                      <TableHead className="text-base font-semibold text-red-600 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: index * 0.1 }}
                      >
                        <TableCell className="font-medium text-base text-foreground">{user.name}</TableCell>
                        <TableCell className="text-base text-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-red-100 text-red-600 text-sm">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-base text-foreground">{user.phone}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === "active" ? "default" : "secondary"}
                            className={user.status === "active" ? "bg-red-500 text-white" : "bg-red-100 text-red-600"}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50/80"
                              >
                                <Edit className="h-5 w-5" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(user)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50/80"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </motion.div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <UserDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        user={selectedUser}
        isEditing={isEditing}
        onSave={handleSaveUser}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={selectedUser}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Users;
