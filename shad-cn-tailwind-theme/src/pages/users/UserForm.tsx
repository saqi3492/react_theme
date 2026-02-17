import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SharedButton from '@/shared/GenericButton';
import InputField from '@/shared/InputField';
import { createUserApi, updateUserApi } from './usersApiCalls';
import type { User } from '@/store/slices/usersSlice';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: User | null;
}

interface UserFormValues {
  name: string;
  email: string;
  role: string;
}

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
});

const roleOptions = ['Admin', 'User', 'Manager', 'Editor'];

const UserForm = ({ isOpen, onClose, userData }: UserFormProps) => {
  const formik = useFormik<UserFormValues>({
    initialValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      role: userData?.role || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      if (userData) {
        await updateUserApi(userData.id, values);
      } else {
        await createUserApi(values);
      }
      onClose();
      formik.resetForm();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{userData ? 'Update User' : 'Create New User'}</DialogTitle>
          <DialogDescription>Fill in the details to {userData ? 'update' : 'create'} a user.</DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputField id="name" type="text" label="Name" placeholder="John Doe" formik={formik} />
          <InputField id="email" type="email" label="Email" placeholder="john@example.com" formik={formik} />
          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              {...formik.getFieldProps('role')}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-xl border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select a role</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.role}</div>
            )}
          </div>
          <DialogFooter>
            <SharedButton type="button" variant="outline" onClick={handleClose}>
              Cancel
            </SharedButton>
            <SharedButton type="submit" isLoading={formik.isSubmitting}>
              {userData ? 'Update User' : 'Create User'}
            </SharedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
