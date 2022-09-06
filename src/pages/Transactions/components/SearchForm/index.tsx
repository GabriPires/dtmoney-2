import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { SearchFormContainer } from './styles';

const searchFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormProps = zod.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormProps>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions = async (data: SearchFormProps) => {
    await fetchTransactions(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
