import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/shared/ConfirmationDialog';
import { Todo, deleteTodo } from './todosApiCalls';

interface TodosTableProps {
  todos: Todo[];
  isLoading: boolean;
  onDeleted: () => void;
}

const TodosTable = ({ todos, isLoading, onDeleted }: TodosTableProps) => {
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!todoToDelete) return;
    setIsDeleting(true);
    const isSuccess = await deleteTodo(todoToDelete.id);
    setIsDeleting(false);
    if (isSuccess) {
      setTodoToDelete(null);
      onDeleted();
    }
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            <Loader2 className="mx-auto size-5 animate-spin" />
          </TableCell>
        </TableRow>
      );
    }
    if (!todos.length) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-muted-foreground h-24 text-center">
            No todos found
          </TableCell>
        </TableRow>
      );
    }
    return todos.map(todo => (
      <TableRow key={todo.id}>
        <TableCell className="font-medium">{todo.headline}</TableCell>
        <TableCell className="max-w-xs truncate">{todo.description}</TableCell>
        <TableCell>{todo.ageOfWork}</TableCell>
        <TableCell>{todo.createdAt}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="icon" aria-label="Delete todo" onClick={() => setTodoToDelete(todo)}>
            <Trash2 className="text-destructive" />
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Headline</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Age Of Work</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderBody()}</TableBody>
      </Table>

      <ConfirmationDialog
        isOpen={Boolean(todoToDelete)}
        isLoading={isDeleting}
        onOpenChange={open => !open && setTodoToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Todo"
        description={`Are you sure you want to delete "${todoToDelete?.headline ?? ''}"? This cannot be undone.`}
        confirmButtonText="Delete"
      />
    </>
  );
};

export default TodosTable;
