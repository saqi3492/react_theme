import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationDialog from '@/shared/ConfirmationDialog';
import UserForm from './UserForm';
import { deleteUserApi } from './usersApiCalls';
import type { User } from '@/store/slices/usersSlice';

interface ActionRendererProps {
  data: User;
}

const ActionRenderer = ({ data }: ActionRendererProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    await deleteUserApi(data.id);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setIsDeleteOpen(true)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${data.name}? This action cannot be undone.`}
        confirmButtonText="Delete"
      />
      <UserForm isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} userData={data} />
    </>
  );
};

export default ActionRenderer;
