import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const UserDialog = ({ open, onOpenChange, user, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    status: "active",
  });

  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        phone: "",
        status: "active",
      });
    }
  }, [user, isEditing, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <motion.div
        variants={dialogVariants}
        initial="hidden"
        animate="visible"
      >
        <DialogContent className="sm:max-w-[450px] bg-white/95 backdrop-blur-sm border-red-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">
              {isEditing ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {isEditing
                ? "Make changes to the user details here."
                : "Add a new user to the system."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 py-5">
              <motion.div
                className="grid grid-cols-4 items-center gap-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <Label htmlFor="name" className="text-right text-base text-red-600">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="col-span-3 text-base border-red-200 focus:ring-2 focus:ring-red-300"
                  required
                />
              </motion.div>
              <motion.div
                className="grid grid-cols-4 items-center gap-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="email" className="text-right text-base text-red-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="col-span-3 text-base border-red-200 focus:ring-2 focus:ring-red-300"
                  required
                />
              </motion.div>
              <motion.div
                className="grid grid-cols-4 items-center gap-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="role" className="text-right text-base text-red-600">
                  Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger className="col-span-3 text-base border-red-200 focus:ring-2 focus:ring-red-300">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-red-200">
                    <SelectItem value="Admin" className="text-base">Admin</SelectItem>
                    <SelectItem value="Moderator" className="text-base">Moderator</SelectItem>
                    <SelectItem value="User" className="text-base">User</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div
                className="grid grid-cols-4 items-center gap-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="phone" className="text-right text-base text-red-600">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="col-span-3 text-base border-red-200 focus:ring-2 focus:ring-red-300"
                  required
                />
              </motion.div>
              <motion.div
                className="grid grid-cols-4 items-center gap-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="status" className="text-right text-base text-red-600">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3 text-base border-red-200 focus:ring-2 focus:ring-red-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-red-200">
                    <SelectItem value="active" className="text-base">Active</SelectItem>
                    <SelectItem value="inactive" className="text-base">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
            <DialogFooter>
              <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
                <Button
                  type="submit"
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  {isEditing ? "Save Changes" : "Add User"}
                </Button>
              </motion.div>
            </DialogFooter>
          </form>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default UserDialog;