import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SharedButton from '@/shared/GenericButton';
import InputField from '@/shared/InputField';
import { createTodo } from './todosApiCalls';

interface TodoFormProps {
  onClose: () => void;
  onCreated: () => void;
}

const validationSchema = Yup.object({
  headline: Yup.string().required('Headline is required'),
  description: Yup.string().required('Description is required'),
  ageOfWork: Yup.number()
    .typeError('Age of work must be a number')
    .min(0, 'Age of work must be 0 or more')
    .required('Age of work is required'),
});

const TodoForm = ({ onClose, onCreated }: TodoFormProps) => {
  const formik = useFormik({
    initialValues: { headline: '', description: '', ageOfWork: '' },
    validationSchema,
    onSubmit: async values => {
      const isSuccess = await createTodo({
        headline: values.headline,
        description: values.description,
        ageOfWork: Number(values.ageOfWork),
      });
      if (isSuccess) {
        onCreated();
        onClose();
      }
    },
  });

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off" className="space-y-4">
          <InputField id="headline" label="Headline" placeholder="Headline" formik={formik} />
          <InputField id="description" label="Description" placeholder="Description" formik={formik} />
          <InputField id="ageOfWork" type="number" label="Age Of Work" placeholder="Age Of Work" formik={formik} />
          <SharedButton type="submit" className="w-full" isLoading={formik.isSubmitting}>
            Create Todo
          </SharedButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
