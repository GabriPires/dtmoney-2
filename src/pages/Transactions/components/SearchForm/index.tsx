import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';

export const SearchForm = () => {
  return (
    <SearchFormContainer>
      <input placeholder="Busque por transações" />
      <button type="submit">
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
