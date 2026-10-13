import { useCallback, useEffect, useState } from 'react';
import { PlusCircle, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import TodosTable from './TodosTable';
import TodoForm from './TodoForm';
import { Todo, fetchTodos } from './todosApiCalls';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isCreateDialog, setIsCreateDialog] = useState(false);

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setTodos(await fetchTodos());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchText), 500);
    return () => clearTimeout(timeout);
  }, [searchText]);

  // The /todos endpoint has no search params, so filtering happens on the client
  const search = debouncedSearch.toLowerCase();
  const filteredTodos = search
    ? todos.filter(todo => todo.headline.toLowerCase().includes(search) || todo.description.toLowerCase().includes(search))
    : todos;

  const handleReset = () => {
    setSearchText('');
    setDebouncedSearch('');
  };

  return (
    <div className="bg-card rounded-lg border p-3">
      <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Todos</h1>
          <Button variant="outline" size="icon" aria-label="Refresh todos" onClick={loadTodos} disabled={isLoading}>
            <RefreshCw className={cn(isLoading && 'animate-spin')} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Create todo" onClick={() => setIsCreateDialog(true)}>
            <PlusCircle className="text-primary" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search here..." className="pl-8" />
          </div>
          <Button onClick={handleReset}>Reset Filters</Button>
        </div>
      </div>

      <TodosTable todos={filteredTodos} isLoading={isLoading} onDeleted={loadTodos} />

      {isCreateDialog ? <TodoForm onClose={() => setIsCreateDialog(false)} onCreated={loadTodos} /> : null}
    </div>
  );
};

export default Todos;
